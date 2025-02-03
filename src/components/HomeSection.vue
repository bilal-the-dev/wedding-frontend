<template>
    <section class="flex flex-col pt-32 relative md:flex-row items-center justify-around gap-8 p-8 rounded-lg shadow-md">
        <!-- Text and Icon Section -->
        <div
            :class="{
                'order-2 md:order-1': textPosition === 'left',
                'order-1 md:order-2': textPosition === 'right'
            }"
            class="flex flex-col items-start text-white max-w-lg space-y-4"
        >
            <div class="bg-gray-800 p-3 rounded-lg shadow-lg flex items-center justify-center">
                <i :class="`pi pi-${icon}`" class="text-2xl text-white" :style="iconSize"></i>
            </div>

            <!-- Title -->
            <h2 class="text-4xl font-semibold">{{ title }}</h2>

            <!-- Description -->
            <p class="text-gray-400 text-lg">{{ description }}</p>
        </div>

        <!-- Image Section with hover effect -->
        <div
            :class="{
                'order-1 md:order-2': textPosition === 'left',
                'order-2 md:order-1': textPosition === 'right'
            }"
            class="flex-shrink-0 w-full md:w-1/4 rounded-lg p-4 shadow-lg relative"
        >
            <img :src="imageSrc" alt="Ticket Preview" class="w-full h-full object-cover rounded-md transition-transform duration-300 hover:transform hover:scale-105" />
        </div>
    </section>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    description: String,
    imageSrc: String,
    icon: String,
    textPosition: {
        type: String,
        default: 'right' // can be 'left' or 'right'
    },
    iconSize: {
        type: Object,
        default: () => ({ fontSize: '2rem' })
    }
});
</script>

<style scoped>
/* Optional: Additional custom styles */
</style>