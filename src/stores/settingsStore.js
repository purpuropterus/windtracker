import { defineStore } from "pinia"

export const useSettingsStore = defineStore("settings", {
    state: () => {
        return {
            speedUnit: "mph",
            holes: 18,
            resetHotkey: null,
        }
    }
})