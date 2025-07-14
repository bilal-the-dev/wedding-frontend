<template>
    <Toast />
    <section class="text-black px-4 py-12 max-w-5xl mx-auto space-y-10">
        <div v-html="parsedDescription" class="prose prose-lg max-w-none" />
    </section>

    <!-- Booking Form -->
    <section class="max-w-4xl mx-auto px-4 sm:px-8 md:px-16 py-12 text-[#1a1a1a]">
        <h2 class="text-3xl font-bold mb-6 text-center">Book Your Event</h2>

        <div class="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-200">
            <!-- Customer Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block font-semibold mb-1">Customer Name</label>
                    <InputText v-model="customerName" class="w-full" />
                </div>
                <div>
                    <label class="block font-semibold mb-1">Customer Number</label>
                    <InputText v-model="customerNumber" class="w-full" />
                </div>
            </div>

            <!-- Guests -->
            <div class="flex items-center justify-between">
                <label class="font-semibold text-lg">Number of Guests:</label>
                <div class="flex items-center space-x-3">
                    <button @click="guests = Math.max(guests - 1, 1)" class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                        <i class="pi pi-minus text-black text-sm"></i>
                    </button>
                    <span class="text-xl font-semibold w-10 text-center">{{ guests }}</span>
                    <button @click="guests++" class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
                        <i class="pi pi-plus text-black text-sm"></i>
                    </button>
                </div>
            </div>

            <!-- Date & Time -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label class="block font-semibold mb-1">Event Date</label>
                    <Calendar v-model="startDate" showIcon class="w-full" />
                </div>
                <div>
                    <label class="block font-semibold mb-1">Start Time</label>
                    <Calendar v-model="startTime" timeOnly hourFormat="24" showIcon class="w-full" />
                </div>
                <div>
                    <label class="block font-semibold mb-1">End Time</label>
                    <Calendar v-model="endTime" timeOnly hourFormat="24" showIcon class="w-full" />
                </div>
            </div>

            <!-- Invoice Summary -->
            <div class="border-t pt-6 space-y-2 text-sm text-gray-700">
                <div class="flex justify-between">
                    <span>Hourly Rate (PKR)</span>
                    <span>₨{{ hourlyRate?.toLocaleString() || 0 }}</span>
                </div>
                <div class="flex justify-between">
                    <span>Total Hours</span>
                    <span>{{ totalHours }}</span>
                </div>
                <div class="flex justify-between">
                    <span>Base Price</span>
                    <span>₨{{ basePrice.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between">
                    <span>GST (15%)</span>
                    <span>₨{{ taxAmount.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between font-semibold text-lg text-black">
                    <span>Total</span>
                    <span>₨{{ totalAmount.toLocaleString() }}</span>
                </div>
            </div>

            <!-- Checkout Button -->
            <div class="text-center pt-4">
                <button @click="submitBooking" class="bg-[#FF5A60] hover:bg-[#e04b52] text-white font-semibold px-8 py-3 rounded-lg transition">Proceed to Checkout</button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { marked } from 'marked';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';
import axiosInstance from '../service/api';

const props = defineProps({
    description: {
        type: String,
        default: ''
    },
    venueId: {
        type: String,
        required: true
    },
    hourlyRate: {
        type: Number,
        required: true
    }
});

const toast = useToast();

// Form Fields
const customerName = ref('');
const customerNumber = ref('');
const guests = ref(1);
const startDate = ref(null);
const startTime = ref(null);
const endTime = ref(null);

// Booking Summary
const totalHours = computed(() => {
    if (!startTime.value || !endTime.value) return 0;
    const start = new Date(startTime.value);
    const end = new Date(endTime.value);
    const diffMs = end.getTime() - start.getTime();
    const hours = diffMs / (1000 * 60 * 60);
    return hours > 0 ? Math.ceil(hours) : 0;
});
const basePrice = computed(() => totalHours.value * props.hourlyRate);
const taxAmount = computed(() => basePrice.value * 0.15);
const totalAmount = computed(() => basePrice.value + taxAmount.value);

// Markdown to HTML
const parsedDescription = computed(() => (props.description ? marked.parse(props.description) : ''));

// Submit Booking
const submitBooking = async () => {
    if (!customerName.value || !customerNumber.value || !startDate.value || !startTime.value || !endTime.value) {
        toast.add({ severity: 'warn', summary: 'Missing Fields', detail: 'Please fill out all fields', life: 3000 });
        return;
    }

    console.log('jere');
    const eventTime = new Date(startDate.value);
    eventTime.setHours(new Date(startTime.value).getHours());
    eventTime.setMinutes(new Date(startTime.value).getMinutes());

    try {
        console.log(props.venueId);
        const res = await axiosInstance.post('/booking/create', {
            venueId: props.venueId,
            customerName: customerName.value,
            customerNumber: customerNumber.value,
            guests: guests.value,
            eventTime,
            durationHours: totalHours.value,
            totalCost: totalAmount.value,
            status: 'pending'
        });

        toast.add({ severity: 'success', summary: 'Success', detail: 'Booking Created Successfully', life: 3000 });

        // Optional: Reset form
        customerName.value = '';
        customerNumber.value = '';
        guests.value = 1;
        startDate.value = null;
        startTime.value = null;
        endTime.value = null;
    } catch (err) {
        console.error(err);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create booking', life: 3000 });
    }
};
</script>
