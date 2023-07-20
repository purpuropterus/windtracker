<template>

    <div class="history">

        <p> {{ windStore.currentPair }}</p>

        <div class="history-item" v-for="item in windStore.history" :key="item.id">
            <p> {{item[1]["m_s"]}}{{ item[0]["id"] }}</p>
        </div>

    </div>

</template>

<script setup>

import { useWindStore } from '@/stores/windStore';

const windStore = useWindStore();

</script>

<style>

</style>