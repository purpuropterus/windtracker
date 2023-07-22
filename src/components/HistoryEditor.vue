<template>  

    <h3>Edit Hole x</h3>

    <div class="direction-select">
        <label>Direction: </label>

        <select name="direction" id="">
        <option :value="direction.id"
            v-for="direction in windStore.wind.directions"
            :key="direction.id"
        >{{ direction.id }}</option>
        </select>

    </div>

    <div class="speed-select">
        <label>Speed: </label>

        <select name="speed" id="">
        <option :value="speed.mph"
            v-for="speed in windStore.wind.speeds"
            :key="speed.m_s"
        >{{ speed[settingsStore.speedUnit] }}</option>
        </select>
    </div>

    <button class="save">Save</button>

</template>



<script setup>

import { useWindStore } from '@/stores/windStore';
import { useSettingsStore } from '@/stores/settingsStore';

const windStore = useWindStore();
const settingsStore = useSettingsStore();

</script>



<style>

</style>