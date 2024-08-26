<template></template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '../../service/api';
const AUTHURL = import.meta.env.VITE_APP_REDIRECT_URL;
const BACKENDURL = import.meta.env.VITE_APP_BACKEND_URL;
const route = useRoute();
const router = useRouter();
onMounted(async () => {
    let url = `/auth/discord/login`;
    const code = route.query.code;
    if (code) url += `?code=${code}`;
    try {
        const response = await axiosInstance.post(`${url}`);
        const { data, status } = response.data;
        if (status === 'success') {
            console.log(data);
            localStorage.setItem('userData', data.isAdmin);
            await router.push('/');
        } else {
            localStorage.removeItem('userId');
            // return (window.location.href = AUTH_URL);
        }
    } catch (error) {
        console.log(error);
        localStorage.removeItem('userId');
        // return (window.location.href = AUTH_URL);
    }
});
</script>
