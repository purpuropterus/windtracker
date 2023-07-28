import { defineStore } from "pinia"
import { ref } from "vue"

import { useWindStore } from "./windStore"

export const useHistoryEditorStore = defineStore("historyEditor", {
    state: () => {
        return {
            currentlyEditingIndex: null,
            currentlyEditingDirectionId: null,
            currentlyEditingSpeedM_s: null,

            error: ""
        }
    },
    actions: {
        handleHistoryClick(index){
            const windStore = useWindStore()

            this.currentlyEditingIndex = index
            this.currentlyEditingDirectionId = windStore.history[index][0].id
            this.currentlyEditingSpeedM_s = windStore.history[index][1].m_s

            console.log(this.error)
        },
        save(){
            const windStore = useWindStore()

            if(!historyRunthrough()){
                return
            }

            windStore.history[this.currentlyEditingIndex][0] = windStore.wind.directions.find(direction => direction.id === this.currentlyEditingDirectionId)
            windStore.history[this.currentlyEditingIndex][1] = windStore.wind.speeds.find(speed => speed.m_s === this.currentlyEditingSpeedM_s)

            this.currentlyEditingIndex = null
        },
        historyRunthrough(){
            
            const windStore = useWindStore()

            //only check the last group of 8
            const directionsNum = windStore.history.length % 8 === 0 ? 8 : windStore.history.length % 8

            //only check the last group of 9
            const speedsNum = windStore.history.length % 9 === 0 ? 9 : windStore.history.length % 9

            

            return true

        },
    }
})