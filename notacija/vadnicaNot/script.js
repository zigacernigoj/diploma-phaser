window.onload = function () {

    // "100vw", "100vh" --> v htmlju padding, margin na 0
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create});

    var loadingText;

    var baseURL = 'https://zigacernigoj.github.io/diploma-assets/';

    //localStorage.setItem('mode', 'student');
    //var mode = localStorage.getItem('mode');
    store.set('mode', 'student');
    var mode = store.get('mode');

    var crte = null;
    var nota = null;

    var correctNote = null;
    var correctNoteNumber = null;
    var trenutniRez = null;

    var zacniBtn, naprejBtn, nazajBtn, nadaljujBtn, koncajBtn, zbirkaBtn;

    var cBtn, dBtn, eBtn, fBtn, gBtn, aBtn, hBtn;
    var cisBtn, disBtn, eisBtn, fisBtn, gisBtn, aisBtn, hisBtn;
    var cesBtn, desBtn, esBtn, fesBtn, gesBtn, asBtn, hesBtn;

    var yPositions = [230, 216, 198, 180, 162, 144, 126];
    var navbarHeight = 30;

    var paddingLeft = 50;
    var paddingLeftSmall = 10;

    var naslovText = null;
    var navodilaText = null;

    var nastavitveText = null;
    var noteSelectText = null;
    var kljucSelectText = null;

    var cOption, dOption, eOption, fOption, gOption, aOption, hOption;
    var violinskiOption, basovskiOption;

    var gameNameText = null;
    var uspehText = null;

    var preostaliPrimeriText = null;
    var preostaliCasText = null;

    var playBtn = null;
    var pauseBtn = null;

    //var besediloUspeh = null;
    var narobe = null;
    var pravilna = null;

    var counter = 0;
    var pravilni = 0;
    var napacni = 0;
    var uspeh = 0;
    var uspehOds = 0;

    var navbar = null;

    var pauseText = null;

    var pauseMenuBg;

    var narobeSound;


    function preload() {

        loadingText = game.add.text(game.world.centerX, game.world.centerY, 'Igra se nalaga.', {fill: '#ffffff'});
        loadingText.anchor.set(0.5, 0.5);
        game.load.onLoadStart.add(loadingScreen, this);

        game.load.crossOrigin = 'anonymous';


        game.load.spritesheet( 'checkbox', 'checkbox.png', 12, 12 );

        loadNoteImgs();
        loadPravilnostImgs();
        loadBtns();
        loadNoteBtns();

        loadSounds();
    }

    function loadBtns() {
        game.load.image('zacni', baseURL + mode + '/btn/zacniBtn.png');
        game.load.image('naprej', baseURL + mode + '/btn/naprejTextBtn.png');
        game.load.image('nazaj', baseURL + mode + '/btn/nazajTextBtn.png');

        game.load.image('nadaljuj', baseURL + mode + '/btn/nadaljujBtn.png');
        game.load.image('koncaj', baseURL + mode + '/btn/koncajBtn.png');

        game.load.image('pause', baseURL + mode + '/btn/navbar/pauseWhiteBtn.png');
        game.load.image('play', baseURL + mode + '/btn/navbar/playWhiteBtn.png');
    }

    function loadNoteImgs() {
        game.load.image('crte', baseURL + mode + '/notacija/crtovje.png');
        game.load.image('nota0', baseURL + mode + '/notacija/celinkaCrta.png');
        game.load.image('nota1', baseURL + mode + '/notacija/celinka.png');
    }

    function loadPravilnostImgs() {
        game.load.image('pravilno', baseURL + mode + '/pravilnost/pravilno.png');
        game.load.image('narobe', baseURL + mode + '/pravilnost/narobe.png');
    }

    function loadNoteBtns() {
        game.load.image('c', baseURL + mode + '/btn/note/cBtn.png');
        game.load.image('d', baseURL + mode + '/btn/note/dBtn.png');
        game.load.image('e', baseURL + mode + '/btn/note/eBtn.png');
        game.load.image('f', baseURL + mode + '/btn/note/fBtn.png');
        game.load.image('g', baseURL + mode + '/btn/note/gBtn.png');
        game.load.image('a', baseURL + mode + '/btn/note/aBtn.png');
        game.load.image('h', baseURL + mode + '/btn/note/hBtn.png');

        game.load.image('cis', baseURL + mode + '/btn/note/cisBtn.png');
        game.load.image('dis', baseURL + mode + '/btn/note/disBtn.png');
        game.load.image('eis', baseURL + mode + '/btn/note/eisBtn.png');
        game.load.image('fis', baseURL + mode + '/btn/note/fisBtn.png');
        game.load.image('gis', baseURL + mode + '/btn/note/gisBtn.png');
        game.load.image('ais', baseURL + mode + '/btn/note/aisBtn.png');
        game.load.image('his', baseURL + mode + '/btn/note/hisBtn.png');

        game.load.image('ces', baseURL + mode + '/btn/note/cesBtn.png');
        game.load.image('des', baseURL + mode + '/btn/note/desBtn.png');
        game.load.image('es', baseURL + mode + '/btn/note/esBtn.png');
        game.load.image('fes', baseURL + mode + '/btn/note/fesBtn.png');
        game.load.image('ges', baseURL + mode + '/btn/note/gesBtn.png');
        game.load.image('as', baseURL + mode + '/btn/note/asBtn.png');
        game.load.image('hes', baseURL + mode + '/btn/note/hesBtn.png');
    }

    function loadSounds() {
        game.load.audio('narobeSoundSrc', baseURL + '/sounds/narobe.mp3');
    }

    function loadingScreen() {
        loadingText.setText("Igra se nalaga.");
    }

    function create() {
        loadingText.kill();

        game.stage.backgroundColor = '#82aed6';

        var style1 = {font: "65px Arial", fill: "#000000", align: "center"};
        naslovText = game.add.text(game.world.centerX, game.world.top, "Vadnica not", style1);
        naslovText.anchor.set(0.5, -0.5);
        naslovText.alpha = 1;

        var style2 = {
            font: "25px Arial",
            fill: "#000000",
            align: "center",
            wordWrap: true,
            wordWrapWidth: game.world.width - 50
        };
        navodilaText = game.add.text(game.world.centerX, game.world.centerY, "Vadnica not ti bo pomagala izpiliti poznavanje not in njihov položaj na različnih lestvicah. " +
            "Klikni gumb Naprej in si v meniju izberi note, lestvico in predznake.", style2);
        navodilaText.anchor.set(0.5, 0.8);
        navodilaText.alpha = 1;
        navodilaText.addFontWeight('bold', 105);
        navodilaText.addFontWeight('normal', 111);

        naprejBtn = game.add.button(800, 600, 'naprej', makeSettings, this, 2, 1, 0);
        naprejBtn.anchor.set(1, 1);

        nazajBtn = game.add.button(0, 600, 'nazaj', gotoMain, this, 2, 1, 0);
        nazajBtn.anchor.set(0, 1);

        //naprejBtn.onInputOver.add(over, this);
        //naprejBtn.onInputOut.add(out, this);
        //naprejBtn.onInputUp.add(up, this);


        narobeSound = game.add.audio('narobeSoundSrc');
        //game.sound.setDecodedCallback(narobeSound, zacniAkcija, this); // preskoci na igro brez pritiska na gumb
    }

    function createNavbar() {
        var drawnObject;
        var width = 800; // example;
        var height = navbarHeight; // example;
        var bmd = game.add.bitmapData(width, height);

        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = '#363636';
        bmd.ctx.fill();
        drawnObject = game.add.sprite(0, 0, bmd);
        //drawnObject.anchor.setTo(0.5, 0.5);

        var style3 = {
            font: "25px Arial",
            fill: "#ffffff",
            align: "center",
            wordWrap: true,
            wordWrapWidth: game.world.width - 50
        };
        gameNameText = game.add.text(paddingLeftSmall, game.world.top, "Vadnica not", style3);

        uspehText = game.add.text(600, game.world.top, "Uspeh: " + uspehOds.toFixed(0) + "%", style3);
        //uspehText.anchor.setTo(1, 0);

        preostaliPrimeriText = game.add.text(230, game.world.top, "Primeri: ∞", style3);
        preostaliCasText = game.add.text(440, game.world.top, "Čas: ∞", style3);

        pauseBtn = game.add.button(778, 6, 'pause', pause1, this, 2, 1, 0);
        pauseBtn.scale.setTo(1.5, 1.5);
        pauseBtn.frame = game.paused;
    }


    function unPause() {
        if (game.paused) {
            game.paused = false;
            pauseText.kill();
            pauseMenuBg.kill();
            nadaljujBtn.kill();
            koncajBtn.kill();
        }
    }

    function pause1() {
        console.log("pavza");
        game.paused = true;


        var width = 800; // example;
        var height = 600 - navbarHeight; // example;
        var bmd = game.add.bitmapData(width, height);

        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = '#ffffff';
        bmd.ctx.fill();
        pauseMenuBg = game.add.sprite(0, navbarHeight, bmd);
        //drawnObject.anchor.setTo(0.5, 0.5);

        pauseText = game.add.text(
            game.world.centerX,
            game.world.centerY,
            'Click outside menu to continue',
            {
                font: '30px Arial',
                fill: '#000000'
            }
        );
        pauseText.anchor.setTo(0.5, 0.5);

        //game.input.onDown.add(unPause, self);

        nadaljujBtn = game.add.button(800, 600, 'nadaljuj', unPause, this, 2, 1, 0);
        nadaljujBtn.anchor.set(1, 1);

        koncajBtn = game.add.button(0, 600, 'koncaj', gotoMain, this, 2, 1, 0);
        koncajBtn.anchor.set(0, 1);

    }

    function gotoMain() {
        window.location.href = 'https://www.google.si';
    }

    function destroyStartScreen() {
        naprejBtn.kill();
        nazajBtn.kill();
        naslovText.kill();
        navodilaText.kill();
        game.stage.backgroundColor = '#ffffff';
    }

    function zacniAkcija() {

        //destroyStartScreen();
        destroySettings();
        console.log(cOption);

        createNavbar();

        crte = game.add.sprite(game.world.centerX, game.world.top, 'crte');
        crte.anchor.setTo(0.5, 0);

        nextNote();

        placeNoteBtns();


        //var style = {font: "40px Arial", fill: "#000000", align: "center"};
        //besediloUspeh = game.add.text(550, game.world.centerY, "Uspeh: " + uspehOds.toFixed(0) + "%", style);
        //besediloUspeh.alpha = 1;
    }


    function placeNoteBtns() {
        cBtn = game.add.button(75, 450, 'c', checkIfCorrect, this, 2, 1, 0);
        dBtn = game.add.button(175, 450, 'd', checkIfCorrect, this, 2, 1, 0);
        eBtn = game.add.button(275, 450, 'e', checkIfCorrect, this, 2, 1, 0);
        fBtn = game.add.button(375, 450, 'f', checkIfCorrect, this, 2, 1, 0);
        gBtn = game.add.button(475, 450, 'g', checkIfCorrect, this, 2, 1, 0);
        aBtn = game.add.button(575, 450, 'a', checkIfCorrect, this, 2, 1, 0);
        hBtn = game.add.button(675, 450, 'h', checkIfCorrect, this, 2, 1, 0);

        cisBtn = game.add.button(75, 400, 'cis', checkIfCorrect, this, 2, 1, 0);
        disBtn = game.add.button(175, 400, 'dis', checkIfCorrect, this, 2, 1, 0);
        eisBtn = game.add.button(275, 400, 'eis', checkIfCorrect, this, 2, 1, 0);
        fisBtn = game.add.button(375, 400, 'fis', checkIfCorrect, this, 2, 1, 0);
        gisBtn = game.add.button(475, 400, 'gis', checkIfCorrect, this, 2, 1, 0);
        aisBtn = game.add.button(575, 400, 'ais', checkIfCorrect, this, 2, 1, 0);
        hisBtn = game.add.button(675, 400, 'his', checkIfCorrect, this, 2, 1, 0);

        cesBtn = game.add.button(75, 500, 'ces', checkIfCorrect, this, 2, 1, 0);
        desBtn = game.add.button(175, 500, 'des', checkIfCorrect, this, 2, 1, 0);
        esBtn = game.add.button(275, 500, 'es', checkIfCorrect, this, 2, 1, 0);
        fesBtn = game.add.button(375, 500, 'fes', checkIfCorrect, this, 2, 1, 0);
        gesBtn = game.add.button(475, 500, 'ges', checkIfCorrect, this, 2, 1, 0);
        asBtn = game.add.button(575, 500, 'as', checkIfCorrect, this, 2, 1, 0);
        hesBtn = game.add.button(675, 500, 'hes', checkIfCorrect, this, 2, 1, 0);
    }


    function checkIfCorrect(y) {
        var selectedNote = y._frame.name.substring(y._frame.name.length - 8, y._frame.name.length - 7);
        counter++;
        //console.log(y._frame.name);
        //console.log('to je y', selectedNote, ', counter', counter);

        if (correctNote === selectedNote) {
            console.log('pravilno');
            trenutniRez = game.add.image(game.world.centerX, game.world.centerY, 'pravilno');
            pravilni++;
        }
        else {

            narobeSound.play();

            console.log('narobe');
            trenutniRez = game.add.image(game.world.centerX, game.world.centerY, 'narobe');
            var style3 = {font: "40px Arial", fill: "#000000", align: "center"};

            narobe = game.add.text(game.world.left, game.world.centerY, 'Pravilna: ' + correctNote, style3);
            narobe.alpha = 1;
            game.add.tween(narobe).to({alpha: 0}, 1000, "Linear", true);

            pravilna = game.add.text(500, yPositions[correctNoteNumber] - 8, correctNote, style3);
            pravilna.alpha = 1;
            game.add.tween(pravilna).to({alpha: 0}, 1000, "Linear", true);

            napacni++;
        }

        uspeh = pravilni / counter;
        uspehOds = uspeh * 100;
        console.log('uspeh', uspeh, ', pravilni', pravilni);

        //besediloUspeh.setText("Uspeh: " + uspehOds.toFixed(0) + "%");

        uspehText.setText("Uspeh: " + uspehOds.toFixed(0) + "%");
        preostaliPrimeriText.setText("Primeri: ∞");

        trenutniRez.alpha = 1;
        game.add.tween(trenutniRez).to({alpha: 0}, 1000, "Linear", true);

        game.add.tween(nota).to({alpha: 0}, 500, "Linear", true);

        var timer = game.time.create(false);
        timer.add(350, nextNote, this);
        timer.start();

        //nextNote();
    }

    function nextNote() {
        console.log('next');

        var nextN = Math.round(Math.random() * (6)); // namesto 7 stevilo not


        console.log(nextN === 0 && cOption.state === true);
        console.log(nextN === 1 && dOption.state === true);
        console.log(nextN === 2 && eOption.state === true);
        console.log(nextN === 3 && fOption.state === true);
        console.log(nextN === 4 && gOption.state === true);
        console.log(nextN === 5 && aOption.state === true);
        console.log(nextN === 6 && hOption.state === true);

        if (nota !== null) {
            nota.kill();
        }

        //(spodnji) 0 = C, 1 = D, 2 = E, 3 = F, 4 = G, 5 = A, 6 = H
        if (nextN === 0 && cOption.state === true) {
            nota = game.add.image(game.world.centerX, yPositions[0], 'nota0'); // c spodnji
            correctNote = 'c';
            correctNoteNumber = 0;
        }
        else if (nextN === 1 && dOption.state === true) {
            nota = game.add.image(game.world.centerX, yPositions[1], 'nota1'); // d spodnji
            correctNote = 'd';
            correctNoteNumber = 1;
        }
        else if (nextN === 2 && eOption.state === true) {
            nota = game.add.image(game.world.centerX, yPositions[2], 'nota1'); // e spodnji
            correctNote = 'e';
            correctNoteNumber = 2;
        }
        else if (nextN === 3 && fOption.state === true) {
            nota = game.add.image(game.world.centerX, yPositions[3], 'nota1'); // f spodnji
            correctNote = 'f';
            correctNoteNumber = 3;
        }
        else if (nextN === 4 && gOption.state === true) {
            nota = game.add.image(game.world.centerX, yPositions[4], 'nota1'); // g spodnji
            correctNote = 'g';
            correctNoteNumber = 4;
        }
        else if (nextN === 5 && aOption.state === true) {
            nota = game.add.image(game.world.centerX, yPositions[5], 'nota1'); // a spodnji
            correctNote = 'a';
            correctNoteNumber = 5;
        }
        else if (nextN === 6 && hOption.state === true) {
            nota = game.add.image(game.world.centerX, yPositions[6], 'nota1'); // h spodnji
            correctNote = 'h';
            correctNoteNumber = 6;
        }
        else {
            nextNote();
        }

        nota.alpha = 0;
        game.add.tween(nota).to({alpha: 1}, 500, "Linear", true);

        //nota = game.add.image(game.world.centerX, 126, 'nota1'); // TEST
        console.log(nextN);
    }

    function setMode(newMode) {
        //localStorage.setItem('mode', newMode);
        //mode = localStorage.getItem('mode');
        store.set('mode', newMode);
        var mode = store.get('mode');
    }


    function makeSettings() {

        destroyStartScreen();

        // barva gumbov #3D85C6

        var style1 = {font: "40px Arial", fill: "#000000", align: "center"};
        nastavitveText = game.add.text(game.world.centerX, game.world.top, "Nastavitve", style1);
        nastavitveText.anchor.set(0.5, -0.5);


        var style2 = {font: "30px Arial", fill: "#000000", align: "center"};
        noteSelectText = game.add.text(50, 80, "Izberi note", style2);

        cOption = game.add.checkbox(50, 125, {text: 'C', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        cOption.inputEnabled = true;
        cOption.events.onInputUp.add(checkSelected, this);

        dOption = game.add.checkbox(50, 155, {text: 'D', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        dOption.inputEnabled = true;
        dOption.events.onInputUp.add(checkSelected, this);

        eOption = game.add.checkbox(50, 185, {text: 'E', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        eOption.inputEnabled = true;
        eOption.events.onInputUp.add(checkSelected, this);

        fOption = game.add.checkbox(50, 215, {text: 'F', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        fOption.inputEnabled = true;
        fOption.events.onInputUp.add(checkSelected, this);

        gOption = game.add.checkbox(50, 245, {text: 'G', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        gOption.inputEnabled = true;
        gOption.events.onInputUp.add(checkSelected, this);

        aOption = game.add.checkbox(50, 275, {text: 'A', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        aOption.inputEnabled = true;
        aOption.events.onInputUp.add(checkSelected, this);

        hOption = game.add.checkbox(50, 305, {text: 'H', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        hOption.inputEnabled = true;
        hOption.events.onInputUp.add(checkSelected, this);

        kljucSelectText = game.add.text(250, 80, "Izberi ključe", style2);

        violinskiOption = game.add.checkbox(250, 125, {text: 'violinski', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -7);
        violinskiOption.enabled = false;
        basovskiOption = game.add.checkbox(250, 155, {text: 'basovski', style: {fill: '#000000', fontSize: 20}}, 'checkbox', undefined, -7);
        basovskiOption.enabled = false;

        naprejBtn = game.add.button(800, 600, 'naprej', proceed, this, 2, 1, 0);
        naprejBtn.anchor.set(1, 1);
        console.log(naprejBtn);


        nazajBtn = game.add.button(0, 600, 'nazaj', gotoMain, this, 2, 1, 0);
        nazajBtn.anchor.set(0, 1);
    }

    var neIzbrani = null;

    function checkSelected() {
        console.log("testing");
        if(neIzbrani !== null) {
            neIzbrani.kill();
        }

        var x = 0;

        if(cOption.state === false){
            x++;
        }
        if(dOption.state === false){
            x++;
        }
        if(eOption.state === false){
            x++;
        }
        if(fOption.state === false){
            x++;
        }
        if(gOption.state === false){
            x++;
        }
        if(aOption.state === false){
            x++;
        }
        if(hOption.state === false){
            x++;
        }

        if(x > 5) {
            var style = {font: "30px Arial", fill: "#ff0000", align: "center"};
            neIzbrani = game.add.text(game.world.centerX, 600, "Izberi vsaj 2 noti", style);
            neIzbrani.anchor.set(0.5, 1);

            return false;
        }
        else {
            if(neIzbrani !== null) {
                neIzbrani.kill();
            }
            return true;
        }
    }

    function proceed() {
        if(checkSelected() === true) {
            zacniAkcija();
        }
    }

    function destroySettings() {

        nastavitveText.kill();
        noteSelectText.kill();
        kljucSelectText.kill();

        cOption.kill();
        dOption.kill();
        eOption.kill();
        fOption.kill();
        gOption.kill();
        aOption.kill();
        hOption.kill();

        violinskiOption.kill();
        basovskiOption.kill();

        naprejBtn.kill();
        nazajBtn.kill();
    }


};
