<template>
    <section class="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded">
        <!-- Background Image -->
        <img src="/header.png" alt="Header Background" class="absolute inset-0 w-full h-full object-cover" />

        <!-- Dark Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-60"></div>

        <!-- Centered Text -->
        <div class="relative z-10 flex items-center justify-center h-full px-6 text-center">
            <h1 class="text-white font-bold text-[40px] sm:text-[60px] md:text-[75px] leading-none max-w-5xl">
                {{ text }}
                <span class="text-[#FF5A60] font-['Pacifico'] font-medium">{{ specialText }}</span>
            </h1>
        </div>
    </section>
</template>

<script setup>
defineProps({
    text: {
        type: String,
        default: 'Plan Your Event Today With'
    },
    specialText: {
        type: String,
        default: 'festivo'
    }
});
</script>
