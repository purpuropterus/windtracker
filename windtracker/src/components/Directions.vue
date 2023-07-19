<template>
    <div class="directions">
        <button class="directions-item" v-for="direction in directions" :key="direction.id">
            <img :src="direction.img" :alt="direction.id" />
        </button>
    </div>
</template>

<script>
export default {
    name: 'Directions',
    props: ["directions"],
    setup(){

    }
}
</script>

<style>

/* make the buttons smaller */

.directions {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.directions-item {
    flex: 1;
    margin: 1%;
}

.directions-item img {
    max-width: 100%;
}

</style>