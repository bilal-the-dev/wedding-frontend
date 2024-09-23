<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Ticket Settings" />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Channel Name Generation</label>
            <CustomTextField placeholder="e.g Support Ticket" :modelValue="settingsData.channelNameGeneration" @update:modelValue="updateSetting('channelNameGeneration', $event)" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Ticket Creation Reply</label>
            <CustomTextField placeholder="e.g Support Ticket" :modelValue="settingsData.ticketCreationReply" @update:modelValue="updateSetting('ticketCreationReply', $event)" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Roles Required To Create Tickets</label>
            <CustomDropDown :items="dropdownItems" :modelValue="settingsData.rolesRequiredCreation" @update:modelValue="updateSetting('rolesRequiredCreation', $event)" :multiple="true" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Max Open Tickets per User</label>
            <BarCounter :modelValue="settingsData.maxOpenTicketPerUser" @update:modelValue="updateSetting('maxOpenTicketPerUser', $event)" />
        </div>
        <ToggleBar :modelValue="settingsData.userCanCloseTickets" @update:modelValue="updateSetting('userCanCloseTickets', $event)" label="Users Can Close Tickets?" />
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';
import BarCounter from '../../BarCounter.vue';
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
