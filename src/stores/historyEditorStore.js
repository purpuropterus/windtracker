import { defineStore } from "pinia"
import { ref } from "vue"

import { useWindStore } from "./windStore"
import { useSettingsStore } from "./settingsStore"

export const useHistoryEditorStore = defineStore("historyEditor", {
    state: () => {
        return {
            currentlyEditingIndex: null,
            currentlyEditingDirectionId: null,
            currentlyEditingSpeedM_s: null,

            directionsToCheck: [],
            speedsToCheck: [],

            error: ""
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

            if(this.historyRunthrough()){
                this.error = ""
                this.currentlyEditingIndex = null

                this.updateUsed()
            }
        },
        historyRunthrough(){
            
            const windStore = useWindStore()
            const settingsStore = useSettingsStore()

            //only check the last group of 8
            const directionsNum = windStore.history.length % 8
            this.directionsToCheck = windStore.history.slice(-directionsNum).map(group => group[0]).filter(id => id !== "?")
        

            //only check the last group of 9
            const speedsNum = windStore.history.length % 9
            this.speedsToCheck = windStore.history.slice(-speedsNum).map(group => group[1])

            // check for duplicate directions
            for (const direction of this.directionsToCheck) {
                if(this.directionsToCheck.filter(dir => dir === direction).length > 1){
                    this.error = `Direction ${direction.id} appears more than once in the group of 8`
                    return false
                }
            }

            // check for duplicate speeds
            for (const speed of this.speedsToCheck) {
                if(this.speedsToCheck.filter(spd => spd === speed).length > 1){
                    this.error = `Speed ${speed[settingsStore.speedUnit]} appears more than once in the group of 9`
                    return false
                }
            }

            return true

        },
        updateUsed(){
            const windStore = useWindStore()

            windStore.usedDirections = []
            windStore.usedSpeeds = []

            for (const direction of this.directionsToCheck) {
                windStore.usedDirections.push(direction)
            }

            for (const speed of this.speedsToCheck) {
                windStore.usedSpeeds.push(speed)
            }
        },

    }
})