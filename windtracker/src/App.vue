<template>
  <div class="parent">
    <div class="left">
      <Directions :directions="windStore.wind.directions"/>
      <Speeds :speeds="windStore.wind.speeds"/>
      <History />
    </div>
    <div class="right">
      <Settings />
    </div>
  </div>
</template>

<script setup>

import Directions from '@/components/Directions.vue'
import Speeds from '@/components/Speeds.vue'
import Settings from '@/components/Settings.vue'
import History from '@/components/History.vue'

import { useWindStore } from '@/stores/windStore';
const windStore = useWindStore();

</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
  flex: 0.3;
}


</style>
