<template>
    <PageHeader title="Game Server Settings" description="Check DayZ's general settings to your desire." />
    <Toast />
    <ConfirmDialog></ConfirmDialog>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
        <CustomProgressSpinner />
    </div>
    <div v-else>

    <div  class="card">
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
        {{nitradoSettings.status.toUpperCase()}}
    </span>
</div>
<div class="flex status gap-2">
    <label class="text-[#9090a3] font-bold">Nitrado Resets</label>
    <span class="px-3 py-1 text-white text-sm font-semibold rounded bg-green-500">
        {{nitradoSettings.nitradoReset.toUpperCase()}}
    </span>
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
import { getNitradoSettings } from '../../service/settings.services';


import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import CustomProgressSpinner from '../../components/CustomProgressSpinner.vue';

const isLoading = ref(true); // New state for loader
const confirm = useConfirm();
const toast = useToast();



const confirm1 = () => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Save'
        },
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

async function getIPLocation(ip) {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    return `${data.country} / ${data.city}`;
}
// function sanitizeServerName(name) {
//     return name.replace(/[^\x20-\x7E]/g, ''); 
// }

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
const nitradoSettings = ref({serverName : "", nitradoLocation : "", dayZMap : "", gamePlatform :"", status : "", nitradoReset : ""}
)
const killfeedSettings = ref([{
    text : "",
    val : true,
    key : "",
}]);
const route = useRoute();
onMounted(async () => {

    try{
    const id = route.params.id
const {data} = await getNitradoSettings(id)
    nitradoSettings.value.serverName = data.service_id;
    nitradoSettings.value.nitradoLocation =await getIPLocation(data.ip)
    nitradoSettings.value.dayZMap = data.query.map || data.settings.config.mission
    nitradoSettings.value.gamePlatform = data.game_human;
    nitradoSettings.value.status = data.status;
    nitradoSettings.value.nitradoReset = formatTime(data.nitradoCacheResetIn- Date.now())
    const generalSettingsMapping = data.constants.gpSettings;
    const adminSettingsMapping = data.constants.kfSettings;

const settingsMapping = { ...generalSettingsMapping, ...adminSettingsMapping };
const settingsConfig= data.settings.config;
 killfeedSettings.value = Object.keys(settingsMapping).map(key => ({
    key,
    text: settingsMapping[key],
    val: settingsConfig[key] === "1" // Convert "1" to true, otherwise false

}));


}catch(e){console.log(e)}finally {
        isLoading.value = false; // Stop the loader after the API call
    }
})


watch(killfeedSettings, (newValue, oldValue) => {

    
  
}, { deep: true });
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