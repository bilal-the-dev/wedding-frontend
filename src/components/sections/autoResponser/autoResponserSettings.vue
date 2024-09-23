<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Autoresponder Settings" />
        <CustomTextField :modelValue="settingsData.trigger" @update:modelValue="updateSetting('trigger', $event)" placeholder="e.g How i can become a  moderator?" label="Trigger" />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold flex gap-2">Ignored Channels <CustomExclaimTooltip tooltipText="ok" /></label>
            <CustomDropDown :modelValue="settingsData.ignoredChannels" @update:modelValue="updateSetting('ignoredChannels', $event)" :items="dropdownItems" :multiple="true" />
            <ToggleBar :modelValue="settingsData.replyOnlyInTickets" @update:modelValue="updateSetting('replyOnlyInTickets', $event)" label="Reply only in tickets" />
            <ToggleBar :modelValue="settingsData.deleteTriggerMessage" @update:modelValue="updateSetting('deleteTriggerMessage', $event)" label="Delete trigger message" />
            <ToggleBar :modelValue="settingsData.adminRoleOnly" @update:modelValue="updateSetting('adminRoleOnly', $event)" label="Admin Role Only" />
        </div>
    </div>
</template>

<script setup>
import CustomTextField from '../../CustomTextField.vue';

const dropdownItems = ['Shard bot', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne', 'Commands Cooldown', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne'];

const props = defineProps({
    settingsData: {
        type: Object,
        required: false
    }
});

const emit = defineEmits(['update:settingsData']);

const updateSetting = (key, value) => {
    emit('update:settingsData', { ...props.settingsData, [key]: value });
};
</script>
