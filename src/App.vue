<template>

  <div class="app">

    <!-- <p>currentlyEditingIndex: {{ historyEditorStore.currentlyEditingIndex }}</p>
    <p>currentlyEditingDirectionId: {{ historyEditorStore.currentlyEditingDirectionId }}</p>
    <p>currentlyEditingSpeedM_s: {{ historyEditorStore.currentlyEditingSpeedM_s }}</p>
    <p>error: {{ historyEditorStore.error }}</p> -->

    <!-- <p>{{ windStore.history }}</p>
    <p>historyLength={{ windStore.historyLength }}</p>
    <p>usedDirections={{ windStore.usedDirections }}</p>
    <p>usedSpeeds={{ windStore.usedSpeeds }}</p>
    <p>zeroDirection={{ windStore.zeroDirection }}</p> -->


    <div class="parent">

      <div class="left">

        <div class="top-left">
          <Directions :directions="windStore.wind.directions"/>
          <Speeds :speeds="settingsStore.game == 'og' ? windStore.wind.speeds : windStore.wsrSpeeds "/>
          <History />
        </div>

        <div class="bottom-left">
          <TextMode />
        </div>

      </div>

      <div class="right">
        <HistoryEditor />
        <Settings />
      </div>

    </div>

    <KeyboardListener />



    
  </div>

</template>

<script setup>

import Directions from '@/components/Directions.vue'
import Speeds from '@/components/Speeds.vue'
import Settings from '@/components/Settings.vue'
import History from '@/components/History.vue'
import KeyboardListener from '@/components/KeyboardListener.vue'
import TextMode from '@/components/TextMode.vue'
import HistoryEditor from '@/components/HistoryEditor.vue'

import { useWindStore } from '@/stores/windStore';
import { useSettingsStore } from './stores/settingsStore';
import { useHistoryEditorStore } from './stores/historyEditorStore';

import { onMounted } from 'vue';

const windStore = useWindStore();
const settingsStore = useSettingsStore();
const historyEditorStore = useHistoryEditorStore();

</script>

<style>

body {
  background-color: #ddd;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.parent {
  display: flex;
  flex-flow: row;
}

.left {
  width: 100%;
  flex: 1;
  height: 100%;
}



.right {
  width: 100%;
  flex: 0.2;
}


</style>
