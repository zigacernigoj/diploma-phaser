window.onload = function () {

    // "100vw", "100vh" --> v htmlju padding, margin na 0
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create});

    var loadingText;

    var baseURL = 'https://zigacernigoj.github.io/diploma-assets/';

    //localStorage.setItem('mode', 'student');
    //var mode = localStorage.getItem('mode');
    store.set('mode', 'student');
    var mode = store.get('mode');

    var crtovje = null;
    var prikazanaNota = null;

    var correctNote = null;
    var correctNoteNumber = null;
    var trenutniRez = null;

    var zacniBtn, naprejBtn, nazajBtn, nadaljujBtn, koncajBtn, zbirkaBtn;

    var cBtn, dBtn, eBtn, fBtn, gBtn, aBtn, hBtn;
    var cisBtn, disBtn, eisBtn, fisBtn, gisBtn, aisBtn, hisBtn;
    var cesBtn, desBtn, esBtn, fesBtn, gesBtn, asBtn, hesBtn;

    var yPositions = [263, 245, 227, 209, 191, 173, 155, 137, 119, 101, 83, 65, 47,
        227, 209, 191, 173, 155, 137, 119, 101, 83, 65, 47, 29, 11,
        209, 191, 173, 155, 137, 119, 101, 83, 65, 47, 29, 11, -7]; // 18px narazen

    var yViolinski = ['c', 'd', 'e', 'f', 'g', 'a', 'h', 'c', 'd', 'e', 'f', 'g', 'a',
        'cis', 'dis', 'eis', 'fis', 'gis', 'ais', 'his', 'cis', 'dis', 'eis', 'fis', 'gis', 'ais',
        'ces', 'des', 'es', 'fes', 'ges', 'as', 'hes', 'ces', 'des', 'es', 'fes', 'ges', 'as'];

    var yBasovski = ['e', 'f', 'g', 'a', 'h', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'c',
        'eis', 'fis', 'gis', 'ais', 'his', 'cis', 'dis', 'eis', 'fis', 'gis', 'ais', 'his', 'cis',
        'es', 'fes', 'ges', 'as', 'hes', 'ces', 'des', 'es', 'fes', 'ges', 'as', 'hes', 'ces'];

    var yAltovski = ['d', 'e', 'f', 'g', 'a', 'h', 'c', 'd', 'e', 'f', 'g', 'a', 'h',
        'dis', 'eis', 'fis', 'gis', 'ais', 'his', 'cis', 'dis', 'eis', 'fis', 'gis', 'ais', 'his',
        'des', 'es', 'fes', 'ges', 'as', 'hes', 'ces', 'des', 'es', 'fes', 'ges', 'as', 'hes'];


    var ySopranski = ['a', 'h', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'c', 'd', 'e', 'f',
        'ais', 'his', 'cis', 'dis', 'eis', 'fis', 'gis', 'ais', 'his', 'cis', 'dis', 'eis', 'fis',
        'as', 'hes', 'ces', 'des', 'es', 'fes', 'ges', 'as', 'hes', 'ces', 'des', 'es', 'fes'];


    var yTenorski = ['h', 'c', 'd', 'e', 'f', 'g', 'a', 'h', 'c', 'd', 'e', 'f', 'g',
        'his', 'cis', 'dis', 'eis', 'fis', 'gis', 'ais', 'his', 'cis', 'dis', 'eis', 'fis', 'gis',
        'hes', 'ces', 'des', 'es', 'fes', 'ges', 'as', 'hes', 'ces', 'des', 'es', 'fes', 'ges'];

    var notaCrtaBrez = ['notaCrta', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaCrta',
        'visajCrta', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajCrta',
        'nizajCrta', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajCrta'];

    var koncneNote = [];
    var izbraniKljuc;


    var navbarHeight = 30;

    var paddingLeft = 50;
    var paddingLeftSmall = 10;

    var naslovText = null;
    var navodilaText = null;

    var nastavitveText = null;
    var noteSelectText = null;
    var kljucSelectText = null;

    var cOption, dOption, eOption, fOption, gOption, aOption, hOption,
        cisOption, disOption, eisOption, fisOption, gisOption, aisOption, hisOption,
        cesOption, desOption, esOption, fesOption, gesOption, asOption, hesOption;

    var violinskiOption, basovskiOption, altovskiOption, sopranskiOption, tenorskiOption;

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

    var finalResults, resultText;

    var neomejenoOption, counterOption, timeOption;

    var limitCounter = -1;
    var limitCounterText;
    var limitTime = -1;
    var limitTimeText;
    var timeCounter;
    var updateTimer;

    var plusBtn, minusBtn;

    var limitText;

    var navbar = null;
    var navbarBackground;

    var pauseText = null;
    var pauseMenuBg;
    var narobeSound;

    function preload() {

        loadingText = game.add.text(game.world.centerX, game.world.centerY, 'Igra se nalaga.', {fill: '#ffffff'});
        loadingText.anchor.set(0.5, 0.5);
        game.load.onLoadStart.add(loadingScreen, this);

        game.load.crossOrigin = 'anonymous';


        game.load.spritesheet('checkbox', 'checkbox.png', 12, 12);
        game.load.spritesheet('radiobutton', 'radiobutton.png', 12, 12);

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

        game.load.image('plus', baseURL + mode + '/btn/plusBtn.png');
        game.load.image('minus', baseURL + mode + '/btn/minusBtn.png');
    }

    function loadNoteImgs() {

        game.load.image('violinski', baseURL + mode + '/notacija/kljuci/treble.png');   // treble = violinski
        game.load.image('basovski', baseURL + mode + '/notacija/kljuci/bass.png');      // bass = bas
        game.load.image('altovski', baseURL + mode + '/notacija/kljuci/alto.png');      // alto = alt
        game.load.image('sopranski', baseURL + mode + '/notacija/kljuci/soprano.png');  // soprano = sopran
        game.load.image('tenorski', baseURL + mode + '/notacija/kljuci/tenor.png');     // tenor = tenor

        game.load.image('notaCrta', baseURL + mode + '/notacija/celinkaCrta.png');
        game.load.image('notaBrez', baseURL + mode + '/notacija/celinka.png');

        game.load.image('visajCrta', baseURL + mode + '/notacija/visajCelinkaCrta.png');
        game.load.image('visajBrez', baseURL + mode + '/notacija/visajCelinkaBrez.png');

        game.load.image('nizajCrta', baseURL + mode + '/notacija/nizajCelinkaCrta.png');
        game.load.image('nizajBrez', baseURL + mode + '/notacija/nizajCelinkaBrez.png');

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
        destroyNavbar();
        destroyResults();

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
        var width = 800; // example;
        var height = navbarHeight; // example;
        var bmd = game.add.bitmapData(width, height);

        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = '#363636';
        bmd.ctx.fill();
        navbarBackground = game.add.sprite(0, 0, bmd);
        //navbarBackground.anchor.setTo(0.5, 0.5);

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

        if (limitCounter === -1) {
            preostaliPrimeriText = game.add.text(230, game.world.top, "Primeri: ∞", style3);
        }
        else {
            preostaliPrimeriText = game.add.text(230, game.world.top, "Primeri: " + limitCounter, style3);
        }

        if (limitTime === -1) {
            preostaliCasText = game.add.text(400, game.world.top, "Čas: ∞", style3);
        }
        else {
            //preostaliCasText = game.add.text(400, game.world.top, "Čas: " + timeCounter.duration.toFixed(0), style3);
        }


        pauseBtn = game.add.button(778, 6, 'pause', pause1, this, 2, 1, 0);
        pauseBtn.scale.setTo(1.5, 1.5);
        pauseBtn.frame = game.paused;
    }

    function unPause() {
        if (game.paused) {
            game.paused = false;
            pauseText.kill();
            pauseMenuBg.kill();
            //nadaljujBtn.kill();
            //koncajBtn.kill();
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

        game.input.onDown.add(unPause, self);

        //nadaljujBtn = game.add.button(800, 600, 'nadaljuj', unPause, this, 2, 1, 0);
        //nadaljujBtn.anchor.set(1, 1);
        //
        //koncajBtn = game.add.button(0, 600, 'koncaj', gotoMain, this, 2, 1, 0);
        //koncajBtn.anchor.set(0, 1);

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
        createNavbar();
        placeCrtovje();
        prepareNotes();
        nextNote();
        placeNoteBtns();

        if (timeOption.state === true) {
            timeCounter = game.time.create(false);
            timeCounter.add(limitTime * 1000, showResults, this);
            timeCounter.start();

            updateTimer = game.time.create(false);
            updateTimer.loop(100, updateTimeText, this);
            updateTimer.start();
        }

        //var style = {font: "40px Arial", fill: "#000000", align: "center"};
        //besediloUspeh = game.add.text(550, game.world.centerY, "Uspeh: " + uspehOds.toFixed(0) + "%", style);
        //besediloUspeh.alpha = 1;
    }


    function updateTimeText() {
        if (limitTime !== -1) {
            if (preostaliCasText !== null) {
                preostaliCasText.kill();
            }
            var style3 = {
                font: "25px Arial",
                fill: "#ffffff",
                align: "center",
                wordWrap: true,
                wordWrapWidth: game.world.width - 50
            };

            var timeRaw = Math.floor(timeCounter.duration.toFixed(0) / 1000);
            var secRaw = "" + (timeRaw % 60);
            var minRaw = Math.floor(timeRaw / 60);

            var pad = "00";
            var sec = pad.substring(0, pad.length - secRaw.length) + secRaw;

            var timeT = minRaw + ":" + sec;
            preostaliCasText = game.add.text(400, game.world.top, "Čas: " + timeT, style3);
        }
    }


    function placeCrtovje() {

        if (violinskiOption.state === true) {
            crtovje = game.add.sprite(game.world.centerX, game.world.top, 'violinski');
            izbraniKljuc = yViolinski;
        }
        else if (basovskiOption.state === true) {
            crtovje = game.add.sprite(game.world.centerX, game.world.top, 'basovski');
            izbraniKljuc = yBasovski;
        }
        else if (altovskiOption.state === true) {
            crtovje = game.add.sprite(game.world.centerX, game.world.top, 'altovski');
            izbraniKljuc = yAltovski;
        }
        else if (sopranskiOption.state === true) {
            crtovje = game.add.sprite(game.world.centerX, game.world.top, 'sopranski');
            izbraniKljuc = ySopranski;
        }
        else if (tenorskiOption.state === true) {
            crtovje = game.add.sprite(game.world.centerX, game.world.top, 'tenorski');
            izbraniKljuc = yTenorski;
        }

        crtovje.anchor.setTo(0.5, 0.1);
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


    function checkIfCorrect(selectedButton) {
        counter++;

        if (prikazanaNota.name === selectedButton.key) {
            //console.log('pravilno');
            trenutniRez = game.add.image(600, 280, 'pravilno');
            pravilni++;
        }
        else {
            narobeSound.play();
            //console.log('narobe');
            trenutniRez = game.add.image(600, 280, 'narobe');
            var style3 = {font: "40px Arial", fill: "#000000", align: "center"};

            narobe = game.add.text(73, 320, 'Pravilna: ' + correctNote, style3);
            narobe.alpha = 1;
            game.add.tween(narobe).to({alpha: 0}, 1000, "Linear", true);

            //pravilna = game.add.text(500, correctNoteNumber, correctNote, style3);
            //pravilna.alpha = 1;
            //game.add.tween(pravilna).to({alpha: 0}, 1000, "Linear", true);

            napacni++;
        }

        uspeh = pravilni / counter;
        uspehOds = uspeh * 100;
        //console.log('uspeh', uspeh, ', pravilni', pravilni);

        //besediloUspeh.setText("Uspeh: " + uspehOds.toFixed(0) + "%");

        uspehText.setText("Uspeh: " + uspehOds.toFixed(0) + "%");
        if (limitCounter === -1) {
            preostaliPrimeriText.setText("Primeri: ∞");
        }
        else {
            limitCounter--;
            preostaliPrimeriText.setText("Primeri: " + limitCounter);
            // ko je limitCounter === 0, prekini
        }


        trenutniRez.alpha = 1;
        game.add.tween(trenutniRez).to({alpha: 0}, 1000, "Linear", true);

        game.add.tween(prikazanaNota).to({alpha: 0}, 500, "Linear", true);

        if (limitCounter === 0) {

            var timer1 = game.time.create(false);
            timer1.add(1000, showResults, this);
            timer1.start();
            console.log('konec');
        }
        else {
            var timer = game.time.create(false);
            timer.add(350, nextNote, this);
            timer.start();
        }

        //nextNote();
    }

    function prepareNotes() {

        //if(violinskiOption.state === true){
        //    izbraniKljuc = yViolinski;
        //}
        //else if(basovskiOption.state === true){
        //    izbraniKljuc = yBasovski;
        //}
        //else if(altovskiOption.state === true){
        //    izbraniKljuc = yAltovski;
        //}
        //else if(sopranskiOption.state === true){
        //    izbraniKljuc = ySopranski;
        //}
        //else if(tenorskiOption.state === true){
        //    izbraniKljuc = yTenorski;
        //}

        for (var i in izbraniKljuc) {
            if (cOption.state === true && izbraniKljuc[i] === 'c') {
                koncneNote.push(i);
            }
            else if (dOption.state === true && izbraniKljuc[i] === 'd') {
                koncneNote.push(i);
            }
            else if (eOption.state === true && izbraniKljuc[i] === 'e') {
                koncneNote.push(i);
            }
            else if (fOption.state === true && izbraniKljuc[i] === 'f') {
                koncneNote.push(i);
            }
            else if (gOption.state === true && izbraniKljuc[i] === 'g') {
                koncneNote.push(i);
            }
            else if (aOption.state === true && izbraniKljuc[i] === 'a') {
                koncneNote.push(i);
            }
            else if (hOption.state === true && izbraniKljuc[i] === 'h') {
                koncneNote.push(i);
            }

            else if (cisOption.state === true && izbraniKljuc[i] === 'cis') {
                koncneNote.push(i);
            }
            else if (disOption.state === true && izbraniKljuc[i] === 'dis') {
                koncneNote.push(i);
            }
            else if (eisOption.state === true && izbraniKljuc[i] === 'eis') {
                koncneNote.push(i);
            }
            else if (fisOption.state === true && izbraniKljuc[i] === 'fis') {
                koncneNote.push(i);
            }
            else if (gisOption.state === true && izbraniKljuc[i] === 'gis') {
                koncneNote.push(i);
            }
            else if (aisOption.state === true && izbraniKljuc[i] === 'ais') {
                koncneNote.push(i);
            }
            else if (hisOption.state === true && izbraniKljuc[i] === 'his') {
                koncneNote.push(i);
            }


            else if (cesOption.state === true && izbraniKljuc[i] === 'ces') {
                koncneNote.push(i);
            }
            else if (desOption.state === true && izbraniKljuc[i] === 'des') {
                koncneNote.push(i);
            }
            else if (esOption.state === true && izbraniKljuc[i] === 'es') {
                koncneNote.push(i);
            }
            else if (fesOption.state === true && izbraniKljuc[i] === 'fes') {
                koncneNote.push(i);
            }
            else if (gesOption.state === true && izbraniKljuc[i] === 'ges') {
                koncneNote.push(i);
            }
            else if (asOption.state === true && izbraniKljuc[i] === 'as') {
                koncneNote.push(i);
            }
            else if (hesOption.state === true && izbraniKljuc[i] === 'hes') {
                koncneNote.push(i);
            }
        }

        //console.log(koncneNote);
        //console.log(izbraniKljuc);
        //console.log(yPositions);
    }

    function nextNote() {

        //console.log('next');
        var nextN = Math.round(Math.random() * (koncneNote.length - 1));
        //console.log(nextN);


        if (prikazanaNota !== null) {
            prikazanaNota.kill();
        }

        //console.log('ypos', yPositions[koncneNote[nextN]]);
        //console.log(notaCrtaBrez[koncneNote[nextN]]);
        //console.log(izbraniKljuc[koncneNote[nextN]]);

        prikazanaNota = game.add.image(game.world.centerX, yPositions[koncneNote[nextN]], notaCrtaBrez[koncneNote[nextN]]);
        prikazanaNota.name = izbraniKljuc[koncneNote[nextN]];
        correctNote = izbraniKljuc[koncneNote[nextN]];
        correctNoteNumber = yPositions[koncneNote[nextN]];

        //console.log('correctNN', correctNoteNumber);

        prikazanaNota.alpha = 0;
        game.add.tween(prikazanaNota).to({alpha: 1}, 500, "Linear", true);
    }

    function setMode(newMode) {
        //localStorage.setItem('mode', newMode);
        //mode = localStorage.getItem('mode');
        store.set('mode', newMode);
        var mode = store.get('mode');
    }

    function makeSettings() {

        destroyStartScreen();
        destroyNavbar();
        destroyResults();

        // barva gumbov #3D85C6

        var style1 = {font: "40px Arial", fill: "#000000", align: "center"};
        nastavitveText = game.add.text(game.world.centerX, game.world.top, "Nastavitve", style1);
        nastavitveText.anchor.set(0.5, -0.5);

        var style2 = {font: "30px Arial", fill: "#000000", align: "center"};
        noteSelectText = game.add.text(50, 80, "Izberi note", style2);

        /* OSNOVNI */
        cOption = game.add.checkbox(50, 125, {text: 'C', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        cOption.inputEnabled = true;
        cOption.events.onInputUp.add(checkIfEnoughSelected, this);

        dOption = game.add.checkbox(50, 155, {text: 'D', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        dOption.inputEnabled = true;
        dOption.events.onInputUp.add(checkIfEnoughSelected, this);

        eOption = game.add.checkbox(50, 185, {text: 'E', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        eOption.inputEnabled = true;
        eOption.events.onInputUp.add(checkIfEnoughSelected, this);

        fOption = game.add.checkbox(50, 215, {text: 'F', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        fOption.inputEnabled = true;
        fOption.events.onInputUp.add(checkIfEnoughSelected, this);

        gOption = game.add.checkbox(50, 245, {text: 'G', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        gOption.inputEnabled = true;
        gOption.events.onInputUp.add(checkIfEnoughSelected, this);

        aOption = game.add.checkbox(50, 275, {text: 'A', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        aOption.inputEnabled = true;
        aOption.events.onInputUp.add(checkIfEnoughSelected, this);

        hOption = game.add.checkbox(50, 305, {text: 'H', style: {fill: '#000000', fontSize: 20}}, 'checkbox', true, -5);
        hOption.inputEnabled = true;
        hOption.events.onInputUp.add(checkIfEnoughSelected, this);
        /* OSNOVNI */

        /* VISAJI */
        cisOption = game.add.checkbox(150, 125, {
            text: 'Cis',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        cisOption.inputEnabled = true;
        cisOption.events.onInputUp.add(checkIfEnoughSelected, this);

        disOption = game.add.checkbox(150, 155, {
            text: 'Dis',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        disOption.inputEnabled = true;
        disOption.events.onInputUp.add(checkIfEnoughSelected, this);

        eisOption = game.add.checkbox(150, 185, {
            text: 'Eis',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        eisOption.inputEnabled = true;
        eisOption.events.onInputUp.add(checkIfEnoughSelected, this);

        fisOption = game.add.checkbox(150, 215, {
            text: 'Fis',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        fisOption.inputEnabled = true;
        fisOption.events.onInputUp.add(checkIfEnoughSelected, this);

        gisOption = game.add.checkbox(150, 245, {
            text: 'Gis',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        gisOption.inputEnabled = true;
        gisOption.events.onInputUp.add(checkIfEnoughSelected, this);

        aisOption = game.add.checkbox(150, 275, {
            text: 'Ais',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        aisOption.inputEnabled = true;
        aisOption.events.onInputUp.add(checkIfEnoughSelected, this);

        hisOption = game.add.checkbox(150, 305, {
            text: 'His',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        hisOption.inputEnabled = true;
        hisOption.events.onInputUp.add(checkIfEnoughSelected, this);
        /* VISAJI */

        /* NIZAJI */
        cesOption = game.add.checkbox(250, 125, {
            text: 'Ces',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        cesOption.inputEnabled = true;
        cesOption.events.onInputUp.add(checkIfEnoughSelected, this);

        desOption = game.add.checkbox(250, 155, {
            text: 'Des',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        desOption.inputEnabled = true;
        desOption.events.onInputUp.add(checkIfEnoughSelected, this);

        esOption = game.add.checkbox(250, 185, {
            text: 'Es',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        esOption.inputEnabled = true;
        esOption.events.onInputUp.add(checkIfEnoughSelected, this);

        fesOption = game.add.checkbox(250, 215, {
            text: 'Fes',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        fesOption.inputEnabled = true;
        fesOption.events.onInputUp.add(checkIfEnoughSelected, this);

        gesOption = game.add.checkbox(250, 245, {
            text: 'Ges',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        gesOption.inputEnabled = true;
        gesOption.events.onInputUp.add(checkIfEnoughSelected, this);

        asOption = game.add.checkbox(250, 275, {
            text: 'As',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        asOption.inputEnabled = true;
        asOption.events.onInputUp.add(checkIfEnoughSelected, this);

        hesOption = game.add.checkbox(250, 305, {
            text: 'Hes',
            style: {fill: '#000000', fontSize: 20}
        }, 'checkbox', false, -5);
        hesOption.inputEnabled = true;
        hesOption.events.onInputUp.add(checkIfEnoughSelected, this);
        /* NIZAJI */

        kljucSelectText = game.add.text(450, 80, "Izberi ključe", style2);

        kljucRadio = game.add.radioGroup('kljucRadio');

        violinskiOption = game.add.radiobutton(450, 125, {
            text: 'violinski',
            style: {fill: '#000000', fontSize: 20}
        }, 'radiobutton', true, -7);
        basovskiOption = game.add.radiobutton(450, 155, {
            text: 'basovski',
            style: {fill: '#000000', fontSize: 20}
        }, 'radiobutton', undefined, -7);
        altovskiOption = game.add.radiobutton(450, 185, {
            text: 'altovski',
            style: {fill: '#000000', fontSize: 20}
        }, 'radiobutton', undefined, -7);
        sopranskiOption = game.add.radiobutton(450, 215, {
            text: 'sopranski',
            style: {fill: '#000000', fontSize: 20}
        }, 'radiobutton', undefined, -7);
        tenorskiOption = game.add.radiobutton(450, 245, {
            text: 'tenorski',
            style: {fill: '#000000', fontSize: 20}
        }, 'radiobutton', undefined, -7);

        kljucRadio.add(violinskiOption);
        kljucRadio.add(basovskiOption);
        kljucRadio.add(altovskiOption);
        kljucRadio.add(sopranskiOption);
        kljucRadio.add(tenorskiOption);

        //for(var i in kljucRadio.children) {
        //console.log(kljucRadio.children[i].name);
        //}

        limitText = game.add.text(50, 350, "Izberi način", style2);


        modeRadio = game.add.radioGroup('modeRadio');

        neomejenoOption = game.add.radiobutton(50, 395, {
            text: 'neomejeno',
            style: {fill: '#000000', fontSize: 20}
        }, 'radiobutton', true, -7);
        neomejenoOption.inputEnabled = true;
        neomejenoOption.events.onInputUp.add(removeLimits, this);

        counterOption = game.add.radiobutton(50, 425, {
            text: 'omeji število primerov',
            style: {fill: '#000000', fontSize: 20}
        }, 'radiobutton', undefined, -7);
        counterOption.inputEnabled = true;
        counterOption.events.onInputUp.add(makeCounterLimit, this);

        timeOption = game.add.radiobutton(50, 455, {
            text: 'omeji čas',
            style: {fill: '#000000', fontSize: 20}
        }, 'radiobutton', undefined, -7);
        timeOption.inputEnabled = true;
        timeOption.events.onInputUp.add(makeTimeLimit, this);

        modeRadio.add(neomejenoOption);
        modeRadio.add(counterOption);
        modeRadio.add(timeOption);


        naprejBtn = game.add.button(800, 600, 'naprej', proceed, this, 2, 1, 0);
        naprejBtn.anchor.set(1, 1);

        nazajBtn = game.add.button(0, 600, 'nazaj', gotoMain, this, 2, 1, 0);
        nazajBtn.anchor.set(0, 1);
    }


    var modeRadio;

    var kljucRadio;
    var neizbraniText = null;

    function checkIfEnoughSelected() {
        //console.log("testing");
        if (neizbraniText !== null) {
            neizbraniText.kill();
        }

        var x = 0;

        if (cOption.state === true) {
            x++;
        }
        if (dOption.state === true) {
            x++;
        }
        if (eOption.state === true) {
            x++;
        }
        if (fOption.state === true) {
            x++;
        }
        if (gOption.state === true) {
            x++;
        }
        if (aOption.state === true) {
            x++;
        }
        if (hOption.state === true) {
            x++;
        }

        ////
        if (cisOption.state === true) {
            x++;
        }
        if (disOption.state === true) {
            x++;
        }
        if (eisOption.state === true) {
            x++;
        }
        if (fisOption.state === true) {
            x++;
        }
        if (gisOption.state === true) {
            x++;
        }
        if (aisOption.state === true) {
            x++;
        }
        if (hisOption.state === true) {
            x++;
        }

        ////
        if (cesOption.state === true) {
            x++;
        }
        if (desOption.state === true) {
            x++;
        }
        if (esOption.state === true) {
            x++;
        }
        if (fesOption.state === true) {
            x++;
        }
        if (gesOption.state === true) {
            x++;
        }
        if (asOption.state === true) {
            x++;
        }
        if (hesOption.state === true) {
            x++;
        }


        if (x < 2) {
            var style = {font: "30px Arial", fill: "#ff0000", align: "center"};
            neizbraniText = game.add.text(game.world.centerX, 600, "Izberi vsaj 2 noti", style);
            neizbraniText.anchor.set(0.5, 1);

            return false;
        }
        else {
            if (neizbraniText !== null) {
                neizbraniText.kill();
            }
            return true;
        }
    }


    function removeLimits() {
        console.log("remove limits");

        limitCounter = -1;
        limitTime = -1;

        if (limitCounterText !== undefined) {
            limitCounterText.kill();
        }
        if (limitTimeText !== undefined) {
            limitTimeText.kill();
        }

        if (plusBtn !== undefined) {
            plusBtn.kill();
        }
        if (minusBtn !== undefined) {
            minusBtn.kill();
        }


    }

    function makeCounterLimit() {
        console.log("counter limit");

        removeLimits();

        var style = {fill: '#000000', fontSize: 20};
        limitCounter = 10;
        limitCounterText = game.add.text(350, 420, "Število primerov: " + limitCounter, style);

        minusBtn = game.add.button(650, 415, 'minus', minusLimit, this, 2, 1, 0);
        plusBtn = game.add.button(710, 415, 'plus', plusLimit, this, 2, 1, 0);

    }

    function makeTimeLimit() {
        console.log("time limit");

        removeLimits();

        var style = {fill: '#000000', fontSize: 20};
        limitTime = 60;
        limitTimeText = game.add.text(350, 450, "Čas: " + Math.floor(limitTime / 60) + " minut, " + limitTime % 60 + " sekund", style);

        minusBtn = game.add.button(650, 445, 'minus', minusLimit, this, 2, 1, 0);
        plusBtn = game.add.button(710, 445, 'plus', plusLimit, this, 2, 1, 0);
    }


    function minusLimit() {
        if (counterOption.state === true && limitCounter > 5) {
            limitCounter -= 5;
            limitCounterText.setText("Število primerov: " + limitCounter);
        }
        else if (timeOption.state === true && limitTime > 10) {
            limitTime -= 10;
            limitTimeText.setText("Čas: " + Math.floor(limitTime / 60) + " minut, " + limitTime % 60 + " sekund");
        }
    }

    function plusLimit() {
        if (counterOption.state === true && limitCounter < 100) {
            limitCounter += 5;
            limitCounterText.setText("Število primerov: " + limitCounter);
        }
        else if (timeOption.state === true && limitTime < 300) {
            limitTime += 10;
            limitTimeText.setText("Čas: " + Math.floor(limitTime / 60) + " minut, " + limitTime % 60 + " sekund");
        }
    }


    function proceed() {
        if (checkIfEnoughSelected() === true) {
            zacniAkcija();
        }
    }

    function destroySettings() {

        nastavitveText.kill();
        noteSelectText.kill();
        kljucSelectText.kill();
        limitText.kill();

        cOption.kill();
        dOption.kill();
        eOption.kill();
        fOption.kill();
        gOption.kill();
        aOption.kill();
        hOption.kill();

        cisOption.kill();
        disOption.kill();
        eisOption.kill();
        fisOption.kill();
        gisOption.kill();
        aisOption.kill();
        hisOption.kill();

        cesOption.kill();
        desOption.kill();
        esOption.kill();
        fesOption.kill();
        gesOption.kill();
        asOption.kill();
        hesOption.kill();

        violinskiOption.kill();
        basovskiOption.kill();
        altovskiOption.kill();
        sopranskiOption.kill();
        tenorskiOption.kill();

        neomejenoOption.kill();

        counterOption.kill();
        if (limitCounterText !== undefined) {
            limitCounterText.kill();
        }

        timeOption.kill();
        if (limitTimeText !== undefined) {
            limitTimeText.kill();
        }

        if (plusBtn !== undefined) {
            plusBtn.kill();
        }
        if (minusBtn !== undefined) {
            minusBtn.kill();
        }

        naprejBtn.kill();
        nazajBtn.kill();
    }

    function destroyGame() {

        //createNavbar();
        //placeCrtovje();
        //prepareNotes();
        //nextNote();
        //placeNoteBtns();

        crtovje.kill();
        prikazanaNota.kill();

        cBtn.kill();
        dBtn.kill();
        eBtn.kill();
        fBtn.kill();
        gBtn.kill();
        aBtn.kill();
        hBtn.kill();
        cisBtn.kill();
        disBtn.kill();
        eisBtn.kill();
        fisBtn.kill();
        gisBtn.kill();
        aisBtn.kill();
        hisBtn.kill();
        cesBtn.kill();
        desBtn.kill();
        esBtn.kill();
        fesBtn.kill();
        gesBtn.kill();
        asBtn.kill();
        hesBtn.kill();

        pauseBtn.kill();

        updateTimer.destroy();
    }


    function showResults() {
        console.log('konec');
        destroyGame();
        resultText = 'Rezultati: \n' +
            'Rešenih primerov: ' + counter + '\n' +
            'Pravilnih primerov: ' + pravilni + '\n' +
            'Uspešnost: ' + uspehOds.toFixed(0) + '%\n';

        finalResults = game.add.text(100, 100, resultText, {fill: '#000000'});


        naprejBtn = game.add.button(800, 600, 'naprej', create, this, 2, 1, 0);
        naprejBtn.anchor.set(1, 1);

        //nazajBtn = game.add.button(0, 600, 'nazaj', create, this, 2, 1, 0);
        //nazajBtn.anchor.set(0, 1);
    }

    function destroyResults() {
        if (finalResults !== undefined) {
            finalResults.kill();
        }

        if (nazajBtn !== undefined) {
            nazajBtn.kill();
        }
        if (naprejBtn !== undefined) {
            naprejBtn.kill();
        }
    }

    function destroyNavbar() {
        if (navbarBackground !== undefined && navbarBackground !== null) {
            navbarBackground.kill();
        }
        if (gameNameText !== undefined && gameNameText !== null) {
            gameNameText.kill();
        }
        if (uspehText !== undefined && uspehText !== null) {
            uspehText.kill();
        }
        if (preostaliPrimeriText !== undefined && preostaliPrimeriText !== null) {
            preostaliPrimeriText.kill();
        }
        if (preostaliCasText !== undefined && preostaliCasText !== null) {
            preostaliCasText.kill();
        }


    }
};
