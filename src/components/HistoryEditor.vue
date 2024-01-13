<template>  

    <div class="history-editor" v-if="historyEditorStore.currentlyEditingIndex !== null">

        <h1>Editing Hole {{ historyEditorStore.currentlyEditingIndex + 1 }}</h1>

        <!-- <div class="direction-select">
            <label>Direction: </label>

            <select name="direction" v-model="historyEditorStore.currentlyEditingDirectionId">
            <option :value="direction.id"
                v-for="direction in windStore.wind.directions"
                :key="direction.id"
            >{{ direction.id }}</option>
            </select>
        </div>

        <div class="speed-select">
            <label>Speed: </label>

            <select name="speed" v-model="historyEditorStore.currentlyEditingSpeedM_s">
            <option :value="speed.m_s"
                v-for="speed in windStore.wind.speeds"
                :key="speed.m_s"
            >{{ speed[settingsStore.speedUnit] }}</option>
            </select>
        </div> -->

        <button class="close" v-if="!historyEditorStore.error" @click="historyEditorStore.close()">Close</button>

        <div class="error" v-if="historyEditorStore.error">
            <p>{{ historyEditorStore.error }}</p>
        </div>

    </div>

</template>



<script setup>

import { useHistoryEditorStore } from '@/stores/historyEditorStore';

const historyEditorStore = useHistoryEditorStore();

</script>



<style scoped>
.error p{
    color:red;
}

.close {
    font-size: 1.3vw;
}

</style>