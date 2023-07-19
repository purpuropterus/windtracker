<template>
    <div class="speeds">
        <button class="speeds-item" v-for="speed in speeds" :key="speed.m_s">
            {{ speed.m_s }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'Speeds',
    props: ["speeds"],
    setup(){

    }
}
</script>

<style>

    .speeds {
        display: flex;
        flex-direction: row;
        width: 100%;
    }

    .speeds-item {
        flex: 1;
        margin: 1%;
        height: 60px;
        width: 100px;
        font-weight: bold;
        font-size: 2vw;
    }

</style>