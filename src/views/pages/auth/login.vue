<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
            <p class="text-center text-gray-600 mb-8">Sign in to access your account</p>
            <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transform hover:translate-y-[-2px] transition-all duration-200 ease-in-out" @click="login">
                <i class="pi pi-discord text-2xl"></i>
                <span>Login with Discord</span>
            </button>
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
