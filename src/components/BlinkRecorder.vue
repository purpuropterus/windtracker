<template>
    <div>
        <button @click="recordBlink">record</button>
        <table>
            <thead>
                <tr>
                    <th>raw frames since start</th>
                    <th>raw gap</th>
                    <th>half-corrected frames since start</th>
                    <th>half-corrected gap</th>
                    <th>corrected frames since start</th>   
                    <th>corrected gap</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(time, index) in recordedBlinkTimes" :key="index">
                    <td>{{ framesSinceStart[index]?.toFixed(0) }}</td>
                    <td>
                        {{ index === 0 ? "" : rawGaps[index].toFixed(0) }}
                        <span
                            :style="{
                                color: rawAccuracies[index]?.startsWith('+') ? 'green' : rawAccuracies[index]?.startsWith('-') ? 'red' : 'gray',
                                fontSize: '0.8em',
                            }"
                            v-if="index > 0"
                        >
                            ({{ rawAccuracies[index] }})
                        </span>
                    </td>
                    <td>{{ halfCorrectedFramesSinceStart[index]?.toFixed(0) }}</td>
                    <td>
                        {{ index === 0 ? null : halfCorrectedGaps[index].toFixed(0) }}
                        <span
                            :style="{
                                color: halfCorrectedAccuracies[index]?.startsWith('+') ? 'green' : halfCorrectedAccuracies[index]?.startsWith('-') ? 'red' : 'gray',
                                fontSize: '0.8em',
                            }"
                            v-if="index > 0"
                        >
                            ({{ halfCorrectedAccuracies[index] }})
                        </span>
                        <div v-if="index > 0" style="font-size: 0.8em; color: gray;">
                            <button @click="adjustTime(index, 1)">+1</button>
                            <button @click="adjustTime(index, -1)">-1</button>
                        </div>
                    </td>
                    <td>{{ correctedFramesSinceStart[index]?.toFixed(0) }}</td>
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

const correctedFramesSinceStart = computed(() => {
    const arr = [];
    for (let i = 0; i < correctedFrameGaps.value.length; i++) {
        if (i === 0) {
            arr.push(0);
        } else {
            arr.push(arr[i - 1] + (correctedFrameGaps.value[i] ?? 0));
        }
    }
    return arr;
});

const halfCorrectedFramesSinceStart = computed(() => {
    return recordedBlinkTimes.value.map((time, index) => {
        if (index === 0) return 0;
        return (correctedFramesSinceStart.value[index-1] + rawGaps.value[index]);
    });
});

const halfCorrectedGaps = computed(() => {
    return recordedBlinkTimes.value.map((time, index) => {
        if (index === 0) return null;
        return halfCorrectedFramesSinceStart.value[index] - halfCorrectedFramesSinceStart.value[index - 1];
    });
});

const rawAccuracies = computed(() => {
    return recordedBlinkTimes.value.map((time, index) => {
        if (index === 0) return null;
        const delta = rawGaps.value[index] - correctedFrameGaps.value[index];
        return `${delta > 0 ? "+" : delta < 0 ? "-" : ""}${Math.abs(delta).toFixed(0)}`;
    });
});

const halfCorrectedAccuracies = computed(() => {
    return recordedBlinkTimes.value.map((time, index) => {
        if (index === 0) return null;
        const delta = halfCorrectedGaps.value[index] - correctedFrameGaps.value[index];
        return `${delta > 0 ? "+" : delta < 0 ? "-" : ""}${Math.abs(delta).toFixed(0)}`;
    });
});

const recordBlink = () => {
    recordedBlinkTimes.value.push(Date.now());
};

const adjustTime = (index, adjustment) => {
    recordedBlinkTimes.value[index] += framesToMs(adjustment);
};


</script>

<style scoped>

table {
    width: 100vw;
}

th, td {
    width: auto;
    border: 1px solid #000;
    padding: 8px;
    font-weight: normal;
}

</style>