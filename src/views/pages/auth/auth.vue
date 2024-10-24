<template>
    <div class="auth-page">
        <div class="spinner-container">
            <div class="spinner-ring">
                <div class="spinner"></div>
                <div class="spinner-inner"></div>
            </div>
            <p class="auth-text">Please wait... Authenticating</p>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axiosInstance from '../../../service/api';
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
            localStorage.setItem('userId', data.id);
            await router.push('/servers');
        } else {
            localStorage.removeItem('userId');
            return (window.location.href = AUTHURL);
        }
    } catch (error) {
        console.log(error);
        localStorage.removeItem('userId');
       // return (window.location.href = AUTHURL);
    }
});
</script>

<style scoped>
.auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: radial-gradient(circle, #050d1f 10%, #010203 80%); /* Enhanced gradient background */
    overflow: hidden; /* Hide overflow for glow effects */
    position: relative;
}

.auth-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 80%, transparent 100%);
    opacity: 0.3;
    animation: stars 5s linear infinite;
}

@keyframes stars {
    from {
        background-position: 0 0;
    }
    to {
        background-position: -200px -200px;
    }
}

.spinner-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
}

.spinner-ring {
    position: relative;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    box-shadow:
        0 0 15px rgba(0, 153, 255, 0.3),
        0 0 50px rgba(0, 153, 255, 0.5);
}

.spinner {
    width: 50px;
    height: 50px;
    border: 6px solid rgba(255, 255, 255, 0.1);
    border-top-color: #00ccff;
    border-radius: 50%;
    animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; /* Smoother cubic animation */
}

.spinner-inner {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: #00aaff;
    border-radius: 50%;
    animation: spin 1s linear infinite reverse; /* Inner spinner rotating in opposite direction */
}

.auth-text {
    margin-top: 30px;
    color: #ffffff;
    font-size: 1.6em;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    animation: fadeIn 2s ease-in-out;
    letter-spacing: 0.1em;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
