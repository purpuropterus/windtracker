<template>
    <div class="settings">
        
        <h3>Settings</h3>

        <div class="game setting">
            <label>Game:</label>
            <select v-model="settingsStore.game" tabindex="-1">
                <option value="og_1.0">Wii Sports 1.0</option>
                <option value="og_1.1">Wii Sports 1.1/1.2</option>
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
        
        <div class="goldfish-toggle setting">
            <label>Use goldfish</label>
            <input type="checkbox" v-model="settingsStore.goldfishEnabled" tabindex="-1" />
        </div>

    </div>

    <div class="goldfish-settings" v-if="settingsStore.goldfishEnabled">
        <h3>Goldfish Settings</h3>
        <p color="red">{{ goldfishStore.message }}</p>
        <div class="goldfish-server setting">
            <input type="text" v-model="goldfishStore.settings.server" placeholder="Goldfish server" tabindex="-1" />
        </div>
        <div class="goldfish-currentseed setting">
            <input type="text" v-model="goldfishStore.currentSeed" placeholder="Current seed" tabindex="-1" />
        </div>
        <div class="goldfish-chaining setting">
            <label>Use chaining</label>
            <input type="checkbox" v-model="goldfishStore.settings.chaining" tabindex="-1" />
        </div>
        <div class="goldfish-numtocheck setting">
            <input type="number" v-model="goldfishStore.settings.numToCheck" placeholder="Number of advances ahead to check" tabindex="-1" :disabled="!goldfishStore.settings.chaining" />
        </div>
        <div class="goldfish-seedatstartofrun setting">
            <input type="text" v-model="goldfishStore.seedAtStartOfRun" placeholder="Seed at start of run" tabindex="-1" :disabled="!goldfishStore.settings.chaining"  />
        </div>
        <div class="goldfish-lastknownseed setting">
            <input type="text" v-model="goldfishStore.lastKnownSeed" placeholder="Last known seed" tabindex="-1" :disabled="!goldfishStore.settings.chaining" />
        </div>
        <div class="goldfish-customadvance setting">
            <input type="number" v-model="goldfishStore.settings.customAdvanceNumber" placeholder="Custom advance" tabindex="-1" :disabled="!goldfishStore.settings.chaining" />
            <div style="display: flex; gap: 5px;">
                <span style="font-size: 1rem">Custom advance</span>
                <button @click="goldfishStore.advance(goldfishStore.settings.customAdvanceNumber, true); goldfishStore.findSeed()" tabindex="-1" :disabled="!goldfishStore.settings.chaining">+{{ goldfishStore.settings.customAdvanceNumber }}</button>
                <button @click="goldfishStore.unadvance(goldfishStore.settings.customAdvanceNumber, true); goldfishStore.findSeed()" tabindex="-1" :disabled="!goldfishStore.settings.chaining">-{{ goldfishStore.settings.customAdvanceNumber }}</button>
            </div>
        </div>
        <button class="reset-button" @click="goldfishStore.$reset" tabindex="-1">Reset settings to default</button>
    </div>
</template>

<script setup>

import { useGoldfishStore } from '@/stores/goldfishStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useWindStore } from '@/stores/windStore';

const settingsStore = useSettingsStore();
const windStore = useWindStore();
const goldfishStore = useGoldfishStore();

const handleKey = (ev) => {
    ev.preventDefault();
    settingsStore.resetHotkey = ev.key;
}


</script>

<style scoped>

.goldfish-settings, label {
    font-size: 1rem;
}


.reset-button {
    font-size: 16px;
}

.setting {
    margin-bottom: 0.5vh;
}

</style>