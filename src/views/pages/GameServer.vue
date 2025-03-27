<template>
    <PageHeader title="Game Server Settings" description="Check DayZ's general settings to your desire." />
    <Toast />
    <ConfirmDialog></ConfirmDialog>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
        <CustomProgressSpinner />
    </div>
    <div v-else>

        <div class="card">
    <PageHeader title="Nitrado Settings" description="Check Your Nitrado Settings" />
    <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Server Id</label>
            <InputText disabled v-model="nitradoSettings.serverName" placeholder="Enter a Text (e.g., trigger, status)" />
        </div>

        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Nitrado Location</label>
            <InputText disabled v-model="nitradoSettings.nitradoLocation" placeholder="Enter a Text (e.g., trigger, status)" />
        </div>

        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">DayZ Map</label>
            <InputText disabled v-model="nitradoSettings.dayZMap" placeholder="Enter a Text (e.g., trigger, status)" />
        </div>

        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Game Platform</label>
            <InputText disabled v-model="nitradoSettings.gamePlatform" placeholder="Enter a Text (e.g., trigger, status)" />
        </div>

        <div class="flex status gap-2">
            <label class="text-[#9090a3] font-bold">Nitrado Status</label>
            <span class="px-3 py-1 text-white text-sm font-semibold rounded bg-blue-500">
                {{ nitradoSettings.status.toUpperCase() }}
            </span>
        </div>
        <div class="flex status gap-2">
            <label class="text-[#9090a3] font-bold">Nitrado Resets</label>
            <span class="px-3 py-1 text-white text-sm font-semibold rounded bg-green-500">
                {{ nitradoSettings.nitradoReset.toUpperCase() }}
            </span>
        </div>

        <!-- Server Control Section -->
        <div class="flex flex-col gap-4">
            <label class="text-[#9090a3] font-bold">Nitrado Resets</label>
    <div class="flex gap-6">
        <!-- Stop Server Button -->
        <button @click="stopServer"
            class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-700/80 hover:bg-red-700 shadow-lg text-white font-semibold 
                   backdrop-blur-lg transition-all duration-300 transform hover:scale-105 hover:shadow-red-500/50">
            <i class="pi pi-power-off text-lg"></i> Stop Server
        </button>

        <!-- Restart Server Button -->
        <button @click="restartServer"
            class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-yellow-500/80 hover:bg-yellow-500 text-black font-semibold 
                   shadow-lg backdrop-blur-lg transition-all duration-300 transform hover:scale-105 hover:shadow-yellow-400/50">
            <i class="pi pi-refresh text-lg"></i> Restart Server
        </button>
    </div>
</div>

    </div>
</div>


        <div class="card">
            <PageHeader title="Killfeed Settings"  />
            <div v-for="(setting, index) in killfeedSettings" :key="index">
      <ToggleBar v-model="setting.val" :label="setting.text" />
            </div>
    
            
        </div>
        
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import PageHeader from '../../components/PageHeader.vue';
import ToggleBar from '../../components/ToggleBar.vue';
import { getNitradoSettings, restartNitradoServer, stopNitradoServer, updateSettings } from '../../service/settings.services';

import { useToast } from "primevue/usetoast";
import CustomProgressSpinner from '../../components/CustomProgressSpinner.vue';

const isLoading = ref(true);
const toast = useToast();
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const nitradoSettings = ref({
    serverName: "", 
    nitradoLocation: "", 
    dayZMap: "", 
    gamePlatform: "", 
    status: "", 
    nitradoReset: ""
});

const stopServer = async () => {

    const id = route.params.id;
    isLoading.value = true;
    try {
        await stopNitradoServer(id);
        const { data } = await getNitradoSettings(id);
        nitradoSettings.value.status = data.status;
        toast.add({ severity: "success", summary: "Success", detail: "Server stopping now!", life: 3000 });
    } catch (error) {
        toast.add({ severity: "error", summary: "Error", detail: "Failed to stop server!", life: 3000 });
    } finally {
        isLoading.value = false;
    }
};

const restartServer = async () => {

    const id = route.params.id;
    isLoading.value = true;
    try {
        await restartNitradoServer(id);
        const { data } = await getNitradoSettings(id);
        nitradoSettings.value.status = data.status;
        toast.add({ severity: "success", summary: "Success", detail: "Server restarting now!", life: 3000 });
    } catch (error) {
        toast.add({ severity: "error", summary: "Error", detail: "Failed to restart server!", life: 3000 });
    } finally {
        isLoading.value = false;
    }
};
const killfeedSettings = ref([]);
const route = useRoute();

// Tracking the original settings to compare changes
const originalSettings = ref([]);

onMounted(async () => {
    try {
        const id = route.params.id;
        const { data } = await getNitradoSettings(id);
        
        // Set Nitrado settings
        nitradoSettings.value.serverName = data.service_id;
        nitradoSettings.value.nitradoLocation = await getIPLocation(data.ip);
        nitradoSettings.value.dayZMap = data.query.map || data.settings.config.mission;
        nitradoSettings.value.gamePlatform = data.game_human;
        nitradoSettings.value.status = data.status;
        nitradoSettings.value.nitradoReset = formatTime(data.nitradoCacheResetIn - Date.now());

        // Prepare killfeed settings
        const generalSettingsMapping = data.constants.gpSettings;
        const adminSettingsMapping = data.constants.kfSettings;
        const settingsMapping = { ...generalSettingsMapping, ...adminSettingsMapping };
        const settingsConfig = data.settings.config;

        killfeedSettings.value = Object.keys(settingsMapping).map(key => ({
            key,
            text: settingsMapping[key],
            val: settingsConfig[key] === "1" // Convert "1" to true, otherwise false
        }));

        // Store original settings for comparison
        originalSettings.value = JSON.parse(JSON.stringify(killfeedSettings.value));

    } catch(e) {
        console.error('Error fetching settings:', e);
        toast.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: 'Failed to load settings', 
            life: 3000 
        });
    } finally {
        isLoading.value = false;
    }
});

// Watch for changes in killfeed settings
watch(killfeedSettings, (newValue) => {
    // Find the changed setting
    const changedSetting = newValue.find((newSetting, index) => {
        const originalSetting = originalSettings.value[index];
        return newSetting.val !== originalSetting.val;
    });

    // If a setting has changed, update it via API
    if (changedSetting) {
        updateSettingViaAPI(changedSetting);
    }
}, { deep: true });

// Function to update a specific setting via API
async function updateSettingViaAPI(setting) {
    try {
        const id = route.params.id;
        
        // Prepare the payload for API call
        const payload = {
            key: setting.key,
            value: setting.val ? 1 : 0,
        };


        await updateSettings(id, payload)

        // Show success toast
        toast.add({ 
            severity: 'success', 
            summary: 'Updated', 
            detail: `${setting.text} setting updated`, 
            life: 3000 
        });

        // Update the original settings to reflect the new state
        const index = originalSettings.value.findIndex(orig => orig.key === setting.key);
        if (index !== -1) {
            originalSettings.value[index].val = setting.val;
        }

    } catch (error) {
        console.error('Error updating setting:', error);
        
        // Revert the change if API call fails
        const index = killfeedSettings.value.findIndex(s => s.key === setting.key);
        if (index !== -1) {
            killfeedSettings.value[index].val = !setting.val;
        }

        // Show error toast
        toast.add({ 
            severity: 'error', 
            summary: 'Update Failed', 
            detail: `Failed to update ${setting.text}`, 
            life: 3000 
        });
    }
}

// Existing utility functions (getIPLocation, formatTime) remain the same
async function getIPLocation(ip) {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    return `${data.country} / ${data.city}`;
}

function formatTime(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    let parts = [];
    if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds > 0) parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

    return parts.length > 0 ? parts.join(", ") : "0 seconds";
}
</script>



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
}

:deep(.p-inputtext:disabled){
    background-color: transparent;
}
.status {
    width: 100%;
    max-width: 32rem;

}
</style>