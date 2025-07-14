<template>
    <Toast />
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
            <!-- Logo -->
            <div class="mr-8">
                <img src="/logo.png" alt="Logo" class="" />
            </div>

            <!-- Name -->
            <div class="mb-2 text-left">
                <label class="block text-gray-700 mb-1">Name</label>
                <InputText v-model="name" class="w-full" placeholder="Your full name" />
                <small v-if="submitted && !name" class="text-red-500">Name is required</small>
            </div>

            <!-- Email -->
            <div class="mb-4 text-left">
                <label class="block text-gray-700 mb-1">Email</label>
                <InputText v-model="email" class="w-full" placeholder="Enter your email" />
                <small v-if="submitted && !isValidEmail" class="text-red-500">Valid email is required</small>
            </div>

            <!-- Password -->
            <div class="mb-4 text-left">
                <label class="block text-gray-700 mb-1">Password</label>
                <Password v-model="password" class="w-full" inputClass="w-full" toggleMask placeholder="Create a password" />
                <small v-if="submitted && password.length < 6" class="text-red-500"> Password must be at least 6 characters </small>
            </div>

            <!-- Confirm Password -->
            <div class="mb-6 text-left">
                <label class="block text-gray-700 mb-1">Confirm Password</label>
                <Password v-model="confirmPassword" class="w-full" inputClass="w-full" toggleMask placeholder="Confirm your password" />
                <small v-if="submitted && password !== confirmPassword" class="text-red-500"> Passwords do not match </small>
            </div>

            <p class="text-sm mt-2 mb-4 text-gray-600">
                Already have an account?
                <RouterLink to="/login" class="text-blue-600 hover:underline"> Log in here </RouterLink>
            </p>
            <!-- Sign Up Button -->
            <Button label="Sign Up" class="w-full" style="background-color: #ff5a60; border: none" @click="handleSignup" />
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { useToast } from 'primevue/usetoast';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../../service/api';

const toast = useToast();
const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const submitted = ref(false);

const isValidEmail = computed(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.value);
});

const handleSignup = async () => {
    submitted.value = true;

    if (!name.value || !isValidEmail.value || password.value.length < 6 || password.value !== confirmPassword.value) {
        toast.add({ severity: 'warn', summary: 'Validation Failed', detail: 'Please fix the errors above.', life: 3000 });
        return;
    }

    try {
        const res = await axiosInstance.post('/auth/signup', {
            name: name.value,
            email: email.value,
            password: password.value
        });

        toast.add({ severity: 'success', summary: 'Signup Successful', detail: 'Welcome, ' + res.data.user.name, life: 3000 });

        // Optional: redirect to login or home
        router.push('/login');
    } catch (err) {
        const message = err?.response?.data?.message || 'Signup failed';
        toast.add({ severity: 'error', summary: 'Signup Error', detail: message, life: 3000 });
    }
};
</script>
