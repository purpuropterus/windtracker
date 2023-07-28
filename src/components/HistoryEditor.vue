<template>  

    <div class="history-editor" v-if="historyEditorStore.currentlyEditingIndex != null">

        <h3>Edit Hole {{ historyEditorStore.currentlyEditingIndex + 1 }}</h3>

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

    </div>

</template>



<script setup>

import { useWindStore } from '@/stores/windStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useHistoryEditorStore } from '@/stores/historyEditorStore';

const windStore = useWindStore();
const settingsStore = useSettingsStore(); 
const historyEditorStore = useHistoryEditorStore();

</script>



<style scoped>

</style>