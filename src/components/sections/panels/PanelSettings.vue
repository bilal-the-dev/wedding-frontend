<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Panel Settings" />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Panel Name</label>
            <CustomTextField placeholder="e.g Support Ticket" :modelValue="settingsData.panelName" @update:modelValue="updateSetting('panelName', $event)" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Support Roles</label>
            <CustomDropDown :modelValue="settingsData.supportRoles" @update:modelValue="updateSetting('supportRoles', $event)" :items="dropdownItems" :multiple="true" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Panel Category</label>
            <CustomDropDown :modelValue="settingsData.panelCategory" @update:modelValue="updateSetting('panelCategory', $event)" :items="dropdownItems" />
        </div>
        <ToggleBar :modelValue="settingsData.threadingMode" @update:modelValue="updateSetting('threadingMode', $event)" label="Threading Mode?" />
        <ToggleBar :modelValue="settingsData.saveTranscripts" @update:modelValue="updateSetting('saveTranscripts', $event)" label="Save Transcripts?" />
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';
import CustomDropDown from '../../CustomDropDown.vue';
import CustomTextField from '../../CustomTextField.vue';
import PageHeader from '../../PageHeader.vue';
import ToggleBar from '../../ToggleBar.vue';

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
