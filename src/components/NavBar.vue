<template>
    <nav class="bg-white shadow-sm px-6 py-4">
        <div class="flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center">
                <img src="/logo.png" alt="Festivo Logo" class="h-10" />
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center space-x-6">
                <!-- Nav Links -->
                <ul class="flex space-x-6 text-gray-800 font-medium text-[15px]">
                    <li><a href="/category/wedding" class="hover:text-[#FF5A60] transition">Wedding</a></li>
                    <li><a href="/category/parties" class="hover:text-[#FF5A60] transition">Parties</a></li>
                    <li><a href="/category/meetups" class="hover:text-[#FF5A60] transition">Meetups</a></li>
                    <li><a href="/category/seminars" class="hover:text-[#FF5A60] transition">Seminars</a></li>
                    <li><a href="/about" class="hover:text-[#FF5A60] transition">About Us</a></li>
                    <li><a href="/contact" class="hover:text-[#FF5A60] transition">Contact Us</a></li>
                </ul>

                <!-- Plan Button -->
                <button class="bg-[#FF5A60] hover:bg-[#e34c51] text-white font-semibold text-sm px-5 py-2 rounded-md shadow transition">Plan Your Event</button>

                <!-- Login/User -->
                <template v-if="isLoggedIn">
                    <div class="flex items-center gap-1">
                        <div class="w-9 h-9 bg-[#FF5A60] text-white rounded-full flex items-center justify-center">
                            <i class="pi pi-user text-base"></i>
                        </div>
                        <i class="pi pi-chevron-down text-gray-600 text-sm"></i>
                    </div>
                </template>
                <template v-else>
                    <router-link to="/login" class="text-sm font-medium text-[#FF5A60] hover:underline mt-3"> Login </router-link>
                </template>
            </div>

            <!-- Hamburger / Close Icon - Mobile -->
            <div class="md:hidden">
                <button @click="toggleMenu">
                    <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-2xl text-[#FF5A60]"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Dropdown Menu -->
        <transition name="fade">
            <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-4">
                <ul class="flex flex-col space-y-3 text-gray-800 font-medium text-[16px]">
                    <li><a href="#" class="hover:text-[#FF5A60] transition">Wedding</a></li>
                    <li><a href="#" class="hover:text-[#FF5A60] transition">Parties</a></li>
                    <li><a href="#" class="hover:text-[#FF5A60] transition">Meetups</a></li>
                    <li><a href="#" class="hover:text-[#FF5A60] transition">Seminars</a></li>
                    <li><a href="#" class="hover:text-[#FF5A60] transition">About Us</a></li>
                    <li><a href="#" class="hover:text-[#FF5A60] transition">Contact Us</a></li>
                </ul>

                <button class="w-full mt-4 bg-[#FF5A60] hover:bg-[#e34c51] text-white font-semibold text-sm px-5 py-2 rounded-md shadow transition">Plan Your Event</button>

                <div class="mt-2">
                    <template v-if="isLoggedIn">
                        <div class="flex items-center gap-2 mt-3">
                            <div class="w-9 h-9 bg-[#FF5A60] text-white rounded-full flex items-center justify-center">
                                <i class="pi pi-user text-base"></i>
                            </div>
                            <i class="pi pi-chevron-down text-gray-600 text-sm"></i>
                        </div>
                    </template>
                    <template v-else>
                        <router-link to="/login" class="text-sm font-medium text-[#FF5A60] hover:underline mt-3"> Login </router-link>
                    </template>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');
const mobileMenuOpen = ref(false);

function toggleMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
