<template>
    <div class="settings">
        
        <h2>Settings</h2>

        <div class="unit setting">
            <label>Speed unit:</label>
            <select v-model="settingsStore.speedUnit">
                <option value="mph" selected>mph</option>
                <option value="m_s">m/s</option>
            </select>
        </div>

        <div class="reset-hotkey setting">
            <label>Reset hotkey:</label>
            <input type="text" @keydown="handleKey" />
            <label v-if="settingsStore.resetHotkey">{{ settingsStore.resetHotkey }}</label>
        </div>

    </div>
</template>

<script setup>

import { useSettingsStore } from '@/stores/settingsStore';

const settingsStore = useSettingsStore();

const handleKey = (ev) => {
    ev.preventDefault();
    settingsStore.resetHotkey = ev.key;
}


</script>

<style>

.setting {
    font-size: 1.3vw;
}

.setting * {
    display: inline-block;
    margin: 1%
}

.settings div {
    margin: 5%;
}

.setting input {
    width: 10%;
    font-size: 1.3vw;
}

</style>