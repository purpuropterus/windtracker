import { lcgStep, pcgDistance } from "./rng_util.js";

describe("pcgDistance", () => {
    it("recovers randomly generated distances", () => {
        const a = 69069;
        const c = 1;
        const m = 2 ** 16;

        const seedrandom = require("seedrandom");
        const rand = new seedrandom("test");

        for (let i = 0; i < 100; i++) {
            const v1 = Math.floor(rand.quick() * m);
            const distance = Math.floor(rand.quick() * 1000);
            let v2 = v1;

            for (let j = 0; j < distance; j++) {
                v2 = lcgStep(v2, a, c, m);
            }

            expect(pcgDistance(v1, v2, a, c, m)).toEqual(BigInt(distance));
        }
    });
});
