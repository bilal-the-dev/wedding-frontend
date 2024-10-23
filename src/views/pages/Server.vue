<template>
    <div class="flex flex-col mt-28 items-center gap-5 text-center">
        <h2 class="text-4xl sm:text-5xl font-bold">Select a Server</h2>
        <p class="text-lg sm:text-xl mb-8">Please select a server to manage or add Tickety to it</p>
    </div>
    <div class="container mx-auto mt-8 p-4 sm:p-6">
        <!-- Loading spinner -->
        <div v-if="isLoading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <!-- Responsive grid layout -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Render ServerCard components dynamically -->
            <ServerCard v-for="(server, index) in servers" :key="index" :id="server.id" :imageUrl="server.imageUrl" :title="server.title" :secondaryButtonText="server.secondaryButtonText" :inviteUrl="inviteUrl" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ServerCard from '../../components/ServerCard.vue';
import { getGuilds } from '../../service/auth.services';

const servers = ref([]);
const isLoading = ref(true);
const inviteUrl = ref('');
function getFirst20Chars(str: string): string {
    const first15 = str.slice(0, 15);
    return str.length > 20 ? first15 + '...' : str;
}

onMounted(async () => {
    try {
        const data = await getGuilds();
        servers.value = data.guilds
            .map((guild) => ({
                id: guild.id,
                imageUrl: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : '/images/png/default.png',
                title: getFirst20Chars(guild.name),
                secondaryButtonText: guild.isBotPresent && guild.isBotPresent === true ? 'Manage' : 'Invite'
            }))
            .sort((a, b) => {
                // Sort to have "Manage" come before "Invite"
                if (a.secondaryButtonText === 'Manage' && b.secondaryButtonText === 'Invite') {
                    return -1;
                }
                if (a.secondaryButtonText === 'Invite' && b.secondaryButtonText === 'Manage') {
                    return 1;
                }
                return 0;
            });
        inviteUrl.value = data.inviteURL;
    } catch (error) {
        console.error('Error fetching guilds:', error);
        // Handle error (e.g., show error message to user)
    } finally {
        isLoading.value = false;
    }
});
</script>

<style scoped>
/* Custom styles can be added here if needed */
</style>
