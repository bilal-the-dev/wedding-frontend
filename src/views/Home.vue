<template>
    <div>
        <transition name="fade" @after-leave="preloaderRemoved">
            <Preloader v-if="showPreloader" />
        </transition>

        <div v-show="!showPreloader">
            <NavBar />
            <div class="mx-8 pt-6">
                <Header />
                <div class="my-8 px-4 md:px-0 max-w-5xl mx-auto">
                    <div class="flex flex-col md:flex-row items-center gap-4">
                        <input v-model="searchQuery" type="text" placeholder="Search venues by name" class="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A60]" />

                        <select v-model="selectedCity" class="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A60]">
                            <option value="">Filter by City</option>
                            <option v-for="city in cities" :key="city" :value="city">
                                {{ city }}
                            </option>
                        </select>
                    </div>
                </div>
                <VenueList v-for="(venues, category) in groupedVenues" :key="category" :venues="venues" :viewMoreLink="getLink(category)" :text="category" :subtitle="getSubtitle(category)" />

                <!-- CTA Section with Image Background -->
                <section class="relative bg-cover bg-center bg-no-repeat py-20 px-6 md:px-16 text-white" style="background-image: url('/header.jpg')">
                    <!-- Overlay -->
                    <div class="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

                    <!-- Content -->
                    <div class="relative z-10 text-center max-w-3xl mx-auto">
                        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-white">List Your Venue With Us</h2>
                        <p class="text-base sm:text-lg mb-8 opacity-90">Get your venue in front of thousands of event organizers looking for the perfect space.</p>

                        <div class="flex justify-center gap-4 flex-wrap">
                            <RouterLink to="/add-venue" class="bg-white text-[#FF5A60] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"> Add Your Venue </RouterLink>
                            <RouterLink to="/contact" class="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-[#FF5A60] transition"> Contact Us </RouterLink>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>

    <Footer />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import NavBar from '../components/NavBar.vue';
import Preloader from '../components/Preloader.vue';
import VenueList from '../components/VenueList.vue';
import axiosInstance from '../service/api';

const hasVisited = typeof window !== 'undefined' ? localStorage.getItem('hasVisited') : null;
const showPreloader = ref(hasVisited !== 'true');
const groupedVenues = ref({}); // { Weddings: [...], Seminars: [...] }
const searchQuery = ref('');
const selectedCity = ref('');
const cities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Hyderabad',
    'Sialkot',
    'Gujranwala',
    'Bahawalpur',
    'Sargodha',
    'Abbottabad',
    'Sukkur',
    'Mardan',
    'Mirpur',
    'Gilgit',
    'Skardu',
    'Rahim Yar Khan'
];

const allVenues = ref([]);
function getLink(category) {
    const subtitles = {
        Wedding: '/category/wedding',
        Parties: '/category/parties',
        Meetups: '/category/meetups',
        Seminars: '/category/seminars'
    };
    return subtitles[category] || '/';
}
const viewMoreLink = '/category/wedding';

onMounted(async () => {
    if (hasVisited !== 'true') {
        setTimeout(() => {
            showPreloader.value = false;
            localStorage.setItem('hasVisited', 'true');
        }, 5000);
    }

    await fetchVenues();
});

function preloaderRemoved() {
    console.log('Preloader removed');
}

async function fetchVenues() {
    try {
        const res = await axiosInstance.get('/venue/all');
        allVenues.value = res.data;
        filterVenues(); // Call filtering logic after loading
    } catch (err) {
        console.error('Error fetching venues:', err);
    }
}

watch([searchQuery, selectedCity], () => {
    filterVenues();
});

function getSubtitle(category) {
    const subtitles = {
        Weddings: 'Celebrate love in unforgettable spaces that speak elegance and romance.',
        Parties: 'From birthdays to bashes — find the perfect vibe for every celebration.',
        Meetups: 'Bring people together, connect minds, and create lasting memories.',
        Seminars: 'Inspire, educate, and share ideas in venues built for clarity and focus.'
    };
    return subtitles[category] || 'Find the perfect venue for your event.';
}

function filterVenues() {
    const categoryMap = {};

    allVenues.value.forEach((venue) => {
        const matchSearch = searchQuery.value ? venue.venueName.toLowerCase().includes(searchQuery.value.toLowerCase()) : true;

        const matchCity = selectedCity.value ? venue.location?.toLowerCase().includes(selectedCity.value.toLowerCase()) : true;

        if (matchSearch && matchCity && venue.category && Array.isArray(venue.category)) {
            venue.category.forEach((cat) => {
                if (!categoryMap[cat]) categoryMap[cat] = [];

                if (categoryMap[cat].length < 4) {
                    categoryMap[cat].push({
                        id: venue._id,
                        title: venue.venueName,
                        image: venue.venueImages?.[0] ? `http://localhost:5000/images/${venue.venueImages[0]}` : '/card-1.png',
                        address: venue.location,
                        rating: 4.8,
                        totalReviews: 100
                    });
                }
            });
        }
    });

    groupedVenues.value = categoryMap;
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
