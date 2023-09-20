<template>

  <div class="app">

    <!-- <p>currentPair: {{ windStore.currentPair }}</p>

    <p>currentlyEditingIndex: {{ historyEditorStore.currentlyEditingIndex }}</p>

    <p>currentlyEditingDirectionId: {{ historyEditorStore.currentlyEditingDirectionId }}</p>

    <p>currentlyEditingSpeedM_s: {{ historyEditorStore.currentlyEditingSpeedM_s }}</p>
    
    <p>error: {{ historyEditorStore.error }}</p>

    <p>history={{ windStore.history }}</p>
    <p>historyLength={{ windStore.historyLength }}</p>
    <p>usedDirections={{ windStore.usedDirections }}</p>
    <p>usedSpeeds={{ windStore.usedSpeeds }}</p>
    <p>zeroDirection={{ windStore.zeroDirection }}</p> -->


    <div class="parent">

        <div class="top">
          <Directions :directions="windStore.wind.directions"/>
          <Speeds :speeds="settingsStore.game == 'og' ? windStore.wind.speeds : windStore.wsrSpeeds "/>
          <History />
        </div>

        <div class="bottom">
          <div class="bottom-left">
            <TextMode />
          </div>
          <div class="bottom-right">
            <HistoryEditor />
            <Settings />
          </div>
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

import { onMounted } from 'vue';

const windStore = useWindStore();
const settingsStore = useSettingsStore();

</script>

<style>

body {
  background-color: #ddd;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.parent {
  max-height: 100vh;
  height: 100%;
  width: 100%;
  /* display: flex;
  flex-direction: column; */
}


.top {
  height: calc(30vw - 1vw);
  min-height: calc(60vh - 1vw);
  width: calc(100% - 2vw);


  padding-top: 1vw;
  margin: 0 1vw;

  background-color: #ddd;
}

.bottom {

  display: flex;
  flex-direction: row;

  height: 40%;
  width: calc(100% - 2vw);

  margin: 0 1vw;

}

.bottom-left {
  flex: 1;
  height: 100%;
  width: 100%;
}

.bottom-right > * {
  margin-left: 2rem;
}


.bottom-right {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0;
  padding: 0;


  height: 100%;
  width: 100%;
}

select {
    font-size: 1.3vw;
}

label {
    margin-right: 0.3vw;
    font-size: 1.3vw;
}

</style>
