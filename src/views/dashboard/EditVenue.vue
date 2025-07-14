<template>
    <Toast />
    <section class="hero-gradient py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        <!-- Decorative Elements -->
        <div class="absolute top-0 left-0 w-full h-full opacity-10">
            <div class="absolute top-20 left-20 w-32 h-32 rounded-full bg-white"></div>
            <div class="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white"></div>
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white"></div>
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
            <div class="text-center text-white mb-12">
                <div class="inline-block bg-white bg-opacity-20 px-6 py-2 rounded-full text-sm font-medium mb-4">Edit Event</div>
                <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white">Edit Your Venue</h1>
                <p class="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">Where luxury meets elegance. Experience the perfect venue for your most memorable moments.</p>
            </div>
        </div>
    </section>

    <section class="px-4 md:px-8 lg:px-16 -mt-20 relative z-20">
        <div class="max-w-7xl mx-auto">
            <div class="glass-effect rounded-3xl p-8 md:p-12 mb-8 space-y-8">
                <EventForm v-model="eventForm" :categories="categories" :amenities="amenities" />
                <!-- Submit Button -->
                <div class="text-center mt-8">
                    <button @click="submitForm" class="luxury-button text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg">
                        <i class="fas fa-calendar-check mr-3"></i>
                        Submit Event
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import EventForm from '../../components/EventForm.vue';
import axiosInstance from '../../service/api';

const route = useRoute();
const toast = useToast();
const venueId = route.params.id;

const eventForm = ref({
    venueName: '',
    location: '',
    charges: null,
    guests: null,
    phoneNumber: '',
    description: '',
    categories: [],
    amenities: [],
    images: [] // this will hold File objects for new uploads
});

const categories = ['Wedding', 'Parties', 'Meetups', 'Seminars'];
const amenities = ['High-Speed WiFi', 'Valet Parking', 'Climate Control', 'Gourmet Catering', 'Sound System', 'LED Lighting'];

function showError(msg) {
    toast.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: msg,
        life: 4000
    });
}

onMounted(async () => {
    await loadVenueDetails();
});

async function loadVenueDetails() {
    try {
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get(`/venue/${venueId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const v = res.data.venue;
        console.log(v);
        // eventForm.value.venueName = v.venueName;
        // eventForm.value.location = v.location;
        // eventForm.value.charges = v.chargesPerHour;
        // eventForm.value.guests = v.guestPerCapacity;
        // eventForm.value.phoneNumber = v.callNumber;
        // eventForm.value.description = v.eventDescription;
        // eventForm.value.categories = v.category || [];
        // eventForm.value.amenities = v.amenities || [];
        Object.assign(eventForm.value, {
            venueName: v.venueName,
            location: v.location,
            charges: v.chargesPerHour,
            guests: v.guestPerCapacity,
            phoneNumber: v.callNumber,
            description: v.eventDescription,
            categories: v.category || [],
            amenities: v.amenities || []
        });
    } catch (err) {
        console.error('Failed to load venue:', err);
        showError('Could not load venue data.');
    }
}

async function submitForm() {
    const f = eventForm.value;
    const phoneRegex = /^03\d{2}-\d{7}$/;

    if (!f.venueName) return showError('Venue name is required');
    if (!f.location) return showError('Location is required');
    if (!f.description) return showError('Event description is required');
    if (!f.categories.length) return showError('Please select at least one category');
    if (!f.amenities.length) return showError('Please select at least one amenity');
    if (!f.charges || f.charges <= 0) return showError('Charges must be greater than 0');
    if (!f.guests || f.guests <= 0) return showError('Number of guests must be greater than 0');
    if (!f.phoneNumber) return showError('Phone number is required');
    if (!phoneRegex.test(f.phoneNumber)) return showError('Phone number format should be 03xx-xxxxxxx');

    try {
        const formData = new FormData();
        formData.append('venueName', f.venueName);
        formData.append('location', f.location);
        formData.append('chargesPerHour', f.charges);
        formData.append('guestPerCapacity', f.guests);
        formData.append('callNumber', f.phoneNumber);
        formData.append('eventDescription', f.description);
        formData.append('category', JSON.stringify(f.categories));
        formData.append('amenities', JSON.stringify(f.amenities));
        f.images.forEach((img) => formData.append('venueImages', img));

        const token = localStorage.getItem('token');
        const res = await axiosInstance.put(`/venue/edit/${venueId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        toast.add({
            severity: 'success',
            summary: 'Venue Updated',
            detail: res.data.message || 'Venue updated successfully!',
            life: 5000
        });
    } catch (err) {
        console.error('Edit error:', err);
        toast.add({
            severity: 'error',
            summary: 'Update Failed',
            detail: err?.response?.data?.message || 'Failed to update venue.',
            life: 5000
        });
    }
}
</script>
<style scoped>
.hero-gradient {
    background: linear-gradient(135deg, #ff5a60 0%, #ff7b80 50%, #ffa1a5 100%);
}

.glass-effect {
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.3);
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
</style>
