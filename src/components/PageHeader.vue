<template>
    <div class="flex justify-between">
        <h4 class="text-[1.6rem] font-medium">{{ title }}</h4>
        <p class="text-[20px] mt-3 text-[#9a9aa9]">{{ stats }}</p>
    </div>
    <p class="text-[15px] mt-3 text-[#9a9aa9]" v-if="description">{{ description }}</p>
    <CustomSeprator />
</template>

<script setup>
import CustomSeprator from './CustomSeprator.vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
        default: 'Overview'
    },
    description: {
        type: String,
        required: false
    },
    stats: {
        type: String,
        required: false
    }
});
</script>
