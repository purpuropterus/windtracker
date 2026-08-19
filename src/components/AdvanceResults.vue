<template>
    <div class="advance-results">
        <b>{{ status }}</b>
        <table v-if="entry" class="results">
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
import { computed } from "vue";

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

const taskRows = computed(() => {
    if (!entry.value) return [];
    const tasks = props.jsonData.tasks || [];
    const rows = [];
    for (let i = 0; i < tasks.length; i++) {
        const value = entry.value[i + 1];
        if (value) rows.push({ name: tasks[i], value });
    }
    return rows;
});
</script>

<style scoped>
.results {
    border-collapse: collapse;
    font-size: 0.95rem;
    margin-top: 0.5rem;
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
</style>
