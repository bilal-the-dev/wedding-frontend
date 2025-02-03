<template>
    <PageHeader title="Economy Settings" description="Modify Economy Settings to your desire." />
        <div class="card">
            <PageHeader title="Killfield Settings" description="Check Your killfield Settings" />
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] font-bold">Xp To New Rank</label>
                <InputText  v-model="statsSettings.xpToNewRank" placeholder="Enter a Xp To New Rank" />
            </div>

            <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] font-bold">Xp Per Kill</label>
                <InputText  v-model="statsSettings.xpPerKill" placeholder="Enter a Xp Per Kill" />
            </div>

            <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] font-bold">Xp Per Death</label>
                <InputText  v-model="statsSettings.xpPerDeath" placeholder="Enter a Xp Per Death" />
            </div>

            <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] font-bold">Pay Per Kill</label>
                <InputText  v-model="statsSettings.payPerKill" placeholder="Enter a Pay Per Kill" />
            </div>

            <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] font-bold">Min Bounty</label>
                <InputText  v-model="statsSettings.minBounty" placeholder="Enter a Min Bounty" />
            </div>


            <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] font-bold">Max Bounty</label>
                <InputText  v-model="statsSettings.maxBounty" placeholder="Enter a Max Bounty" />
            </div>

            <div class="flex justify-end p-4">
    <button  @click="handleSave" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300">
      <CheckIcon class="w-5 h-5" />
       Save
    </button>
  </div>
            </div>
            
        </div>
</template>

<script setup>

import { CheckIcon } from '@heroicons/vue/24/solid';
import InputText from 'primevue/inputtext';
import { useToast } from "primevue/usetoast";
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import PageHeader from '../../components/PageHeader.vue';
import { getDataBaseSettings, updateStatsSettings } from '../../service/settings.services';

const toast = useToast(); // PrimeVue toast instance
const handleSave = async () => {
    try{

  
    const id = route.params.id
    await updateStatsSettings(id,statsSettings.value )
    toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Economy Settings Updated', life: 3000 });
}catch(e){
        console.log(e)
    }
};
const statsSettings = ref({xpToNewRank : "",xpPerKill : "",xpPerDeath : "",payPerKill : "",minBounty : "",maxBounty : ""})
const route = useRoute();

onMounted(async () => {
    const id = route.params.id
    const db = await getDataBaseSettings(id);
    statsSettings.value.xpToNewRank = db.data.stats.xpToNewRank;
    statsSettings.value.xpPerKill = db.data.stats.xpPerKill;
    statsSettings.value.xpPerDeath = db.data.stats.payPerKill;
    statsSettings.value.payPerKill  =db.data.stats.payPerKill;
    statsSettings.value.minBounty = db.data.stats.minBounty
    statsSettings.value.maxBounty = db.data.stats.maxBounty
})
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