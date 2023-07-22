<template>

  <div class="app">



    <div class="parent">

      <div class="left">
        <Directions :directions="windStore.wind.directions"/>
        <Speeds :speeds="windStore.wind.speeds"/>
        <History />
        <TextMode />
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

const windStore = useWindStore();
const settingsStore = useSettingsStore();

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
}

.right {
  width: 100%;
  flex: 0.2;
}


</style>
