<template>

  <!-- todo: click last element to undo -->

  <!-- <div> -->
    <!-- <p>{{ windStore.history }}</p> -->
    <div class="history"
      :style="{
        gridTemplateColumns: `repeat(${settingsStore.holes}, 1fr)`,
      }"
    >

      <div 
        class="history-item" 
        :class="{ highlighted: index == historyEditorStore.currentlyEditingIndex }"
        v-for="(item, index) in history" 
        :key="item.id"
      >

        <div class="history-item-image" 
          @click="(Object.keys(item[0]).length && Object.keys(item[1]).length) ? historyEditorStore.handleHistoryClick(index) : null" 
          :style="{
            backgroundColor: JSON.stringify(item) !== JSON.stringify([{},{},{}]) // to get === [{},{},{}] to work
              ? (item[1].color ? item[1].color : 'black')
              : 'white'
          }" 
        >

          <div class="bg-div">

          </div>
          <img :src="Object.keys(item[0]).length ? item[0].img : emptyImage" :alt="item[0].id" />
          <div class="index-container" :style="{backgroundColor: historyEditorStore.currentlyEditingIndex == index ? 'green' : 'black' }">
            <p class="history-item-index">{{ index + 1 }}</p>
          </div>
          <p v-if="item[2].text" class="history-item-id">{{ item[2].text }}</p>
          <p 
            v-else 
            class="history-item-id"
            :style="{
                fontSize: settingsStore.holes == 9 ? '3vw' : '1.5vw',
            }"
          >
            {{ item[1].m_s === 17 ? '?' : item[1][settingsStore.speedUnit] }}<!--{{ item[0]["id"] }}-->
        </p>
        </div>
      </div>

      <button class="copy-button" @click="onClickCopy">Copy</button>
    </div>
  <!-- </div> -->
</template>

<script setup>
import { computed } from 'vue';

import emptyImage from "@/assets/empty.png";

import { useGoldfishStore } from '@/stores/goldfishStore';
import { useHistoryEditorStore } from '@/stores/historyEditorStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useWindStore } from '@/stores/windStore';

const windStore = useWindStore();
const settingsStore = useSettingsStore();
const historyEditorStore = useHistoryEditorStore();
const goldfishStore = useGoldfishStore();

windStore.history = windStore.createEmptyHistory()

const history = computed(() => {
  return (goldfishStore.goldfishHistory && goldfishStore.goldfishHistory.length > 0)
    ? goldfishStore.goldfishHistory
    : windStore.history;
});

const historyString = computed(() => {
    return history.value.reduce((acc, item) => {
        const direction = item[0].id || "?";
        const speed = item[1].m_s !== undefined ? item[1].m_s : "?";
        
        if (direction === "?" && speed === "?") {
            return acc;
        }

        acc.push(`${speed}${direction}`);

        return acc;
    }, []).join(" ");
});

const onClickCopy = () => {
    navigator.clipboard.writeText(historyString.value);
}

</script>

<style scoped>
.history {
  width: 100%;
  text-align: left;
  display: grid;
  gap: 0.5vw;
}

.history-item {
  display: inline-block;
  position: relative;
  vertical-align: top;
  height: 100%;
  width: 100%;
}

.bg-div {
  height: 100%;
  width: 100%;
  position: absolute;
}

.history-item-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.history-item-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.index-container {
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
  font-size: 0.9vw;
}

.history-item-id {
  margin: 0;
  position: absolute;
  top: 50%; /* Center the text vertically */
  left: 50%; /* Center the text horizontally */
  transform: translate(-50%, -50%); /* Adjust both vertical and horizontal positions */
  color: white;
  font-weight:bold;
  font-size: 1vw;
}

.highlighted {
  background-color: green;
}

.copy-button {
    margin-top: 1rem;
    font-size: 1rem;
    padding: 0.5rem 1rem;
}

</style>
