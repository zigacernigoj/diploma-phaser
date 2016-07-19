/**
* @author       Sascha Kloesges <info@kloesges.com>
* @copyright    2016 Sascha Kloesges
* @license      {MIT License}
*
* @overview
*
* Addon for Phaser - http://phaser.io | http://www.phaser-lernen.de/phaser-addons/checkbox/
*
* v1.0.0 - Built: Thu Feb 25 2016
*
* By Sascha Kloesges http://www.kloesges.com
*
* This is an addon for Phaser by photonstorm (http://www.photonstorm.com) by Richard Davey.
* The addon add a new GameFactoryObject 'checkbox' build with a text, texture and button element
* to be able to display a checkbox-element to you phaser game.
*
* Follow development at http://phaser.io and on our forum
*
* "Dreams exists to be lived, otherwise they remain eternally illusions."
*                                                     -- Sascha Kloesges 2010
*/

/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Sascha Kloesges
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function(){
    /**
     * checkbox function
     * @class
     * @param {number}      _x          horizontal position
     * @param {number}      _y          vertical position
     * @param {object}      _labelObj   object for the textual part of the checkbox contains @param {string} text for the label and @param {object} style for the textfield style
     * @param {string}      _sprite     key - The key used to a stored texture in Phase Cache
     * @param {boolean}     _state      predefined state of checkbox (default: false)
     * @param (number)      _yPosition  y position of label relative to _sprite
     * @return {object}                 A newley created checkbox-object
     */
    var PHASER_checkbox = window['PHASER_checkbox'] = function checkbox( _x, _y, _labelObj, _sprite, _state, _yPosition ) {
        // creating texture, text and button
        var texture = this.game.add.sprite( _x, _y, _sprite );

        var yPosition = 0;
        if( undefined !== arguments[5]){
            yPosition = _yPosition;
        }

        var text = this.game.add.text( _x + texture.width + 5, _y + yPosition, _labelObj.text, _labelObj.style ); //
        // _y + _yPosition => Set the y position relative to texture

        var button = this.game.add.sprite ( _x - 2, _y - 2 );
            button.width = texture.width + 5 + text.width + 4;
            button.height = ( text.height > texture.height ) ? text.height + 4 : texture.height + 4;
            button.inputEnabled = true;
            button.input.useHandCursor = true;
            button.events.onInputDown.add( function( elm, pointer ){
                change();
            }, this );
        // setting default state to false
        var state = false;
        /**
         * changing state of checkbox and changing texture frame
         * @method checkbox#change
         */
        var change = function change () {
            if ( state ) {
                state = false;
                texture.frame = 0;
            } else {
                state = true;
                texture.frame = 1;
            }
        }
        // if parameter _state is set to true, overwrite the default state
        if ( undefined !== arguments[4] && true === arguments[4] ) {
            change();
        }
        // return the checkbox object
        return {
            button : button,
            change : change,
            text : text,
            texture : texture,
            // setter for changing if checkbox is enabled or not
            set enabled ( bool ) {
                button.inputEnabled = bool;
                button.input.useHandCursor = bool;
                if ( bool ) {
                    texture.tint = 0xffffff;
                    texture.alpha = 1;
                    text.tint = 0xffffff;
                    text.alpha = 1;                                    
                } else {
                    texture.tint = 0x999999;
                    texture.alpha = 0.5;
                    text.tint = 0x999999;
                    text.alpha = 0.5;
                }
            },
            // setter to enable input-events
            set inputEnabled ( bool ) {
                button.inputEnabled = bool;
                text.inputEnabled = bool;
                texture.inputEnabled = bool;
            },
            // setter for using hand-cursor over checkbox
            set useHandCursor ( bool ) {
                button.input.useHandCursor = bool;
                text.input.useHandCursor = bool;
                texture.input.useHandCursor = bool;
            },
            // getter for the actual state
            get state () {
                return state;  
            },
            // setter for state like checkbox#change
            set state ( bool ) {
                if ( bool ) {
                    state = true;
                    texture.frame = 1;
                } else {
                    state = false;
                    texture.frame = 0;
                }
            },
            // getter for horizontal and vertical position
            get x () {
                return texture.x;  
            },
            get y () {
                return texture.y;  
            },
            // setter for horizontal and vertical position
            set x ( xpos ) {
                button.x = xpos - 2;
                texture.x = xpos;
                text.x = texture.x + texture.width + 5;
            },
            set y ( ypos ) {
                button.y = ypos - 2;
                texture.y = ypos;
                text.y = ypos;
            },
            // methods to adding eventHandler for over, out and up events
            events : {
                onInputOver : {
                    add : function ( _callback, _scope ) {
                        button.events.onInputOver.add( _callback, _scope );
                    }
                },
                onInputOut : {
                    add : function ( _callback, _scope ) {
                        button.events.onInputOut.add( _callback, _scope );
                    }
                },
                onInputUp : {
                    add : function ( _callback, _scope ) {
                        button.events.onInputUp.add( _callback, _scope );
                    }
                }
            },
            // kill the elements
            kill : function(){
                button.kill();
                texture.kill();
                text.kill();
            }
        };
    }  
    
    // if phaser is in use, adding the checkbox-function to the Phaser.GameObjectFactory
    if ( undefined !== Phaser.GameObjectFactory && 'function' === typeof Phaser.GameObjectFactory ) {
        Phaser.GameObjectFactory.prototype.checkbox = PHASER_checkbox;
    }
})();

(function(){
    /**
     * checkbox function
     * @class
     * @param {number}      _x          horizontal position
     * @param {number}      _y          vertical position
     * @param {object}      _labelObj   object for the textual part of the checkbox contains @param {string} text for the label and @param {object} style for the textfield style
     * @param {string}      _sprite     key - The key used to a stored texture in Phase Cache
     * @param {boolean}     _state      predefined state of checkbox (default: false)
     * @param (number)      _yPosition  y position of label relative to _sprite
     * @return {object}                 A newley created checkbox-object
     */
    var PHASER_radiobutton = window['PHASER_radiobutton'] = function radiobutton( _x, _y, _labelObj, _sprite, _state, _yPosition ) {
        // creating texture, text and button
        var texture = this.game.add.sprite( _x, _y, _sprite );

        var radioGroup = null;
        var name = _labelObj.text;

        var yPosition = 0;
        if( undefined !== arguments[5]){
            yPosition = _yPosition;
        }

        var text = this.game.add.text( _x + texture.width + 5, _y + yPosition, _labelObj.text, _labelObj.style ); //
        // _y + _yPosition => Set the y position relative to texture

        var button = this.game.add.sprite ( _x - 2, _y - 2 );
        button.width = texture.width + 5 + text.width + 4;
        button.height = ( text.height > texture.height ) ? text.height + 4 : texture.height + 4;
        button.inputEnabled = true;
        button.input.useHandCursor = true;
        button.events.onInputDown.add( function( elm, pointer ){
            //change();
            checkOne();
        }, this );

        // setting default state to false
        var state = false;
        /**
         * changing state of checkbox and changing texture frame
         * @method checkbox#change
         */
        var change = function change () {
            if ( state ) {
                state = false;
                texture.frame = 0;
            } else {
                state = true;
                texture.frame = 1;
            }
        }

        var checkOne = function () {
            if(radioGroup !== null) {
                radioGroup.onlyOne(name);
            }
        };

        var changeFramesOnly = function() {
            if ( state ) {
                texture.frame = 1;
            } else {
                texture.frame = 0;
            }
        }


        // if parameter _state is set to true, overwrite the default state
        if ( undefined !== arguments[4] && true === arguments[4] ) {
            change();
        }
        // return the checkbox object
        return {
            button : button,
            change : change,
            checkOne: checkOne,
            changeFramesOnly: changeFramesOnly,
            text : text,
            texture : texture,
            name: name,

            //radioGroup: radioGroup,

            get radioGroup() {
                return radioGroup;
            },

            set radioGroup( group ) {
                radioGroup = group;
            },

            // setter for changing if checkbox is enabled or not
            set enabled ( bool ) {
                button.inputEnabled = bool;
                button.input.useHandCursor = bool;
                if ( bool ) {
                    texture.tint = 0xffffff;
                    texture.alpha = 1;
                    text.tint = 0xffffff;
                    text.alpha = 1;
                } else {
                    texture.tint = 0x999999;
                    texture.alpha = 0.5;
                    text.tint = 0x999999;
                    text.alpha = 0.5;
                }
            },
            // setter to enable input-events
            set inputEnabled ( bool ) {
                button.inputEnabled = bool;
                text.inputEnabled = bool;
                texture.inputEnabled = bool;
            },
            // setter for using hand-cursor over checkbox
            set useHandCursor ( bool ) {
                button.input.useHandCursor = bool;
                text.input.useHandCursor = bool;
                texture.input.useHandCursor = bool;
            },
            // getter for the actual state
            get state () {
                return state;
            },

            // setter for state like checkbox#change
            set state ( bool ) {
                if ( bool ) {
                    state = true;
                    texture.frame = 1;
                } else {
                    state = false;
                    texture.frame = 0;
                }
            },
            // getter for horizontal and vertical position
            get x () {
                return texture.x;
            },
            get y () {
                return texture.y;
            },
            // setter for horizontal and vertical position
            set x ( xpos ) {
                button.x = xpos - 2;
                texture.x = xpos;
                text.x = texture.x + texture.width + 5;
            },
            set y ( ypos ) {
                button.y = ypos - 2;
                texture.y = ypos;
                text.y = ypos;
            },
            // methods to adding eventHandler for over, out and up events
            events : {
                onInputOver : {
                    add : function ( _callback, _scope ) {
                        button.events.onInputOver.add( _callback, _scope );
                    }
                },
                onInputOut : {
                    add : function ( _callback, _scope ) {
                        button.events.onInputOut.add( _callback, _scope );
                    }
                },
                onInputUp : {
                    add : function ( _callback, _scope ) {
                        button.events.onInputUp.add( _callback, _scope );
                    }
                }
            },
            // kill the elements
            kill : function(){
                button.kill();
                texture.kill();
                text.kill();
            }
        };
    }

    // if phaser is in use, adding the checkbox-function to the Phaser.GameObjectFactory
    if ( undefined !== Phaser.GameObjectFactory && 'function' === typeof Phaser.GameObjectFactory ) {
        Phaser.GameObjectFactory.prototype.radiobutton = PHASER_radiobutton;
    }
})();




(function(){
    /**
     * checkbox function
     * @class
     * * @return {object}                 A newley created checkbox-object
     */
    var PHASER_radioGroup = window['PHASER_radioGroup'] = function radioGroup( _name ) {
        var name = _name;
        var children = [];

        var add = function add (child) {
            children.push(child);
            child.radioGroup = this;

            //console.log(child);
        };

        var onlyOne = function onlyOne (childName) {

            for(var i in children){
                if(children[i].name === childName) {
                    //console.log(children[i].name + " " + childName);
                    children[i].state = true;
                    children[i].changeFramesOnly();

                }
                else {
                    children[i].state = false;
                    children[i].changeFramesOnly();
                }
                //console.log("at end of for", children[i].state, children[i].name);
            }

        }

        // return the checkbox object
        return {
            name: name,
            add: add,
            onlyOne: onlyOne,

            get children () {
                return children;
            },

            // kill the elements
            kill : function(){
                name.kill();
                children.kill();
            }
        };
    }

    // if phaser is in use, adding the checkbox-function to the Phaser.GameObjectFactory
    if ( undefined !== Phaser.GameObjectFactory && 'function' === typeof Phaser.GameObjectFactory ) {
        Phaser.GameObjectFactory.prototype.radioGroup = PHASER_radioGroup;
    }
})();