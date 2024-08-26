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
                    path: '/pages/products',
                    name: 'products',
                    component: () => import('@/views/pages/Products.vue')
                },
                {
                    path: '/pages/license',
                    name: 'license',
                    component: () => import('@/views/pages/License.vue')
                },
                {
                    path: '/pages/profile',
                    name: 'profile',
                    component: () => import('@/views/pages/Profile.vue')
                },
                {
                    path: '/pages/admin/license',
                    name: 'admin-license',
                    component: () => import('@/views/pages/AdminLicense.vue'),
                    meta: { requiresAdminLicenseAccess: true }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/Login.vue'),
            meta: { guest: true }
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('@/views/pages/auth.vue'),
            meta: { guest: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const userData = localStorage.getItem('userData');
    const isAuthenticated = !!userData;
    const user = userData === 'true';
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isGuestRoute = to.matched.some((record) => record.meta.guest);
    const requiresAdminLicenseAccess = to.matched.some((record) => record.meta.requiresAdminLicenseAccess);

    if (requiresAuth && !isAuthenticated) {
        next({ name: 'login' });
    } else if (isGuestRoute && isAuthenticated) {
        next({ name: 'dashboard' });
    } else if (requiresAdminLicenseAccess && isAuthenticated && !user) {
        next({ path: '/' });
    } else {
        next();
    }
});

export default router;
