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
                    <BarChart :colors="['#36A2EB', '#ffc800']" title="Opened & Closed Tickets" :datasets="chartDatasets1" :labels="chartLabels1" />
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
import { getAutoResponsersChannelsAndRoles } from '../service/settings.services';

const route = useRoute();
const guildId = route.params.id;
const cards = ref([
    {
        title: 'Opened Tickets',
        count: 0,
        change: 0,
        icon: '/images/svg/ticket_create.svg'
    },
    {
        title: 'Closed Tickets',
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
const isLoading = ref(true); // Loader state

function calculateTicketChange(timestamps) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayTickets = timestamps.filter((timestamp) => new Date(timestamp) >= today).length;
    const yesterdayTickets = timestamps.filter((timestamp) => {
        const date = new Date(timestamp);
        return date >= yesterday && date < today;
    }).length;

    const change = todayTickets - yesterdayTickets;
    return change > 0 ? `+${change}` : change.toString();
}

function processWeeklyData(timestamps) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Set to Monday of current week

    const weeklyData = [0, 0, 0, 0, 0, 0, 0];

    timestamps.forEach((timestamp) => {
        const date = new Date(timestamp);
        if (date >= weekStart && date <= now) {
            // Changed to include the current day
            const dayIndex = (date.getDay() + 6) % 7; // Adjust so Monday is 0
            weeklyData[dayIndex]++;
        }
    });

    console.log('Weekly data:', weeklyData); // Add this line for debugging
    return weeklyData;
}

onMounted(async () => {
    try {
        const { settings } = await getAutoResponsersChannelsAndRoles(guildId);

        let openedTicketsChange, closedTicketsChange;

        if (settings.openedTickets && settings.closedTickets) {
            openedTicketsChange = calculateTicketChange(settings.openedTickets);
            closedTicketsChange = calculateTicketChange(settings.closedTickets);

            cards.value = [
                {
                    title: 'Opened Tickets',
                    count: settings.openedTickets.length,
                    change: openedTicketsChange,
                    icon: '/images/svg/ticket_create.svg'
                },
                {
                    title: 'Closed Tickets',
                    count: settings.closedTickets.length,
                    change: closedTicketsChange,
                    icon: '/images/svg/ticket_create.svg'
                }
            ];

            // Process weekly data for chart
            const openedWeeklyData = processWeeklyData(settings.openedTickets);
            const closedWeeklyData = processWeeklyData(settings.closedTickets);

            chartDatasets1.value = [
                { label: 'Opened Tickets', data: openedWeeklyData },
                { label: 'Closed Tickets', data: closedWeeklyData }
            ];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        isLoading.value = false; // Disable the loader after data is fetched
    }
});
</script>
