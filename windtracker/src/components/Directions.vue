<template>
  <div class="directions" ref="directionsRef">
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
</template>

<script setup>
import { useWindStore } from '@/stores/windStore';
import { computed } from 'vue';

const props = defineProps({
  directions: Array
});

const windStore = useWindStore();

const filteredDirections = computed(() => {
  return props.directions.filter((direction) => !windStore.usedDirections.includes(direction));
});
</script>

<style>
.directions {
  display: inline-block;
  text-align: left;
  width: 100%;
}

.directions-item {
  margin: 1%;
  width: 10.5%;
  position: relative;
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
  white-space: nowrap; /* Prevent text from wrapping */
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
