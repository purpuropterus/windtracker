import { createRouter, createWebHistory } from "vue-router";

import Blink from "@/pages/Blink.vue";
import Home from "@/pages/Home.vue";
import Search from "@/pages/Search.vue";
import Track from "@/pages/Track.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/track", component: Track },
    { path: "/search", component: Search },
    { path: "/blink", component: Blink },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
