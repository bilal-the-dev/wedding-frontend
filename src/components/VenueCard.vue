<template>
    <div class="bg-white shadow-lg rounded-xl overflow-hidden max-w-md w-full">
        <img :src="venue.image" :alt="venue.title" class="w-full h-56 object-cover" />

        <div class="p-5 text-left">
            <h3 class="text-xl font-semibold text-[#1a1a1a] mb-1">{{ venue.title }}</h3>

            <!-- Address -->
            <p class="text-gray-500 text-sm mb-2 flex items-center gap-2">
                <i class="pi pi-map-marker text-[#FF5A60]"></i>
                {{ venue.address }}
            </p>

            <!-- Rating -->
            <div class="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <i class="pi pi-star text-yellow-500"></i>
                <span class="font-semibold text-[#1a1a1a]">{{ venue.rating }}</span>
                <span>({{ venue.totalReviews }} reviews)</span>
            </div>

            <!-- Button -->
            <button @click="handleCheckinButton(venue.id)" class="w-full bg-[#FF5A60] hover:bg-[#e34c51] text-white font-semibold py-2 px-4 rounded-md transition">Check In</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function handleCheckinButton(id) {
    router.push(`/venue/${id}`);
    window.scrollTo(0, 0);
}
defineProps({
    venue: {
        type: Object,
        required: true
    }
});
</script>
