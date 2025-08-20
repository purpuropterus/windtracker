import BlinkTest from "@/pages/BlinkTest.vue";
import Home from "@/pages/Home.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", component: Home },
    { path: "/blinktest", component: BlinkTest },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
