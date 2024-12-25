import { defineStore } from "pinia";

import nwImage from "@/assets/nw.png";
import nImage from "@/assets/n.png";
import neImage from "@/assets/ne.png";
import eImage from "@/assets/e.png";
import seImage from "@/assets/se.png";
import sImage from "@/assets/s.png";
import swImage from "@/assets/sw.png";
import wImage from "@/assets/w.png";
import unknownImage from "@/assets/unknown.png";
import { useSettingsStore } from "./settingsStore";
import { useHistoryEditorStore } from "./historyEditorStore";

export const useWindStore = defineStore("wind", {
    state: () => {
        return {
            wind: {
                directions: [
                    { id: "NW", img: nwImage },
                    { id: "N", img: nImage },
                    { id: "NE", img: neImage },
                    { id: "E", img: eImage },
                    { id: "SE", img: seImage },
                    { id: "S", img: sImage },
                    { id: "SW", img: swImage },
                    { id: "W", img: wImage },
                    { id: "?", img: unknownImage },
                ],
                speeds: [
                    { m_s: 0, mph: 0, color: "#888888" },
                    { m_s: 1, mph: 2, color: "#00a5ff" },
                    { m_s: 2, mph: 4, color: "#0894ff" },
                    { m_s: 3, mph: 6, color: "#3481ff" },
                    { m_s: 4, mph: 8, color: "#5970ff" },
                    { m_s: 5, mph: 10, color: "#6a6cff" },
                    { m_s: 6, mph: 12, color: "#7964ff" },
                    { m_s: 7, mph: 14, color: "#8f53e8" },
                    { m_s: 8, mph: 16, color: "#a648b9" },
                    { m_s: 9, mph: 18, color: "#c53c9d" },
                    { m_s: 10, mph: 20, color: "#c43584" },
                    { m_s: 11, mph: 22, color: "#c22d6b", ogOnly: true },
                    { m_s: 12, mph: 24, color: "#c12452", ogOnly: true },
                    { m_s: 13, mph: 26, color: "#c11b3a", ogOnly: true },
                    { m_s: 14, mph: 28, color: "#c11323", ogOnly: true },
                    { m_s: 15, mph: 30, color: "#c10c0c", ogOnly: true },
                ],
            },

            usedDirections: [],
            usedSpeeds: [],

            currentPair: [{}, {}, {}],
            history: [],

            zeroDirection: null,
            doAfterZero: null,
        };
    },
    getters: {
        historyLength() {
            //return amount of items in history where item[0] AND item[1] is not empty
            return this.history.filter(
                (item) => item[0] != {} && item[1].m_s != (null || undefined)
            ).length;
        },
        wsrSpeeds() {
            return this.wind.speeds.filter((speed) => !speed.ogOnly);
        },
    },
    actions: {
        handleClick(ev, type, value) {
            const historyEditorStore = useHistoryEditorStore();

            switch (type) {
                case "direction":
                    if (historyEditorStore.currentlyEditingIndex !== null) {
                        historyEditorStore.currentlyEditingDirectionId =
                            value.id;
                    }

                    this.currentPair[0] = value;

                    break;

                case "speed":
                    if (historyEditorStore.currentlyEditingIndex !== null) {
                        historyEditorStore.currentlyEditingSpeedM_s = value.m_s;
                    }

                    this.currentPair[1] = value;

                    break;
            }

            if (
                this.currentPair[0]?.id &&
                this.currentPair[1]?.m_s !== undefined
            ) {
                if (historyEditorStore.currentlyEditingIndex !== null) {
                    historyEditorStore.save();
                    return;
                }

                this.addToHistory(this.currentPair);
            }
        },
        addToHistory(pair) {
            const settingsStore = useSettingsStore();

            if (pair == null || pair == undefined) {
                return;
            }

            //push it to history
            this.history[this.historyLength] = pair;

            if (this.doAfterZero) {
                this.ogAfterZeroWindProcedure();
            }

            //push direction to used directions
            if (!(pair[1].m_s == 0) || !(settingsStore.game == "og")) {
                if (
                    pair[0].id != "?" &&
                    !this.usedDirections.includes(pair[0])
                ) {
                    this.usedDirections.push(pair[0]);
                }
            } else {
                this.ogZeroWindProcedure();
            }

            this.usedSpeeds.push(pair[1]);

            if (this.historyLength == 8 && settingsStore.game == "og") {
                this.ogHole8Procedure();
            }

            //clear it
            this.currentPair = [{}, {}, {}];

            if (this.historyLength % 8 == 0 && settingsStore.game == "wsr") {
                //autofilling unknown directions//

                let unknownDirection = this.wind.directions.find(
                    (direction) => direction.id === "?"
                );

                let groupOf8 = this.history.slice(
                    this.historyLength / 8 - 1,
                    this.historyLength / 8 + 7
                );

                //if there is exactly one unknown direction in the group of 8
                if (this.usedDirections.length == 7) {
                    //replace the unknown direction in the history with the only one not inside this.usedDirections
                    let unknownPairIndex = groupOf8
                        .map((pair) => pair[0])
                        .indexOf(unknownDirection);

                    let remainingDirection = this.wind.directions.find(
                        (item) =>
                            !this.usedDirections.includes(item) &&
                            item != unknownDirection
                    );

                    this.history[unknownPairIndex][0] = remainingDirection;
                }

                this.usedDirections = [];
            }

            if (this.usedSpeeds.length == 9) {
                this.usedSpeeds = [];
            }
        },
        ogZeroWindProcedure() {
            let zeroDirection = this.history[this.historyLength - 1][0];

            if (zeroDirection.id == "?") {
                return;
            }

            if (this.historyLength == 8) {
                this.history[8][0] = zeroDirection;
                return;
            }

            this.history[this.historyLength][0] = zeroDirection;
            this.history[
                this.historyLength
            ][2].text = `${zeroDirection.id}: 9/16`;

            this.history[8][0] = zeroDirection;
            this.history[8][2].text = `${zeroDirection.id}: 7/16`;

            this.zeroDirection = zeroDirection;

            this.doAfterZero = true;
        },
        ogAfterZeroWindProcedure() {
            let zeroDirection = this.zeroDirection;

            this.usedDirections.push(zeroDirection);

            this.history[8][2] = {};

            if (this.currentPair[0] == zeroDirection) {
                this.history[8][0] = {};
            }

            this.doAfterZero = false;
        },
        ogHole8Procedure() {
            const zeroSpeed = this.wind.speeds.find((speed) => speed.m_s == 0);
            const unusedDirection = this.wind.directions.find(
                (direction) =>
                    !this.usedDirections.includes(direction) &&
                    direction.id != "?"
            );

            const unknownDirection = this.wind.directions.find(
                (direction) => direction.id == "?"
            );

            if (unusedDirection == undefined && this.zeroDirection == null) {
                this.history[8][1] = zeroSpeed;
                this.history[8][0] = unknownDirection;
            } else {
                if (this.usedDirections.length == 7) {
                    if (unusedDirection) {
                        this.history[8][0] = unusedDirection;
                    }
                    this.usedDirections.push(unknownDirection);
                } else if (this.zeroDirection) {
                    // includes everything besides zeroDirection
                    this.usedDirections = this.wind.directions.filter(
                        (direction) => direction != this.zeroDirection
                    );
                }
            }
        },

        reset(resetEditor = true) {
            const historyEditorStore = useHistoryEditorStore();

            this.usedDirections = [];
            this.usedSpeeds = [];
            this.currentPair = [{}, {}, {}];
            this.history = this.createEmptyHistory();
            this.zeroDirection = null;
            this.doAfterZero = null;

            if (resetEditor) {
                historyEditorStore.close();
            }

            historyEditorStore.currentlyEditingIndex = null;
            historyEditorStore.currentlyEditingDirectionId = null;
            historyEditorStore.currentlyEditingSpeedM_s = null;
            historyEditorStore.error = null;
        },
        createEmptyHistory() {
            const settingsStore = useSettingsStore();

            let history = [];

            for (let i = 0; i < settingsStore.holes; i++) {
                history.push([{}, {}, {}]);
            }

            return history;
        },
    },
});
