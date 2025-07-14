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
                    path: '/overview',
                    name: 'dashboard',
                    component: () => import('@/views/dashboard/Dashboard.vue')
                },
                {
                    path: '/event/create',
                    name: 'createEvent',
                    component: () => import('@/views/dashboard/CreateEvent.vue')
                },
                {
                    path: '/event/edit/:id',
                    name: 'editEvent',
                    component: () => import('@/views/dashboard/EditVenue.vue')
                },
                {
                    path: '/events',
                    name: 'events',
                    component: () => import('@/views/dashboard/Events.vue')
                },
                {
                    path: '/event/bookings/:id',
                    name: 'bookings',
                    component: () => import('@/views/dashboard/Bookings.vue')
                }
            ]
        },
        {
            path: '/',
            meta: { guest: true },
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('@/views/Home.vue')
                },
                {
                    path: '/venue/:id',
                    name: 'venue',
                    component: () => import('@/views/pages/ListedVenue.vue')
                },
                {
                    path: '/category/:ca',
                    name: 'category',
                    component: () => import('@/views/pages/Category.vue')
                },
                {
                    path: '/about',
                    name: 'about',
                    component: () => import('@/views/pages/About.vue')
                },
                {
                    path: '/contact',
                    name: 'contact',
                    component: () => import('@/views/pages/Contact.vue')
                }
            ]
        },
        {
            path: '/auth',
            meta: { guest: true },
            children: [
                {
                    path: '/signup',
                    name: 'auth',
                    component: () => import('@/views/auth/Signup.vue')
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/auth/Login.vue')
                }
            ]
        }
        // {
        //     path: '/servers',
        //     name: 'servers',
        //     component: () => import('@/views/pages/Server.vue'),
        //     meta: { requiresAuth: true }
        // }
    ]
});

router.beforeEach((to, from, next) => {
    const userId = localStorage.getItem('userId');
    const isAuthenticated = !!userId;
    // if (to.matched.some((record) => record.meta.requiresAuth)) {
    //     if (!isAuthenticated) {
    //         return next({ name: 'home' });
    //     }
    // }

    // if (to.path.startsWith('/dashboard')) {
    //     // Case 1: Exactly '/dashboard' with nothing after
    //     if (to.path === '/dashboard') {
    //         return next({ name: 'servers' });
    //     }

    //     // Case 2: Check specific dashboard routes that need IDs
    //     const pathSegments = to.path.split('/').filter(Boolean); // Remove empty strings

    //     // If we have a route like /dashboard/products or /dashboard/profile (without an ID)
    //     if (pathSegments.length === 2 && ['profile', 'plans', 'settings', 'gameserver', 'economySettings', 'leaderboardSettings'].includes(pathSegments[1])) {
    //         return next({ name: 'servers' });
    //     }

    //     // Case 3: For the main dashboard/:id route
    //     if (pathSegments.length === 2 && pathSegments[0] === 'dashboard' && (!to.params.id || to.params.id === '')) {
    //         return next({ name: 'servers' });
    //     }
    // }

    next();
});
export default router;
