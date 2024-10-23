<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Autoresponder Settings" />
        <InputText v-model="settingsData.trigger" placeholder="e.g. How can I become a moderator?" />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold flex gap-2">Ignored Channels <CustomExclaimTooltip tooltipText="ok" /></label>
            <MultiSelect v-model="settingsData.ignoredChannels" display="chip" :options="settingsData.channelOptions" optionLabel="name" filter placeholder="Select Channels" :maxSelectedLabels="3" class="" />
            <ToggleBar :modelValue="settingsData.replyOnlyInTickets" @update:modelValue="updateSetting('replyOnlyInTickets', $event)" label="Reply only in tickets" />
            <ToggleBar :modelValue="settingsData.deleteTriggerMessage" @update:modelValue="updateSetting('deleteTriggerMessage', $event)" label="Delete trigger message" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
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
        type: Object,
        required: false
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
</style>
