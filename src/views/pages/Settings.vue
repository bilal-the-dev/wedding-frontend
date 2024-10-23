<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CustomProgressSpinner from '../../components/CustomProgressSpinner.vue';
import PageHeader from '../../components/PageHeader.vue';
import { getSettings, updateSettings } from '../../service/settings.services';

const textInput = ref('');
const checked = ref(false);
const color = ref('#FF5733');
const selectedItems = ref('');
const isLoading = ref(false);
const toast = useToast();

const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const dropdownItems = ['Shard bot', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne', 'Commands Cooldown', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne'];

const settingsData = ref({
    channelsOptions: [],
    rolesOptions: [],
    embedColor: '',
    embedFooter: '',
    selectedRoles: {
        adminRoleId: '',
        _adminRoleName: ''
    },
    selectedChannels: {
        loggingChannelId: '',
        _channelName: ''
    }
});
const route = useRoute();
const id = route.params.id;

onMounted(async () => {
    try {
        isLoading.value = true;
        const data = await getSettings(id);
        settingsData.value.rolesOptions = data.cache.roles.map((role) => ({
            adminRoleId: role.id,
            _adminRoleName: role.name
        }));
        settingsData.value.channelsOptions = data.cache.channels.map((channel) => ({
            loggingChannelId: channel.id,
            _channelName: channel.name
        }));
        if (data.settings) {
            settingsData.value.embedFooter = data.settings.discordSettings?.embedFooter || settingsData.value.embedFooter;
            settingsData.value.embedColor = data.settings.discordSettings?.embedColor || settingsData.value.embedColor;

            const roleId = data.settings.discordSettings?.adminRoleId;
            const channelId = data.settings.discordSettings?.loggingChannelId;

            settingsData.value.selectedChannels = channelId ? settingsData.value.channelsOptions.find((channel) => channel.loggingChannelId === channelId) : settingsData.value.selectedChannels;

            settingsData.value.selectedRoles = roleId ? settingsData.value.rolesOptions.find((role) => role.adminRoleId === roleId) : settingsData.value.selectedRoles;
        }
    } catch (error) {
        console.error('Error fetching settings:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch settings', life: 3000 });
    } finally {
        isLoading.value = false;
    }
});

async function updateSettingsData() {
    try {
        isLoading.value = true;
        const data = {
            adminRoleId: settingsData.value.selectedRoles.adminRoleId,
            loggingChannelId: settingsData.value.selectedChannels.loggingChannelId,
            embedColor: settingsData.value.embedColor,
            embedFooter: settingsData.value.embedFooter
        };
        await updateSettings(id, data);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Settings updated successfully', life: 3000 });
    } catch (error) {
        console.error('Error updating settings:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to update settings', life: 3000 });
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <Toast />
    <div v-if="isLoading" class="flex justify-center items-center h-64">
        <CustomProgressSpinner />
    </div>
    <div v-else>
        <PageHeader title="Settings" description="Modify Tickety's general settings to your desire." />
        <div class="card">
            <PageHeader title="Admin Role" description="Select a role that will be able to  view all the tickets in your server." />
            <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] font-bold">Administrator Role</label>
                <Select v-model="settingsData.selectedRoles" :options="settingsData.rolesOptions" optionLabel="_adminRoleName" placeholder="Select a City" class="w-full md:w-56" />
            </div>
        </div>
        <div class="card">
            <PageHeader title="Customalization" description="Give Tickety's responses the looks of their dreams." />
            <div class="flex flex-col gap-4 mb-4">
                <label class="text-[#9090a3] font-bold">Default Message Footer</label>
                <InputText v-model="settingsData.embedFooter" placeholder="Enter a Text (e.g., trigger, status)" />
            </div>
            <div class="flex flex-col gap-4">
                <label class="text-[#9090a3] font-bold">Default Embed Color</label>
                <ColorPicker v-model="settingsData.embedColor" />
            </div>
        </div>
        <div class="card">
            <PageHeader title="Logging" description="Track all actions performed by Tickety in a single channel." />
            <div class="flex flex-col gap-2 mb-4">
                <label class="text-[#9090a3] font-bold">Logging Channel</label>
                <Select v-model="settingsData.selectedChannels" :options="settingsData.channelsOptions" optionLabel="_channelName" placeholder="Select a City" class="w-full md:w-56" />
            </div>
        </div>
        <div class="flex justify-end">
            <button class="flex items-center justify-center w-40 h-12 bg-[#5b5bef] rounded" @click="updateSettingsData">Save</button>
        </div>
    </div>
</template>

<style scoped>
:deep(.p-colorpicker-preview) {
    width: 16rem;
    height: 3rem;
}
:deep(.p-select) {
    width: 100%;
    max-width: 32rem;
    height: 3.6rem;
    background-color: #172135;
}
:deep(.p-select-label) {
    padding-top: 1rem;
}

:deep(.p-inputtext) {
    width: 100%;
    max-width: 32rem;
    height: 3.6rem;
    background-color: #172135;
}
</style>
