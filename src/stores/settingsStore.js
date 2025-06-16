import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
    state: () => {
        return {
            game: "wsr",
            speedUnit: "mph",
            holes: 9,
            resetHotkey: null,
            goldfishEnabled: false,
        };
    },

    persist: true,
});
