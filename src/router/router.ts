import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home/index.vue'),
    },
    {
        path: '/SearchResult',
        name: 'SearchResult',
        component: () => import('../views/SearchResult/index.vue'),
    },
    {
        path: '/news',
        name: 'news',
        component: () => import('../views/News/index.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router