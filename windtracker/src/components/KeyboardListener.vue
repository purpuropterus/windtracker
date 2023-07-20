<template>
  <div></div>
</template>

<script setup>

import { onMounted, onUnmounted, defineEmits } from 'vue';
import { useSettingsStore } from '@/stores/settingsStore';
import { useWindStore } from '@/stores/windStore';

const settingsStore = useSettingsStore();
const windStore = useWindStore();


onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
});

const handleKeyPress = (ev) => {

    // checking for inputs inside .settings divs

    const composedPath = ev.composedPath();

    const isInsideSettings = composedPath.some((element) =>
    element.classList?.contains('settings')
    );

    if (isInsideSettings && ev.target.tagName === 'INPUT') {
    return;
    }




    switch (ev.key){

        case settingsStore.resetHotkey:

            windStore.reset();
            break;

    }
};
</script>

<style>

</style>