const NUM_BLINK_TIMES = 10;
const sBlinkTimes = [10, 10, 120, 180, 250, 260, 270, 280, 290, 300];

function getU32(seed, ver_1_0) {
    seed >>>= 0;

    if (!ver_1_0) {
        seed >>>= 16;
    }

    return seed & 0xffff;
}

function getF32(seed, ver_1_0) {
    seed >>>= 0;

    if (!ver_1_0) {
        seed >>>= 16;
    }

    return (seed & 0xffff) / 0x10000;
}

function getRandomBlinkIndex(seed, ver_1_0) {
    return Math.floor(getF32(seed, ver_1_0) * NUM_BLINK_TIMES);
}

function getRandomBlinkTime(seed, ver_1_0) {
    return sBlinkTimes[getRandomBlinkIndex(seed, ver_1_0)];
}
