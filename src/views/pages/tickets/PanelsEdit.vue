<template>
    <div v-if="isLoading" class="flex justify-center items-center h-64">
        <CustomProgressSpinner />
    </div>
    <div v-else class="flex flex-col gap-4">
        <PanelNavigation title="Edit a Panel" :backLink="`/tickets/panels/${id}`" :buttons="headerButtons" :showDropdown="false" />
        <PanelSettings v-model:settingsData="editPanelData" />
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

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, toRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CustomProgressSpinner from '../../../components/CustomProgressSpinner.vue';
import CustomSeprator from '../../../components/CustomSeprator.vue';
import PageHeader from '../../../components/PageHeader.vue';
import PanelMessage from '../../../components/sections/panels/PanelMessage.vue';
import PanelNavigation from '../../../components/sections/panels/PanelNavigation.vue';
import PanelSettings from '../../../components/sections/panels/PanelSettings.vue';
import TicketComponent from '../../../components/sections/panels/TicketComponent.vue';
import TicketSettings from '../../../components/sections/panels/TicketSettings.vue';
import { getPanelById, updatePanel } from '../../../service/panels.services';
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
const buttonStyles = {
    Primary: '#5865F2', // Blurple
    Secondary: '#4F545C', // Grey
    Success: '#57F287', // Green
    Danger: '#ED4245' // Red
};

const toast = useToast();
function getHexColor(buttonStyleName) {
    return buttonStyles[buttonStyleName] || 'Unknown';
}

const editPanelData = ref({
    categoryOptions: [],
    rolesOptions: [],
    supportRoles: [],
    channelOptions: [],
    panelName: '',
    panelCategory: { id: '', name: '' },
    channelId: { id: '', name: '' },
    ticketCloseCategoryId: { id: '', name: '' },
    saveTranscripts: false,
    channelNameGeneration: 'Nice-benluka',
    maxOpenTicketPerUser: 4,
    userCanCloseTickets: true,
    panelButton: {
        emoji: { i: '😅' },
        label: 'Open Ticket',
        color: '#5865F2'
    },
    closeButton: {
        emoji: { i: '🍍' },
        label: 'Close Button',
        color: '#5865F2'
    },
    panelEmbed: {
        color: '#5865F2',
        embedHeader: 'ddddd',
        headerURL: 'https://discord.com/channels/1218982026330243143/1268227615244685494',
        embedTitle: 'Ticket Creation',
        embedDescription: 'To create a ticket, please click on the button below.',
        embedFooter: 'Tickety | Tickety.top'
    },
    ticketEmbed: {
        color: '#5865F2',
        embedHeader: 'https://discord.com/channels/1218982026330243143/1268227615244685494',
        headerURL: '3e3',
        embedTitle: 'Ticket Creation',
        embedDescription: 'To create a ticket, please click on the button below.',
        embedFooter: 'Tickety | Tickety.top'
    }
});
const router = useRouter();

const route = useRoute();
let id = route.params.panelId;
const isLoading = ref(true);
const guildId = route.params.id;
const headerButtons = [
    {
        label: 'Update',
        onClick: async () => {
            try {
                if (!validatePanelData(editPanelData.value, toast, true)) return;

                const res = await updatePanel(id, formatPanelData(editPanelData.value));

                await toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Panel Edited successfully!',
                    life: 3000
                });
                router.push(`/tickets/panels/${guildId}`);
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

watch(
    editPanelData,
    (newValue) => {
        console.log('editPanelData updated:', newValue);
    },
    { deep: true }
);

onMounted(async () => {
    try {
        const data = await getPanelById(id, guildId);
        const panelEmbedRef = toRef(editPanelData.value, 'panelEmbed');
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
        editPanelData.value.panelName = data.panel.panelName;
        editPanelData.value.panelCategory = editPanelData.value.categoryOptions.find((c) => c.id == data.panel.ticketOpenCategoryId);
        editPanelData.value.ticketCloseCategoryId = editPanelData.value.categoryOptions.find((c) => c.id == data.panel.ticketCloseCategoryId);
        editPanelData.value.saveTranscripts = data.panel.saveTranscripts;
        editPanelData.value.channelNameGeneration = data.panel.ticketSettings.name;
        editPanelData.value.maxOpenTicketPerUser = data.panel.ticketSettings.ticketCap;
        Object.assign(panelEmbedRef.value, {
            color: '#5864F2',
            embedHeader: data.panel.panelEmbed.author.name,
            headerURL: data.panel.panelEmbed.author.url,
            embedTitle: data.panel.panelEmbed.title,
            embedDescription: data.panel.panelEmbed.description,
            embedFooter: data.panel.panelEmbed.footer.text
        });
        editPanelData.value.ticketEmbed = {
            color: '#5864F2',
            embedHeader: data.panel.ticketEmbed.author.name,
            headerURL: data.panel.ticketEmbed.author.url,
            embedTitle: data.panel.ticketEmbed.title,
            embedDescription: data.panel.ticketEmbed.description,
            embedFooter: data.panel.ticketEmbed.footer.text
        };

        editPanelData.value.panelButton = {
            emoji: { i: data.panel.panelButton.emoji.name || '⭐' },
            label: data.panel.panelButton.label,
            color: getHexColor(data.panel.panelButton.style)
        };
        editPanelData.value.closeButton = {
            emoji: { i: data.panel.ticketCloseButton.emoji.name || '⭐' },
            label: data.panel.ticketCloseButton.label,
            color: getHexColor(data.panel.ticketCloseButton.style)
        };
        editPanelData.value.channelId = editPanelData.value.channelOptions.find((c) => c.id == data.panel.panelChannelId);
    } catch (e) {
        console.log(e);
    } finally {
        isLoading.value = false;
    }
});
</script>
