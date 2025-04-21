<template>
    <nav class="bg-gray-900 text-white py-6">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Left Side: Logo -->
      <div class="flex items-center space-x-3 ml-4">
        <img src="/images/png/logo.png" alt="Logo" class="h-16 w-16" />
        <h1 class="text-[28px] font-semibold text-gray-200">DayZ Manager™</h1>
           <a
        href="/heatmap/"
        class="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition duration-300"
      >
        Heatmap
      </a>
      </div>

      <!-- Right Side: Avatar, Name, and Popover -->
      <div class="relative flex items-center space-x-4 cursor-pointer mr-4" @click="toggle">
        <!-- Avatar Image -->
        <img
          :src="user.avatar || '/demo/images/default-avatar.png'"
          alt="User Avatar"
          class="w-12 h-12 rounded-full border-2 border-gray-300"
        />

        <!-- User Name -->
        <span class="text-[16px] text-gray-200 hidden sm:block">{{ user.name }}</span>


        <!-- Popover -->
        <Popover ref="op">
            <div class="flex flex-col gap-4 p-4 rounded-md shadow-lg ">
            <!-- Avatar & Username -->
            <div class="flex items-center gap-3">
              <img
                :src="user.avatar || '/demo/images/default-avatar.png'"
                alt="User Avatar"
                class="w-8 h-8 rounded-full border-2 border-gray-300"
              />
              <span class="font-medium text-gray-100">{{ user.name }}</span>
            </div>

            <!-- Separator Line -->
            <hr class="border-gray-600" />

            <!-- Logout Text -->
            <span @click="logout" class="text-red-400 cursor-pointer hover:text-red-500 transition-colors duration-300">
              Logout
            </span>
          </div>
        </Popover>
      </div>
    </div>
  </nav>
  <header class="relative w-full h-72 flex flex-col items-center justify-center text-center bg-cover bg-center">
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-10"></div>

    <!-- Header Content -->
    <div class="relative z-10 text-white px-4">
      <h2 class="text-4xl sm:text-5xl font-extrabold drop-shadow-lg animate-fade-in">
        Select a DayZ Service
      </h2>
      <p class="text-lg sm:text-xl mt-2 opacity-90">
        Please select a service to manage
      </p>

     
    </div>
  </header>
      
  <div class="container mx-auto mt-8 p-4 sm:p-6">
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    
    <div v-else>
      <!-- Check if services are empty -->
      <div v-if="services.length === 0" class="text-center text-lg text-gray-500">
        No Services to Display
      </div>
      
      <!-- Show services cards if there are any services -->
      <div v-else>
        <ServicesCard :servers="services" />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import Popover from "primevue/popover";
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getGuilds, logoutFromApp } from '../../service/auth.services';

const op = ref();
const user = ref({
  name: "Username", // Replace with actual user data
  avatar: "/demo/images/logo.svg", // Replace with actual avatar URL
});
// Toggle popover visibility
const toggle = (event) => {
  op.value.toggle(event);
};

const services = ref([]);
const isLoading = ref(true);


function getFirst20Chars(str: string): string {
    const first15 = str.slice(0, 15);
    return str.length > 20 ? first15 + '...' : str;
}

onMounted(async () => {
    try {
        const {data, discordUser} = await getGuilds();
        services.value = data;
        user.value.name = discordUser.global_name;
        user.value.avatar = `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`

       
    } catch (error) {
        console.error('Error fetching guilds:', error);
        // Handle error (e.g., show error message to user)
    } finally {
        isLoading.value = false;
    }
});
const router = useRouter();
async function logout() {
    await logoutFromApp();
    localStorage.removeItem('userId');
    router.push('/');
}
</script>



<style scoped>
/* Background Image */
header {
  background-image: url('/images/png/cover.bg.png'); /* Replace with your image */
}

/* Smooth Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
</style>