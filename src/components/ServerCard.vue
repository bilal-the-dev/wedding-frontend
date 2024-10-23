<template>
    <div class="relative w-full max-w-sm mx-auto min-h-[280px] bg-gray-900 rounded-xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-105 no-underline">
        <!-- Glassmorphism background -->
        <div class="absolute inset-0 bg-blue-300 opacity-5 blur-md"></div>

        <!-- Content container -->
        <div class="relative h-full flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 space-y-4">
            <!-- Circular image with blue overlay -->
            <div class="relative w-24 sm:w-28 md:w-32 aspect-square rounded-full overflow-hidden bg-blue-500 shadow-xl">
                <img :src="imageUrl" alt="Profile" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-blue-600 opacity-40"></div>
            </div>

            <!-- Title -->
            <h2 class="text-white text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-center break-words max-w-full">
                {{ title }}
            </h2>

            <!-- Manage/Invite button -->
            <button
                @click="handleButtonClick"
                :class="[
                    'w-full py-2 sm:py-3 px-4 sm:px-5 text-base sm:text-lg font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4',
                    secondaryButtonText === 'Invite' ? 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-transparent focus:ring-blue-400' : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400'
                ]"
            >
                {{ secondaryButtonText }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    secondaryButtonText: {
        type: String,
        required: true
    },
    inviteUrl: {
        type: String,
        required: true
    }
});

const router = useRouter();

const saveIdToLocalStorage = () => {
    localStorage.setItem('guildid', props.id);
};

const handleButtonClick = () => {
    if (props.secondaryButtonText === 'Invite') {
        window.location.href = props.inviteUrl;
    } else {
        saveIdToLocalStorage();
        router.push(`/dashboard/${props.id}`);
    }
};
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
