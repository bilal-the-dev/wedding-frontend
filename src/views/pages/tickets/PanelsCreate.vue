<script setup lang="ts">
import { ref } from 'vue';
import CustomSeprator from '../../../components/CustomSeprator.vue';
import PageHeader from '../../../components/PageHeader.vue';
import PanelMessage from '../../../components/sections/panels/PanelMessage.vue';
import PanelNavigation from '../../../components/sections/panels/PanelNavigation.vue';
import PanelSettings from '../../../components/sections/panels/PanelSettings.vue';
import TicketComponent from '../../../components/sections/panels/TicketComponent.vue';
import TicketSettings from '../../../components/sections/panels/TicketSettings.vue';

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

const dropdownItems = ['Shard bot', 'Admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne', 'Commands Cooldown'];
const headerButtons = [
    {
        label: 'Publish',
        onClick: () => {
            // Your publish logic here
        }
    },
    {
        label: 'Create',
        onClick: () => {
            // Your create logic here
        }
    }
];
</script>

<template>
    <div class="flex flex-col gap-8">
        <PanelNavigation title="Create a Panel" backLink="/tickets/panels" :dropdownItems="dropdownItems" :buttons="headerButtons" />
        <PanelSettings />
        <TicketSettings />
        <PanelMessage />
        <div class="card flex flex-col gap-4">
            <PageHeader title="Ticket Components" />
            <TicketComponent :label="'Panel Button'" :labelText="'Label'" :buttonConfig="buttonConfig" />
            <CustomSeprator />
            <TicketComponent :label="'Close Button'" :labelText="'Label'" :buttonConfig="closeButtonConfig" />
        </div>
    </div>
</template>
