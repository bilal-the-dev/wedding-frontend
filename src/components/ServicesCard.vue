<script setup>
import { CogIcon, GlobeAltIcon, IdentificationIcon, InformationCircleIcon } from '@heroicons/vue/24/solid';
import Dialog from 'primevue/dialog';
import { ref } from "vue";
import { useRouter } from 'vue-router';

const visible = ref(false);
const selectedServer = ref(null);

const props = defineProps({
  servers: {
    type: Array,
    required: true
  }
});

const router = useRouter();
const showQuickInfo = (server) => {
  selectedServer.value = server;
  visible.value = true;
};

const showManageButton = (server) => {
  selectedServer.value = server;
  saveIdToLocalStorage();
  router.push(`/dashboard/${selectedServer.value.serviceId}`);
};


const truncateText = (text, length) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};
const saveIdToLocalStorage = () => {
    localStorage.setItem('serviceId', selectedServer.value.serviceId);
};

</script>





<template>
    <div class="">
      <Dialog v-model:visible="visible" modal header="Quick Info" :style="{ width: '30rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <!-- Show the selected server details in the dialog -->
        <div v-if="selectedServer" class="space-y-3 text-gray-300">
          <div class="flex items-center space-x-2">
            <span class="font-medium text-gray-200">Service Name:</span>
            <span>{{ selectedServer.serviceName }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="font-medium text-gray-200">Service ID:</span>
            <span>{{ selectedServer.serviceId }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="font-medium text-gray-200">Platform:</span>
            <span class="capitalize">{{ selectedServer.platform }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="font-medium text-gray-200">Timezone:</span>
            <span>{{ selectedServer.timezone }}</span>
          </div>
        </div>
      </Dialog>
    </div>
  
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
        <div v-for="server in servers" :key="server.identifier" 
             class="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl hover:border-gray-700 transition-all duration-300 flex flex-col">

             <div class="flex items-center mb-6">
    <!-- Left Side: Avatar Image -->
    <div class="flex items-center">
      <img 
      :src="(server.guild && server.guild.icon) ? `https://cdn.discordapp.com/icons/${server.guild.id}/${server.guild.icon}.png` : '/images/png/default.png'" 
        alt="Avatar" 
        class="w-24 h-24 rounded-full border-2 border-gray-300"
      />
    </div>

    <!-- Right Side: Server Info, Subtitle, and Status -->
    <div class="ml-4 flex flex-col">
      <!-- Server Name -->
      <h3 class="text-[20px] font-semibold text-gray-100">{{ server.guild ? server.guild.name : 'Not connected' }}</h3>
      <!-- Subtitle -->
      <span class="text-[14px] text-gray-400">{{ truncateText(server.serviceName,15) }}</span>

      <!-- Status Section -->
      <div class="mt-2">
        <span 
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="server.status === 'Active' ? 
            'bg-emerald-900/50 text-emerald-300 border border-emerald-700' : 
            'bg-red-900/50 text-red-300 border border-red-700'"
        >
          {{ server.status }}
        </span>
      </div>
    </div>
  </div>
  
          <!-- Server Identifier and Service Name -->
          <div class="space-y-3 mb-4">
            <div class="flex items-center space-x-2 text-gray-300">
      <InformationCircleIcon class="w-5 h-5 text-blue-400" />
      <span class="font-medium text-gray-200">Username:</span>
      <span>{{ server.serviceUsername }}</span>
    </div>

    <!-- Identifier Section with Icon -->
    <div class="flex items-center space-x-2 text-gray-300">
      <IdentificationIcon class="w-5 h-5 text-blue-400" />
      <span class="font-medium text-gray-200 ">Identifier:</span>
      <span>{{ server.identifier }}</span>
    </div>

            <div class="flex items-center space-x-2 text-gray-300">
          <GlobeAltIcon class="h-5 w-5 text-blue-400" />
          <span>{{ server.timezone }}</span>
        </div>
          </div>
  
         
  
          <!-- Action Buttons (Big and at the bottom) -->
          <div class="mt-auto flex space-x-4 justify-center">
            <!-- Quick Info Button with a distinct color -->
            <button @click="showQuickInfo(server)" class="bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-blue-500 focus:outline-none text-lg flex items-center space-x-2">
      <!-- Quick Info Icon -->
      <InformationCircleIcon class="h-5 w-5 text-white" />
      <span>Info</span>
    </button>

    <!-- Manage Button with Icon -->
    <button @click="showManageButton(server)" class="bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-green-500 focus:outline-none text-lg flex items-center space-x-2">
      <!-- Manage Icon -->
      <CogIcon class="h-5 w-5 text-white" />
      <span>Manage</span>
    </button>
          </div>
          
        </div>
      </div>
    </div>
  </template>
  