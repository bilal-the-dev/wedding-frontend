<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Crousal from '../../components/Crousal.vue';
import Footer from '../../components/Footer.vue';
import NavBar from '../../components/NavBar.vue';
import VenueDetailsText from '../../components/VenueDetailsText.vue';
import VenueList from '../../components/VenueList.vue';
import axiosInstance from '../../service/api';

const route = useRoute();
const venueId = route.params.id;

const venue = ref(null);
const loading = ref(true);

const relevantVenues = ref([]);

onMounted(async () => {
    try {
        const res = await axiosInstance.get(`/venue/${venueId}`);
        venue.value = res.data.venue;
        relevantVenues.value = res.data.relevantVenues.map((v) => ({
            id: v._id,
            title: v.venueName,
            image: v.venueImages[0] ? `http://localhost:5000/images/${v.venueImages[0]}` : '/placeholder.jpg',
            address: v.location,
            rating: 4.5, // Use real rating if available
            totalReviews: 100 // Replace with actual field if exists
        }));
    } catch (err) {
        console.error('Failed to load venue:', err);
    } finally {
        loading.value = false;
    }
});

const viewMoreLink = '/weddings';
</script>

<template>
    <div>
        <NavBar />
        <section class="hero-gradient py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute top-0 left-0 w-full h-full opacity-10">
                <div class="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"></div>
                <div class="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white"></div>
            </div>

            <div class="max-w-7xl mx-auto relative z-10">
                <!-- Venue Title & Introduction -->
                <div class="text-center text-white mb-12">
                    <div class="inline-block bg-white bg-opacity-20 px-6 py-2 rounded-full text-sm font-medium mb-4">Premium Venue</div>
                    <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                        {{ venue?.venueName || 'Loading...' }}
                    </h1>
                    <p class="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">Where luxury meets elegance. Experience the perfect venue for your most memorable moments.</p>
                </div>

                <!-- Quick Stats -->
            </div>
        </section>

        <!-- Main Content -->
        <section class="px-4 md:px-8 lg:px-16 -mt-20 relative z-20">
            <div class="max-w-7xl mx-auto">
                <!-- Main Info Card -->
                <div class="glass-effect rounded-3xl p-8 md:p-12 mb-8">
                    <!-- Categories -->
                    <div class="flex flex-wrap justify-center gap-4 mb-12">
                        <div v-for="cat in venue?.category" :key="cat" class="premium-badge text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg"><i class="fas fa-star mr-3"></i>{{ cat }}</div>
                    </div>

                    <!-- Venue Details Grid -->
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <!-- Location -->
                        <div class="floating-card stats-counter p-8 rounded-2xl text-center">
                            <div class="feature-icon">
                                <i class="fas fa-map-marker-alt text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-800 mb-3">Prime Location</h3>
                            <p class="text-gray-600 text-lg">{{ venue?.location }}</p>
                            <div class="mt-4 text-sm text-gray-500"><i class="fas fa-car mr-2"></i>Free Valet Parking</div>
                        </div>

                        <!-- Pricing -->
                        <div class="floating-card stats-counter p-8 rounded-2xl text-center">
                            <div class="feature-icon">
                                <i class="fas fa-crown text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-800 mb-3">Premium Pricing</h3>
                            <div class="price-highlight">PKR {{ venue?.chargesPerHour?.toLocaleString() }}</div>
                            <p class="text-gray-600 text-lg">per hour</p>
                            <div class="mt-4 text-sm text-gray-500"><i class="fas fa-check mr-2"></i>All-inclusive packages</div>
                        </div>

                        <!-- Capacity -->
                        <div class="floating-card stats-counter p-8 rounded-2xl text-center md:col-span-2 lg:col-span-1">
                            <div class="feature-icon">
                                <i class="fas fa-users text-white text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-800 mb-3">Guest Capacity</h3>
                            <div class="text-4xl font-bold text-gray-800 mb-2">{{ venue?.guestPerCapacity }}</div>
                            <p class="text-gray-600 text-lg">maximum guests</p>
                            <div class="mt-4 text-sm text-gray-500"><i class="fas fa-expand mr-2"></i>Flexible layouts</div>
                        </div>
                    </div>
                    <div class="divider"></div>

                    <!-- Premium Features -->
                    <div class="mb-12">
                        <h3 class="text-3xl font-bold text-gray-800 text-center mb-10">Premium Amenities</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            <div v-for="amenity in venue?.amenities" :key="amenity" class="text-center">
                                <div class="feature-icon">
                                    <i class="fas fa-check-circle text-white text-xl"></i>
                                </div>
                                <p class="font-medium text-gray-700">{{ amenity }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Call to Action -->
                    <div class="text-center">
                        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button class="luxury-button text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-lg">
                                <i class="fas fa-calendar-check mr-3"></i>
                                Book Your Event
                            </button>
                            <button class="border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300">
                                <i class="fas fa-phone mr-3"></i>
                                Call Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Crousal v-if="venue" :images="venue.venueImages.map((img) => `http://localhost:5000/images/${img}`)" />
        <VenueDetailsText :description="venue?.eventDescription" :venue-id="venue?._id" :hourly-rate="venue?.chargesPerHour?.toLocaleString()" />

        <VenueList :venues="relevantVenues" :viewMoreLink="viewMoreLink" text="Relevant Venues" subtitle="Explore similar venues loved by guests across Pakistan." />
        <Footer />
    </div>
</template>

<style scoped>
.hero-gradient {
    background: linear-gradient(135deg, #ff5a60 0%, #ff7b80 50%, #ffa1a5 100%);
}

.glass-effect {
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.floating-card {
    transform: translateY(0);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.floating-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(255, 90, 96, 0.2);
}

.premium-badge {
    background: linear-gradient(135deg, #ff5a60 0%, #ff7b80 100%);
    position: relative;
    overflow: hidden;
}

.premium-badge::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
}

.premium-badge:hover::before {
    left: 100%;
}

.stats-counter {
    background: linear-gradient(135deg, #fff 0%, #fef7f7 100%);
    border: 2px solid #ff5a60;
    position: relative;
    overflow: hidden;
}

.stats-counter::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #ff5a60, #ff7b80, #ff5a60);
    animation: shimmer 2s infinite;
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}

.luxury-button {
    background: linear-gradient(135deg, #ff5a60 0%, #ff7b80 100%);
    position: relative;
    overflow: hidden;
    transform: perspective(1000px) rotateX(0deg);
    transition: all 0.3s ease;
}

.luxury-button:hover {
    transform: perspective(1000px) rotateX(-5deg);
    box-shadow: 0 15px 35px rgba(255, 90, 96, 0.4);
}

.luxury-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
}

.luxury-button:hover::before {
    left: 100%;
}

.rating-glow {
    filter: drop-shadow(0 0 10px rgba(255, 193, 7, 0.5));
}

.venue-title {
    background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.feature-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #ff5a60 0%, #ff7b80 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(255, 90, 96, 0.3);
}

.feature-icon:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 12px 30px rgba(255, 90, 96, 0.5);
}

.divider {
    height: 2px;
    background: linear-gradient(90deg, transparent, #ff5a60, transparent);
    margin: 2rem 0;
}

.price-highlight {
    color: #ff5a60;
    font-size: 2.5rem;
    font-weight: 800;
    text-shadow: 0 2px 4px rgba(255, 90, 96, 0.2);
}
</style>
