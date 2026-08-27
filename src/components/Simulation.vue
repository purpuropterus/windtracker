<template>
    <div class="simulation">
        <div class="controls">
            <button @click="handleStart">
                {{ paused ? "start" : "stop" }}
            </button>
            <button @click="handleReset">reset</button>
            <button @click="zoomIn">zoom in</button>
            <button @click="zoomOut">zoom out</button>
        </div>
        <div class="visualization">
            <div class="timeline">
                <div class="track" :style="trackStyle">
                    <div
                        v-for="(event, i) in eventsWithData"
                        :key="i"
                        class="bar"
                        :style="barStyle(event, i)"
                    >
                        <span class="bar-label">{{
                            "0x" + event.seed.toString(16)
                        }}</span>
                        <span>
                            {{ `Pin ${event.data.pin}` }}
                        </span>
                        <span class="bar-label">
                            {{
                                `${Math.round(event.data.randomAim * 100) / 100} Ronans`
                            }}
                        </span>
                    </div>
                </div>
                <div class="arrow" :style="{ left: arrowX + 'px' }">
                    <span class="arrow-label">{{
                        Math.floor(simulationCurrentFrame)
                    }}</span>
                </div>
            </div>
        </div>
        <div class="controls">
            <button>pause in-game</button>
            <button @click="nextShot">next shot</button>
            <button>end hole</button>
        </div>
    </div>
</template>

<script setup>
import { getRandomAimInRadians } from "@/game/aim";
import { getRandomBlinkTime } from "@/game/blink.js";
import { choosePin } from "@/game/pin";
import { useGoldfishStore } from "@/stores/goldfishStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { computed, onMounted, onUnmounted, ref, toRef, watch } from "vue";

const props = defineProps({
    currentSeed: {
        type: Number,
        required: true,
    },
});

// logic

const goldfishStore = useGoldfishStore();
const settingsStore = useSettingsStore();

const FRAME_RATE = 59.94;
const paused = ref(true);

const simulationCurrentSeed = toRef(props, "currentSeed");
const currentGame = toRef(settingsStore, "game");
const simulationCurrentFrame = ref(0);

const handleStart = () => {
    paused.value = !paused.value;
};

const handleReset = () => {
    paused.value = true;
    simulationCurrentFrame.value = 0;
};

const zoomIn = () => {
    pxPerFrame.value = Math.min(50, pxPerFrame.value * 1.5);
};

const zoomOut = () => {
    pxPerFrame.value = Math.max(1, pxPerFrame.value / 1.5);
};

const nextShot = () => {
    const frame = simulationCurrentFrame.value;
    const idx = events.value.findIndex(
        (e) => frame >= e.start && frame < e.start + e.length,
    );
    if (idx === -1) return;

    const current = events.value[idx];
    const advanced = goldfishStore.advanceFunction(current.seed);

    const updated = { ...current, seed: advanced };
    events.value = [...events.value.slice(0, idx), updated];

    updateEvents();
};

const pxPerFrame = ref(2);
const MIN_EVENTS_LENGTH_IN_SECONDS = 20;
const BLINK_DURATION = 8;

const ver_1_0 = computed(() => useSettingsStore().game === "og_1.0");

const events = ref([]);

const eventsTooShort = () => {
    const lastEvent = events.value.at(-1);
    // add more to the event list if there are no events
    // or if the last event is too short
    if (!lastEvent) return true;
    else {
        const lastEventEndTimeFromNowInSeconds =
            (lastEvent.start +
                lastEvent.length -
                simulationCurrentFrame.value) /
            FRAME_RATE;
        if (lastEventEndTimeFromNowInSeconds < MIN_EVENTS_LENGTH_IN_SECONDS)
            return true;
    }
    return false;
};

const updateEvents = () => {
    if (eventsTooShort()) {
        // if there are no events, add a dummy first event
        // its seed will be what the seed is upon loading into the hole
        // its length will be the length of time it takes for the first blink to occur

        if (events.value.length === 0) {
            const advanceCount = goldfishStore.advanceCounts["reset"];
            let startSeed = simulationCurrentSeed.value;

            for (let i = 0; i < advanceCount; i++) {
                startSeed = goldfishStore.advanceFunction(parseInt(startSeed));
            }

            const dummyEvent = {
                start: 0,
                length: BLINK_DURATION,
                seed: startSeed,
            };

            events.value.push(dummyEvent);
        }

        while (eventsTooShort()) {
            const lastEvent = events.value.at(-1);

            const seed = lastEvent.seed;
            const nextSeed = goldfishStore.advanceFunction(parseInt(seed));

            const blinkTime =
                getRandomBlinkTime(nextSeed, ver_1_0.value) + BLINK_DURATION;

            const newEvent = {
                start: lastEvent.start + lastEvent.length,
                length: blinkTime,
                seed: nextSeed,
            };

            events.value.push(newEvent);
        }
    }
};

const RADIANS_TO_RONANS = 0.00035;

const eventsWithData = computed(() => {
    return events.value.map((ev) => {
        const pinAdvanceCount = goldfishStore.advanceCounts["hole_load"];
        let pinSeed = ev.seed;
        for (let i = 0; i < pinAdvanceCount; i++) {
            pinSeed = goldfishStore.advanceFunction(pinSeed);
        }

        return {
            ...ev,
            data: {
                pin: choosePin(pinSeed) + 1,
                randomAim: getRandomAimInRadians(ev.seed) / RADIANS_TO_RONANS,
            },
        };
    });
});

onMounted(() => updateEvents());
watch(currentGame, async (newGame, oldGame) => updateEvents());
watch(simulationCurrentFrame, async (newFrame, oldFrame) => updateEvents());
watch(simulationCurrentSeed, async (newSeed, oldSeed) => updateEvents());

// style and animations

const arrowX = 120;

const trackStyle = computed(() => ({
    transform: `translateX(${arrowX - simulationCurrentFrame.value * pxPerFrame.value}px)`,
}));

const barColors = ["#2d6a4f", "#1b4332"];

function barStyle(event, i) {
    return {
        left: `${event.start * pxPerFrame.value}px`,
        width: `${event.length * pxPerFrame.value}px`,
        backgroundColor: barColors[i % barColors.length],
    };
}

let rafId = null;
let lastTimestamp = null;

function tick(timestamp) {
    if (lastTimestamp === null) lastTimestamp = timestamp;
    const dt = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    if (!paused.value) {
        simulationCurrentFrame.value += dt * FRAME_RATE;
    }

    rafId = requestAnimationFrame(tick);
}

onMounted(() => {
    rafId = requestAnimationFrame(tick);
});

onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.simulation {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* padding: 1.5rem; */
}

.controls {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.controls button {
    padding: 0.55rem 1.1rem;
    border: none;
    border-radius: 0.375rem;
    background: #222;
    color: #fff;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
}

.visualization {
    width: 100%;
}

.timeline {
    position: relative;
    overflow: hidden;
    height: 100px;
    background: #f3f6fb;
    border: 1px solid #c7d0d9;
    border-radius: 0.375rem;
}

.track {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    will-change: transform;
}

.bar {
    position: absolute;
    flex-direction: column;
    top: 14px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #42b983;
    color: #fff;
    font-size: 0.75rem;
    overflow: hidden;
    white-space: nowrap;
}

.arrow {
    position: absolute;
    top: 0;
    height: 100%;
    width: 0;
    pointer-events: none;
}

.arrow::after {
    content: "";
    position: absolute;
    top: 0;
    left: -1px;
    height: 100%;
    border-left: 2px solid #e74c3c;
}

.arrow::before {
    content: "";
    position: absolute;
    top: 0;
    left: -5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid #e74c3c;
}

.arrow-label {
    position: absolute;
    top: 8px;
    left: 6px;
    font-size: 0.7rem;
    font-weight: bold;
    background: #000;
    padding: 0.1rem 0.3rem;
    color: #e74c3c;
    font-variant-numeric: tabular-nums;
}
</style>
