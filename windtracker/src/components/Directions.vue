<template>
    <div class="directions" ref="directionsRef">
        <button 
            @click="handleClick($event, 'direction', direction)" 
            class="directions-item" 
            :class="{ highlighted: direction.id == windStore.currentPair[0].id }"
            v-for="direction in directions" 
            :key="direction.id"
        >
            <img class="direction-img" draggable="false" :src="direction.img" :alt="direction.id" />
        </button>
    </div>
</template>

<script setup>

import { useWindStore } from '@/stores/windStore'

const props = defineProps({
    directions: Array
})

const windStore = useWindStore()




const handleClick = (ev, type, value) => {

let target = null
let historyIndex = null

switch (type) {
    case "direction":

        if (ev.target.className == "direction-img") {
            target = ev.target.parentNode
        } else {
            target = ev.target
        }

        historyIndex = 0
        
        break

    case "speed":

        target = ev.target

        historyIndex = 1

        break

    }

// ### History ### //

windStore.currentPair[historyIndex] = value

}

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