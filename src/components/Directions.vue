<template>

  <div class="directions" ref="directionsRef">

    <div class="directions-buttons" v-if="!(windStore.history.length==settingsStore.holes)">

      <button
        v-for="direction in filteredDirections"
        :key="direction.id"
        @click="windStore.handleClick($event, 'direction', direction)"
        class="directions-item"
        :class="{ highlighted: direction.id === windStore.currentPair[0].id }"
      >
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
import { computed } from 'vue';

const props = defineProps({
  directions: Array
});

const windStore = useWindStore();
const settingsStore = useSettingsStore();

const filteredDirections = computed(() => {

  const unknownDirection = windStore.wind.directions.find((dir) => dir.id === "?");
  return (props.directions.filter((direction) => !windStore.usedDirections.includes(direction) || direction == unknownDirection )) 

});

</script>

<style scoped>
.directions {
  display: inline-block;
  text-align: left;
  width: 100%;
  min-height: 80px;
}

.directions-item {
  margin: 1%;
  width: 9.1111%;
  position: relative;
  background-color: black
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
  border-radius: 4px;
  border-color: green;
}
</style>
