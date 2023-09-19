<template>
    <div class="settings">
        
        <h3>Settings</h3>

        <div class="game setting">
            <label>Game:</label>
            <select v-model="settingsStore.game" tabindex="-1">
                <option value="og">Wii Sports</option>
                <option value="wsr" selected>Wii Sports Resort</option>
            </select>
        </div>

        <div class="unit setting">
            <label>Speed unit:</label>
            <select v-model="settingsStore.speedUnit" tabindex="-1">
                <option value="mph" selected>mph</option>
                <option value="m_s">m/s</option>
            </select>
        </div>

        <div class="holes setting">
            <label>Holes:</label>
            <select v-model="settingsStore.holes" tabindex="-1">
                <option value="9" selected>9</option>
                <option v-if="settingsStore.game == 'wsr'" value="18">18</option>
            </select>
        </div>

        <div class="reset-hotkey setting">
            <label>Reset hotkey:</label>
            <input type="text" @keydown="handleKey" tabindex="-1" />
            <label v-if="settingsStore.resetHotkey">{{ settingsStore.resetHotkey }}</label>
        </div>

        <button class="reset-button" @click="windStore.reset" tabindex="-1">Reset</button>

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


.setting input {
    width: 10%;
    font-size: 1.3vw;
    margin-right: 0.3vw;
}
.reset-button {
    font-size: 1.3vw;
}

.setting {
    margin-bottom: 0.5vh;
}

</style>