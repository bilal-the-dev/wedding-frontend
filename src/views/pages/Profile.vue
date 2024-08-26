<template>
    <div class="discord-profile">
        <div class="profile-card" :style="{ backgroundColor: user.banner_color }">
            <div class="avatar-container">
                <img :src="avatarUrl" :alt="user.global_name" class="avatar" />
                <div class="status-indicator" :class="{ admin: user.isAdmin }"></div>
            </div>
            <h1 class="username">{{ user.global_name }}</h1>
            <p class="user-tag">@{{ user.username }}</p>
            <div class="user-flags">
                <i class="fas fa-shield-alt" v-if="user.mfa_enabled" title="MFA Enabled"></i>
                <i class="fas fa-check-circle" v-if="user.verified" title="Verified"></i>
                <i class="fas fa-crown" v-if="user.isAdmin" title="Admin"></i>
            </div>
            <div class="user-details">
                <p><i class="fas fa-envelope"></i> {{ user.email }}</p>
                <p><i class="fas fa-globe"></i> {{ user.locale }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { me } from '../../service/auth.services';

const user = ref({});

const avatarUrl = computed(() => {
    return `https://cdn.discordapp.com/avatars/${user.value.id}/${user.value.avatar}.png`;
});

onMounted(async () => {
    const response = await me();
    const { status, data } = response;
    if (status === 'success') {
        user.value = data;
    }
});
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.discord-profile {
    display: flex;
    justify-content: center;
    font-family: 'Arial', sans-serif;
}

.profile-card {
    background-color: #2c2f33;
    border-radius: 15px;
    padding: 2rem;
    width: 300px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    text-align: center;
    color: #ffffff;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    animation: fadeIn 1s ease-out;
}

.profile-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
}

.avatar-container {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 1rem;
}

.avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #7289da;
    transition: all 0.3s ease;
}

.avatar:hover {
    transform: scale(1.05);
}

.status-indicator {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #43b581;
    border: 3px solid #2c2f33;
}

.status-indicator.admin {
    background-color: #faa61a;
}

.username {
    font-size: 1.5rem;
    margin: 0;
    color: #ffffff;
}

.user-tag {
    font-size: 1rem;
    color: #b9bbbe;
    margin: 0.5rem 0;
}

.user-flags {
    margin: 1rem 0;
}

.user-flags i {
    margin: 0 0.5rem;
    font-size: 1.2rem;
    color: #faa61a;
}

.user-details {
    text-align: left;
    margin-top: 1rem;
}

.user-details p {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
}

.user-details i {
    margin-right: 0.5rem;
    color: #7289da;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
