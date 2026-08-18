import { lcgDistance } from "./rng_util";

const lcgStep = (v, a, c, m) => (((a * v + c) % m) + m) % m;

describe("lcgDistance", () => {
    it("recovers randomly generated distances", () => {
        const a = 69069n;
        const c = 1n;
        const m = 65536n;

        for (let start = 0n; start < 100; start++) {
            let current = start;

            for (let distance = 0; distance < 100; distance++) {
                expect(lcgDistance(start, current, a, c, m)).toBe(
                    BigInt(distance),
                );

                current = lcgStep(current, a, c, m);
            }
        }
    });
});
