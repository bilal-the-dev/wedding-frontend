<template>
    <section class="py-16 text-center relative overflow-hidden">
        <div class="relative z-10 px-4 sm:px-8">
            <!-- Headline -->
            <h2 class="text-[48px] sm:text-[64px] md:text-[80px] font-extrabold uppercase text-[#1a1a1a] leading-tight tracking-wider">{{ text }}</h2>

            <p v-if="subtitle" class="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-medium">
                {{ subtitle }}
            </p>

            <!-- Decorative element under -->
            <div class="mt-4 flex justify-center">
                <div class="w-[100px] h-[4px] bg-[#FF5A60] rounded-full shadow-md"></div>
            </div>
        </div>
    </section>
    <section class="py-12 px-6 md:px-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            <VenueCard v-for="(venue, index) in venues" :key="index" :venue="venue" />
        </div>

        <!-- View More Button -->
        <div v-if="isViewMoreLink" class="mt-10 text-center">
            <RouterLink :to="viewMoreLink" class="inline-block px-6 py-3 border border-gray-800 text-gray-800 rounded-xl hover:bg-gray-800 hover:text-white transition duration-300 font-semibold"> View More </RouterLink>
        </div>
    </section>
    <!-- Decorative HR -->
    <hr class="mt-16 mx-auto border-t-[1px] border-black w-full rounded-full shadow-md opacity-90" />
</template>

<script setup>
import { RouterLink } from 'vue-router';
import VenueCard from './VenueCard.vue';

defineProps({
    venues: Array,
    viewMoreLink: String,
    text: String,
    subtitle: String,
    isViewMoreLink: {
        type: Boolean,
        default: true
    }
});
</script>
