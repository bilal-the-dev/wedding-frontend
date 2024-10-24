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
</template>

<script setup>
const AUTH_URL = import.meta.env.VITE_APP_REDIRECT_URL;
const login = () => {
    console.log('Logging in with Discord...');
    window.location.href = AUTH_URL;
};
</script>

<style>
/* Add any additional custom styles here */
</style>
