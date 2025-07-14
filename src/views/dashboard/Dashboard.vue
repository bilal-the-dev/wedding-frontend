<template>
    <section class="hero-gradient py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <!-- Background Decorations -->
        <div class="absolute top-0 left-0 w-full h-full opacity-10">
            <div class="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"></div>
            <div class="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white"></div>
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
            <div class="text-center text-white mb-12">
                <div class="inline-block bg-white bg-opacity-20 px-6 py-2 rounded-full text-sm font-medium mb-4">Dashboard</div>
                <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white">Welcome Back</h1>
                <p class="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">Here's a snapshot of your events and bookings</p>
            </div>
        </div>
    </section>

    <section class="px-4 md:px-8 lg:px-16 py-16">
        <!-- Stats -->
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-[#ff5a60]">
                <p class="text-gray-500">Total Events</p>
                <h2 class="text-3xl font-bold text-[#ff5a60]">{{ totalEvents }}</h2>
            </div>
            <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-yellow-400">
                <p class="text-gray-500">Pending Bookings</p>
                <h2 class="text-3xl font-bold text-yellow-500">{{ pendingCount }}</h2>
            </div>
            <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-green-500">
                <p class="text-gray-500">Confirmed Bookings</p>
                <h2 class="text-3xl font-bold text-green-500">{{ confirmedCount }}</h2>
            </div>
            <div class="bg-white shadow-lg rounded-2xl p-6 border-t-4 border-blue-400">
                <p class="text-gray-500">Cancelled Bookings</p>
                <h2 class="text-3xl font-bold text-blue-500">{{ cancelledCount }}</h2>
            </div>
        </div>

        <!-- Recent Bookings Table -->
        <div class="bg-white rounded-3xl shadow-xl p-8">
            <h3 class="text-2xl font-bold mb-6 text-[#ff5a60]">Recent Bookings</h3>
            <div class="overflow-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-100">
                        <tr v-for="(item, index) in recentBookings" :key="index">
                            <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ item.phone }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{{ item.date }}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="px-3 py-1 text-xs font-bold rounded-full text-white"
                                    :class="{
                                        'bg-yellow-500': item.status === 'pending',
                                        'bg-green-500': item.status === 'confirmed',
                                        'bg-red-500': item.status === 'cancelled'
                                    }"
                                >
                                    {{ item.status.toUpperCase() }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script setup>
import axiosInstance from '@/service/api'; // 👈 your custom axios instance
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

const toast = useToast();

// State
const totalEvents = ref(0);
const pendingCount = ref(0);
const confirmedCount = ref(0);
const cancelledCount = ref(0);
const recentBookings = ref([]);
const venueId = ref(null);

// Lifecycle
onMounted(async () => {
    try {
        // 1. Get user's venues
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get('/venue/my-venues', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const venues = res.data;
        totalEvents.value = venues.length;

        if (!venues.length) return toast.add({ severity: 'info', summary: 'No Venues', detail: 'You have not added any venues yet.', life: 4000 });

        // 2. Select first venue ID (or loop if you want all venues' bookings)
        venueId.value = venues[0]._id;

        // 3. Fetch bookings for selected venue
        const bookingsRes = await axiosInstance.get(`/booking/venue/${venueId.value}`);
        const bookings = bookingsRes.data.bookings;

        // 4. Process stats
        pendingCount.value = bookings.filter((b) => b.status === 'pending').length;
        confirmedCount.value = bookings.filter((b) => b.status === 'confirmed').length;
        cancelledCount.value = bookings.filter((b) => b.status === 'cancelled').length;

        // 5. Recent bookings
        recentBookings.value = bookings
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
            .map((b) => ({
                name: b.customerName,
                phone: b.customerNumber,
                date: new Date(b.createdAt).toLocaleDateString('en-GB'),
                status: b.status
            }));
    } catch (error) {
        console.error(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load dashboard data', life: 3000 });
    }
});
</script>

<style scoped>
.hero-gradient {
    background: linear-gradient(135deg, #ff5a60 0%, #ff7b80 50%, #ffa1a5 100%);
}
</style>
