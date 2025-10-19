<template>

  <div class="app">

    <!-- <p>currentPair: {{ windStore.currentPair }}</p>

    <p>currentlyEditingIndex: {{ historyEditorStore.currentlyEditingIndex }}</p>

    <p>currentlyEditingDirectionId: {{ historyEditorStore.currentlyEditingDirectionId }}</p>

    <p>currentlyEditingSpeedM_s: {{ historyEditorStore.currentlyEditingSpeedM_s }}</p>
    
    <p>error: {{ historyEditorStore.error }}</p>

    <p>history={{ windStore.history }}</p> 
    <p>goldfishHistory: {{ goldfishStore.goldfishHistory }}</p>
 

    <p>historyLength={{ windStore.historyLength }}</p>
    <p>usedDirections={{ windStore.usedDirections }}</p>
    <p>usedSpeeds={{ windStore.usedSpeeds }}</p>
    <p>zeroDirection={{ windStore.zeroDirection }}</p> -->

    <div class="parent">

        <div class="top">
          <Directions :directions="windStore.wind.directions"/>
          <Speeds :speeds="settingsStore.game.startsWith('og') ? windStore.wind.speeds : windStore.wsrSpeeds "/>
          <History />
        </div>

        <div class="bottom">
          <div class="bottom-left">
            <div class="text-mode-div">
                <TextMode />
            </div>
            <button class="mobile-reset-button" @click="windStore.reset">Reset</button>
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
import History from '@/components/History.vue'
import HistoryEditor from '@/components/HistoryEditor.vue'
import KeyboardListener from '@/components/KeyboardListener.vue'
import Settings from '@/components/Settings.vue'
import Speeds from '@/components/Speeds.vue'
import TextMode from '@/components/TextMode.vue'

import { useWindStore } from '@/stores/windStore'
import { useGoldfishStore } from './stores/goldfishStore'
import { useHistoryEditorStore } from './stores/historyEditorStore'
import { useSettingsStore } from './stores/settingsStore'

const windStore = useWindStore();
const settingsStore = useSettingsStore();
const goldfishStore = useGoldfishStore();
const historyEditorStore = useHistoryEditorStore();

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
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}


.top {
display: flex;
flex-direction: column;

flex: 1 1 auto;

  width: calc(100% - 2vw);


  padding-top: 1vw;
  margin: 0 1vw;

  background-color: #ddd;
}

.bottom {

  display: flex;
  flex-direction: row;
  flex: 0 0 auto;


  height: auto;
  width: calc(100% - 2vw);

  margin: 0 1vw;

}

.bottom-left {
  flex: 1;
  height: 100%;
  width: 100%;
}

.text-mode-div {
    @media (pointer: coarse) {
        display: none;
    }
}

.mobile-reset-button {
    margin-top: 1rem;
    font-size: 2rem;
    padding: 0.5rem 1rem;

    display: none;
    @media (pointer: coarse) {
        display: block;
    }
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
