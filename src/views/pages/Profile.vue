<template>
    <!-- Main content container -->
    <div class="">
        
        <Toast />
      <!-- Profile Card -->
      <div class="bg-gray-800 rounded-lg shadow-lg mb-8 overflow-hidden">
        <!-- Profile Header - Black and Red Gradient -->
        <div class="bg-gradient-to-r from-black to-red-800 p-6">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-5">
              <div class="relative">
                <img :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`" 
                     alt="Avatar" 
                     class="w-20 h-20 rounded-full border-4 border-gray-900 shadow-lg" />
                <span class="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></span>
              </div>
              <div>
                <h3 class="text-2xl font-bold">{{ userData.username }}</h3>
                <p class="text-gray-300 opacity-90">{{ userData.globalName }}</p>
              </div>
            </div>
           
          </div>
        </div>
        
        <!-- Profile Details Tabs -->
        <div class="p-6">
          <div class="flex border-b border-gray-700 mb-6">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'px-4 py-2 font-medium transition-colors duration-200',
                activeTab === tab.id 
                  ? 'text-red-400 border-b-2 border-red-400' 
                  : 'text-gray-400 hover:text-gray-200'
              ]"
            >
              <i :class="['pi mr-2', tab.icon]"></i>{{ tab.name }}
            </button>
          </div>
          
          <!-- User Details Tab -->
          <div v-if="activeTab === 'profile'" class="animate-fadeIn">
            <h2 class="text-xl font-bold mb-6 text-gray-300">User Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <span class="text-gray-400 text-sm block mb-1">ID</span>
                <span class="font-medium">{{ userData.id }}</span>
              </div>
              <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <span class="text-gray-400 text-sm block mb-1">Discriminator</span>
                <span class="font-medium">{{ userData.discriminator }}</span>
              </div>
              <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <span class="text-gray-400 text-sm block mb-1">Verified</span>
                <span class="font-medium">
                  <i :class="[userData.verified ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500', 'mr-2']"></i>
                  {{ userData.verified ? 'Yes' : 'No' }}
                </span>
              </div>
              <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <span class="text-gray-400 text-sm block mb-1">Locale</span>
                <span class="font-medium">{{ userData.locale }}</span>
              </div>
              <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <span class="text-gray-400 text-sm block mb-1">Email</span>
                <span class="font-medium">{{ userData.email }}</span>
              </div>
             
            </div>
            
            <h2 class="text-xl font-bold mt-8 mb-6 text-gray-300">Subscription Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <span class="text-gray-400 text-sm block mb-1">Premium Type</span>
                <span class="font-medium">
                  <i :class="[userData.premiumType !== 0 ? 'pi pi-star-fill text-yellow-400' : 'pi pi-star text-gray-400', 'mr-2']"></i>
                  {{ userData.premiumType === 0 ? 'None' : 'Nitro' }}
                </span>
              </div>
              <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg flex items-center">
                <div class="flex-1">
                  <span class="text-gray-400 text-sm block mb-1">Accent Color</span>
                  <span class="font-medium">{{ userData.accent_color }}</span>
                </div>
                <div v-if="userData.accent_color" 
                     class="w-6 h-6 rounded-full" 
                     :style="{ backgroundColor: `#${userData.accent_color.toString(16)}` }">
                </div>
              </div>
              <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg flex items-center">
                <div class="flex-1">
                  <span class="text-gray-400 text-sm block mb-1">Banner Color</span>
                  <span class="font-medium">{{ userData.banner_color }}</span>
                </div>
                <div v-if="userData.banner_color" 
                     class="w-6 h-6 rounded-full" 
                     :style="{ backgroundColor: `#${userData.banner_color.toString(16)}` }">
                </div>
              </div>
            </div>
          </div>
          
          <!-- Settings Tab - Only Role Access with potential Lock -->
          <div v-if="activeTab === 'settings'" class="animate-fadeIn relative">
            <h2 class="text-xl font-bold mb-6 text-gray-300">Dashboard Access Settings</h2>
            
            <!-- Role Access Settings -->
            <div class="bg-gray-700 bg-opacity-50 p-6 rounded-lg mb-6">
              <h3 class="text-lg font-semibold mb-4">Role Access Control</h3>
              <p class="text-gray-300 mb-4">Select which roles can access the dashboard:</p>
              
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-300 mb-2">Roles with Dashboard Access</label>
                <div class="relative">
                  <MultiSelect 
                    v-model="selectedRoles" 
                    :options="roles" 
                    optionLabel="name" 
                    placeholder="Select Roles" 
                    class="w-full"
                    display="chip"
                    :disabled="isGuildLocked"
                  />
                </div>
              </div>
            </div>
            
            <div class="flex justify-end mt-6">
              <button 
                class="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center"
                @click="saveSettings"
                :disabled="isGuildLocked"
                :class="{ 'opacity-50 cursor-not-allowed': isGuildLocked }"
              >
                <i class="pi pi-save mr-2"></i>
                Save Settings
              </button>
            </div>
            
            <!-- Lock Overlay for Settings -->
            <div 
              v-if="isGuildLocked" 
              class="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-lg cursor-not-allowed"
            >
              <div class="text-center p-6 max-w-md">
                <i class="pi pi-lock text-red-500 text-6xl mb-4"></i>
                <h3 class="text-xl font-bold text-white mb-2">Settings Locked</h3>
                <p class="text-gray-300">Connect your DayZ service with a Discord Server to unlock role management settings.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-700 p-6 flex justify-end">
          <button 
            class="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2" 
            @click="logout"
          >
            <i class="pi pi-sign-out"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  
    <!-- Profile Modal -->
    <Dialog 
      v-model:visible="showProfileModal" 
      header="User Profile" 
      :modal="true"
      :dismissableMask="true"
      :style="{ width: '32rem' }"
      :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
      class="p-fluid"
    >
      <div class="flex flex-col items-center mb-6">
        <img :src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`" 
             alt="Avatar" 
             class="w-24 h-24 rounded-full mb-4" />
        <h3 class="text-xl font-bold">{{ userData.username }}</h3>
        <p class="text-gray-500">{{ userData.globalName }}</p>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <span class="text-gray-400 mb-1 text-sm">ID</span>
          <span class="font-medium">{{ userData.id }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-400 mb-1 text-sm">Discriminator</span>
          <span class="font-medium">{{ userData.discriminator }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-400 mb-1 text-sm">Verified</span>
          <span class="font-medium flex items-center">
            <i :class="[userData.verified ? 'pi pi-check text-green-500' : 'pi pi-times text-red-500', 'mr-2']"></i>
            {{ userData.verified ? 'Yes' : 'No' }}
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-400 mb-1 text-sm">Locale</span>
          <span class="font-medium">{{ userData.locale }}</span>
        </div>
      </div>
      
      <template #footer>
        <Button 
          label="Close" 
          icon="pi pi-times" 
          @click="toggleProfileModal" 
          class="p-button-text" 
        />
      </template>
    </Dialog>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  
import { useToast } from 'primevue/usetoast';
import { useRoute, useRouter } from 'vue-router';
import { getRoles, logoutFromApp, me } from '../../service/auth.services';
import { getDataBaseSettings, updateAccessroles } from '../../service/settings.services';
  const toast = useToast();
  const route = useRoute();
  // User data
  const userData = ref({});
  const isGuildLocked = ref(false);
  
  onMounted(async () => {
    try {
      // Always fetch user data
      const { data } = await me();
      userData.value = data;
      
      // Try to get service data
      const servicedata = await getDataBaseSettings(route.params.id);
      
      // Check if guildId exists
      if (!servicedata.data.guildId) {
        isGuildLocked.value = true;
        return; // Exit early if guild is not connected
      }
      
      // If guildId exists, fetch and process roles
      const { data: discordroles } = await getRoles(servicedata.data.guildId);
      
      const accessRoleIds = servicedata.data.accessRoleIds || [];
      
      roles.value = discordroles.map((role) => {
        return {
          id: role.id,
          name: role.name,
        };
      });
      
      const matchedRoles = roles.value.filter((role) => accessRoleIds.includes(role.id));
      selectedRoles.value = matchedRoles;
      
    } catch(e) {
      console.log(e);
      isGuildLocked.value = true; // Set locked state if any errors occur
    }
  });
  
  // Profile modal
  const showProfileModal = ref(false);
  function toggleProfileModal() {
    showProfileModal.value = !showProfileModal.value;
  }
  
  // Tabs navigation
  const activeTab = ref('profile');
  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'pi-user' },
    { id: 'settings', name: 'Settings', icon: 'pi-cog' }
  ];
  
  const selectedRoles = ref([]);
  const roles = ref([]);
  
  // Save settings function
  async function saveSettings() {
    try{

    
    if (isGuildLocked.value) return;
    
    const roleIds = selectedRoles.value.map(role => role.id);
    const payload = {
      accessRoleIds: roleIds
    };
    await updateAccessroles(route.params.id, payload);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Roles updated successfully', life: 3000 });
    }catch(e){
        toast.add({ severity: 'error', summary: 'error', detail: 'Failed to update', life: 3000 });
    }
  }
  
  // Logout function
  const router = useRouter();
  async function logout() {
    await logoutFromApp();
    localStorage.removeItem('userId');
    router.push('/');
  }
  </script>
  
  <style scoped>
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>