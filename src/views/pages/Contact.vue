<template>
    <div>
        <!-- Nav -->
        <NavBar />

        <!-- Page Content -->
        <section class="bg-white text-[#333] py-16 px-6">
            <div class="max-w-4xl mx-auto space-y-14">
                <!-- Header -->
                <div class="text-center space-y-4">
                    <h1 class="text-4xl font-extrabold text-[#FF5A60]">Contact Us</h1>
                    <p class="text-lg text-gray-600">We'd love to hear from you — whether you have a question, feedback, or just want to say hello.</p>
                </div>

                <!-- Contact Info -->
                <div class="bg-[#FFF0F1] p-8 rounded-xl shadow-md space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h3 class="font-semibold text-lg text-[#FF5A60] mb-2">Email</h3>
                            <p>support@eventify.com</p>
                        </div>
                        <div>
                            <h3 class="font-semibold text-lg text-[#FF5A60] mb-2">Phone</h3>
                            <p>+1 (234) 567-8901</p>
                        </div>
                        <div>
                            <h3 class="font-semibold text-lg text-[#FF5A60] mb-2">Location</h3>
                            <p>123 Venue Street, City, Country</p>
                        </div>
                    </div>
                </div>

                <!-- Contact Form -->
                <div class="bg-white border border-gray-200 rounded-xl shadow p-8 space-y-6">
                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <div>
                            <label class="block font-medium text-[#FF5A60] mb-1">Name</label>
                            <input v-model="form.name" type="text" required :disabled="isSubmitting" class="w-full px-4 py-3 border rounded-lg focus:ring-[#FF5A60] focus:outline-none disabled:bg-gray-100" />
                        </div>

                        <div>
                            <label class="block font-medium text-[#FF5A60] mb-1">Email</label>
                            <input v-model="form.email" type="email" required :disabled="isSubmitting" class="w-full px-4 py-3 border rounded-lg focus:ring-[#FF5A60] focus:outline-none disabled:bg-gray-100" />
                        </div>

                        <div>
                            <label class="block font-medium text-[#FF5A60] mb-1">Message</label>
                            <textarea v-model="form.message" rows="5" required :disabled="isSubmitting" class="w-full px-4 py-3 border rounded-lg focus:ring-[#FF5A60] focus:outline-none disabled:bg-gray-100"></textarea>
                        </div>

                        <button type="submit" :disabled="isSubmitting" class="w-full bg-[#FF5A60] text-white py-3 rounded-lg font-semibold hover:bg-[#e04850] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                        </button>
                    </form>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <Footer />

        <!-- Toast Container -->
        <Toast />
    </div>
</template>

<script setup>
import axios from 'axios';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { reactive, ref } from 'vue';

const toast = useToast();

const form = reactive({
    name: '',
    email: '',
    message: ''
});

const isSubmitting = ref(false);

async function handleSubmit() {
    isSubmitting.value = true;

    try {
        const res = await axios.post('http://localhost:5000/api/contact/submit', {
            name: form.name,
            email: form.email,
            message: form.message
        });

        if (res.data.success) {
            toast.add({
                severity: 'success',
                summary: 'Message Sent',
                detail: 'Thank you! We will get back to you shortly.',
                life: 4000
            });

            form.name = '';
            form.email = '';
            form.message = '';
        }
    } catch (err) {
        toast.add({
            severity: 'error',
            summary: 'Submission Failed',
            detail: err.response?.data?.message || 'Please try again later.',
            life: 5000
        });
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<style scoped>
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
