<template>
    <div class="speeds" ref="speedsRef">

        <div class="speeds-buttons" 
            v-if="(windStore.historyLength != settingsStore.holes) || (historyEditorStore.currentlyEditingIndex != null)" 
            :style="{gridTemplateColumns: settingsStore.game == 'og' ? 'repeat(16, 1fr)' : 'repeat(11, 1fr)'}"
        >

            <button 
                v-for="speed in filteredSpeeds" 
                @click="windStore.handleClick($event, 'speed', speed)" 
                class="speeds-item"
                :class="{ highlighted: speed.m_s == windStore.currentPair[1].m_s }" 
                :key="speed.m_s"
                :style="{ backgroundColor: speed.color }"
            >
                {{ speed[settingsStore.speedUnit] }}
            </button>

        </div>

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

<style scoped>

.speeds {
    margin-top: 0.7vh;
    margin-bottom: 4vh;
    width: 100%;
    text-align: left;
    height: 60px;

}

.speeds-buttons {
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    gap: 0.5vw;
    height: 60px
}

.speeds-item {
    font-weight: bold;
    font-size: 2vw;
    color: white;
}

.highlighted {
border-radius: 4px;
border-color: green
}   

</style>