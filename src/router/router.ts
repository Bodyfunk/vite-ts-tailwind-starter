import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home/index.vue'),
    },
    {
        path: '/translate',
        name: 'translate',
        component: () => import('../views/Translate/index.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router