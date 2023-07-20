<template>
    <div class="directions" ref="directionsRef">
      <button
        v-for="direction in filteredDirections"
        :key="direction.id"
        @click="windStore.handleClick($event, 'direction', direction)"
        class="directions-item"
        :class="{ highlighted: direction.id == windStore.currentPair[0].id }"
      >
        <img class="direction-img" draggable="false" :src="direction.img" :alt="direction.id" />
      </button>
    </div>
  </template>
  
  
  
  
<script setup>

import { useWindStore } from '@/stores/windStore'
import { computed } from 'vue'

const props = defineProps({
    directions: Array
})

const windStore = useWindStore()

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
    width: 10.5%
}

.directions-item img {
    max-width: 100%;
}

.highlighted{
    border-radius: 4px;
    border-color: green
}

</style>