<template>
    <div class="text-mode">
        <h3>Text Mode</h3>
        <input v-model="windString" @keypress.enter="handleKey" type="text">
    </div>
</template>

<script setup>

import { useSettingsStore } from '@/stores/settingsStore';
import { useWindStore } from '@/stores/windStore';
import { ref } from 'vue';

const settingsStore = useSettingsStore();
const windStore = useWindStore();

let windString = ref("")

const handleKey = (ev) => {
    ev.preventDefault()
    
    console.log(JSON.stringify(parseWindString(windString.value)))

    windStore.addToHistory(parseWindString(windString.value))

    windString.value = ""
}

const parseWindString = (str) => {

    const speedUnit = settingsStore.speedUnit;

    const matchResult = str.match(/\d+/);
    const speedValue = matchResult ? parseInt(matchResult[0], 10) : 0;

    const directionMatch = str.match(/[A-Za-z]+/);
    const direction = directionMatch ? directionMatch[0].toUpperCase() : '';

    const directionObject = windStore.wind.directions.find((dir) => dir.id === direction);
    const speedObject =
    speedUnit === 'mph'
        ? windStore.wind.speeds.find((spd) => spd.mph === speedValue)
        : windStore.wind.speeds.find((spd) => spd.m_s === speedValue);

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
</style>