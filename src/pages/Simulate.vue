<template>
    <div class="simulate">
        <div class="inputs">
            <div class="input">
                <label>game</label>
                <select v-model="settingsStore.game" tabindex="-1">
                    <option value="og_1.0">Wii Sports 1.0</option>
                    <option value="og_1.1">Wii Sports 1.1/1.2</option>
                    <option value="wsr" selected>Wii Sports Resort</option>
                </select>
            </div>
            <div class="input">
                <label for="current-seed">current seed</label>
                <input
                    id="current-seed"
                    type="text"
                    v-model="goldfishStore.lastKnownSeed"
                />
            </div>
            <div class="input">
                <label></label>
                <button @click="setToTarget">set to target seed</button>
            </div>
        </div>
        <Simulation :currentSeed="goldfishStore.lastKnownSeed" />
    </div>
</template>

<script setup>
import { useGoldfishStore } from "@/stores/goldfishStore";
import { useSettingsStore } from "@/stores/settingsStore";

import { pcgDistance } from "@/rng_util.js";

import Simulation from "@/components/Simulation.vue";

const goldfishStore = useGoldfishStore();
const settingsStore = useSettingsStore();

function setToTarget() {
    if (settingsStore.game !== "og_1.0") {
        goldfishStore.initialize(settingsStore.targetSeed);
    } else {
        // get the distance between the current seed and the target seed
        const distance = pcgDistance(
            parseInt(goldfishStore.lastKnownSeed),
            parseInt(settingsStore.targetSeed),
            69069,
            1,
            2 ** 16,
        );
        // set the target seed to that many advances of the current seed
        goldfishStore.advance(distance);
    }
}
</script>

<style scoped>
.simulate {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.input {
    display: inline-flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
}

.input label {
    font-size: 1rem;
    min-height: 1.25rem;
}

.input input,
.input select {
    width: 12rem;
    padding: 0.45rem 0.6rem;
    border: 1px solid #c7d0d9;
    border-radius: 0.375rem;
    background: #fff;
    color: #2c3e50;
    font: inherit;
}

button {
    align-self: flex-start;
    padding: 0.55rem 1.1rem;
    border: none;
    border-radius: 0.375rem;
    background: #222;
    color: #fff;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
}
</style>
