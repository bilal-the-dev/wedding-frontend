import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/dashboard',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '/dashboard/:id',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/dashboard/profile/:id',
                    name: 'profile',
                    component: () => import('@/views/pages/Profile.vue')
                },
                {
                    path: '/dashboard/plans/:id',
                    name: 'plans',
                    component: () => import('@/views/pages/Plans.vue')
                },
                {
                    path: '/dashboard/settings/:id',
                    name: 'settings',
                    component: () => import('@/views/pages/Settings.vue')
                },
                {
                    path: '/dashboard/game/server/:id',
                    name: 'gameserver',
                    component: () => import('@/views/pages/GameServer.vue')
                },
                {
                    path: '/dashboard/economy/settings/:id',
                    name: 'economySettings',
                    component: () => import('@/views/pages/Economy.vue')
                },
                {
                    path: '/dashboard/leaderboard/:id',
                    name: 'leaderboardSettings',
                    component: () => import('@/views/pages/Leaderboard.vue')
                },
            ]
        },
        {
            path: '/',
            meta: { guest: true },
            children : [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('@/views/pages/auth/login.vue')
                },
                
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
            return next({ name: 'home' });
        }
    } else if (to.matched.some((record) => record.meta.guest)) {
        if (isAuthenticated) {
            return next({ name: 'servers' });
        }
    }

    if (to.path.startsWith('/dashboard')) {
        // Case 1: Exactly '/dashboard' with nothing after
        if (to.path === '/dashboard') {
            return next({ name: 'servers' });
        }

        // Case 2: Check specific dashboard routes that need IDs
        const pathSegments = to.path.split('/').filter(Boolean); // Remove empty strings
        
        // If we have a route like /dashboard/products or /dashboard/profile (without an ID)
        if (pathSegments.length === 2 && 
            ['profile', 'plans', 'settings', 'gameserver', 'economySettings', 'leaderboardSettings'].includes(pathSegments[1])) {
            return next({ name: 'servers' });
        }
        
        // Case 3: For the main dashboard/:id route
        if (pathSegments.length === 2 && pathSegments[0] === 'dashboard' && 
            (!to.params.id || to.params.id === '')) {
            return next({ name: 'servers' });
        }
    }

    next();
});
export default router;
