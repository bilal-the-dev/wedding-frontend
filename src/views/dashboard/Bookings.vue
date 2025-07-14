<template>
    <section class="hero-gradient py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <!-- Decorative Background -->
        <div class="absolute top-0 left-0 w-full h-full opacity-10">
            <div class="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"></div>
            <div class="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white"></div>
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
            <div class="text-center text-white mb-12">
                <div class="inline-block bg-white bg-opacity-20 px-6 py-2 rounded-full text-sm font-medium mb-4">Bookings</div>
                <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white">Event Bookings</h1>
                <p class="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">Track and manage your event bookings with ease and elegance.</p>
            </div>
        </div>
    </section>

    <section class="px-4 md:px-8 lg:px-16 py-16">
        <div class="max-w-7xl mx-auto space-y-8">
            <!-- Filters -->
            <div class="flex flex-col md:flex-row justify-between gap-4 items-center">
                <input v-model="searchTerm" type="text" placeholder="Search by name or phone..." class="w-full md:w-1/2 px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-[#FF5A60] focus:border-[#FF5A60]" />

                <select v-model="statusFilter" class="w-full md:w-1/4 px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-[#FF5A60] focus:border-[#FF5A60]">
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <!-- Booking Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div v-for="(booking, index) in filteredBookings" :key="booking._id" class="rounded-3xl bg-white shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-300">
                    <div class="bg-gradient-to-r from-[#ff5a60] to-[#ffa1a5] px-6 py-4">
                        <h2 class="text-white text-xl font-bold">{{ booking.customerName }}</h2>
                        <p class="text-white text-sm">📞 {{ booking.customerNumber }}</p>
                    </div>

                    <div class="p-6 space-y-2">
                        <p class="text-gray-700 text-sm">
                            📅 Booking Created: <strong>{{ formatDate(booking.createdAt) }}</strong>
                        </p>
                        <p class="text-gray-700 text-sm">🕒 Duration: {{ booking.durationHours }} hour(s)</p>
                        <p class="text-gray-700 text-sm">📍 Event Date: {{ formatDate(booking.eventTime) }}</p>
                        <p class="text-gray-700 text-sm">👥 Guests: {{ booking.guests }}</p>

                        <div class="mt-2">
                            <span
                                class="px-4 py-1 rounded-full text-xs font-bold text-white"
                                :class="{
                                    'bg-yellow-500': booking.status === 'pending',
                                    'bg-green-500': booking.status === 'confirmed',
                                    'bg-red-500': booking.status === 'cancelled'
                                }"
                            >
                                {{ booking.status.toUpperCase() }}
                            </span>
                        </div>

                        <!-- Actions -->
                        <div class="flex justify-end gap-3 mt-4">
                            <button v-if="booking.status === 'pending'" @click="changeStatus(booking._id, 'confirmed')" class="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl text-sm flex items-center gap-2">
                                <i class="pi pi-check"></i> Confirm
                            </button>
                            <button v-if="booking.status === 'pending'" @click="changeStatus(booking._id, 'cancelled')" class="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm flex items-center gap-2">
                                <i class="pi pi-times"></i> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';

import { useRoute } from 'vue-router';
import axiosInstance from '../../service/api';
const route = useRoute();
const venueId = route.params.id;

const toast = useToast();

const bookings = ref([]);
const searchTerm = ref('');
const statusFilter = ref('');

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

const loadBookings = async () => {
    try {
        const res = await axiosInstance.get(`/booking/venue/${venueId}`);
        bookings.value = res.data.bookings || [];
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load bookings', life: 3000 });
        console.error(err);
    }
};

const changeStatus = async (bookingId, newStatus) => {
    try {
        await axiosInstance.patch(`/booking/status/${bookingId}`, { status: newStatus });
        toast.add({ severity: 'success', summary: 'Updated', detail: `Status changed to ${newStatus}`, life: 3000 });

        // Update local state
        const booking = bookings.value.find((b) => b._id === bookingId);
        if (booking) booking.status = newStatus;
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Failed', detail: 'Could not update status', life: 3000 });
        console.error(err);
    }
};

const filteredBookings = computed(() => {
    return bookings.value.filter((b) => {
        const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.value.toLowerCase()) || b.customerNumber.includes(searchTerm.value);
        const matchesStatus = statusFilter.value ? b.status === statusFilter.value : true;
        return matchesSearch && matchesStatus;
    });
});

onMounted(() => {
    loadBookings();
});
</script>

<style scoped>
.hero-gradient {
    background: linear-gradient(135deg, #ff5a60 0%, #ff7b80 50%, #ffa1a5 100%);
}
</style>
