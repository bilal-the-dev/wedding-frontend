<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AutoResponserReply from '../../components/sections/autoResponser/autoResponserReply.vue';
import AutoResponserSettings from '../../components/sections/autoResponser/autoResponserSettings.vue';
import PanelNavigation from '../../components/sections/panels/PanelNavigation.vue';
import { getAutoResponserWithId, updateAutoResponser } from '../../service/settings.services';

const editPanelData = ref({
    channelOptions: [],
    trigger: 'Nice',
    ignoredChannels: [
        { name: 'New York', id: 'NY' },
        { name: 'Rome', id: 'RM' }
    ],
    replyOnlyInTickets: false,
    deleteTriggerMessage: false,
    deleteResponse: 4,
    autoResponseReply: 'not we are not'
});

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const responseId = route.params.responserId;
const toast = useToast(); // PrimeVue toast instance
const isLoading = ref(false); // Track loading state
const validateFields = () => {
    if (!editPanelData.value.trigger.trim()) {
        toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Trigger is required', life: 3000 });
        return false;
    }
    if (!editPanelData.value.autoResponseReply.trim()) {
        toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Reply is required', life: 3000 });
        return false;
    }
    return true;
};
const headerButtons = [
    {
        label: 'Save',
        onClick: async () => {
            if (isLoading.value) return; // Prevent multiple submissions
            if (!validateFields()) return;
            isLoading.value = true; // Start loading

            const ignoredChannels = editPanelData.value.ignoredChannels.map((item) => item.id) || [];
            const data = {
                applyOnTicketOnly: editPanelData.value.replyOnlyInTickets || false,
                deleteAfterSeconds: editPanelData.value.deleteResponse || 1,
                deleteTriggerMessage: editPanelData.value.deleteTriggerMessage || false,
                reply: editPanelData.value.autoResponseReply,
                trigger: editPanelData.value.trigger,
                ignoredChannels: ignoredChannels
            };

            try {
                await updateAutoResponser(id, responseId, data);
                toast.add({ severity: 'success', summary: 'Success', detail: 'Auto-responder updated successfully', life: 3000 });
                await getAutoResponserWithId(id, responseId); // Re-fetch data after save
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update auto-responder', life: 3000 });
            } finally {
                isLoading.value = false; // Stop loading
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
    isLoading.value = true; // Show spinner while loading data
    try {
        const data = await getAutoResponserWithId(id, responseId);
        editPanelData.value.channelOptions = data.cache.channels.map((channel) => {
            return {
                id: channel.id,
                name: channel.name
            };
        });
        editPanelData.value.trigger = data.responder.trigger;
        editPanelData.value.replyOnlyInTickets = data.responder.applyOnTicketOnly;
        editPanelData.value.deleteTriggerMessage = data.responder.deleteTriggerMessage;
        editPanelData.value.deleteResponse = data.responder.deleteAfterSeconds;
        editPanelData.value.autoResponseReply = data.responder.reply;

        const channels = data.responder.ignoredChannels;
        editPanelData.value.ignoredChannels = channels
            .map((channelId) => {
                const foundChannel = editPanelData.value.channelOptions.find((channel) => channel.id === channelId);
                return foundChannel ? { id: foundChannel.id, name: foundChannel.name } : null;
            })
            .filter((item) => item !== null);
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load auto-responder data', life: 3000 });
    } finally {
        isLoading.value = false; // Hide spinner once data is loaded
    }
});
</script>

<template>
    <div class="flex flex-col gap-8">
        <Toast />
        <!-- PrimeVue Toast component for notifications -->

        <!-- Loading Spinner while fetching data -->
        <div v-if="isLoading" class="flex justify-center items-center h-64">
            <CustomProgressSpinner />
        </div>

        <!-- Main content only displayed when not loading -->
        <div v-else>
            <PanelNavigation :showDropdown="false" title="Edit Auto Responders" :backLink="`/autoresponders/${id}`" :buttons="headerButtons" />
            <AutoResponserSettings v-model:settingsData="editPanelData" @update:settingsData="editPanelData = $event" />
            <AutoResponserReply v-model:settingsData="editPanelData" @update:settingsData="editPanelData = $event" />
        </div>
    </div>
</template>
