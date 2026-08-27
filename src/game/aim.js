import { getF32 } from "./rng";

function math(x, y) {
    if (y < 0.001) {
        return 0;
    } else {
        return Math.pow(x, -Math.log(y) / Math.log(2));
    }
}

const MAX_RANDOM_AIM = 0.2;
const DEGREES_TO_RADIANS = Math.PI / 180;

export function getRandomAimInRadians(seed, ver_1_0) {
    const x = getF32(seed, ver_1_0);
    const aimAmount = math(0.95, x);
    return (aimAmount * 2 - 1) * MAX_RANDOM_AIM * DEGREES_TO_RADIANS;
}
