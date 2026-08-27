const NUM_BLINK_TIMES = 10;
const sBlinkTimes = [10, 10, 120, 180, 250, 260, 270, 280, 290, 300];

function getRandomBlinkIndex(seed, ver_1_0) {
    return seed % NUM_BLINK_TIMES;
}

export function getRandomBlinkTime(seed, ver_1_0) {
    return sBlinkTimes[getRandomBlinkIndex(seed, ver_1_0)];
}
