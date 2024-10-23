<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import CustomSeprator from '../../../components/CustomSeprator.vue';
import PageHeader from '../../../components/PageHeader.vue';
import PanelMessage from '../../../components/sections/panels/PanelMessage.vue';
import PanelNavigation from '../../../components/sections/panels/PanelNavigation.vue';
import PanelSettings from '../../../components/sections/panels/PanelSettings.vue';
import TicketComponent from '../../../components/sections/panels/TicketComponent.vue';
import TicketSettings from '../../../components/sections/panels/TicketSettings.vue';
import router from '../../../router';
import { createPanels, publishPanels } from '../../../service/panels.services';
import { getAutoResponsersChannelsAndRoles } from '../../../service/settings.services';
import { formatPanelData, validatePanelData } from '../../../utils/func';
const buttonColors = {
    '#5865F2': 'Primary', // Blurple
    '#4F545C': 'Secondary', // Grey
    '#57F287': 'Success', // Green
    '#ED4245': 'Danger' // Red
};

function getButtonStyleName(hexColor) {
    const colorUpperCase = hexColor.toUpperCase();

    return buttonColors[colorUpperCase] || 'Unknown';
}
const toast = useToast();

const editPanelData = ref({
    categoryOptions: [],
    rolesOptions: [],
    supportRoles: [],
    channelOptions: [],
    panelName: '',
    panelCategory: { id: '', name: '' },
    ticketCloseCategoryId: { id: '', name: '' },
    channelId: { id: '', name: '' },
    saveTranscripts: false,
    channelNameGeneration: '{panel}-{username}',
    maxOpenTicketPerUser: 4,
    userCanCloseTickets: true,
    panelButton: {
        emoji: { i: '🎫' },
        label: 'Open Ticket',
        color: '#5865F2'
    },
    closeButton: {
        emoji: { i: '🔒' },
        label: 'Close Button',
        color: '#5865F2'
    },
    panelEmbed: {
        color: '#5865F2',
        embedHeader: 'Tickety',
        headerURL: 'https://discord.com/',
        embedTitle: 'Ticket Creation',
        embedDescription: 'To create a ticket, please click on the button below.',
        embedFooter: 'Tickety | Tickety.top'
    },
    ticketEmbed: {
        color: '#5865F2',
        embedHeader: 'Tickety',
        headerURL: 'https://discord.com/',
        embedTitle: 'Ticket Opened!',
        embedDescription: 'Thanks for contacting the support team! Please explain your case so we can help you as quickly as possible!',
        embedFooter: 'Tickety | Tickety.top'
    }
});

const selectedPanelId = ref(null);

const headerButtons = [
    {
        label: 'Publish',
        onClick: async () => {
            try {
                if (!validatePanelData(editPanelData.value, toast, true)) return;

                const res = await createPanels(id, formatPanelData(editPanelData.value));
                if (res.doc._id && editPanelData.value.channelId.id) {
                    await publishPanels(res.doc._id, editPanelData.value.channelId.id);
                    editPanelData.value.channelId = { id: '', name: '' };
                }
                await toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Panel created successfully!',
                    life: 3000
                });
                router.push(`/tickets/panels/${id}`);
            } catch (e) {
                toast.add({
                    severity: 'error',
                    summary: 'error',
                    detail: e.response.data.message,
                    life: 3000
                });
            }
        }
    },
    {
        label: 'Create',
        onClick: async () => {
            try {
                if (!validatePanelData(editPanelData.value, toast)) return;
                const res = await createPanels(id, formatPanelData(editPanelData.value));
                selectedPanelId.value = res.doc._id;
                if (selectedPanelId.value && editPanelData.value.channelId.id) {
                    await publishPanels(selectedPanelId.value, editPanelData.value.channelId.id);
                    editPanelData.value.channelId = { id: '', name: '' };
                }
                await toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Panel created successfully!',
                    life: 3000
                });
            } catch (e) {
                console.log(e);
                toast.add({
                    severity: 'error',
                    summary: 'error',
                    detail: e.response.data.message,
                    life: 3000
                });
            }
        }
    }
];

const route = useRoute();
const id = route.params.id;

watch(
    editPanelData,
    (newValue) => {
        console.log('editPanelData updated:', newValue);
    },
    { deep: true }
);

onMounted(async () => {
    const data = await getAutoResponsersChannelsAndRoles(id);
    editPanelData.value.categoryOptions = data.cache.categories.map((category) => {
        return {
            id: category.id,
            name: category.name
        };
    });
    editPanelData.value.rolesOptions = data.cache.roles.map((role) => {
        return {
            id: role.id,
            name: role.name
        };
    });
    editPanelData.value.channelOptions = data.cache.channels.map((channel) => {
        return {
            id: channel.id,
            name: channel.name
        };
    });
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <PanelNavigation title="Create a Panel" :backLink="`/tickets/panels/${id}`" :buttons="headerButtons" :showDropdown="false" />
        <PanelSettings v-model:settingsData="editPanelData" @update:settingsData="editPanelData = $event" />
        <TicketSettings v-model:settingsData="editPanelData" />
        <PanelMessage v-model="editPanelData.panelEmbed" :headerTitle="'Custom Panel Message'" :subTitle="'Custom Panel Embed'" :description="'Customize your panel embed here'" />
        <PanelMessage v-model="editPanelData.ticketEmbed" :headerTitle="'Welcome Message'" :subTitle="'Welcome Message'" :description="'Customize the ticket welcome message to your needs.'" />
        <div class="card flex flex-col gap-4">
            <PageHeader title="Ticket Components" />
            <TicketComponent :label="'Panel Button'" :labelText="'Label'" v-model:buttonConfig="editPanelData.panelButton" />
            <CustomSeprator />
            <TicketComponent :label="'Close Button'" :labelText="'Label'" v-model:buttonConfig="editPanelData.closeButton" />
        </div>
    </div>
</template>
