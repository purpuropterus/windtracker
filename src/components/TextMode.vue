<template>
    <div class="text-mode">
        <h3>Text Mode</h3>
        <input 
            class="text-mode-input" 
            ref="textModeInput" 
            v-model="windString" 
            @keypress.enter="handleKey"

            type="text"
        >
        <p class="error" v-if="error"> {{ error }}</p>
    </div>
</template>

<script setup>

import { useSettingsStore } from '@/stores/settingsStore';
import { useWindStore } from '@/stores/windStore';
import { ref } from 'vue';

const settingsStore = useSettingsStore();
const windStore = useWindStore();

let windString = ref("")
let error = ref("")

const handleKey = (ev) => {
    ev.preventDefault()
    
    windStore.addToHistory(parseWindString(windString.value))

    windString.value = ""
}

const parseWindString = (str) => {

    //todo: make capability for putting "?" as a direction (when you miss the direction on 0 wind)

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
    const speedObject =
    speedUnit === 'mph'
        ? windStore.wind.speeds.find((spd) => spd.mph === speedValue)
        : windStore.wind.speeds.find((spd) => spd.m_s === speedValue);

    if (!directionObject) {
        error.value = "Invalid direction"
        return null
    }

    if (!speedObject) {
        error.value = "Invalid speed"
        return null
    }

    if (windStore.usedDirections.includes(directionObject) && directionObject.id !== "?") {
        error.value = "Direction already used"
        return null
    }

    if (windStore.usedSpeeds.includes(speedObject)) {
        error.value = "Speed already used"
        return null
    }

    error.value = ""

    return [ directionObject, speedObject ];

}


</script>

<style>
    
    .text-mode {
        text-align: left;
    }
    
    .text-mode * {
        display:inline-block;
        margin: 1%;
    }

    .error {
        color: red;
    }

</style>