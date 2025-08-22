<template>
    <div class="blink-page">
        <BlinkRecorder :addOrEditCallback="addOrEditCallback" :resetCallback="resetCallback" />
        <BlinkResults :results="results" />
    </div>
</template>

<script setup>
import { useGoldfishStore } from '@/stores/goldfishStore.js';
import { ref } from 'vue';

import BlinkRecorder from '@/components/BlinkRecorder.vue';
import BlinkResults from '@/components/BlinkResults.vue';

const results = ref([]);

const getResults = async (gaps) => {
    const goldfishStore = useGoldfishStore();
    const res = await fetch(`${goldfishStore.settings.server}/blink2seed`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            blinks: gaps.map(gap=>gap-8),
        })
    });
    if (res.ok) {
        const data = await res.json();
        results.value = data.map(item => ({
            seed: item.output.seed,
            accuracy: item.score,
        }));
    }
};

const addOrEditCallback = (gaps) => {
    getResults(gaps.splice(1)); // remove the NaN at the start
};

const resetCallback = () => {
    results.value = [];
};
</script>

<style scoped>

.blink-page {
    display: flex;
    gap: 20px;
}

</style>
