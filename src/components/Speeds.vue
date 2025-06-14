<template>
    <div class="speeds" ref="speedsRef">

        <div class="speeds-buttons" 
            v-if="!(windStore.historyLength==settingsStore.holes)" 
            :style="{gridTemplateColumns: settingsStore.game == 'og' ? 'repeat(17, 1fr)' : 'repeat(12, 1fr)'}"
        >

            <button 
                v-for="speed in (historyEditorStore.currentlyEditingIndex != null ? speeds : filteredSpeeds)" 
                @click="windStore.handleClick($event, 'speed', speed)" 
                class="speeds-item"
                :class="{ highlighted: speed.m_s == windStore.currentPair[1].m_s, unknown: speed.m_s === 17 }" 
                :key="speed.m_s"
                :style="{ backgroundColor: speed.color }"
            >
                <div class="color-overlay" v-if="speed.m_s === 17" />
                {{ speed.m_s === 17 ? '?' : speed[settingsStore.speedUnit] }}
            </button>

        </div>

    </div>
</template>

<script setup>

import { computed } from 'vue'

import { useSettingsStore } from '@/stores/settingsStore'
import { useWindStore } from '@/stores/windStore'
import { useHistoryEditorStore } from '@/stores/historyEditorStore'

const props = defineProps({
    speeds: Array
})

const settingsStore = useSettingsStore()
const windStore = useWindStore();
const historyEditorStore = useHistoryEditorStore();

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
    border: 0px solid;
    position: relative;
}

.highlighted {
    border: 2px solid;
    border-color: green
}   

.highlighted.unknown {
  border-color: #FFDD82;
}

.color-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: .9;
  background-color: #FFAE42;
  z-index: 5;
}

</style>