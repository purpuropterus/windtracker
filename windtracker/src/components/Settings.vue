<template>
    <div class="settings">
        <h2>Settings</h2>
        <div class="unit">
            <label>Speed unit:</label>
            <select v-model="settingsStore.speedUnit">
                <option value="mph" selected>mph</option>
                <option value="m_s">m/s</option>
            </select>
        </div>

    </div>
</template>

<script setup>

import { useSettingsStore } from '@/stores/settingsStore';

const settingsStore = useSettingsStore();

</script>

<style>

</style>