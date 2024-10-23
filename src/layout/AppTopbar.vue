<script setup>
import { useLayout } from '@/layout/composables/layout';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const guildId = route.params.id;
async function logout() {
    // await axiosInstance.post('/auth/discord/logout');
    // localStorage.removeItem('userData');
    router.push(`/profile/${guildId}`);
}
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <img src="https://tickety.top/_next/image?url=%2Flogo_text.webp&w=256&q=75" />
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" @click="logout" class="layout-topbar-action">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
