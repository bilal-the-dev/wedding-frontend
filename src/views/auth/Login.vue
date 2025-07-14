<template>
    <Toast />
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
            <!-- Logo -->
            <div class="mr-8">
                <img src="/logo.png" alt="Logo" class="" />
            </div>

            <!-- Email Input -->
            <div class="mb-4 text-left">
                <label class="block text-gray-700 mb-1">Email</label>
                <InputText v-model="email" class="w-full" placeholder="Enter your email" />
            </div>

            <!-- Password Input -->
            <div class="mb-6 text-left">
                <label class="block text-gray-700 mb-1">Password</label>
                <Password v-model="password" class="w-full" inputClass="w-full" toggleMask placeholder="Enter your password" />
            </div>

            <p class="text-sm mt-2 mb-4 text-gray-600">
                Don’t have an account?
                <RouterLink to="/signup" class="text-blue-600 hover:underline"> Sign up now </RouterLink>
            </p>

            <!-- Login Button -->
            <Button label="Login" class="w-full" style="background-color: #ff5a60; border: none" @click="handleLogin" />

            <p class="text-center text-xs text-gray-500 mt-4">This login is secured by AES-256 encryption.</p>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '../../service/api';
const toast = useToast();
const router = useRouter();
const email = ref('');
const password = ref('');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleLogin = async () => {
    if (!isValidEmail(email.value) || password.value.length < 6) {
        toast.add({
            severity: 'warn',
            summary: 'Validation Failed',
            detail: 'Enter valid email and password (min 6 chars).',
            life: 3000
        });
        return;
    }

    try {
        const res = await axiosInstance.post('/auth/login', {
            email: email.value,
            password: password.value
        });

        const token = res.data.token;

        // Save token and optionally user info
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        toast.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: `Welcome back, ${res.data.user.name}!`,
            life: 3000
        });
        router.push('/overview');
    } catch (err) {
        const message = err?.response?.data?.message || 'Login failed';
        console.log(err);
        toast.add({
            severity: 'error',
            summary: 'Login Error',
            detail: message,
            life: 3000
        });
    }
};
</script>
