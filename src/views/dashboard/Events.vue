<template>
    <Taost />
    <div v-if="loading">
        <Preloader />
    </div>
    <div v-else>
        <section class="hero-gradient py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full opacity-10">
                <div class="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"></div>
                <div class="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white"></div>
            </div>

            <div class="max-w-7xl mx-auto relative z-10">
                <div class="text-center text-white mb-12">
                    <div class="inline-block bg-white bg-opacity-20 px-6 py-2 rounded-full text-sm font-medium mb-4">Events</div>
                    <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white">Your Listed Events</h1>
                    <p class="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">Where luxury meets elegance. Experience the perfect venue for your most memorable moments.</p>
                </div>
            </div>
        </section>

        <section class="px-4 md:px-8 lg:px-16 py-16">
            <div class="max-w-7xl mx-auto">
                <!-- Search + Filters -->
                <div class="mb-10 flex flex-col lg:flex-row justify-between items-center gap-4">
                    <!-- Search Bar -->
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search by venue or location..."
                        class="w-full lg:w-[300px] h-[42px] border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5A60]"
                    />
                </div>

                <!-- Event Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div v-for="(event, index) in filteredEvents" :key="index" class="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                        <img v-if="event.images.length" :src="event.images[0]" alt="Event Image" class="h-56 w-full object-cover" />

                        <div class="p-6 space-y-3">
                            <h3 class="text-2xl font-semibold text-gray-800">{{ event.venueName }}</h3>
                            <p class="text-gray-500 text-sm flex items-center gap-1">
                                <i class="pi pi-map-marker text-[#FF5A60]"></i>
                                {{ event.location }}
                            </p>
                            <p class="text-gray-700 font-medium text-sm">💸 PKR {{ event.charges?.toLocaleString() }}/hr</p>
                            <p class="text-sm text-gray-500">👥 Capacity: {{ event.guests }}</p>

                            <div class="flex flex-wrap gap-2 mt-2">
                                <span v-for="cat in event.categories" :key="cat" class="bg-[#FF5A60] text-white text-xs px-3 py-1 rounded-full">
                                    {{ cat }}
                                </span>
                            </div>

                            <!-- Actions -->
                            <div class="flex flex-wrap gap-3 pt-4">
                                <button @click="editEvent(event)" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-1"><i class="pi pi-pencil"></i> Edit</button>
                                <button @click="deleteEvent(event)" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-1"><i class="pi pi-trash"></i> Delete</button>
                                <button @click="checkBookings(event)" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-1"><i class="pi pi-calendar"></i> Bookings</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Preloader from '../../components/Preloader.vue';
import axiosInstance from '../../service/api';
const router = useRouter();
const events = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedCity = ref('');
const toast = useToast();
const filteredEvents = computed(() => {
    return events.value.filter((event) => {
        const matchSearch = event.venueName.toLowerCase().includes(searchQuery.value.toLowerCase()) || event.location.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchCategory = !selectedCategory.value || event.category.includes(selectedCategory.value);
        const matchCity = !selectedCity.value || event.location === selectedCity.value;

        return matchSearch && matchCategory && matchCity;
    });
});

async function editEvent(event) {
    console.log('Edit event:', event);
    await router.push(`/event/edit/${event.id}`);
}

async function deleteEvent(event) {
    if (!confirm(`Are you sure you want to delete "${event.venueName}"?`)) return;

    try {
        const token = localStorage.getItem('token');
        await axiosInstance.delete(`/venue/delete/${event.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Remove from UI
        events.value = events.value.filter((e) => e.id !== event.id);
        toast.add({
            severity: 'success',
            summary: 'Venue Deleted',
            detail: 'The venue was successfully removed.',
            life: 3000
        });
    } catch (err) {
        console.error('Delete failed:', err);
        toast.add({
            severity: 'error',
            summary: 'Delete Failed',
            detail: 'Could not delete venue. Please try again.',
            life: 3000
        });
    }
}

async function checkBookings(event) {
    console.log('Check bookings for:', event);

    await router.push(`/event/bookings/${event.id}`);
}

async function getUserVenues() {
    try {
        loading.value = true;
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get('/venue/my-venues', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // Format image URLs
        events.value = res.data.map((v) => ({
            id: v._id,
            venueName: v.venueName,
            location: v.location,
            charges: v.chargesPerHour,
            guests: v.guestPerCapacity,
            categories: v.category,
            images: v.venueImages.map((img) => `http://localhost:5000/images/${img}`)
        }));
    } catch (err) {
        console.error('Error loading venues:', err);
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    getUserVenues();
});
</script>

<style scoped>
.hero-gradient {
    background: linear-gradient(135deg, #ff5a60 0%, #ff7b80 50%, #ffa1a5 100%);
}
</style>
