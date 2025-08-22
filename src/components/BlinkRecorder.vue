<template>
    <div class="blink-recorder">
        <div class="control-buttons">
            <button @click="recordBlink">record</button>
            <button @click="reset">reset</button>
            <button @click="correctObviousGaps">correct obvious gaps</button>
        </div>
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
                    <td>
                        <span>
                            {{ framesSinceStart[index]?.toFixed(0) }}
                        </span>
                        <button @click="deleteBlink(index)">delete</button>
                    </td>
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

const props = defineProps({
    addOrEditCallback: {
        type: Function,
        required: false,
    },
    resetCallback: {
        type: Function,
        required: false,
    }
});

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

    if (props.addOrEditCallback) {
        props.addOrEditCallback([...correctedFrameGaps.value]);
    }
};

const reset = () => {
    recordedBlinkTimes.value = [];

    if (props.resetCallback) {
        props.resetCallback();
    }
}

const deleteBlink = (index) => {
    recordedBlinkTimes.value.splice(index, 1);
    if (props.addOrEditCallback) {
        props.addOrEditCallback([...correctedFrameGaps.value]);
    }
};

const correctObviousGaps = () => {
    for (let i = 1; i < correctedFrameGaps.value.length; i++) {
        if (BLINK_WAIT_FRAME_COUNTS.slice(0,3).includes(correctedFrameGaps.value[i])) {
            correctGap(i);
        }
    }
};

const adjustTime = (index, delta, newValue) => {
    if (newValue !== undefined) {
        recordedBlinkTimes.value[index] = newValue;
    } else if (delta !== undefined) {
        recordedBlinkTimes.value[index] += framesToMs(delta);
    }

    if (props.addOrEditCallback) {
        props.addOrEditCallback([...correctedFrameGaps.value]);
    }
};

const correctGap = (index) => {
    if (index === 0) return;
    const prevTime = recordedBlinkTimes.value[index - 1];
    const correctedGapMs = framesToMs(correctedFrameGaps.value[index]);
    adjustTime(index, undefined, prevTime + correctedGapMs);

    if (props.addOrEditCallback) {
        props.addOrEditCallback([...correctedFrameGaps.value]);
    }
};


</script>

<style scoped>

.blink-recorder {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

th, td {
    width: auto;
    border: 1px solid #000;
    padding: 8px;
    font-weight: normal;
}

button {
    margin: 0 4px;
    padding: 4px 8px;
    font-size: 0.9em;
    cursor: pointer;
}

.control-buttons {
    height: 40px;
}

</style>