<template>
    <div class="relative w-96 h-80 bg-gray-900 rounded-xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-105">
        <!-- Glassmorphism background -->
        <div class="absolute inset-0 bg-blue-400 opacity-20 blur-lg"></div>

        <!-- Content container -->
        <div class="relative h-full flex flex-col items-center justify-between p-8 space-y-4">
            <!-- Circular image with blue overlay -->
            <div class="relative w-32 h-32 rounded-full overflow-hidden bg-blue-500 shadow-xl">
                <img :src="imageUrl" alt="Profile" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-blue-600 opacity-40"></div>
            </div>

            <!-- Title -->
            <h2 class="text-white text-3xl font-extrabold tracking-tight">{{ title }}</h2>

            <!-- Manage button -->
            <button
                class="w-full py-3 px-5 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
                Manage
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
.blur-lg {
    backdrop-filter: blur(16px);
}

@keyframes subtle-pulse {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.03);
    }
}

.bg-blue-400 {
    animation: subtle-pulse 3s infinite;
}
</style>
