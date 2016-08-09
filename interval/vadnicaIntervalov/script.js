// "100vw", "100vh" --> v htmlju padding, margin na 0
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create});

var loadingText;

var baseURL = 'https://zigacernigoj.github.io/diploma-assets/';

//localStorage.setItem('mode', 'student');
//var mode = localStorage.getItem('mode');
store.set('mode', 'student');
var mode = store.get('mode');

if (mode === undefined) {
    mode = "student"; // default value
}


var crtovje = null;

var trenutniRez = null;

var zacniBtn, naprejBtn, nazajBtn, nadaljujBtn, koncajBtn, zbirkaBtn;
var cistaPrimaBtn, velikaSekundaBtn, velikaTercaBtn, cistaKvartaBtn, cistaKvintaBtn, velikaSekstaBtn, velikaSeptimaBtn, cistaOktavaBtn;

var yPositions = [263, 245, 227, 209, 191, 173, 155, 137, 119, 101, 83, 65, 47,
    227, 209, 191, 173, 155, 137, 119, 101, 83, 65, 47, 29, 11,
    209, 191, 173, 155, 137, 119, 101, 83, 65, 47, 29, 11, -7]; // 18px narazen

var notaCrtaBrez = ['notaCrta', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaBrez', 'notaCrta',
    'visajCrta', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajBrez', 'visajCrta',
    'nizajCrta', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajBrez', 'nizajCrta'];

var cistaPrima = [ // pozicija 1, pozicija 2, slika 1, slika 2
    [yPositions[0], yPositions[0], notaCrtaBrez[0], notaCrtaBrez[0]],
    [yPositions[1], yPositions[1], notaCrtaBrez[1], notaCrtaBrez[1]],
    [yPositions[2], yPositions[2], notaCrtaBrez[2], notaCrtaBrez[2]],
    [yPositions[3], yPositions[3], notaCrtaBrez[3], notaCrtaBrez[3]],
    [yPositions[4], yPositions[4], notaCrtaBrez[4], notaCrtaBrez[4]],
    [yPositions[5], yPositions[5], notaCrtaBrez[5], notaCrtaBrez[5]],
    [yPositions[6], yPositions[6], notaCrtaBrez[6], notaCrtaBrez[6]],

    [yPositions[7], yPositions[7], notaCrtaBrez[7], notaCrtaBrez[7]],
    [yPositions[8], yPositions[8], notaCrtaBrez[8], notaCrtaBrez[8]],
    [yPositions[9], yPositions[9], notaCrtaBrez[9], notaCrtaBrez[9]],
    [yPositions[10], yPositions[10], notaCrtaBrez[10], notaCrtaBrez[10]],
    [yPositions[11], yPositions[11], notaCrtaBrez[11], notaCrtaBrez[11]],
    [yPositions[12], yPositions[12], notaCrtaBrez[12], notaCrtaBrez[12]]
];

var velikaSekunda = [ // pozicija 1, pozicija 2, slika 1, slika 2
    [yPositions[0], yPositions[1], notaCrtaBrez[0], notaCrtaBrez[1]],
    [yPositions[1], yPositions[2], notaCrtaBrez[1], notaCrtaBrez[2]],
    [yPositions[3], yPositions[4], notaCrtaBrez[3], notaCrtaBrez[4]],
    [yPositions[4], yPositions[5], notaCrtaBrez[4], notaCrtaBrez[5]],
    [yPositions[5], yPositions[6], notaCrtaBrez[5], notaCrtaBrez[6]]
];

var velikaTerca = [ // pozicija 1, pozicija 2, slika 1, slika 2
    [yPositions[0], yPositions[2], notaCrtaBrez[0], notaCrtaBrez[2]],
    [yPositions[3], yPositions[5], notaCrtaBrez[3], notaCrtaBrez[5]],
    [yPositions[4], yPositions[6], notaCrtaBrez[4], notaCrtaBrez[6]]
];

var cistaKvarta = [ // pozicija 1, pozicija 2, slika 1, slika 2
    [yPositions[0], yPositions[3], notaCrtaBrez[0], notaCrtaBrez[3]],
    [yPositions[1], yPositions[4], notaCrtaBrez[1], notaCrtaBrez[4]],
    [yPositions[2], yPositions[5], notaCrtaBrez[2], notaCrtaBrez[5]],
    [yPositions[4], yPositions[7], notaCrtaBrez[4], notaCrtaBrez[7]],
    [yPositions[5], yPositions[8], notaCrtaBrez[5], notaCrtaBrez[8]]
        [yPositions[6], yPositions[9], notaCrtaBrez[6], notaCrtaBrez[9]]
];

var cistaKvinta = [ // pozicija 1, pozicija 2, slika 1, slika 2
    [yPositions[0], yPositions[4], notaCrtaBrez[0], notaCrtaBrez[4]],
    [yPositions[1], yPositions[5], notaCrtaBrez[1], notaCrtaBrez[5]],
    [yPositions[2], yPositions[6], notaCrtaBrez[2], notaCrtaBrez[6]],
    [yPositions[3], yPositions[7], notaCrtaBrez[3], notaCrtaBrez[7]],
    [yPositions[4], yPositions[8], notaCrtaBrez[4], notaCrtaBrez[8]],
    [yPositions[5], yPositions[9], notaCrtaBrez[5], notaCrtaBrez[9]]
];

var velikaSeksta = [ // pozicija 1, pozicija 2, slika 1, slika 2
    [yPositions[0], yPositions[5], notaCrtaBrez[0], notaCrtaBrez[5]],
    [yPositions[1], yPositions[6], notaCrtaBrez[1], notaCrtaBrez[6]],
    [yPositions[3], yPositions[8], notaCrtaBrez[3], notaCrtaBrez[8]],
    [yPositions[4], yPositions[9], notaCrtaBrez[4], notaCrtaBrez[9]]
];

var velikaSeptima = [ // pozicija 1, pozicija 2, slika 1, slika 2
    [yPositions[0], yPositions[6], notaCrtaBrez[0], notaCrtaBrez[6]],
    [yPositions[3], yPositions[9], notaCrtaBrez[3], notaCrtaBrez[9]]
];

var cistaOktava = [ // pozicija 1, pozicija 2, slika 1, slika 2
    [yPositions[0], yPositions[7], notaCrtaBrez[0], notaCrtaBrez[7]],
    [yPositions[1], yPositions[8], notaCrtaBrez[1], notaCrtaBrez[8]],
    [yPositions[2], yPositions[9], notaCrtaBrez[2], notaCrtaBrez[9]],
    [yPositions[3], yPositions[10], notaCrtaBrez[3], notaCrtaBrez[10]],
    [yPositions[4], yPositions[11], notaCrtaBrez[4], notaCrtaBrez[11]],
    [yPositions[5], yPositions[12], notaCrtaBrez[5], notaCrtaBrez[12]]
];


var intervali = [
    [cistaPrima, 'cistaPrima'],
    [velikaSekunda, 'velikaSekunda'],
    [velikaTerca, 'velikaTerca'],
    [cistaKvarta, 'cistaKvarta'],
    [cistaKvinta, 'cistaKvinta'],
    [velikaSeksta, 'velikaSeksta'],
    [velikaSeptima, 'velikaSeptima'],
    [cistaOktava, 'cistaOktava']
];

var koncniIntervali = [];
var izbranInterval;

var prikazanaNotaEna = null;
var prikazanaNotaDva = null;

var navbarHeight = 30;

var paddingLeft = 50;
var paddingLeftSmall = 10;

var naslovText = null;
var navodilaText = null;

var nastavitveText = null;
var intervaliSelectText = null;
var kljucSelectText = null;

var primaOption, sekundaOption, tercaOption, kvartaOption, kvintaOption, sekstaOption, septimaOption, oktavaOption;
var violinskiOption, basovskiOption, altovskiOption, sopranskiOption, tenorskiOption;

var gameNameText = null;
var uspehText = null;

var preostaliPrimeriText = null;
var preostaliCasText = null;

var playBtn, pauseBtn, stopBtn;

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

var diatonicniOption, enPredznakOption, vseMoznostiOption;
var cistiOption, velikiOption, maliOption, zvecaniOption, zmanjsaniOption;

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


    game.load.spritesheet('checkbox', baseURL + mode + '/btn/checkbox.png', 12, 12);
    game.load.spritesheet('radiobutton', baseURL + mode + '/btn/radiobutton.png', 12, 12);

    loadNoteImgs();
    loadPravilnostImgs();
    loadBtns();
    loadIntervalBtns();

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
    game.load.image('stop', baseURL + mode + '/btn/navbar/stopWhiteBtn.png');

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

function loadIntervalBtns() { //loadNoteBtns
    game.load.image('cistaPrima', baseURL + mode + '/btn/intervali/cistaPrima.png');
    game.load.image('velikaSekunda', baseURL + mode + '/btn/intervali/velikaSekunda.png');
    game.load.image('velikaTerca', baseURL + mode + '/btn/intervali/velikaTerca.png');
    game.load.image('cistaKvarta', baseURL + mode + '/btn/intervali/cistaKvarta.png');
    game.load.image('cistaKvinta', baseURL + mode + '/btn/intervali/cistaKvinta.png');
    game.load.image('velikaSeksta', baseURL + mode + '/btn/intervali/velikaSeksta.png');
    game.load.image('velikaSeptima', baseURL + mode + '/btn/intervali/velikaSeptima.png');
    game.load.image('cistaOktava', baseURL + mode + '/btn/intervali/cistaOktava.png');
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
    destroySettings();
    destroyResults();

    game.stage.backgroundColor = '#82aed6';

    var style1 = {font: "65px Arial", fill: "#000000", align: "center"};
    naslovText = game.add.text(game.world.centerX, game.world.top, "Vadnica intervalov", style1);
    naslovText.anchor.set(0.5, -0.5);
    naslovText.alpha = 1;

    var style2 = {
        font: "25px Arial",
        fill: "#000000",
        align: "center",
        wordWrap: true,
        wordWrapWidth: game.world.width - 50
    };
    navodilaText = game.add.text(game.world.centerX, game.world.centerY, 'Preizkusi svoje poznavanje intervalov v tej vadnici. ' +
        'Klikni gumb Naprej in si izberi intervale in način vadbe. Srečno!', style2);
    navodilaText.anchor.set(0.5, 0.8);
    navodilaText.alpha = 1;
    //navodilaText.addFontWeight('bold', 105);
    //navodilaText.addFontWeight('normal', 111);

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
    gameNameText = game.add.text(paddingLeftSmall, game.world.top, "Vadnica intervalov", style3);

    uspehText = game.add.text(580, game.world.top, "Uspeh: " + uspehOds.toFixed(0) + "%", style3);
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


    pauseBtn = game.add.button(752, 6, 'pause', pause1, this, 2, 1, 0);
    pauseBtn.scale.setTo(1.5, 1.5);

    stopBtn = game.add.button(776, 6, 'stop', showResults, this, 2, 1, 0);
    stopBtn.scale.setTo(1.5, 1.5);

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
    window.location.href = 'https://zigacernigoj.github.io/';
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
    prepareIntervals();
    nextInterval();
    placeIntervalBtns();

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
    }
    else if (basovskiOption.state === true) {
        crtovje = game.add.sprite(game.world.centerX, game.world.top, 'basovski');
    }
    else if (altovskiOption.state === true) {
        crtovje = game.add.sprite(game.world.centerX, game.world.top, 'altovski');
    }
    else if (sopranskiOption.state === true) {
        crtovje = game.add.sprite(game.world.centerX, game.world.top, 'sopranski');
    }
    else if (tenorskiOption.state === true) {
        crtovje = game.add.sprite(game.world.centerX, game.world.top, 'tenorski');
    }

    crtovje.anchor.setTo(0.5, 0.1);
}

function placeIntervalBtns() { //placeNoteBtns
    cistaPrimaBtn = game.add.button(80 ,450, 'cistaPrima', checkIfCorrect, this, 2, 1, 0);
    velikaSekundaBtn = game.add.button(160, 450, 'velikaSekunda', checkIfCorrect, this, 2, 1, 0);
    velikaTercaBtn = game.add.button(240, 450, 'velikaTerca', checkIfCorrect, this, 2, 1, 0);
    cistaKvartaBtn = game.add.button(320, 450, 'cistaKvarta', checkIfCorrect, this, 2, 1, 0);
    cistaKvintaBtn = game.add.button(400, 450, 'cistaKvinta', checkIfCorrect, this, 2, 1, 0);
    velikaSekstaBtn = game.add.button(480, 450, 'velikaSeksta', checkIfCorrect, this, 2, 1, 0);
    velikaSeptimaBtn = game.add.button(560, 450, 'velikaSeptima', checkIfCorrect, this, 2, 1, 0);
    cistaOktavaBtn = game.add.button(640, 450, 'cistaOktava', checkIfCorrect, this, 2, 1, 0);

}


function checkIfCorrect(selectedButton) {
    counter++;

    if (izbranInterval === selectedButton.key) {
        //console.log('pravilno');
        trenutniRez = game.add.image(600, 280, 'pravilno');
        pravilni++;
    }
    else {
        narobeSound.play();
        //console.log('narobe');
        trenutniRez = game.add.image(600, 280, 'narobe');
        var style3 = {font: "40px Arial", fill: "#000000", align: "center"};

        narobe = game.add.text(73, 320, 'Pravilen: ' + izbranInterval, style3);
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

    game.add.tween(prikazanaNotaEna).to({alpha: 0}, 500, "Linear", true);
    game.add.tween(prikazanaNotaDva).to({alpha: 0}, 500, "Linear", true);

    if (limitCounter === 0) {

        var timer1 = game.time.create(false);
        timer1.add(1000, showResults, this);
        timer1.start();
        console.log('konec');
    }
    else {
        var timer = game.time.create(false);
        timer.add(350, nextInterval, this);
        timer.start();
    }

}

function prepareIntervals() { //prepareNotes


    if (primaOption.state === true) {
        koncniIntervali.push(intervali[0]);
    }
    if (sekundaOption.state === true) {
        koncniIntervali.push(intervali[1]);
    }
    if (tercaOption.state === true) {
        koncniIntervali.push(intervali[2]);
    }
    if (kvartaOption.state === true) {
        koncniIntervali.push(intervali[3]);
    }
    if (kvintaOption.state === true) {
        koncniIntervali.push(intervali[4]);
    }
    if (sekstaOption.state === true) {
        koncniIntervali.push(intervali[5]);
    }
    if (septimaOption.state === true) {
        koncniIntervali.push(intervali[6]);
    }
    if (oktavaOption.state === true) {
        koncniIntervali.push(intervali[7]);
    }


}

function nextInterval() { //nextNote

    //console.log('next');
    var nextI = Math.round(Math.random() * (koncniIntervali.length - 1)); // izbere interval

    var nextN = Math.round(Math.random() * (koncniIntervali[nextI][0].length - 1)); // izbere pozicijo

    // koncniIntervali => vsi izbrani intervali

    // koncniIntervali[nextI][0] => tabela pozicij in slik
    // koncniIntervali[nextI][0][nextN][0] => pozicija za 1.noto
    // koncniIntervali[nextI][0][nextN][1] => pozicija za 2.noto
    // koncniIntervali[nextI][0][nextN][2] => slika za 1.noto
    // koncniIntervali[nextI][0][nextN][3] => slika za 2.noto

    // koncniIntervali[nextI][1] => (string) ime intervala

    console.log(nextI, nextN);
    console.log(koncniIntervali[nextI][0]);
    console.log(koncniIntervali[nextI][0][nextN]);
    console.log(koncniIntervali[nextI][1]);

    izbranInterval = koncniIntervali[nextI][1];


    if (prikazanaNotaEna !== null) {
        prikazanaNotaEna.kill();
    }
    if (prikazanaNotaDva !== null) {
        prikazanaNotaDva.kill();
    }

    prikazanaNotaEna = game.add.image(350, koncniIntervali[nextI][0][nextN][0], koncniIntervali[nextI][0][nextN][2]);
    prikazanaNotaDva = game.add.image(450, koncniIntervali[nextI][0][nextN][1], koncniIntervali[nextI][0][nextN][3]);


    //prikazanaNotaEna.name = izbraniKljuc[koncneNote[nextN]];
    //correctNote = izbraniKljuc[koncneNote[nextN]];
    //correctNoteNumber = yPositions[koncneNote[nextN]];

    //console.log('correctNN', correctNoteNumber);

    prikazanaNotaEna.alpha = 0;
    prikazanaNotaDva.alpha = 0;
    game.add.tween(prikazanaNotaEna).to({alpha: 1}, 500, "Linear", true);
    game.add.tween(prikazanaNotaDva).to({alpha: 1}, 500, "Linear", true);
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
    intervaliSelectText = game.add.text(50, 80, "Izberi intervale", style2);

    /* OSNOVNI */
    primaOption = game.add.checkbox(50, 125, {
        text: 'Prima',
        style: {fill: '#000000', fontSize: 20}
    }, 'checkbox', true, -5);
    primaOption.inputEnabled = true;
    primaOption.events.onInputUp.add(checkIfEnoughSelected, this);

    sekundaOption = game.add.checkbox(50, 155, {
        text: 'Sekunda',
        style: {fill: '#000000', fontSize: 20}
    }, 'checkbox', true, -5);
    sekundaOption.inputEnabled = true;
    sekundaOption.events.onInputUp.add(checkIfEnoughSelected, this);

    tercaOption = game.add.checkbox(50, 185, {
        text: 'Terca',
        style: {fill: '#000000', fontSize: 20}
    }, 'checkbox', true, -5);
    tercaOption.inputEnabled = true;
    tercaOption.events.onInputUp.add(checkIfEnoughSelected, this);

    kvartaOption = game.add.checkbox(50, 215, {
        text: 'Kvarta',
        style: {fill: '#000000', fontSize: 20}
    }, 'checkbox', true, -5);
    kvartaOption.inputEnabled = true;
    kvartaOption.events.onInputUp.add(checkIfEnoughSelected, this);

    kvintaOption = game.add.checkbox(50, 245, {
        text: 'Kvinta',
        style: {fill: '#000000', fontSize: 20}
    }, 'checkbox', true, -5);
    kvintaOption.inputEnabled = true;
    kvintaOption.events.onInputUp.add(checkIfEnoughSelected, this);

    sekstaOption = game.add.checkbox(50, 275, {
        text: 'Seksta',
        style: {fill: '#000000', fontSize: 20}
    }, 'checkbox', true, -5);
    sekstaOption.inputEnabled = true;
    sekstaOption.events.onInputUp.add(checkIfEnoughSelected, this);

    septimaOption = game.add.checkbox(50, 305, {
        text: 'Septima',
        style: {fill: '#000000', fontSize: 20}
    }, 'checkbox', true, -5);
    septimaOption.inputEnabled = true;
    septimaOption.events.onInputUp.add(checkIfEnoughSelected, this);

    oktavaOption = game.add.checkbox(50, 335, {
        text: 'Oktava',
        style: {fill: '#000000', fontSize: 20}
    }, 'checkbox', true, -5);
    oktavaOption.inputEnabled = true;
    oktavaOption.events.onInputUp.add(checkIfEnoughSelected, this);
    /* OSNOVNI */

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


    limitText = game.add.text(50, 375, "Izberi način", style2);
    modeRadio = game.add.radioGroup('modeRadio');

    neomejenoOption = game.add.radiobutton(50, 420, {
        text: 'neomejeno',
        style: {fill: '#000000', fontSize: 20}
    }, 'radiobutton', true, -7);
    neomejenoOption.inputEnabled = true;
    neomejenoOption.events.onInputUp.add(removeLimits, this);

    counterOption = game.add.radiobutton(50, 450, {
        text: 'omeji število primerov',
        style: {fill: '#000000', fontSize: 20}
    }, 'radiobutton', undefined, -7);
    counterOption.inputEnabled = true;
    counterOption.events.onInputUp.add(makeCounterLimit, this);

    timeOption = game.add.radiobutton(50, 480, {
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

    nazajBtn = game.add.button(0, 600, 'nazaj', create, this, 2, 1, 0);
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

    if (primaOption.state === true) {
        x++;
    }
    if (sekundaOption.state === true) {
        x++;
    }
    if (tercaOption.state === true) {
        x++;
    }
    if (kvartaOption.state === true) {
        x++;
    }
    if (kvintaOption.state === true) {
        x++;
    }
    if (sekstaOption.state === true) {
        x++;
    }
    if (septimaOption.state === true) {
        x++;
    }
    if (oktavaOption.state === true) {
        x++;
    }

    if (x < 1) {
        var style = {font: "30px Arial", fill: "#ff0000", align: "center"};
        neizbraniText = game.add.text(game.world.centerX, 600, "Izberi vsaj 1 interval", style);
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
    limitCounterText = game.add.text(350, 442, "Število primerov: " + limitCounter, style);

    minusBtn = game.add.button(650, 438, 'minus', minusLimit, this, 2, 1, 0);
    plusBtn = game.add.button(710, 438, 'plus', plusLimit, this, 2, 1, 0);

}

function makeTimeLimit() {
    console.log("time limit");

    removeLimits();

    var style = {fill: '#000000', fontSize: 20};
    limitTime = 60;
    limitTimeText = game.add.text(350, 472, "Čas: " + Math.floor(limitTime / 60) + " minut, " + limitTime % 60 + " sekund", style);

    minusBtn = game.add.button(650, 468, 'minus', minusLimit, this, 2, 1, 0);
    plusBtn = game.add.button(710, 468, 'plus', plusLimit, this, 2, 1, 0);
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

    if (nastavitveText !== undefined && nastavitveText !== null) {
        nastavitveText.kill();
    }
    if (intervaliSelectText !== undefined && intervaliSelectText !== null) {
        intervaliSelectText.kill();
    }
    if (kljucSelectText !== undefined && kljucSelectText !== null) {
        kljucSelectText.kill();
    }
    if (limitText !== undefined && limitText !== null) {
        limitText.kill();
    }

    //////////////
    if (primaOption !== undefined && primaOption !== null) {
        primaOption.kill();
    }
    if (sekundaOption !== undefined && sekundaOption !== null) {
        sekundaOption.kill();
    }
    if (tercaOption !== undefined && tercaOption !== null) {
        tercaOption.kill();
    }
    if (kvartaOption !== undefined && kvartaOption !== null) {
        kvartaOption.kill();
    }
    if (kvintaOption !== undefined && kvintaOption !== null) {
        kvintaOption.kill();
    }
    if (sekstaOption !== undefined && sekstaOption !== null) {
        sekstaOption.kill();
    }
    if (septimaOption !== undefined && septimaOption !== null) {
        septimaOption.kill();
    }

    if (oktavaOption !== undefined && oktavaOption !== null) {
        oktavaOption.kill();
    }

    if (violinskiOption !== undefined && violinskiOption !== null) {
        violinskiOption.kill();
    }
    if (basovskiOption !== undefined && basovskiOption !== null) {
        basovskiOption.kill();
    }
    if (altovskiOption !== undefined && altovskiOption !== null) {
        altovskiOption.kill();
    }
    if (sopranskiOption !== undefined && sopranskiOption !== null) {
        sopranskiOption.kill();
    }
    if (tenorskiOption !== undefined && tenorskiOption !== null) {
        tenorskiOption.kill();
    }

    if (neomejenoOption !== undefined && neomejenoOption !== null) {
        neomejenoOption.kill();
    }


    if (counterOption !== undefined && counterOption !== null) {
        counterOption.kill();
    }

    if (limitCounterText !== undefined) {
        limitCounterText.kill();
    }

    if (timeOption !== undefined && timeOption !== null) {
        timeOption.kill();
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

    if (naprejBtn !== undefined && naprejBtn !== undefined) {
        naprejBtn.kill();
    }
    if (nazajBtn !== undefined && nazajBtn !== undefined) {
        nazajBtn.kill();
    }

}

function destroyGame() {

    //createNavbar();
    //placeCrtovje();
    //prepareIntervals();
    //nextInterval();
    //placeIntervalBtns();

    crtovje.kill();
    prikazanaNotaEna.kill();
    prikazanaNotaDva.kill();

    cistaPrimaBtn.kill();
    velikaSekundaBtn.kill();
    velikaTercaBtn.kill();
    cistaKvartaBtn.kill();
    cistaKvintaBtn.kill();
    velikaSekstaBtn.kill();
    velikaSeptimaBtn.kill();
    cistaOktavaBtn.kill();

    if (pauseBtn !== undefined && pauseBtn !== null) {
        pauseBtn.kill();
    }

    if (stopBtn !== undefined && stopBtn !== null) {
        stopBtn.kill();
    }

    if (updateTimer !== undefined) {
        updateTimer.destroy();
    }

    koncniIntervali = [];
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
    counter = 0;
    limitCounter = -1;
    limitTime = -1;

    counter = 0;
    pravilni = 0;
    napacni = 0;
    uspeh = 0;
    uspehOds = 0;
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