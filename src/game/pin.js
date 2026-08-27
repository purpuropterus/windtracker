import { getF32 } from "./rng";

const NUM_PINS = 3;

export function choosePin(seed, ver_1_0) {
    return Math.floor(getF32(seed, ver_1_0) * NUM_PINS);
}
