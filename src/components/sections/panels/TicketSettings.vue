<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Ticket Settings" />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold flex">Channel Name Generation <CustomExclaimTooltip :tooltipText="`Variables : \n{ticketnum}\n{panel}\n{username} \n `" /></label>
            <InputText v-model="settingsData.channelNameGeneration" placeholder="e.g Support Ticket" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Max Open Tickets per User</label>
            <BarCounter :modelValue="settingsData.maxOpenTicketPerUser" @update:modelValue="updateSetting('maxOpenTicketPerUser', $event)" />
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue';
import BarCounter from '../../BarCounter.vue';
import CustomExclaimTooltip from '../../CustomExclaimTooltip.vue';
import PageHeader from '../../PageHeader.vue';
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const props = defineProps({
    settingsData: {
        required: true,
        type: Object
    }
});

const emit = defineEmits(['update:settingsData']);

const updateSetting = (key, value) => {
    emit('update:settingsData', { ...props.settingsData, [key]: value });
};

const dropdownItems = ['Shard bot', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne', 'Commands Cooldown', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne'];
</script>

<style scoped>
:deep(.p-inputtext) {
    width: 100%;
    max-width: 32rem;
    height: 3.6rem;
    background-color: #172135;
}
:deep(.p-multiselect) {
    width: 100%;
    max-width: 32rem;
    height: 3.6rem;
    background-color: #172135;
}
:deep(.p-multiselect-label) {
    padding-top: 1rem;
}
:deep(.p-multiselect-label:has(.p-chip)) {
    padding-top: 0.8rem;
    padding-left: 0.5rem;
}
:deep(.p-select) {
    width: 100%;
    max-width: 32rem;
    height: 3.6rem;
    background-color: #172135;
}
:deep(.p-select-label) {
    padding-top: 1rem;
}
</style>
