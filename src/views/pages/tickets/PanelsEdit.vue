<template>
    <div class="flex flex-col gap-4">
        <PanelNavigation title="Edit a Panel" backLink="/tickets/panels" :buttons="headerButtons" :showDropdown="false" />
        <PanelSettings v-model:settingsData="editPanelData" />
        <TicketSettings v-model:settingsData="editPanelData" />
        <PanelMessage />
        <div class="card flex flex-col gap-4">
            <PageHeader title="Ticket Components" />
            <TicketComponent :label="'Panel Button'" :labelText="'Label'" :buttonConfig="editPanelData.panelButton" />
            <CustomSeprator />
            <TicketComponent :label="'Close Button'" :labelText="'Label'" :buttonConfig="editPanelData.closeButton" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CustomSeprator from '../../../components/CustomSeprator.vue';
import PageHeader from '../../../components/PageHeader.vue';
import PanelMessage from '../../../components/sections/panels/PanelMessage.vue';
import PanelNavigation from '../../../components/sections/panels/PanelNavigation.vue';
import PanelSettings from '../../../components/sections/panels/PanelSettings.vue';
import TicketComponent from '../../../components/sections/panels/TicketComponent.vue';
import TicketSettings from '../../../components/sections/panels/TicketSettings.vue';

const editPanelData = ref({
    panelName: 'Nice',
    supportRoles: ['Shard bot', 'CROWN: Trio'],
    panelCategory: 'Role bot',
    threadingMode: true,
    saveTranscripts: false,
    channelNameGeneration: 'Nice-benluka',
    ticketCreationReply: 'Ticket Created Successfully',
    rolesRequiredCreation: ['Shard bot'],
    maxOpenTicketPerUser: 4,
    userCanCloseTickets: true,
    panelButton: {
        emoji: { i: '😅' },
        label: 'Open Ticket',
        color: '#3366FF'
    },
    closeButton: {
        emoji: { i: '🍍' },
        label: 'Close Button',
        color: '#3366FF'
    }
});

const headerButtons = [
    {
        label: 'Save',
        onClick: () => {
            // Your save logic here
            console.log('Saving:', editPanelData.value);
        }
    }
];

const buttonConfig = ref({
    emoji: { i: '😊' }, // Adjust your emoji structure as needed
    label: 'Open Ticket',
    color: '#3366FF'
});
const closeButtonConfig = ref({
    emoji: { i: '🍍' }, // Adjust your emoji structure as needed
    label: 'Close',
    color: '#3366FF'
});
</script>
