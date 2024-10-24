<template>
    <div class="min-h-screen bg-gray-900">
        <!-- Navbar -->
        <nav class="px-6 py-4 flex items-center justify-between">
            <div class="flex items-center">
                <span class="text-2xl font-bold text-white">TaskFlow</span>
            </div>

            <div class="flex items-center gap-6">
                <a href="#status" class="text-gray-300 hover:text-white transition">Status</a>
                <a href="#invite" class="text-gray-300 hover:text-white transition">Invite</a>
                <a href="#premium" class="flex items-center text-yellow-400 hover:text-yellow-300 transition">
                    <span class="mr-1">✨</span>
                    Premium
                </a>
                <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" @click="login">Login</button>
            </div>
        </nav>

        <!-- Hero Section -->
        <div class="flex flex-col items-center justify-center px-4 mt-32 text-center">
            <h1 class="text-5xl font-bold text-white mb-4">
                Task management
                <br />
                like
                <span class="relative inline-block">
                    <span class="text-blue-400">never</span>
                    <span
                        class="absolute bottom-0 left-0 w-full"
                        :style="{
                            height: '2px',
                            background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)',
                            transform: 'rotate(-2deg)',
                            transformOrigin: 'left bottom'
                        }"
                    />
                    <span
                        class="absolute bottom-0 left-0 w-full"
                        :style="{
                            height: '1px',
                            background: 'linear-gradient(90deg, #93c5fd 0%, #bfdbfe 50%, #93c5fd 100%)',
                            transform: 'rotate(-2deg) translateY(2px)',
                            transformOrigin: 'left bottom',
                            opacity: 0.7
                        }"
                    />
                </span>
                before
            </h1>

            <p class="text-gray-300 max-w-2xl mx-auto mb-8">Unlock the power of TaskFlow, the leading task management solution for teams, trusted by thousands worldwide. Discover why we stand out in the productivity community.</p>

            <div class="flex gap-4">
                <button class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center">
                    <span class="mr-2">→</span>
                    Get Started
                </button>
                <button class="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">Dashboard</button>
            </div>
        </div>
    </div>

    <section class="relative py-24 overflow-hidden">
        <!-- Sloped background -->
        <div class="absolute inset-0 bg-gray-900 transform -skew-y-3 origin-top-right scale-110"></div>

        <div class="relative z-10 container mx-auto px-4">
            <!-- Header Text -->
            <div class="text-center mb-16">
                <p class="text-gray-400 uppercase tracking-wider mb-3">STATISTICS</p>
                <h2 class="text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto">The numbers don't lie. See for yourself how we've made a significant impact.</h2>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <!-- Created Tickets -->
                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div class="flex justify-center mb-4">
                        <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-2">Created Tickets</p>
                    <h3 class="text-3xl font-bold text-white">
                        <span v-text="formattedCount.created"></span>
                    </h3>
                </div>

                <!-- Closed Tickets -->
                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div class="flex justify-center mb-4">
                        <div class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-2">Closed Tickets</p>
                    <h3 class="text-3xl font-bold text-white">
                        <span v-text="formattedCount.closed"></span>
                    </h3>
                </div>

                <!-- Active Users -->
                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div class="flex justify-center mb-4">
                        <div class="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-2">Active Users</p>
                    <h3 class="text-3xl font-bold text-white">
                        <span v-text="formattedCount.users"></span>
                    </h3>
                </div>

                <!-- Servers -->
                <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div class="flex justify-center mb-4">
                        <div class="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                                />
                            </svg>
                        </div>
                    </div>
                    <p class="text-gray-400 mb-2">Servers</p>
                    <h3 class="text-3xl font-bold text-white">
                        <span v-text="formattedCount.servers"></span>
                    </h3>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="text-center mt-16">
                <p class="text-white text-lg">
                    Convinced?
                    <button class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ml-2">Invite</button>
                    Tickety to your Discord now!
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const targetNumbers = {
    created: 2288587,
    closed: 2178093,
    users: 12433525,
    servers: 48723
};

const currentCount = ref({
    created: 0,
    closed: 0,
    users: 0,
    servers: 0
});

const formattedCount = computed(() => ({
    created: currentCount.value.created.toLocaleString(),
    closed: currentCount.value.closed.toLocaleString(),
    users: currentCount.value.users.toLocaleString(),
    servers: currentCount.value.servers.toLocaleString()
}));

const animateNumber = (key, target) => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        currentCount.value[key] = Math.floor(current);
    }, duration / steps);
};

onMounted(() => {
    Object.entries(targetNumbers).forEach(([key, value]) => {
        animateNumber(key, value);
    });
});
const AUTH_URL = import.meta.env.VITE_APP_REDIRECT_URL;
const login = () => {
    console.log('Logging in with Discord...');
    window.location.href = AUTH_URL;
};
</script>

<style>
/* Add any additional custom styles here */
</style>
