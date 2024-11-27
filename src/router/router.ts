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
    {
        path: '/ocr',
        name: 'ocr',
        component: () => import('../views/OCR/index.vue'),
    },
    {
        path: '/video',
        name: 'video',
        component: () => import('../views/Video/index.vue'),
    },
    {
        path: '/pdf',
        name: 'pdf',
        component: () => import('../views/PDF/index.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router