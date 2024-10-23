<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BarCounter from '../../components/BarCounter.vue';
import CustomExclaimTooltip from '../../components/CustomExclaimTooltip.vue';
import PageHeader from '../../components/PageHeader.vue';
import PanelNavigation from '../../components/sections/panels/PanelNavigation.vue';
import ToggleBar from '../../components/ToggleBar.vue';
import { getAutoResponsersChannelsAndRoles, postAutoResponser } from '../../service/settings.services';

const toast = useToast();
const dropdownItems = ['Shard bot', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne', 'Commands Cooldown', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne'];

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const autoResponseData = ref({
    channelsOptions: [],
    trigger: '',
    ignoredChannels: [],
    applyOnTicketOnly: false,
    deleteTriggerMessage: false,
    deleteAfterSeconds: 1,
    reply: ''
});

const validateFields = () => {
    if (!autoResponseData.value.trigger.trim()) {
        toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Trigger is required', life: 3000 });
        return false;
    }
    if (!autoResponseData.value.reply.trim()) {
        toast.add({ severity: 'error', summary: 'Validation Error', detail: 'Reply is required', life: 3000 });
        return false;
    }
    return true;
};

const headerButtons = [
    {
        label: 'Create',
        onClick: async () => {
            if (!validateFields()) return;

            try {
                const ignoredChannels = autoResponseData.value.ignoredChannels.map((item) => item.id) || [];
                const data = {
                    applyOnTicketOnly: autoResponseData.value.applyOnTicketOnly || false,
                    deleteAfterSeconds: autoResponseData.value.deleteAfterSeconds || 1,
                    deleteTriggerMessage: autoResponseData.value.deleteTriggerMessage || false,
                    reply: autoResponseData.value.reply,
                    trigger: autoResponseData.value.trigger,
                    ignoredChannels: ignoredChannels
                };
                await postAutoResponser(id, data);
                toast.add({ severity: 'success', summary: 'Success', detail: 'Autoresponder created successfully', life: 3000 });
                router.push(`/autoresponders/${id}`);
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create autoresponder', life: 3000 });
            }
        }
    }
];

onMounted(async () => {
    try {
        const data = await getAutoResponsersChannelsAndRoles(id);
        autoResponseData.value.channelsOptions = data.cache.channels.map((channel) => ({
            id: channel.id,
            name: channel.name
        }));
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load channel options', life: 3000 });
    }
});

watch(autoResponseData.value, (newVal) => {
    console.log(newVal);
});
</script>

<template>
    <div class="flex flex-col gap-8">
        <Toast />
        <PanelNavigation :showDropdown="false" title="Create an Auto Responder" :backLink="`/autoresponders/${id}`" :buttons="headerButtons" />

        <div class="card flex flex-col gap-4">
            <PageHeader title="Autoresponder Settings" />
            <label class="text-[#9090a3] text-lg">Trigger</label>
            <InputText v-model="autoResponseData.trigger" placeholder="e.g. How can I become a moderator?" />
            <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] font-bold flex gap-2">Ignored Channels <CustomExclaimTooltip tooltipText="Select channels to ignore" /></label>
                <MultiSelect v-model="autoResponseData.ignoredChannels" display="chip" :options="autoResponseData.channelsOptions" optionLabel="name" filter placeholder="Select Channels" :maxSelectedLabels="3" class="" />
                <ToggleBar v-model="autoResponseData.applyOnTicketOnly" label="Reply only in tickets" />
                <ToggleBar v-model="autoResponseData.deleteTriggerMessage" label="Delete trigger message" />
            </div>
        </div>

        <div class="card flex flex-col gap-4">
            <PageHeader title="Autoresponder Reply" />
            <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] flex gap-2 font-bold">
                    Automatically Delete Response
                    <CustomExclaimTooltip tooltipText="Set the delay time before the response is deleted" />
                </label>
                <BarCounter v-model="autoResponseData.deleteAfterSeconds" />
            </div>
            <div class="mb-2 mt-2">
                <p class="text-md">Autoresponder Reply</p>
                <p class="text-sm font-normal text-gray-300">Customize the reply to your needs</p>
            </div>
            <InputText v-model="autoResponseData.reply" placeholder="e.g. We are not looking for moderators at the moment" />
        </div>
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
