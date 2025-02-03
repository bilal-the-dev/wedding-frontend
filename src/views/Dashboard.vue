<template>
    <div>
        <PageHeader title="Overview" />
        <div v-if="isLoading" class="flex justify-center items-center h-64">
            <CustomProgressSpinner />
        </div>
        <div v-else>
            <div class="grid grid-cols-12 gap-8">
                <div v-for="(card, index) in cards" :key="index" class="col-span-12 lg:col-span-12 xl:col-span-6">
                    <StatCard :title="card.title" :count="card.count" :change="card.change" :icon="card.icon" />
                </div>
            </div>
            <div class="grid grid-cols-12 gap-8 mt-8">
                <div class="col-span-12 lg:col-span-12">
                    <BarChart :colors="['#36A2EB', '#ffc800']" title="Total Kills and Deaths" :datasets="chartDatasets1" :labels="chartLabels1" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import BarChart from '../components/BarChart.vue';
import CustomProgressSpinner from '../components/CustomProgressSpinner.vue'; // Import the custom loader
import PageHeader from '../components/PageHeader.vue';
import StatCard from '../components/StatCard.vue';
import { getGlobalLeaderboard } from '../service/settings.services';

const route = useRoute();
const serviceId = route.params.id;
const cards = ref([
    {
        title: 'Total Kills',
        count: 0,
        change: 0,
        icon: '/images/svg/ticket_create.svg'
    },
    {
        title: 'Total Deaths',
        count: 0,
        change: 0,
        icon: '/images/svg/ticket_create.svg'
    }
]);
const chartDatasets1 = ref([
    { label: 'Created Tickets', data: [0, 0, 0, 0, 0, 0, 0] },
    { label: 'Closed Tickets', data: [0, 0, 0, 0, 0, 0, 0] }
]);
const chartLabels1 = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
const isLoading = ref(true);


function getTopUsersByKillsAndDeaths(serviceId, data) {
    // Filter the data for the given serviceId
    const filteredData = data.filter(item => item.serviceId === serviceId);

    // Sort the data by totalKills and totalDeaths in descending order
    const sortedByKillsAndDeaths = filteredData.sort((a, b) => {
        // Compare by totalKills first, then totalDeaths if kills are equal
        if (b.totalKills === a.totalKills) {
            return b.totalDeaths - a.totalDeaths;
        }
        return b.totalKills - a.totalKills;
    });

    // Get the top 5 users (or less if there are fewer than 5)
    return sortedByKillsAndDeaths.slice(0, 5);
}

onMounted(async () => {
    try {
        const {data} = await getGlobalLeaderboard();
        console.log(data)

        const filteredData = data.filter(item => item.serviceId === serviceId);

        const totalKills = filteredData.reduce((sum, item) => sum + item.totalKills, 0);
    const totalDeaths = filteredData.reduce((sum, item) => sum + item.totalDeaths, 0);

    const top5player = getTopUsersByKillsAndDeaths(serviceId, data)
    const topUserNames = top5player.map(user => user.dayzGamerTag);
    
    const topKills = top5player.map(user => user.totalKills);
    const topDeaths = top5player.map(user => user.totalDeaths);
    console.log(topDeaths)
    chartLabels1.value  = topUserNames
            cards.value = [
                {
                    title: 'Total Kills',
                    count: totalKills,
                    change: 0,
                    icon: '/images/svg/ticket_create.svg'
                },
                {
                    title: 'Total Death',
                    count: totalDeaths,
                    change: 0,
                    icon: '/images/svg/ticket_create.svg'
                }
            ];


            chartDatasets1.value = [
            { label: 'Total Kills', data: topKills },
            { label: 'Total Deaths', data: topDeaths }
            ];
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        isLoading.value = false; // Disable the loader after data is fetched
    }
});
</script>
