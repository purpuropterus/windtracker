import { defineStore } from "pinia"

export const useHistoryEditorStore = defineStore("historyEditor", {
    state: () => {
        return {
            currentlyEditingIndex: null,
            currentlyEditingDirectionId: null,
            currentlyEditingSpeedM_s: null,
        }
    },
    actions: {
        handleHistoryClick(index){
            console.log("hi")


            this.currentlyEditingIndex = index
        }
    }
})