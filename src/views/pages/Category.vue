<template>
    <div>
        <transition name="fade" @after-leave="preloaderRemoved">
            <Preloader v-if="showPreloader" />
        </transition>

        <div v-show="!showPreloader">
            <NavBar />
            <div class="mx-8 pt-6">
                <Header :specialText="route.params.ca" text="" />
                <VenueList v-if="venuesByCategory.length" :venues="venuesByCategory" :viewMoreLink="viewMoreLink" :text="selectedCategory" :subtitle="getSubtitle(selectedCategory)" :isViewMoreLink="false" />
            </div>
        </div>
    </div>

    <Footer />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../../components/Header.vue';
import Preloader from '../../components/Preloader.vue';
import VenueList from '../../components/VenueList.vue';
import axiosInstance from '../../service/api';

const showPreloader = ref(typeof window !== 'undefined' ? localStorage.getItem('hasVisited') !== 'true' : false);
const venuesByCategory = ref([]);
const viewMoreLink = ref('/');
const route = useRoute();

const selectedCategory = ref(route.params.ca); // e.g. "Weddings", "Seminars"

onMounted(async () => {
    if (showPreloader.value) {
        setTimeout(() => {
            showPreloader.value = false;
            localStorage.setItem('hasVisited', 'true');
        }, 5000);
    }

    await fetchVenues();
});

async function fetchVenues() {
    try {
        const res = await axiosInstance.get('/venue/all');
        const allVenues = res.data;
        const filtered = allVenues.filter((venue) => Array.isArray(venue.category) && venue.category.some((cat) => cat.toLowerCase() === selectedCategory.value.toLowerCase()));
        console.log(allVenues[0]);

        venuesByCategory.value = filtered.slice(0, 4).map((venue) => ({
            id: venue._id,
            title: venue.venueName,
            image: venue.venueImages?.[0] ? `${import.meta.env.VITE_API_BASE_URL}/images/${venue.venueImages[0]}` : '/card-1.png',
            address: venue.location,
            rating: 4.8,
            totalReviews: 100
        }));

        // viewMoreLink.value = `/venues/${selectedCategory.value.toLowerCase()}`;
    } catch (err) {
        console.error('Error fetching venues:', err);
    }
}

function getSubtitle(category) {
    const subtitles = {
        Weddings: 'Celebrate love in unforgettable spaces that speak elegance and romance.',
        Parties: 'From birthdays to bashes — find the perfect vibe for every celebration.',
        Meetups: 'Bring people together, connect minds, and create lasting memories.',
        Seminars: 'Inspire, educate, and share ideas in venues built for clarity and focus.'
    };
    return subtitles[category] || 'Find the perfect venue for your event.';
}
</script>

<style>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
