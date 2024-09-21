import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/plans',
                    name: 'plans',
                    component: () => import('@/views/pages/Plans.vue')
                },
                {
                    path: '/servers',
                    name: 'servers',
                    component: () => import('@/views/pages/Server.vue')
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: () => import('@/views/pages/Settings.vue')
                },
                {
                    path: '/tickets/panels',
                    name: 'panels',
                    component: () => import('@/views/pages/tickets/Panels.vue')
                },
                {
                    path: '/tickets/panels/create',
                    name: 'panelsCreate',
                    component: () => import('@/views/pages/tickets/PanelsCreate.vue')
                },
                {
                    path: '/tickets/logs',
                    name: 'TicketLogs',
                    component: () => import('@/views/pages/tickets/TicketLogs.vue')
                },
                {
                    path: '/autoresponders',
                    name: 'autoResponders',
                    component: () => import('@/views/pages/AutoResponser.vue')
                },
                {
                    path: '/autoresponders/create',
                    name: 'autoRespondersCreate',
                    component: () => import('@/views/pages/AutoResponserCreate.vue')
                }
            ]
        }
    ]
});

export default router;
