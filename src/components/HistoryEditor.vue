<template>  

    <div class="history-editor" v-if="historyEditorStore.currentlyEditingIndex != null">

        <h3>Edit Hole {{ historyEditorStore.currentlyEditingIndex + 1 }}</h3>

        <div class="direction-select">
            <label>Direction: </label>

            <select name="direction" v-model="historyEditorStore.currentlyEditingDirectionId">
            <option :value="direction.id"
                v-for="direction in windStore.wind.directions"
                :key="direction.id"
            >{{ direction.id }}</option>
            </select>

            <p>{{ historyEditorStore.currentlyEditingDirectionId }}</p>

        </div>

        <div class="speed-select">
            <label>Speed: </label>

            <select name="speed" v-model="historyEditorStore.currentlyEditingSpeedM_s">
            <option :value="speed.m_s"
                v-for="speed in windStore.wind.speeds"
                :key="speed.m_s"
            >{{ speed[settingsStore.speedUnit] }}</option>
            </select>

            <p>{{ historyEditorStore.currentlyEditingSpeedM_s }}</p>
        </div>

        <button class="save" @click="historyEditorStore.save()">Save</button>

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