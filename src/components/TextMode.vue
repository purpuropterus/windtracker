<template>
    <div class="text-mode">
        <h3>Text Mode</h3>
        <input v-model="windString" @keypress.enter="handleKey" type="text" tabindex="0">
        <p class="error" v-if="error"> {{ error }}</p>
    </div>
</template>

<script setup>

import { useSettingsStore } from '@/stores/settingsStore';
import { useWindStore } from '@/stores/windStore';
import { useHistoryEditorStore } from '@/stores/historyEditorStore';
import { ref } from 'vue';

const settingsStore = useSettingsStore();
const windStore = useWindStore();
const historyEditorStore = useHistoryEditorStore();

let windString = ref("")
let error = ref("")

const handleKey = (ev) => {
    ev.preventDefault()

    let pair = parseWindString(windString.value)

    if (pair) {

        if (historyEditorStore.currentlyEditingIndex != null) {
            historyEditorStore.currentlyEditingDirectionId = pair[0].id
            historyEditorStore.currentlyEditingSpeedM_s = pair[1].m_s
            historyEditorStore.save()
        } else {
            windStore.addToHistory(pair)
        }
    }

    windString.value = ""
}

const parseWindString = (str) => {
    
    if (windStore.historyLength == settingsStore.holes) {
        error.value = "History is full"
        return null
    }

    const speedUnit = settingsStore.speedUnit;

    const matchResult = str.match(/\d+/);
    const speedValue = matchResult ? parseInt(matchResult[0], 10) : 0;

    let direction = null

    const directionMatch = str.match(/[A-Za-z?/]+/);
    if (directionMatch) {
        direction = directionMatch[0].toUpperCase();
        if (direction === "?" || direction === "/") {
            direction = "?"; 
        }
    }

    const directionObject = windStore.wind.directions.find((dir) => dir.id === direction);
    const speedObject = windStore.wind.speeds.find((spd) => spd[speedUnit] === speedValue);

    if (!directionObject) {
        error.value = "Invalid direction"
        return null
    }

    if (!speedObject) {
        error.value = "Invalid speed"
        return null
    }

    if (historyEditorStore.currentlyEditingIndex == null){

        if (windStore.usedDirections.includes(directionObject) && directionObject.id !== "?") {
            error.value = "Direction already used"
            return null
        }

        if (windStore.usedSpeeds.includes(speedObject)) {
            error.value = "Speed already used"
            return null
        }

    }

    error.value = ""

    windStore.currentPair = [ directionObject, speedObject, {} ];
    return [ directionObject, speedObject, {} ];

}


</script>

<style scoped>
    
    .text-mode {
        text-align: left;
    }

    .error {
        color: red;
    }

    input {
        height: 100%;
        width: 10rem;
        padding: 1rem;
        font-size: 2rem;
    }

</style>