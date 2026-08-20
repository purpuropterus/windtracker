<template>
    <div class="home">
        <h1>welcome to windtracker</h1>
        <div class="link-buttons">
            <RouterLink
                v-for="route in homepageRoutes"
                :key="route.name"
                :to="route.path"
            >
                <button>{{ route.meta.label }}</button>
            </RouterLink>
        </div>
        <div class="github-buttons">
            <div class="github-buttons-buttons">
                <a
                    href="https://github.com/purpuroptery/windtracker"
                    target="_blank"
                >
                    <button>windtracker github</button>
                </a>
                <a
                    href="https://github.com/purpuroptery/goldfish"
                    target="_blank"
                >
                    <button>goldfish github</button>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import { RouterLink } from "vue-router";

const homepageRoutes = router
    .getRoutes()
    .filter((route) => route.meta.homepage);
</script>

<style scoped>
.home {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.link-buttons,
.github-buttons-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.github-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.link-buttons button {
    background-color: #222;
}

.github-buttons {
    margin-top: 20px;
}

.github-buttons-buttons button {
    background-color: #333;
    font-size: 0.8em;
    padding: 8px 16px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 5px;
}
</style>
