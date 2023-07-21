<template>
  <div class="history">
    <div class="history-item" v-for="(item, index) in windStore.history" :key="item.id">
      <div class="history-item-image">
        <img :src="item[0].img" :alt="item[0].id" :style="{backgroundColor: item[1].color}" />
        <div class="index-container">
          <p class="history-item-index">{{ index + 1 }}</p>
        </div>
        <p class="history-item-id">{{ item[1][settingsStore.speedUnit] }}{{ item[0]["id"] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWindStore } from '@/stores/windStore';
import { useSettingsStore } from '@/stores/settingsStore';

const windStore = useWindStore();
const settingsStore = useSettingsStore();
</script>

<style>
.history {
  width: 100%;
  text-align: left;
  margin-left: 5px;
}

.history-item {
  margin-bottom: 10px;
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 4.956%;
  height: 5%;
  margin: 0.3%;
}

.history-item-image {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.history-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.index-container {
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.1vw;
  color: white;
  display: flex;
  align-items: center;
}

.history-item-index {
  margin: 0;
  font-weight: bold;
  font-size: 0.9vw;
}

.history-item-id {
  margin: 0;
  font-size: 1vw;
  font-weight: bold;
  position: absolute;
  top: 50%; /* Center the text vertically */
  left: 50%; /* Center the text horizontally */
  transform: translate(-50%, -50%); /* Adjust both vertical and horizontal positions */
  color: white;
}
</style>
