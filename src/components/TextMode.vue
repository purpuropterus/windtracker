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

    let parsed = parse(windString.value);

    // if direction is "D", that means edit

    if (parsed[0] === "D") {

        // make sure the second part falls in the number of holes
        if (parsed[1] > settingsStore.holes || parsed[1] < 1) {
            error.value = "Invalid hole number"
            return;
        }

        // make sure the hole we are trying to edit is filled
        if (parsed[1] > windStore.historyLength) {
            error.value = `Hole ${parsed[1]} is empty`
            return;
        }

        // interpret the speed as a hole to edit
        historyEditorStore.currentlyEditingIndex = parsed[1] - 1;

        historyEditorStore.currentlyEditingDirectionId = windStore.history[historyEditorStore.currentlyEditingIndex][0].id;
        historyEditorStore.currentlyEditingSpeedM_s = windStore.history[historyEditorStore.currentlyEditingIndex][1].m_s;

        // clear textbox
        windString.value = ""

        return;
    }

    // else we are either editing currently, or adding a new entry

    // convert the parsed values into a pair of [direction, speed],
    // and validate it along the way

    const pair = validateParsed(parsed);

    // return null means it wasn't valid
    if (pair == null) {
        return;
    }

    // if we are currently editing, update the existing entry
    if (historyEditorStore.currentlyEditingIndex != null) {
        historyEditorStore.currentlyEditingDirectionId = pair[0].id
        historyEditorStore.currentlyEditingSpeedM_s = pair[1].m_s
        historyEditorStore.save()
    } 
    // else, we are adding a new entry
    else {
        // don't allow adding new if the history is full
        if (windStore.historyLength == settingsStore.holes) {
            error.value = "History is full";
            return;
        }
        windStore.addToHistory(pair)
    }

    // clear textbox
    windString.value = ""
}

const parse = (str) => {
    // return an array of [direction, speed]

    const direction = str.match(/[A-Za-z?/]+/) ? str.match(/[A-Za-z?/]+/)[0].toUpperCase() : "";

    const speedMatch = str.match(/\d+/);
    const speed = speedMatch ? parseInt(speedMatch[0], 10) : 999;

    return [direction, speed];
}

const validateParsed = (parsed) => {
    // return a pair of [direction, speed, {}]

    const directionObject = windStore.wind.directions.find((dir) => dir.id === parsed[0]);
    const speedObject = windStore.wind.speeds.find((spd) => spd[settingsStore.speedUnit] === parsed[1]);

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

    return [directionObject, speedObject, {}];
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