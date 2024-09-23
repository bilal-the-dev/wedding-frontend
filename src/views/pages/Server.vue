<script setup lang="ts">
import ServerCard from '../../components/ServerCard.vue';

// Array of server objects
const servers = [
    {
        imageUrl: 'https://th.bing.com/th/id/R.11991d9b6e676d00ecfcf8c537c8667b?rik=CIiipjJChLiomw&pid=ImgRaw&r=0',
        title: 'Bid2Bill',
        secondaryButtonText: 'View Details'
    },
    {
        imageUrl: 'https://th.bing.com/th/id/OIP.mXRwK1TJiCxObn4Us6dtOwHaHa?rs=1&pid=ImgDetMain',
        title: 'TaskFlow',
        secondaryButtonText: 'View Details'
    },
    {
        imageUrl: 'https://th.bing.com/th/id/R.11991d9b6e676d00ecfcf8c537c8667b?rik=CIiipjJChLiomw&pid=ImgRaw&r=0',
        title: 'DevXHub',
        secondaryButtonText: 'View Details'
    },
    {
        imageUrl: 'https://th.bing.com/th/id/R.11991d9b6e676d00ecfcf8c537c8667b?rik=CIiipjJChLiomw&pid=ImgRaw&r=0',
        title: 'NextGen',
        secondaryButtonText: 'View Details'
    }
];
</script>

<template>
    <div class="flex flex-col items-center gap-5 text-center">
        <h2 class="text-4xl sm:text-5xl font-bold">Select a Server</h2>
        <p class="text-lg sm:text-xl mb-8">Please select a server to manage or add Tickety to it</p>
    </div>
    <div class="container mx-auto mt-8 p-4 sm:p-6">
        <!-- Responsive grid layout -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Render ServerCard components dynamically -->
            <ServerCard v-for="(server, index) in servers" :key="index" :imageUrl="server.imageUrl" :title="server.title" :secondaryButtonText="server.secondaryButtonText" />
        </div>
    </div>
</template>

<style scoped>
/* Optionally, you can add some custom styling here */
</style>
