export const lcgStep = (v, a, c, m) => (((a * v + c) % m) + m) % m;

export function pcgDistance(v1, v2, a, c, m) {
    // https://math.stackexchange.com/questions/2008585/computing-the-distance-between-two-linear-congruential-generator-states

    const modulus = BigInt(m);
    let multiplier = BigInt(a);
    let increment = BigInt(c);
    let state = BigInt(v1) % modulus;
    const target = BigInt(v2) % modulus;
    let bit = 1n;
    let distance = 0n;

    while (state !== target) {
        if (((state ^ target) & bit) !== 0n) {
            state = (multiplier * state + increment) % modulus;
            distance += bit;
        }

        increment = (increment * (multiplier + 1n)) % modulus;
        multiplier = (multiplier * multiplier) % modulus;
        bit <<= 1n;
    }

    return distance;
}
