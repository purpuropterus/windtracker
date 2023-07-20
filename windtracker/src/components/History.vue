<template>

    <div class="history">

        <br>

        <div class="history-item" v-for="item in windStore.history" :key="item.id">
            <p> {{item[1][settingsStore.speedUnit]}}{{ item[0]["id"] }}</p>
        </div>

    </div>

</template>

<script setup>

import { useWindStore } from '@/stores/windStore';
import { useSettingsStore } from '@/stores/settingsStore';

const windStore = useWindStore();
const settingsStore = useSettingsStore();

</script>

<style>

</style>