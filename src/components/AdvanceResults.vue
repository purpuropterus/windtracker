<template>
    <div class="advance-results">
        <div class="controls">
            <button @click="debug = !debug">
                {{ debug ? "debug mode: on" : "debug mode: off" }}
            </button>
        </div>

        <b v-if="status && !debug">{{ status }}</b>

        <template v-if="debug">
            <table
                v-for="(entry, i) in jsonData.solutions"
                :key="i"
                class="results"
            >
                <caption class="results-caption">
                    distance:
                    {{
                        i + 1
                    }}
                </caption>
                <tbody>
                    <tr>
                        <th>Approximate time</th>
                        <td>{{ entry[0] }}s</td>
                    </tr>
                    <tr v-for="row in solutionToRows(entry)" :key="row.name">
                        <th>{{ row.name }}</th>
                        <td>{{ row.value }}</td>
                    </tr>
                </tbody>
            </table>
        </template>

        <table v-else-if="entry" class="results">
            <tbody>
                <tr>
                    <th>Approximate time</th>
                    <td>{{ entry[0] }}s</td>
                </tr>
                <tr v-for="row in taskRows" :key="row.name">
                    <th>{{ row.name }}</th>
                    <td>{{ row.value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
    jsonData: {
        type: Object,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
});

const debug = ref(false);

const entry = computed(() => {
    const solutions = props.jsonData?.solutions;
    if (!Array.isArray(solutions)) return null;
    if (props.distance < 1) return null;
    return solutions[props.distance - 1n] ?? null;
});

const status = computed(() => {
    if (props.distance === null || props.distance === undefined) return null;
    if (!entry.value) return `no saved solution for distance ${props.distance}`;
    return `distance: ${props.distance}`;
});

const solutionToRows = (solution) => {
    const tasks = props.jsonData.tasks || [];
    const rows = [];
    for (let i = 0; i < tasks.length; i++) {
        const value = solution[i + 1];
        if (value) rows.push({ name: tasks[i], value });
    }
    return rows;
};

const taskRows = computed(() => {
    if (!entry.value) return [];
    return solutionToRows(entry.value);
});
</script>

<style scoped>
.results {
    border-collapse: collapse;
    font-size: 0.95rem;
    margin-top: 0.5rem;
}

.results-caption {
    text-align: left;
    font-weight: 600;
    color: #2c3e50;
    padding: 0.3rem 0.75rem;
}

.results th,
.results td {
    padding: 0.4rem 0.75rem;
    text-align: left;
    border-bottom: 1px solid #444;
    color: #2c3e50;
}

.results th {
    font-weight: 600;
    border-right: 1px solid #444;
}

.results td {
    text-align: right;
    font-variant-numeric: tabular-nums;
}

.empty {
    color: #6b7a8d;
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    background: #222;
    color: #fff;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
}

.controls button {
    margin-bottom: 1rem;
}
</style>
