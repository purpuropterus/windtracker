<template>
    <div class="speeds" ref="speedsRef">
        <button 
            @click="windStore.handleClick($event, 'speed', speed)" 
            class="speeds-item"
            :class="{ highlighted: speed.m_s == windStore.currentPair[1].m_s }" 
            v-for="speed in speeds" 
            :key="speed.m_s"
        >
            {{ speed[settingsStore.speedUnit] }}
        </button>
    </div>
</template>

<script setup>

import { useSettingsStore } from '@/stores/settingsStore';
import { useWindStore } from '@/stores/windStore';

const props = defineProps({
    speeds: Array
})

const settingsStore = useSettingsStore();
const windStore = useWindStore();


</script>

<style>

.speeds {
    display: inline-block;
    width: 100%;
    text-align: left;
}

.speeds-item {
    margin: 1%;
    height: 60px;
    width: 7.0915%;
    font-weight: bold;
    font-size: 2vw;
}

.highlighted {
border-radius: 4px;
border-color: green
}   

</style>