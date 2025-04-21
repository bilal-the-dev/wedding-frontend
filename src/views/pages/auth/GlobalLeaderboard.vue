<template>
    <!-- Hero Header -->
    <nav class="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto relative  shadow-lg">
  <a href="/" class="flex items-center space-x-4">
    <img src="/images/png/logo.png" alt="Logo" class="h-16 w-16 transition-transform hover:scale-110" />
    <h1 class="hidden sm:block text-2xl font-semibold text-gray-200">DayZ Manager™</h1>
  </a>

  <!-- Mobile menu button -->
  <div class="lg:hidden">
    <button @click="menuOpen = !menuOpen" class="text-gray-300 hover:text-white text-white transition-transform transform hover:scale-110">
      <svg v-if="!menuOpen" class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
      <svg v-else class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>

  <!-- Menu items for larger screens -->
  <div class="hidden lg:flex items-center gap-8">
    <a href="/heatmap" class="text-gray-300 hover:text-white text-lg font-medium transition-all duration-300">Global Heatmap</a>
    <a href="/global/leaderboard" class="text-gray-300 hover:text-white text-lg font-medium transition-all duration-300">Global Leaderboard</a>
    <a href="#invite" class="text-gray-300 hover:text-white text-lg font-medium transition-all duration-300">Invite</a>
    <a href="https://www.patreon.com/TheKillFeed" class="flex items-center text-yellow-400 hover:text-yellow-300 text-lg font-medium transition-all duration-300">
      <span class="mr-2 animate-pulse">✨</span> Premium
    </a>
    <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold" @click="login">Login</button>
  </div>

  <!-- Mobile menu items -->
  <transition name="fade">
    <div v-if="menuOpen" class="lg:hidden fixed inset-0 bg-gray-900  flex flex-col items-center justify-center space-y-6 z-50">
      <button @click="menuOpen = false" class="absolute top-5 right-6 text-gray-300 hover:text-white transition-transform transform hover:scale-110">
        <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <a href="/heatmap" class="text-white text-xl font-semibold hover:text-gray-300 transition-all duration-300">Global Heatmap</a>
      <a href="/global/leaderboard" class="text-gray-300 hover:text-white text-lg font-medium transition-all duration-300">Global Leaderboard</a>
      <a href="#invite" class="text-white text-xl font-semibold hover:text-gray-300 transition-all duration-300">Invite</a>
      <a href="#premium" class="text-yellow-400 text-xl font-semibold hover:text-yellow-300 transition-all duration-300">Premium</a>
      <button class="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-2xl font-semibold" @click="login">Login</button>
    </div>
  </transition>
</nav>

<header class="relative w-full h-80 flex flex-col items-center justify-center text-center bg-cover bg-center my-16 px-16">
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-10"></div>

    <!-- Header Content -->
    <div class="relative z-10 text-white px-4">
      <h2 class="text-4xl sm:text-5xl font-extrabold drop-shadow-lg animate-fade-in">
        🏆 Global & Server Leaderboards
      </h2>
      <p class="text-lg sm:text-xl mt-2 opacity-90">
        Stay on top of the action. See who dominates the battlefield with live ranking updates 
      </p>

     
    </div>
  </header>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
        <CustomProgressSpinner />
    </div>

    <div v-else class="px-16">
        <div class="card flex flex-col gap-4">

        <PageHeader title="Global Leaderboard" description="Top Players across all services"/>
        <div class="flex flex-col gap-4 mb-4">
            <label class="text-[#9090a3] font-bold">Search </label>
            <CustomTextField customWidth="max-w-[120rem]" :isIcon="true" iconSrc="/images/svg/textField_icon.svg" v-model="textInput" placeholder="Enter a keyword (e.g. Rank, Username, Kills)" />
        </div>

        <!-- Custom DataTable -->
        <div class="card rounded-lg overflow-hidden">
            <DataTable :value="filteredLogs" tableStyle="min-width: 70rem; width: 100%;" paginator :rows="5" :rowsPerPageOptions="[2, 10, 20, 50]" class="custom-datatable">
                <Column field="rank" header="Rank" style="width: 10%">
                    <template #body="slotProps">
                        <p class="text-large data-cell">{{ slotProps.data.rank }}</p>
                    </template>
                </Column>
                <Column field="username" header="Username" style="width: 15%">
                    <template #body="slotProps">
                        <p class="text-large data-cell">{{ slotProps.data.username }}</p>
                    </template>
                </Column>
                <Column field="kills" header="Kills" style="width: 20%">
                    <template #body="slotProps">
                        <p class="text-large data-cell">{{ slotProps.data.kills }}</p>
                    </template>
                </Column>
                <Column field="deaths" header="Deaths" style="width: 20%">
                    <template #body="slotProps">
                        <p class="text-large data-cell">{{ slotProps.data.deaths }}</p>
                    </template>
                </Column>
                <Column field="kd" header="KD" style="width: 15%">
                    <template #body="slotProps">
                        <p class="text-large data-cell">{{ slotProps.data.kd }}</p>
                    </template>
                </Column>
            </DataTable>
        </div>
        
    </div>

    <div class="card flex flex-col gap-4">

<PageHeader title="Server Leaderboard" description="Top Services with most kills"/>
<div class="flex flex-col gap-4 mb-4">
    <label class="text-[#9090a3] font-bold">Search </label>
    <CustomTextField customWidth="max-w-[120rem]" :isIcon="true" iconSrc="/images/svg/textField_icon.svg" v-model="serverTextInput" placeholder="Enter a keyword (e.g., service Id, serverName, server Label)" />
</div>

<!-- Custom DataTable -->
<div class="card rounded-lg overflow-hidden">
    <DataTable :value="filteredServerLogs" tableStyle="min-width: 70rem; width: 100%;" class="custom-datatable">
        <Column field="rank" header="Rank" style="width: 15%">
            <template #body="slotProps">
                <p class="text-large data-cell">{{ slotProps.data.rank }}</p>
            </template>
        </Column>
        <Column field="serviceId" header="Server ID" style="width: 15%">
            <template #body="slotProps">
                <p class="text-large data-cell">{{ slotProps.data.serviceId }}</p>
            </template>
        </Column>
        <Column field="serviceName" header="Server Name" style="width: 15%">
            <template #body="slotProps">
                <p class="text-large data-cell">{{ slotProps.data.serviceName }}</p>
            </template>
        </Column>
        <Column field="serverLabel" header="Server Label" style="width: 15%">
            <template #body="slotProps">
                <p class="text-large data-cell">{{ slotProps.data.serverLabel }}</p>
            </template>
        </Column>
        <Column field="totalkills" header="Total Kills" style="width: 15%">
            <template #body="slotProps">
                <p class="text-large data-cell">{{ slotProps.data.totalKills }}</p>
            </template>
        </Column>
    </DataTable>
</div>

</div>
    </div>
</template>

<script setup>
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import CustomProgressSpinner from '../../../components/CustomProgressSpinner.vue';
import CustomTextField from '../../../components/CustomTextField.vue';
import PageHeader from '../../../components/PageHeader.vue';
import { getGlobalLeaderboard } from '../../../service/settings.services';
const route = useRoute();
const active = ref(null);
const menuOpen = ref(false);
// Toggle the active state for the accordion items
const toggle = (index) => {
    if (active.value === index) {
        active.value = null;
    } else {
        active.value = index;
    }
};

const globalRanks = ref([]);
const serverRanks = ref([])
const textInput = ref('');

const serverTextInput = ref('');
const isLoading = ref(true); // New state for loader

const filteredLogs = computed(() => {
    const query = textInput.value.toLowerCase();
    if (!query) return globalRanks.value;

    return globalRanks.value.filter((log) => log.rank.toLowerCase().includes(query) || log.username.toLowerCase().includes(query) || log.kills.toLowerCase().includes(query));
});


const filteredServerLogs = computed(() => {
    const query = serverTextInput.value.toLowerCase();
    if (!query) return serverRanks.value;

    return serverRanks.value.filter((log) => log.rank.toLowerCase().includes(query) || log.serviceId.toLowerCase().includes(query) || log.serviceName.toLowerCase().includes(query));
});


function assignRankings(data) {
    // Sort the data by totalKills in descending order
    const sortedData = [...data].sort((a, b) => b.totalKills - a.totalKills);

    // Assign ranks based on the sorted data
    return sortedData.map((stat, index) => {
        return {
            rank: (index + 1).toString(), // Convert rank to string
            username: stat.dayzGamerTag,
            kills: stat.totalKills.toString(),
            deaths: stat.totalDeaths,
            kd: stat.totalDeaths === 0 ? stat.totalKills.toFixed(2) : (stat.totalKills / stat.totalDeaths).toFixed(2), // Format KD to 2 decimals
        };
    });
}

function getServerRanks(data) {
    return data.map((stat, index) => {
        return {
            rank: (index + 1).toString(),
            serviceId: stat.serviceId.toString(),
            serviceName: stat.serviceName.toString(),
            serverLabel: stat.serviceLabel.toString(),
            totalKills: stat.totalKills.toString(),
        };
    });
}

onMounted(async () => {
    try {
        const {data} = await getGlobalLeaderboard();
        globalRanks.value = assignRankings(data)
       

        // Group players by serviceId and sum totalKills
const leaderboard = data.reduce((acc, player) => {
    if (!acc[player.serviceId]) {
        acc[player.serviceId] = {
            serviceId: player.serviceId,
            serviceName: player.serviceName,
            serviceLabel : player.serviceIdentifier,
            totalKills: 0
        };
    }
    acc[player.serviceId].totalKills += player.totalKills;
    return acc;
}, {});

// Convert object to sorted array
const sortedLeaderboard = Object.values(leaderboard).sort((a, b) => b.totalKills - a.totalKills);

 serverRanks.value = getServerRanks(sortedLeaderboard);

    } catch (error) {
        console.error('Error fetching ticket logs:', error);
    } finally {
        isLoading.value = false; // Stop the loader after the API call
    }
});

const AUTH_URL = import.meta.env.VITE_APP_REDIRECT_URL;
const login = () => {
    console.log('Logging in with Discord...');
    console.log(AUTH_URL);
    window.location.href = AUTH_URL;
};
</script>

<style scoped>

header {
  background-image: url('/images/png/cover.bg.png'); /* Replace with your image */
}

/* Smooth Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
.custom-datatable ::v-deep(.p-datatable-wrapper) {
    background-color: #1e1e2d;
}

.custom-datatable ::v-deep(.p-datatable-tbody > tr) {
    color: white;
    border-bottom: 1px solid #2d2d3d;
}

.custom-datatable ::v-deep(.p-datatable-tbody > tr:last-child) {
    border-bottom: none;
}

.text-large {
    font-size: 1.25rem;
}

.data-cell {
    padding: 10px 0px;
}</style>


