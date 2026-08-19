<template>
    <div class="advance">
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
                <label for="target-seed">target seed</label>
                <input
                    id="target-seed"
                    type="text"
                    v-model="settingsStore.targetSeed"
                />
            </div>
        </div>
        <button @click="showInstructions">show instructions</button>
        <p v-if="error" style="color: red">{{ error }}</p>
        <AdvanceResults
            v-if="jsonData"
            :jsonData="jsonData"
            :distance="distance"
        />
    </div>
</template>

<script setup>
import AdvanceResults from "@/components/AdvanceResults.vue";
import { useGoldfishStore } from "@/stores/goldfishStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { onMounted, ref } from "vue";

import { pcgDistance } from "@/rng_util";

const goldfishStore = useGoldfishStore();
const settingsStore = useSettingsStore();

const jsonData = ref(null);
const distance = ref(null);
const error = ref(null);

onMounted(async () => {
    jsonData.value = await fetch("/advance.json").then((res) => res.json());
});

function showInstructions() {
    if (settingsStore.targetSeed === null || settingsStore.targetSeed === "") {
        error.value = "target seed not set";
        return;
    }

    if (
        goldfishStore.lastKnownSeed === null ||
        goldfishStore.lastKnownSeed === ""
    ) {
        error.value = "current seed not set";
        return;
    }

    let current = BigInt(goldfishStore.lastKnownSeed);
    if (settingsStore.game === "og_1.0") current & 0xffffn;

    const target = BigInt(settingsStore.targetSeed);

    const a = settingsStore.game === "wsr" ? 0x41c64e6dn : 69069n;
    const c = settingsStore.game === "wsr" ? 0x3039n : 1n;
    const m = settingsStore.game === "og_1.0" ? 2n ** 16n : 2n ** 32n;

    distance.value = pcgDistance(current, target, a, c, m);
}
</script>

<style scoped>
.advance {
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
    /* transition: background 0.15s ease; */
}
</style>
