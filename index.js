const five = require("johnny-five");
const moment = require("moment");
const board = new five.Board();
let persistence = 1000 / 4 / 4 / 4 / 4;
persistence = 10;
let shortDelay = 1;
// persistence = persistence / 4;
// persistence = persistence / 4;
// persistence = persistence / 4;

// 20
// 30
const pins = {
    segments: {
        A: 2,
        B: 3,
        C: 4,
        D: 5,
        E: 6,
        F: 7,
        G: 8,
    },
    index: {
        D1: 9,
        D2: 10,
        D3: 11,
        D4: 12,
    },
};

let allSegments = ["A", "B", "C", "D", "E", "F", "G"];
let digitsMapping = {
    10: [],
    0: ["A", "B", "C", "D", "E", "F"],
    1: ["B", "C"],
    2: ["A", "B", "D", "E", "G"],
    3: ["A", "B", "C", "D", "G"],
    4: ["B", "C", "F", "G"],
    5: ["A", "C", "D", "F", "G"],
    6: ["A", "C", "D", "E", "F", "G"],
    7: ["A", "B", "C"],
    8: ["A", "B", "C", "D", "E", "F", "G"],
    9: ["A", "B", "C", "F", "G"],
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

board.on("ready", () => {
    console.log("Arduino Ready");
    setup();
    loop();
});

function setup() {
    let allPins = { ...pins.segments, ...pins.index };
    for (let pinName in allPins) {
        board.pinMode(allPins[pinName], board.io.MODES.OUTPUT);
    }
    for (let digit in pins.index) {
        board.digitalWrite(pins.index[digit], 0);
    }
    for (let segment in pins.segments) {
        board.digitalWrite(pins.segments[segment], 1);
    }
}

function loop() {
    let timeString = moment().format("HHmm");
    let timeArray = timeString.split("");
    let time = timeArray.map((e) => parseInt(e));
    console.log(time);
    // displayDigit(1);
    // displayNumber(2);
    setInterval((e) => {
        let timeString = moment().format("HHmm");
        // timeString = "2131";
        let timeArray = timeString.split("");
        time = timeArray.map((e) => parseInt(e));
    });
    displayTime(time);
    setInterval(() => displayTime(time), (persistence + shortDelay) * 4);
    // board.loop(persistence * 4, () => displayTime(time));
}

async function displayTime(time) {
    for (let i in time) {
        await display(i, time[i]);
        await sleep(persistence);
    }
}

async function display(i, n) {
    // if (["1", "3"].includes(i)) return;
    displayNumber(10);
    await sleep(shortDelay);
    displayDigit(i);
    displayNumber(n);
}

function displayDigit(index) {
    board.digitalWrite(pins.index.D1, 0 == index ? 0 : 1);
    board.digitalWrite(pins.index.D2, 1 == index ? 0 : 1);
    board.digitalWrite(pins.index.D3, 2 == index ? 0 : 1);
    board.digitalWrite(pins.index.D4, 3 == index ? 0 : 1);
}

function displayNumber(digit) {
    let lighters = digitsMapping[digit];
    let dimmers = allSegments.filter((e) => !lighters.includes(e));
    for (let light of lighters) {
        board.digitalWrite(pins.segments[light], 1);
    }
    for (let light of dimmers) {
        board.digitalWrite(pins.segments[light], 0);
    }
}
