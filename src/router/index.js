import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/pages/products',
                    name: 'products',
                    component: () => import('@/views/pages/Products.vue')
                },
                {
                    path: '/pages/license',
                    name: 'license',
                    component: () => import('@/views/pages/License.vue')
                }
            ]
        }
    ]
});

export default router;
