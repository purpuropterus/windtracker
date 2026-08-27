export function getF32(seed, ver_1_0) {
    seed >>>= 0;

    if (!ver_1_0) {
        seed >>>= 16;
    }

    return (seed & 0xffff) / 0x10000;
}
