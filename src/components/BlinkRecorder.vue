<template>
    <div>
        <button @click="recordBlink">record</button>
        <button @click="reset">reset</button>
        <table>
            <thead>
                <tr>
                    <th>raw frames since start</th>
                    <th>raw gap</th> 
                    <th>corrected gap</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(time, index) in recordedBlinkTimes" :key="index">
                    <td>{{ framesSinceStart[index]?.toFixed(0) }}</td>
                    <td>
                        <span>{{ index === 0 ? "" : rawGaps[index].toFixed(0) }}</span>
                        <span
                            :style="{
                                color: rawAccuracies[index]?.startsWith('+') ? 'green' : rawAccuracies[index]?.startsWith('-') ? 'red' : 'gray',
                                fontSize: '0.8em',
                            }"
                            v-if="index > 0"
                        >
                            ({{ rawAccuracies[index] }})
                        </span>
                        <div v-if="index!==0">
                            <button @click="correctGap(index)">correct</button>
                            <button @click="adjustTime(index, 1)">+1</button>
                            <button @click="adjustTime(index, -1)">-1</button>
                        </div>
                    </td>
                    <td>{{ correctedFrameGaps[index]?.toFixed(0) }}</td>
                </tr>  
            </tbody>
        </table>
    </div>
</template>

<script setup>

import { computed, ref } from 'vue';

const framesToMs = (frames) => frames * 16.667;
const msToFrames = (ms) => ms / 16.667;

function convertBlinkDeltaToFrames(delta) {
    return BLINK_WAIT_FRAME_COUNTS.reduce((best, curr) => Math.abs(framesToMs(curr) - delta) < Math.abs(framesToMs(best) - delta) ? curr : best);
}

const BLINK_WAIT_FRAME_COUNTS = [18, 128, 188, 258, 268, 278, 288, 298, 308];

const recordedBlinkTimes = ref([]);

const framesSinceStart = computed(() => {
    if (recordedBlinkTimes.value.length === 0) return [];
    return recordedBlinkTimes.value.map((time, index) => {
        if (index === 0) return 0;
        return msToFrames(time - recordedBlinkTimes.value[0]);
    });
});

const rawGaps = computed(() => {
    return recordedBlinkTimes.value.map((time, index) => {
        if (index === 0) return null;
        return msToFrames(time - recordedBlinkTimes.value[index - 1]);
    });
});

const correctedFrameGaps = computed(() => {
    return recordedBlinkTimes.value.map((time, index) => {
        if (index === 0) return null;
        const delta = (time - recordedBlinkTimes.value[index - 1]);
        const frames = convertBlinkDeltaToFrames(delta);
        return frames;
    });
});

const rawAccuracies = computed(() => {
    return recordedBlinkTimes.value.map((time, index) => {
        if (index === 0) return null;
        const delta = rawGaps.value[index] - correctedFrameGaps.value[index];
        return `${delta > 0 ? "+" : delta < 0 ? "-" : ""}${Math.abs(delta).toFixed(0)}`;
    });
});

const recordBlink = () => {
    recordedBlinkTimes.value.push(Date.now());
};

const reset = () => {
    recordedBlinkTimes.value = [];
}

const adjustTime = (index, delta, newValue) => {
    if (newValue !== undefined) {
        recordedBlinkTimes.value[index] = newValue;
    } else if (delta !== undefined) {
        recordedBlinkTimes.value[index] += framesToMs(delta);
    }
};

const correctGap = (index) => {
    if (index === 0) return;
    const prevTime = recordedBlinkTimes.value[index - 1];
    const correctedGapMs = framesToMs(correctedFrameGaps.value[index]);
    adjustTime(index, undefined, prevTime + correctedGapMs);
};


</script>

<style scoped>

th, td {
    width: auto;
    border: 1px solid #000;
    padding: 8px;
    font-weight: normal;
}

</style>