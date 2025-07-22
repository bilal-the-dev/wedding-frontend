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
                },
                {
                    path: '/plan-your-event',
                    name: 'plan',
                    component: () => import('@/views/pages/PlanEntries.vue')
                }
            ]
        },
        {
            path: '/auth',
            children: [
                {
                    path: '/signup',
                    name: 'auth',
                    component: () => import('@/views/auth/Signup.vue'),
                    meta: { guest: true }
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/auth/Login.vue'),
                    meta: { guest: true }
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
    const token = localStorage.getItem('token'); // change if using a different key
    const isAuthenticated = !!token;

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const guestOnly = to.matched.some((record) => record.meta.guest);

    if (requiresAuth && !isAuthenticated) {
        return next({ name: 'login' });
    }

    if (guestOnly && isAuthenticated) {
        return next({ name: 'dashboard' });
    }

    next();
});

export default router;
