<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Panel Settings" />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Panel Name</label>
            <InputText v-model="settingsData.panelName" placeholder="e.g Support Ticket" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Channel to publish</label>
            <!-- <MultiSelect v-model="settingsData.supportRoles" display="chip" :options="settingsData.rolesOptions" optionLabel="name" filter placeholder="Select Channels" :maxSelectedLabels="3" class="" /> -->
            <Select v-model="settingsData.channelId" :options="settingsData.channelOptions" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Panel Category</label>
            <Select v-model="settingsData.panelCategory" :options="settingsData.categoryOptions" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Panel Close Category</label>
            <Select v-model="settingsData.ticketCloseCategoryId" :options="settingsData.categoryOptions" optionLabel="name" placeholder="Select a City" class="w-full md:w-56" />
        </div>
        <ToggleBar :modelValue="settingsData.saveTranscripts" @update:modelValue="updateSetting('saveTranscripts', $event)" label="Save Transcripts?" />
    </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, watchEffect } from 'vue';
import PageHeader from '../../PageHeader.vue';
import ToggleBar from '../../ToggleBar.vue';

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
    const updatedSettings = { ...props.settingsData, [key]: value };
    emit('update:settingsData', updatedSettings);
};

watchEffect(() => {
    emit('update:settingsData', props.settingsData);
});

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
