<template>
    <div class="speeds" ref="speedsRef">
        <button 
            v-for="speed in filteredSpeeds" 
            @click="windStore.handleClick($event, 'speed', speed)" 
            class="speeds-item"
            :class="{ highlighted: speed.m_s == windStore.currentPair[1].m_s }" 
            :key="speed.m_s"
        >
            {{ speed[settingsStore.speedUnit] }}
        </button>
    </div>
</template>

<script setup>

import { computed } from 'vue'

import { useSettingsStore } from '@/stores/settingsStore'
import { useWindStore } from '@/stores/windStore'

const props = defineProps({
    speeds: Array
})

const settingsStore = useSettingsStore()
const windStore = useWindStore();

const filteredSpeeds = computed(() => {
    return props.speeds.filter((speed) => !windStore.usedSpeeds.includes(speed));
});


</script>

<style>

.speeds {
    display: inline-block;
    width: 100%;
    text-align: left;
}

.speeds-item {
    margin: 1%;
    height: 50px;
    width: 7.0915%;
    font-weight: bold;
    font-size: 2vw;
}

.highlighted {
border-radius: 4px;
border-color: green
}   

</style>