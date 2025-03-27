<script setup>
import { useLayout } from '@/layout/composables/layout';
import Popover from 'primevue/popover';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logoutFromApp, me } from '../service/auth.services';
const op = ref();
const router = useRouter();
const route = useRoute();
const poptoggle = ref(false);
const toggle = (event) => {
poptoggle.value = !poptoggle.value;
  op.value.toggle(event);
};
const guildId = route.params.id;
async function goToProfile() {
    // await axiosInstance.post('/auth/discord/logout');
    // localStorage.removeItem('userData');
    router.push(`/dashboard/profile/${guildId}`);
}


async function logout() {
    await logoutFromApp();
    localStorage.removeItem('userId');
    router.push(`/`);
}


const user = ref({
  name: "Username", // Replace with actual user data
  avatar: "/public/images/png/default.png", // Replace with actual avatar URL
});
onMounted(async () => {
    const {data}  = await me()
    user.value.name = data.global_name;
   user.value.avatar =  `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`;
})
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
            
        </div>

        <div class="layout-topbar-actions flex item-center ">
            <div class="flex items-center space-x-2">
               
  <img
    :src="user.avatar || '/public/images/png/default.png'"
    alt="User Avatar"
    class="w-10 h-10 rounded-full border-2 border-gray-300"
     @click="toggle"
  />
  <i :class="poptoggle ? 'pi pi-angle-up' : 'pi pi-angle-down'" class="text-white"></i>
  
</div>



<Popover ref="op">
            <div class="flex flex-col gap-4 p-4 rounded-md shadow-lg ">
            <!-- Avatar & Username -->
            <div class="flex items-center gap-3">
              <img
                :src="user.avatar || '/public/images/png/default.png'"
                alt="User Avatar"
                class="w-8 h-8 rounded-full border-2 border-gray-300"
              />
              <span class="font-medium text-gray-100">{{ user.name}}</span>
            </div>

            <!-- Separator Line -->
            <hr class="border-gray-700" />

            <!-- Logout Text -->
            <span @click="goToProfile" class="text-gray-300 cursor-pointer hover:text-gray-500 transition-colors duration-300">
              Profile
            </span>
            <hr class="border-gray-700" />

            <!-- Logout Text -->
            <span @click="logout" class="text-red-400 cursor-pointer hover:text-red-500 transition-colors duration-300">
              Logout
            </span>
          </div>
        </Popover>


        </div>
    </div>
</template>
