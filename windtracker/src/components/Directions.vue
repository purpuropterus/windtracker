<template>
    <div class="directions" ref="directionsRef">
        <button @click="windStore.handleClick($event, 'direction', direction)" class="directions-item" v-for="direction in directions" :key="direction.id">
            <img class="direction-img" draggable="false" :src="direction.img" :alt="direction.id" />
        </button>
    </div>
</template>

<script setup>


import { useWindStore } from '@/stores/windStore';

const props = defineProps({
    directions: Array
})

const windStore = useWindStore();

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

</style>