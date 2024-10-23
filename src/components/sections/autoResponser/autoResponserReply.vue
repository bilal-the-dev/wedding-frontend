<script setup lang="ts">
import { watchEffect } from 'vue';
import BarCounter from '../../BarCounter.vue';
import CustomExclaimTooltip from '../../CustomExclaimTooltip.vue';

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

<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Autoresponder Reply" />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] flex gap-2 font-bold"
                >Automatically Delete Response
                <CustomExclaimTooltip tooltipText="ok" />
            </label>
            <BarCounter :modelValue="settingsData.deleteResponse" @update:modelValue="updateSetting('deleteResponse', $event)" />
        </div>
        <div class="mb-2 mt-2">
            <p class="text-md">Autoresponder Reply</p>
            <p class="text-sm font-normal text-gray-300">Customize the reply to your needs</p>
        </div>
        <InputText v-model="settingsData.autoResponseReply" placeholder="e.g we are not looking for moderators" />
    </div>
</template>

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
