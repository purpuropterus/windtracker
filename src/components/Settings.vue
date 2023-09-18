<template>
    <div class="settings">
        
        <h3>Settings</h3>

        <div class="game setting">
            <label>Game:</label>
            <select v-model="settingsStore.game">
                <option value="og">Wii Sports</option>
                <option value="wsr" selected>Wii Sports Resort</option>
            </select>
        </div>

        <div class="unit setting">
            <label>Speed unit:</label>
            <select v-model="settingsStore.speedUnit">
                <option value="mph" selected>mph</option>
                <option value="m_s">m/s</option>
            </select>
        </div>

        <div class="holes setting">
            <label>Holes:</label>
            <select v-model="settingsStore.holes">
                <option value="9" selected>9</option>
                <option v-if="settingsStore.game == 'wsr'" value="18">18</option>
            </select>
        </div>

        <div class="reset-hotkey setting">
            <label>Reset hotkey:</label>
            <input type="text" @keydown="handleKey" />
            <label v-if="settingsStore.resetHotkey">{{ settingsStore.resetHotkey }}</label>
        </div>

        <button class="reset-button" @click="windStore.reset">Reset</button>

    </div>
</template>

<script setup>

import { useSettingsStore } from '@/stores/settingsStore';
import { useWindStore } from '@/stores/windStore';
import { ref, watch } from 'vue';

const settingsStore = useSettingsStore();
const windStore = useWindStore();

const handleKey = (ev) => {
    ev.preventDefault();
    settingsStore.resetHotkey = ev.key;
}


</script>

<style scoped>

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