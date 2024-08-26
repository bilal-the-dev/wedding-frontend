<template>
    <div class="login-container">
        <div class="animated-background"></div>
        <div class="card" :class="{ 'card-visible': isCardVisible }">
            <i class="pi pi-discord icon"></i>
            <h2>Welcome to DiscordApp</h2>
            <p class="subtitle">Connect with your community</p>
            <Button label="Continue with Discord" icon="pi pi-discord" @click="handleLogin" class="login-button p-button-raised" />
            <p class="terms">By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { onMounted, ref } from 'vue';

const AUTH_URL = import.meta.env.VITE_APP_REDIRECT_URL;
const isCardVisible = ref(false);

const handleLogin = () => {
    window.location.href = AUTH_URL;
};

onMounted(() => {
    setTimeout(() => {
        isCardVisible.value = true;
    }, 300);
});
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #36393f;
    font-family: 'Arial', sans-serif;
    position: relative;
    overflow: hidden;
}

.animated-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #36393f, #202225, #7289da);
    background-size: 400% 400%;
    animation: gradientAnimation 15s ease infinite;
    z-index: 0;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.card {
    background: rgba(47, 49, 54, 0.8);
    padding: 2.5rem;
    border-radius: 10px;
    text-align: center;
    width: 360px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    z-index: 1;
    opacity: 0;
    transform: translateY(20px);
    transition:
        opacity 0.5s ease,
        transform 0.5s ease;
}

.card-visible {
    opacity: 1;
    transform: translateY(0);
}

.icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: #7289da;
}

h2 {
    color: #ffffff;
    margin-bottom: 0.5rem;
    font-size: 1.75rem;
    font-weight: 600;
}

.subtitle {
    color: #b9bbbe;
    margin-bottom: 1.5rem;
    font-size: 1rem;
}

:deep(.login-button) {
    background-color: #7289da;
    border: none;
    color: white;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    transition:
        background-color 0.3s,
        transform 0.2s;
    width: 100%;
    margin-bottom: 1.5rem;
}

:deep(.login-button:hover) {
    background-color: #5b6eae;
    transform: translateY(-2px);
}

:deep(.login-button:active) {
    transform: translateY(0);
}

:deep(.login-button .p-button-icon) {
    font-size: 1.2rem;
    margin-right: 0.5rem;
}

.features {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1.5rem;
}

.feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #b9bbbe;
}

.feature i {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #7289da;
}

.terms {
    font-size: 0.8rem;
    color: #72767d;
}

.terms a {
    color: #7289da;
    text-decoration: none;
}

.terms a:hover {
    text-decoration: underline;
}
</style>
