import { defineStore } from "pinia";

import { useSettingsStore } from "./settingsStore";
import { useWindStore } from "./windStore";

export const useGoldfishStore = defineStore("goldfish", {
    state: () => {
        return {
            settings: {
                chaining: false,
                numToCheck: 1000,
                customAdvanceNumber: 1000,
            },

            goldfishHistory: [],

            message: "",
            seedAtStartOfRun: null,
            lastKnownSeed: null,
            currentSeed: null,
        };
    },
    getters: {
        advanceFunction: (state) => {
            const settingsStore = useSettingsStore();

            switch (settingsStore.game) {
                case "og_1.0":
                case "og_1.1":
                    return (seed) =>
                        seed === null
                            ? null
                            : Number(
                                  (BigInt(seed) * 69069n + 1n) & 0xffffffffn
                              );
                case "wsr":
                    return (seed) =>
                        seed === null
                            ? null
                            : Number(
                                  (BigInt(seed) * 0x41c64e6dn + 0x3039n) &
                                      0xffffffffn
                              );
            }
        },
        advanceCounts: (state) => {
            const settingsStore = useSettingsStore();

            switch (settingsStore.game) {
                case "og_1.0":
                case "og_1.1":
                    return {
                        reset: 41,
                        hole_load: 17,
                    };
                case "wsr":
                    return {
                        reset: 102,
                        hole_load: 45,
                    };
            }
        },
    },
    actions: {
        initialize: function (seed) {
            this.lastKnownSeed = seed;
        },
        advance: function (n = 1, custom = false) {
            let seed = this.lastKnownSeed;
            for (let i = 0; i < n; i++) {
                seed = this.advanceFunction(seed);
            }
            this.initialize(seed);
            if (custom) {
                let seed = this.seedAtStartOfRun;
                for (let i = 0; i < n; i++) {
                    seed = this.advanceFunction(seed);
                }
                this.seedAtStartOfRun = seed;
            }
        },
        reset: function () {
            this.seedAtStartOfRun = this.lastKnownSeed;
            this.advance(this.advanceCounts.reset);
            this.goldfishHistory = [];
        },
        holeLoad: function () {
            this.advance(this.advanceCounts.hole_load);
        },
        findSeed: async function () {
            const windStore = useWindStore();
            const settingsStore = useSettingsStore();

            const winds = windStore.goldfishifyHistory;

            const json = {
                game: settingsStore.game,
                last_known_seed:
                    this.settings.chaining && this.seedAtStartOfRun !== null
                        ? Number(this.seedAtStartOfRun)
                        : null,
                num_to_check:
                    this.settings.chaining && this.seedAtStartOfRun !== null
                        ? Number(this.settings.numToCheck) || 1000
                        : null,
                winds: winds,
            };

            const res = await fetch("https://goldfish.914000.xyz/wind2seed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(json),
            });

            if (res.ok) {
                const data = await res.json();

                if (data.length == 1) {
                    this.currentSeed = data[0].seed;

                    const holeLoadCount = windStore.historyLength - 1;

                    this.advance(
                        this.advanceCounts.hole_load * holeLoadCount +
                            this.advanceCounts.reset
                    );

                    this.ungoldfishifyHistory(data[0].winds);

                    this.message = "";
                } else {
                    this.message = `${data.length} possibilities`;

                    this.goldfishHistory = [];
                }
            } else {
                this.message = await res.text();
            }
        },
        ungoldfishifyHistory: function (winds) {
            const settingsStore = useSettingsStore();
            const windStore = useWindStore();

            this.goldfishHistory = [];

            for (let i = 0; i < settingsStore.holes; i++) {
                this.goldfishHistory.push([
                    windStore.wind.directions.find(
                        (dir) => dir.goldfishId === winds[i].direction
                    ),
                    windStore.wind.speeds.find(
                        (spd) => spd.m_s === winds[i].speed
                    ),
                    {},
                ]);
            }
        },
    },
    persist: true,
});
