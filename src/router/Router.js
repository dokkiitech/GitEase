import { createRouter, createWebHistory } from 'vue-router';
import GitPullCommandCopy from "@/pages/GitPullCommandCopy.vue";
import GitPushCommandCopy from "@/pages/GitPushCommandCopy.vue";

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes:  [
        {
            path: '/',
            name: 'Push',
            component:GitPushCommandCopy,
        },
        {
            path: '/pull',
            name: 'Pull',
            component:GitPullCommandCopy,
        }
    ],
});

export default router;