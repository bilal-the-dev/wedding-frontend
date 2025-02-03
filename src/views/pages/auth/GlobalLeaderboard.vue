<template>
    <PageHeader title="Leaderboard" description="Check Global and Server Leaderboard" />

    <div v-if="isLoading" class="flex justify-center items-center h-64">
        <CustomProgressSpinner />
    </div>

    <div v-else>
        <div class="card flex flex-col gap-4">

        <PageHeader title="Global Leaderboard" />
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

<PageHeader title="Server Leaderboard" />
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
</script>

<style scoped>
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
}
</style>
