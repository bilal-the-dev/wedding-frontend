<template>
    <div>
        <PageHeader title="OverView" />
        <div class="grid grid-cols-12 gap-8">
            <div v-for="(card, index) in cards" :key="index" class="col-span-12 lg:col-span-6 xl:col-span-3">
                <StatCard :title="card.title" :count="card.count" :change="card.change" :icon="card.icon" />
            </div>
        </div>
        <div class="grid grid-cols-12 gap-8 mt-8">
            <div class="col-span-12 lg:col-span-6">
                <BarChart :colors="['#36A2EB', '#ffc800']" title="Opened & Closed Tickets" :datasets="chartDatasets1" :labels="chartLabels1" />
            </div>
            <div class="col-span-12 lg:col-span-6">
                <BarChart :colors="['#36A2EB', '#36A2EB']" title="Opened & Closed Tickets" :datasets="chartDatasets2" :labels="chartLabels2" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BarChart from '../components/BarChart.vue';
import PageHeader from '../components/PageHeader.vue';
import StatCard from '../components/StatCard.vue';

const cards = [
    {
        title: 'Created Tickets',
        count: 0,
        change: '+ 0',
        icon: '/images/svg/ticket_create.svg'
    },
    {
        title: 'Closed Tickets',
        count: 1,
        change: '+ 0',
        icon: '/images/svg/ticket_closed.svg'
    },
    {
        title: 'Renamed Tickets',
        count: 0,
        change: '+ 0',
        icon: '/images/svg/ticket_renamed.svg'
    },
    {
        title: 'Claimed Tickets',
        count: 0,
        change: '+ 0',
        icon: '/images/svg/ticket_claimed.svg'
    }
];

const chartDatasets1 = ref([
    {
        label: 'Created Tickets',
        data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
        label: 'Closed Tickets',
        data: [28, 48, 40, 19, 86, 27, 90]
    }
]);

const chartLabels1 = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']);

const chartDatasets2 = ref([
    {
        label: 'Renamed Tickets',
        data: [30, 45, 61, 40, 55, 70, 80]
    }
]);

const chartLabels2 = ref(['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']);
</script>
