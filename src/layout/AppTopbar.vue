<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
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
    localStorage.removeItem('token');
    router.push('/login');
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
                <router-link to="/" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Home</router-link>
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
                <div class="flex flex-col gap-4 p-4 rounded-md w-64">
                    <router-link to="/" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Home</router-link>
                    <router-link to="/category/wedding" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Wedding</router-link>
                    <router-link to="/category/parties" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Parties</router-link>
                    <router-link to="/category/meetups" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Meetups</router-link>
                    <router-link to="/category/seminars" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Seminars</router-link>
                    <router-link to="/about" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">About Us</router-link>
                    <router-link to="/contact" class="text-black hover:text-[#FF5A60] text-lg font-normal transition-all duration-300 px-2 py-1">Contact Us</router-link>

                    <hr class="border-gray-700" />

                    <!-- Avatar & Name -->

                    <!-- Profile / Logout -->
                    <span @click="logout" class="text-red-400 cursor-pointer hover:text-red-500 transition-colors duration-300">Logout</span>
                </div>
            </Popover>
        </div>
    </div>
</template>
