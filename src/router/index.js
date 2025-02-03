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
                    path: '/dashboard/:id',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/profile/:id',
                    name: 'profile',
                    component: () => import('@/views/pages/Profile.vue')
                },
                {
                    path: '/plans/:id',
                    name: 'plans',
                    component: () => import('@/views/pages/Plans.vue')
                },
                {
                    path: '/settings/:id',
                    name: 'settings',
                    component: () => import('@/views/pages/Settings.vue')
                },
                {
                    path: '/game/server/:id',
                    name: 'gameserver',
                    component: () => import('@/views/pages/GameServer.vue')
                },
                {
                    path: '/economy/settings/:id',
                    name: 'economySettings',
                    component: () => import('@/views/pages/Economy.vue')
                },
                {
                    path: '/leaderboard/:id',
                    name: 'leaderboardSettings',
                    component: () => import('@/views/pages/Leaderboard.vue')
                },

                
                {
                    path: '/tickets/panels/:id',
                    name: 'panels',
                    component: () => import('@/views/pages/tickets/Panels.vue')
                },
                {
                    path: '/tickets/panels/create/:id',
                    name: 'panelsCreate',
                    component: () => import('@/views/pages/tickets/PanelsCreate.vue')
                },
                {
                    path: '/tickets/panels/edit/:panelId/:id',
                    name: 'panelsEdit',
                    component: () => import('@/views/pages/tickets/PanelsEdit.vue')
                },
                {
                    path: '/tickets/logs/:id',
                    name: 'TicketLogs',
                    component: () => import('@/views/pages/tickets/TicketLogs.vue')
                },
                {
                    path: '/autoresponders/:id',
                    name: 'autoResponders',
                    component: () => import('@/views/pages/AutoResponser.vue')
                },
                {
                    path: '/autoresponders/create/:id',
                    name: 'autoRespondersCreate',
                    component: () => import('@/views/pages/AutoResponserCreate.vue')
                },
                {
                    path: '/autoresponders/edit/:responserId/:id',
                    name: 'autoRespondersEdit',
                    component: () => import('@/views/pages/AutoResponserEdit.vue')
                }
            ]
        },
        {
            path: '/auth',
            meta: { guest: true },
            children: [
                {
                    path: '/global/leaderboard',
                    name: 'globalLeaderboard',
                    component: () => import('@/views/pages/auth/GlobalLeaderboard.vue')
                },
                {
                    path: '/auth',
                    name: 'auth',
                    component: () => import('@/views/pages/auth/auth.vue')
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/pages/auth/login.vue')
                }
            ]
        },
        {
            path: '/servers',
            name: 'servers',
            component: () => import('@/views/pages/Server.vue'),
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const userId = localStorage.getItem('userId');
    const isAuthenticated = !!userId;

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'login' });
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.guest)) {
        if (isAuthenticated) {
            next({ name: 'servers' });
        } else {
            next();
        }
    } else {
        next();
    }
});
export default router;
