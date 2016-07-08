window.onload = function() {



    var game = new Phaser.Game("100vw", "100vh", Phaser.AUTO, '', { preload: preload, create: create });

    function preload () {

        game.load.crossOrigin = 'anonymous';
        game.load.image('crte', 'assets/img/crte.png');
        game.load.image('nota0', 'assets/img/nota0.png');
        game.load.image('nota1', 'assets/img/nota1.png');

        game.load.image('pravilno', 'assets/img/pravilno.png');
        game.load.image('narobe', 'assets/img/narobe.png');

        game.load.image('zacni', 'assets/buttons/zacni.png');
        game.load.image('naprej', 'https://zigacernigoj.github.io/diploma-assets/student/btn/naprejTextBtn.png');

        game.load.image('c', 'assets/buttons/c.png');
        game.load.image('d', 'assets/buttons/d.png');
        game.load.image('e', 'assets/buttons/e.png');
        game.load.image('f', 'assets/buttons/f.png');
        game.load.image('g', 'assets/buttons/g.png');
        game.load.image('a', 'assets/buttons/a.png');
        game.load.image('h', 'assets/buttons/h.png');
    }

    var crte = null;
    var nota = null;

    var correctNote = null;
    var correctNoteNumber = null;
    var trenutniRez = null;

    var zacniGumb = null;
    var naprejGumb = null;

    var cGumb = null;
    var dGumb = null;
    var eGumb = null;
    var fGumb = null;
    var gGumb = null;
    var aGumb = null;
    var hGumb = null;

    var yPositions = [230, 216, 198, 180, 162, 144, 126];

    var naslov = null;
    var navodila = null;

    var besediloUspeh = null;
    var narobe = null;
    var pravilna = null;

    var counter = 0;
    var pravilni = 0;
    var napacni = 0;
    var uspeh = 0;
    var uspehOds = 0;

    var navbar = null;

    function create () {
        game.stage.backgroundColor = '#82aed6';
        
        var style1 = { font: "65px Arial", fill: "#000000", align: "center" };
        naslov = game.add.text(game.world.centerX, game.world.top, "Vadnica not", style1);
        naslov.anchor.set(0.5, -0.5);
        naslov.alpha = 1;

        var style2 = { font: "25px Arial", fill: "#000000", align: "center", wordWrap: true, wordWrapWidth: game.world.width-50 };
        navodila = game.add.text(game.world.centerX, game.world.centerY, "Vadnica not ti bo pomagala izpiliti poznavanje not in njihov položaj na različnih lestvicah. " +
            "Klikni gumb naprej in si v meniju izberi note, lestvico in predznake", style2);
        navodila.anchor.set(0.5, 0.8);
        navodila.alpha = 1;

        naprejGumb = game.add.button(game.world.centerX, 400, 'naprej', zacniAkcija, this, 2, 1, 0);
        naprejGumb.anchor.set(0.5, 0);
        //naprejGumb.onInputOver.add(over, this);
        //naprejGumb.onInputOut.add(out, this);
        //naprejGumb.onInputUp.add(up, this);

        navbar = new Phaser.Rectangle(0, 0, 800, 30);
    }

    function zacniAkcija () {


        game.debug.geom(navbar,'#232323');

        naprejGumb.kill();
        naslov.kill();
        navodila.kill();
        game.stage.backgroundColor = '#ffffff';

        crte = game.add.sprite(game.world.centerX, game.world.top, 'crte');
        crte.anchor.setTo(0.5, 0);

        nextNote();

        cGumb = game.add.button(75, 450, 'c', checkIfCorrect, this, 2, 1, 0);
        dGumb = game.add.button(175, 450, 'd', checkIfCorrect, this, 2, 1, 0);
        eGumb = game.add.button(275, 450, 'e', checkIfCorrect, this, 2, 1, 0);
        fGumb = game.add.button(375, 450, 'f', checkIfCorrect, this, 2, 1, 0);
        gGumb = game.add.button(475, 450, 'g', checkIfCorrect, this, 2, 1, 0);
        aGumb = game.add.button(575, 450, 'a', checkIfCorrect, this, 2, 1, 0);
        hGumb = game.add.button(675, 450, 'h', checkIfCorrect, this, 2, 1, 0);

        var style = { font: "40px Arial", fill: "#000000", align: "center" };
        besediloUspeh = game.add.text(550, game.world.centerY, "Uspeh: " + uspehOds.toFixed(0) + "%", style);
        besediloUspeh.alpha = 1;
    }

    function checkIfCorrect(y) {
        var selectedNote = y._frame.name.substring(y._frame.name.length-5, y._frame.name.length-4);
        counter++;
        console.log('to je y', selectedNote, ', counter', counter);


        if(correctNote === selectedNote) {
            console.log('pravilno');
            trenutniRez = game.add.image(game.world.centerX, game.world.centerY, 'pravilno');
            pravilni++;
        }
        else {
            console.log('narobe');
            trenutniRez = game.add.image(game.world.centerX, game.world.centerY, 'narobe');
            var style3 = { font: "40px Arial", fill: "#000000", align: "center" };

            narobe = game.add.text(game.world.left, game.world.centerY, 'Pravilna: ' + correctNote, style3);
            narobe.alpha = 1;
            game.add.tween(narobe).to( { alpha: 0 }, 1000, "Linear", true);

            pravilna = game.add.text(500, yPositions[correctNoteNumber]-8, correctNote, style3);
            pravilna.alpha = 1;
            game.add.tween(pravilna).to( { alpha: 0 }, 1000, "Linear", true);

            napacni++;
        }

        uspeh = pravilni / counter;
        uspehOds = uspeh*100;
        console.log('uspeh', uspeh, ', pravilni', pravilni);

        besediloUspeh.kill();
        var style = { font: "40px Arial", fill: "#000000", align: "center" };
        besediloUspeh = game.add.text(550, game.world.centerY, "Uspeh: " + uspehOds.toFixed(0) + "%", style);

        trenutniRez.alpha = 1;
        game.add.tween(trenutniRez).to( { alpha: 0 }, 1000, "Linear", true);

        game.add.tween(nota).to( { alpha: 0 }, 500, "Linear", true);

        var timer = game.time.create(false);
        timer.add(350, nextNote, this);
        timer.start();

        //nextNote();
    }

    function nextNote() {
        console.log('next');

        var nextN = Math.round(Math.random()*(6)); // namesto 7 stevilo not

        if(nota !== null) {
            nota.kill();
        }

        //(spodnji) 0 = C, 1 = D, 2 = E, 3 = F, 4 = G, 5 = A, 6 = H
        if(nextN === 0) {
            nota = game.add.image(game.world.centerX, 230, 'nota0'); // c spodnji
            correctNote = 'c';
            correctNoteNumber = 0;
        }
        if(nextN === 1){
            nota = game.add.image(game.world.centerX, 216, 'nota1'); // d spodnji
            correctNote = 'd';
            correctNoteNumber = 1;
        }
        if(nextN === 2){
            nota = game.add.image(game.world.centerX, 198, 'nota1'); // e spodnji
            correctNote = 'e';
            correctNoteNumber = 2;
        }
        if(nextN === 3){
            nota = game.add.image(game.world.centerX, 180, 'nota1'); // f spodnji
            correctNote = 'f';
            correctNoteNumber = 3;
        }
        if(nextN === 4){
            nota = game.add.image(game.world.centerX, 162, 'nota1'); // g spodnji
            correctNote = 'g';
            correctNoteNumber = 4;
        }
        if(nextN === 5){
            nota = game.add.image(game.world.centerX, 144, 'nota1'); // a spodnji
            correctNote = 'a';
            correctNoteNumber = 5;
        }
        if(nextN === 6){
            nota = game.add.image(game.world.centerX, 126, 'nota1'); // h spodnji
            correctNote = 'h';
            correctNoteNumber = 6;
        }

        nota.alpha = 0;
        game.add.tween(nota).to( { alpha: 1 }, 500, "Linear", true);

        //nota = game.add.image(game.world.centerX, 126, 'nota1'); // TEST
        console.log(nextN);
    }

};
