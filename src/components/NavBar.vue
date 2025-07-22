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
                    <li><a href="/" class="hover:text-[#FF5A60] transition">Home</a></li>
                    <li><a href="/category/wedding" class="hover:text-[#FF5A60] transition">Wedding</a></li>
                    <li><a href="/category/parties" class="hover:text-[#FF5A60] transition">Parties</a></li>
                    <li><a href="/category/meetups" class="hover:text-[#FF5A60] transition">Meetups</a></li>
                    <li><a href="/category/seminars" class="hover:text-[#FF5A60] transition">Seminars</a></li>
                    <li><a href="/about" class="hover:text-[#FF5A60] transition">About Us</a></li>
                    <li><a href="/contact" class="hover:text-[#FF5A60] transition">Contact Us</a></li>
                </ul>

                <!-- User Actions -->
                <template v-if="isLoggedIn">
                    <router-link to="/overview" class="ml-4 px-4 py-2 rounded-lg bg-[#FF5A60] text-white font-semibold text-sm shadow hover:bg-[#e94a52] transition"> Go to Dashboard </router-link>
                </template>
                <template v-else>
                    <router-link to="/login" class="ml-4 px-4 py-2 rounded-lg border border-[#FF5A60] text-[#FF5A60] font-semibold text-sm hover:bg-[#FF5A60] hover:text-white transition"> Login </router-link>
                </template>
            </div>

            <!-- Mobile Icon -->
            <div class="md:hidden">
                <button @click="toggleMenu">
                    <i :class="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-2xl text-[#FF5A60]"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <transition name="fade">
            <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-4">
                <ul class="flex flex-col space-y-3 text-gray-800 font-medium text-[16px]">
                    <li><a href="/" class="hover:text-[#FF5A60] transition">Home</a></li>
                    <li><a href="/category/wedding" class="hover:text-[#FF5A60] transition">Wedding</a></li>
                    <li><a href="/category/parties" class="hover:text-[#FF5A60] transition">Parties</a></li>
                    <li><a href="/category/meetups" class="hover:text-[#FF5A60] transition">Meetups</a></li>
                    <li><a href="/category/seminars" class="hover:text-[#FF5A60] transition">Seminars</a></li>
                    <li><a href="/about" class="hover:text-[#FF5A60] transition">About Us</a></li>
                    <li><a href="/contact" class="hover:text-[#FF5A60] transition">Contact Us</a></li>
                </ul>

                <div class="mt-4">
                    <template v-if="isLoggedIn">
                        <router-link to="/overview" class="block w-full text-center px-4 py-2 rounded-lg bg-[#FF5A60] text-white font-semibold text-sm shadow hover:bg-[#e94a52] transition"> Go to Dashboard </router-link>
                    </template>
                    <template v-else>
                        <router-link to="/login" class="block w-full text-center px-4 py-2 rounded-lg border border-[#FF5A60] text-[#FF5A60] font-semibold text-sm hover:bg-[#FF5A60] hover:text-white transition"> Login </router-link>
                    </template>
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const mobileMenuOpen = ref(false);
const isLoggedIn = ref(localStorage.getItem('token') !== null);

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
