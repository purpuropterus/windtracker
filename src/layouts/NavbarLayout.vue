<template>
    <div class="layout">
        <nav>
            <RouterLink
                v-for="route in navbarRoutes"
                :key="route.name"
                :to="route.path"
            >
                {{ route.meta.label }}
            </RouterLink>
        </nav>
        <main class="content">
            <RouterView />
        </main>
    </div>
</template>

<script setup>
import router from "@/router";
import { RouterLink, RouterView } from "vue-router";

const navbarRoutes = router.getRoutes().filter((route) => route.meta.navbar);
</script>

<style>
html,
body,
#app {
    margin: 0;
    height: 100%;
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}
</style>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

nav {
    flex: 0 0 auto;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #eee;
}

nav a {
    text-decoration: none;
    color: #2c3e50;
}

nav a.router-link-active {
    font-weight: bold;
    /* color: #42b983; */
}

.content {
    flex: 1 1 auto;
    min-height: 0;
    min-width: 0;
    overflow: auto;
    padding: 1rem;
}
</style>
