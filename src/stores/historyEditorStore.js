import { defineStore } from "pinia";
import { ref } from "vue";

import { useWindStore } from "./windStore";
import { useSettingsStore } from "./settingsStore";
import { useGoldfishStore } from "./goldfishStore";

export const useHistoryEditorStore = defineStore("historyEditor", {
    state: () => {
        return {
            currentlyEditingIndex: null,
            currentlyEditingDirectionId: null,
            currentlyEditingSpeedM_s: null,

            directionsToCheck: [],
            speedsToCheck: [],

            error: "",
        };
    },
    actions: {
        handleHistoryClick(index) {
            const windStore = useWindStore();

            this.currentlyEditingIndex = index;
            this.currentlyEditingDirectionId = windStore.history[index][0].id;
            this.currentlyEditingSpeedM_s = windStore.history[index][1].m_s;
        },
        save() {
            const windStore = useWindStore();

            windStore.history[this.currentlyEditingIndex][0] =
                windStore.wind.directions.find(
                    (direction) =>
                        direction.id === this.currentlyEditingDirectionId
                );
            windStore.history[this.currentlyEditingIndex][1] =
                windStore.wind.speeds.find(
                    (speed) => speed.m_s === this.currentlyEditingSpeedM_s
                );

            windStore.currentPair[0] = {};
            windStore.currentPair[1] = {};

            if (this.historyRunthrough()) {
                this.updateUsed();
                this.close();

                useGoldfishStore().findSeed();
            }
        },
        historyRunthrough() {
            const windStore = useWindStore();
            const settingsStore = useSettingsStore();

            if (settingsStore.game == "og") {
                return this.validateOgHistory();
            }

            //only check the last group of 8
            //not checking the other groups is intentional, to not distract during a runS

            const directionsNum = windStore.historyLength % 8;
            const directionsStartIndex =
                Math.floor(windStore.historyLength / 8) * 8; // beginning of group of 8 we're in

            this.directionsToCheck = windStore.history
                .slice(
                    directionsStartIndex,
                    directionsStartIndex + directionsNum
                )
                .map((pair) => pair[0])
                .filter((direction) => direction.id !== "?");

            //only check the last group of 9
            //not checking the other groups is intentional, to not distract during a runS
            const speedsNum = windStore.historyLength % 9;
            const speedsStartIndex =
                Math.floor(windStore.historyLength / 9) * 9; // beginning of group of 9 we're in

            this.speedsToCheck = windStore.history
                .slice(
                    directionsStartIndex,
                    directionsStartIndex + directionsNum
                )
                .map((pair) => pair[1])
                .filter((speed) => speed.m_s !== 17);

            // check for duplicate directions
            for (const direction of this.directionsToCheck) {
                if (
                    this.directionsToCheck.filter((dir) => dir === direction)
                        .length > 1
                ) {
                    this.error = `Direction ${direction.id} appears more than once in the group of 8`;
                    return false;
                }
            }

            // check for duplicate speeds
            for (const speed of this.speedsToCheck) {
                if (
                    this.speedsToCheck.filter((spd) => spd === speed).length > 1
                ) {
                    this.error = `Speed ${
                        speed[settingsStore.speedUnit]
                    } appears more than once in the group of 9`;
                    return false;
                }
            }

            return true;
        },

        validateOgHistory() {
            const windStore = useWindStore();

            const historyWithoutEmptyPairs = windStore.history.filter(
                (item) =>
                    item[0].id !== (null || undefined) &&
                    item[1].m_s !== (null || undefined)
            );

            windStore.reset(false);

            let foundNoError = true;

            //don't include empty pairs
            for (const pair in historyWithoutEmptyPairs) {
                try {
                    windStore.addToHistory(historyWithoutEmptyPairs[pair]);
                } catch (error) {
                    console.log(error);
                    this.error = error;
                    foundNoError = false;
                }
            }

            return foundNoError;
        },

        updateUsed() {
            const windStore = useWindStore();
            const settingsStore = useSettingsStore();

            if (settingsStore.game === "wsr") {
                windStore.usedDirections = [];
                windStore.usedSpeeds = [];

                for (const direction of this.directionsToCheck) {
                    windStore.usedDirections.push(direction);
                }

                for (const speed of this.speedsToCheck) {
                    windStore.usedSpeeds.push(speed);
                }
            }
        },

        close() {
            this.error = "";
            this.currentlyEditingIndex = null;
            this.currentlyEditingDirectionId = null;
            this.currentlyEditingSpeedM_s = null;
        },
    },
});
