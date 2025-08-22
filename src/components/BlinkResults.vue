<template>
    <div class="blink-results">
        <table>
            <thead>
                <tr>
                    <th>seed</th>
                    <th>accuracy</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(result, index) in results" :key="index">
                    <td>
                        <span>
                            {{ "0x" + result.seed.toString(16) }}
                        </span>
                        <div class="seed-buttons">
                            <button>track</button> 
                            <button>search</button>
                        </div>
                    </td>
                    <td>{{ result.accuracy }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

const props = defineProps({
    results: {
        type: Array,
        required: true
    }
});

</script>

<style scoped>
td, th{
    width: auto;
    border: 1px solid #000;
    padding: 8px;
    font-weight: normal;
}

.blink-results {
    margin-top: 50px;
}

.seed-buttons {
    display:flex;
    gap: 5px;
}

</style>