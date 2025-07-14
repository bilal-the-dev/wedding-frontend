<template>
    <section class="w-full max-w-6xl mx-auto px-4 py-10">
        <div class="relative overflow-hidden rounded-xl shadow-md">
            <!-- Main Image -->
            <img :src="images[currentIndex]" class="w-full h-[400px] object-cover transition duration-500" :alt="`Slide ${currentIndex + 1}`" />

            <!-- Left Arrow -->
            <button @click="prev" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-white/30 hover:bg-white/50 text-black shadow-md">
                <i class="pi pi-chevron-left text-lg" />
            </button>

            <!-- Right Arrow -->
            <button @click="next" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-white/30 hover:bg-white/50 text-black shadow-md">
                <i class="pi pi-chevron-right text-lg" />
            </button>
        </div>

        <!-- Dots -->
        <div class="flex justify-center mt-4 space-x-2">
            <span
                v-for="(img, index) in images"
                :key="index"
                @click="currentIndex = index"
                class="w-3 h-3 rounded-full cursor-pointer transition-all"
                :class="{
                    'bg-[#FF5A60] scale-110': currentIndex === index,
                    'bg-gray-300': currentIndex !== index
                }"
            ></span>
        </div>
    </section>
</template>

<script setup>
import { defineProps, ref } from 'vue';

// Accept images as a prop
const props = defineProps({
    images: {
        type: Array,
        required: true
    }
});

const currentIndex = ref(0);

const next = () => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prev = () => {
    currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1;
};
</script>
