import { defineStore } from "pinia"

import { useWindStore } from "./windStore"

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
            const windStore = useWindStore()

            this.currentlyEditingIndex = index
            this.currentlyEditingDirectionId = windStore.history[index][0].id
            this.currentlyEditingSpeedM_s = windStore.history[index][1].m_s
        },
        save(){
            const windStore = useWindStore()

            windStore.history[this.currentlyEditingIndex][0] = windStore.wind.directions.find(direction => direction.id === this.currentlyEditingDirectionId)
            windStore.history[this.currentlyEditingIndex][1] = windStore.wind.speeds.find(speed => speed.m_s === this.currentlyEditingSpeedM_s)
        }
    }
})