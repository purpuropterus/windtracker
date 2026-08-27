import { createRouter, createWebHistory } from "vue-router";

import Advance from "@/pages/Advance.vue";
import Blink from "@/pages/Blink.vue";
import Home from "@/pages/Home.vue";
import Search from "@/pages/Search.vue";
import Simulate from "@/pages/Simulate.vue";
import Track from "@/pages/Track.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: { navbar: true, label: "windtracker" },
    },
    {
        path: "/track",
        name: "track",
        component: Track,
        meta: { navbar: true, label: "track", homepage: true },
    },
    {
        path: "/blink",
        name: "blink",
        component: Blink,
        meta: { navbar: true, label: "blink", homepage: true },
    },
    {
        path: "/search",
        name: "search",
        component: Search,
        meta: { navbar: true, label: "search", homepage: true },
    },
    {
        path: "/advance",
        name: "advance",
        component: Advance,
        meta: { navbar: true, label: "advance", homepage: true },
    },
    {
        path: "/simulate",
        name: "simulate",
        component: Simulate,
        meta: { navbar: true, label: "simulate", homepage: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
