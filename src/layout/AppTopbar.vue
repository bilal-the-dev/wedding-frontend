<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logoutFromApp } from '../service/auth.services';
const op = ref();
const router = useRouter();
const route = useRoute();
const poptoggle = ref(false);
const toggle = (event) => {
    poptoggle.value = !poptoggle.value;
    op.value.toggle(event);
};
const guildId = route.params.id;
async function goToProfile() {
    // await axiosInstance.post('/auth/discord/logout');
    // localStorage.removeItem('userData');
    router.push(`/dashboard/profile/${guildId}`);
}

async function logout() {
    await logoutFromApp();
    localStorage.removeItem('userId');
    router.push(`/`);
}

const user = ref({
    name: 'Username', // Replace with actual user data
    avatar: '/public/images/png/default.png' // Replace with actual avatar URL
});
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
        </div>

        <div class="layout-topbar-actions flex items-center gap-6">
            <!-- Desktop Nav Links (Shown on large screens) -->
            <div class="hidden lg:flex items-center gap-4 bg-white">
                <router-link to="/category/wedding" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Wedding</router-link>
                <router-link to="/category/parties" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Parties</router-link>
                <router-link to="/category/meetups" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Meetups</router-link>
                <router-link to="/category/seminars" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Seminars</router-link>
                <router-link to="/about" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">About Us</router-link>
                <router-link to="/contact" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Contact Us</router-link>
            </div>

            <!-- Avatar and Popover Trigger -->
            <div class="flex items-center space-x-2">
                <img :src="user.avatar || '/public/images/png/default.png'" alt="User Avatar" class="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer" @click="toggle" />
                <i :class="poptoggle ? 'pi pi-angle-up' : 'pi pi-angle-down'" class="text-white"></i>
            </div>

            <Popover ref="op">
                <div class="flex flex-col gap-4 p-4 rounded-md shadow-lg w-64">
                    <div class="flex items-center gap-3">
                        <img :src="user.avatar || '/public/images/png/default.png'" alt="User Avatar" class="w-8 h-8 rounded-full border-2 border-gray-300" />
                        <span class="font-medium text-gray-100">{{ user.name }}</span>
                    </div>

                    <hr class="border-gray-700" />
                    <!-- Links in popover -->
                    <span @click="goToProfile" class="text-gray-300 cursor-pointer hover:text-gray-500 transition-colors duration-300">Profile</span>
                    <a href="/heatmap" class="text-gray-300 hover:text-white text-sm font-medium transition-all duration-300">Global Heatmap</a>
                    <a href="/global/leaderboard" class="text-gray-300 hover:text-white text-sm font-medium transition-all duration-300">Global Leaderboard</a>
                    <a href="https://discord.gg/SnNzeTx" class="text-gray-300 hover:text-white text-sm font-medium transition-all duration-300">Invite</a>
                    <a href="https://www.patreon.com/TheKillFeed" class="flex items-center text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-all duration-300"> <span class="mr-2 animate-pulse">✨</span> Premium </a>

                    <hr class="border-gray-700" />

                    <!-- Avatar & Name -->

                    <!-- Profile / Logout -->
                    <span @click="logout" class="text-red-400 cursor-pointer hover:text-red-500 transition-colors duration-300">Logout</span>
                </div>
            </Popover>
        </div>
    </div>
</template>
