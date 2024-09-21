<!-- BarChart.vue -->
<template>
    <div class="card">
        <div class="title rounded-tl-md pb-6 rounded-tr-md">{{ title }}</div>
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
    </div>
</template>

<script setup>
import Chart from 'primevue/chart';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    labels: {
        type: Array,
        default: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    },
    datasets: {
        type: Array,
        required: true
    },
    aspectRatio: {
        type: Number,
        default: 0.8
    },
    title: {
        type: String,
        default: 'Bar Chart'
    },
    colors: {
        type: Array,
        default: () => ['var(--p-cyan-500)', 'var(--p-gray-500)']
    }
});

const chartData = ref(null);
const chartOptions = ref(null);

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels: props.labels,
        datasets: props.datasets.map((dataset, index) => ({
            ...dataset,
            backgroundColor: props.colors[index] || documentStyle.getPropertyValue(props.colors[index] || `--p-${index === 0 ? 'cyan' : 'gray'}-500`),
            borderColor: props.colors[index] || documentStyle.getPropertyValue(props.colors[index] || `--p-${index === 0 ? 'cyan' : 'gray'}-500`)
        }))
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: props.aspectRatio,
        plugins: {
            legend: false
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
};

const updateChart = () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
};

onMounted(updateChart);

watch(() => props.datasets, updateChart, { deep: true });
watch(() => props.labels, updateChart);
watch(() => props.aspectRatio, updateChart);
watch(() => props.colors, updateChart, { deep: true });
</script>
