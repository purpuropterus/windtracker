<template>

  <div class="directions" ref="directionsRef">

    <div class="directions-buttons" v-if="(windStore.historyLength !== settingsStore.holes) || (historyEditorStore.currentlyEditingIndex !== null)">

      <button
        v-for="direction in (historyEditorStore.currentlyEditingIndex !== null ? directions : filteredDirections)"
        :key="direction.id"
        @click="windStore.handleClick($event, 'direction', direction)"
        class="directions-item"
        :class="{ 
          highlighted: direction.id === windStore.currentPair[0].id,
          unknown: direction.id === '?'
        }"
      >
        <div 
          class="color-overlay"
          v-if="direction.id === '?'"
        />
        <div class="image-container">
          <img class="direction-img" draggable="false" :src="direction.img" :alt="direction.id" />
          <div class="text-overlay">
            <p class="direction-id">{{ direction.id }}</p>
          </div>
        </div>
      </button>

    </div>

  </div>
</template>

<script setup>
import { useWindStore } from '@/stores/windStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useHistoryEditorStore } from '@/stores/historyEditorStore';
import { computed } from 'vue';

const props = defineProps({
  directions: Array
});

const windStore = useWindStore();
const settingsStore = useSettingsStore();
const historyEditorStore = useHistoryEditorStore();

const filteredDirections = computed(() => {

  return (props.directions.filter((direction) => !windStore.usedDirections.includes(direction) )) 

});

</script>

<style scoped>
.directions {
  text-align: left;
  width: 100%;
}

.directions-buttons {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 0.5vw;
}

.directions-item {
  position: relative;
  background-color: black;
  border: none;
}

.directions-item img {
  max-width: 100%;
}

.image-container {
  position: relative;
  display: inline-block;
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  padding: 4px;
  font-weight: bold;
  white-space: nowrap;
  font-size: 2vw;
}

.direction-id {
  margin: 0;
}

.highlighted {
  border: 2px solid;
  border-radius: 4px;
  border-color: green;
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
