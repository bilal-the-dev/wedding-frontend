<script setup>
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getGuilds } from '../service/auth.services';
import AppMenuItem from './AppMenuItem.vue';
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const route = useRoute();
const router  = useRouter();

const toast = useToast();
const urlId = route.params.id;
const services = ref([]);
const selectedCity = ref();

const allMenuItems = [
    {
        label: 'DayZ',
        items: [
            { label: 'Overview', icon: 'pi pi-fw pi-eye', to: `/dashboard`, alone : "/dashboard", params : true },
            { label: 'Servers', icon: 'pi pi-fw pi-database', to: '/servers', alone : "/servers", params : false },
            { label: 'Plans', icon: 'pi pi-fw pi-credit-card', to: `/dashboard/plans/`, alone : "/dashboard/plans", params : true },
            { label: 'Game Server', icon: 'pi pi-fw pi-spin pi-cog', to: `/dashboard/game/server` ,alone : "/dashboard/game/server" , params : true },
            { label: 'Economy', icon: 'pi pi-fw pi-money-bill', to: `/dashboard/economy/settings` ,alone : "/dashboard/economy/settings" , params : true },
            { label: 'Leaderboard', icon: 'pi pi-fw pi-sort-alt', to: `/dashboard/leaderboard` ,alone : "/dashboard/leaderboard" , params : true },
            { label: 'Profile', icon: 'pi pi-fw pi-user', to: `/dashboard/profile` ,alone : "/dashboard/profile" , params : true },
        ]
    },
];
;
const model = ref(allMenuItems);

function truncateName(name) {
  return name.length > 15 ? name.slice(0, 15) + "..." : name;
}

onMounted(async () => {
    try {
        const {data} = await getGuilds();
        services.value = data

  .map((guild) => ({
    name: truncateName(guild.identifier),
    guildId : guild.guildId,
    avatar: guild.guild?.icon ? `https://cdn.discordapp.com/icons/${guild.guildId}/${guild.guild.icon}.png` : "/images/png/default.png",
    serviceId : guild.serviceId
  }))

  selectedCity.value = services.value.find(service => service.serviceId === urlId) || null;
    } catch (error) {
        console.error('Error fetching guilds:', error);
    }
});


const navigateToDashboard = () => {
  if (selectedCity.value) {
    
    // Show toast notification
    toast.add({
      severity: "success",
      summary: "Guild Changed",
      detail: `Successfully switched to ${selectedCity.value.name}`,
      life: 3000,
    });

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push(`/dashboard/${selectedCity.value.serviceId}`);
    }, 500); // Delay to allow toast to be seen
  }
};
</script>

<template>
    
    <Toast/>
    <div class="flex  items-center p-4">
  <img src="/public/images/png/logo.png" alt="Logo" class="h-16 w-16" />
  <span class="text-[20px] font-medium text-gray-200 ml-4">DayZ Manager™</span>
</div>

<div class="flex justify-center">
    <Select 
  v-model="selectedCity" 
  :options="services" 
  optionLabel="name" 
  placeholder="Select a City" 
  class="w-full md:w-80 py-1 text-lg" 
  style="height: 50px;" 
  @change="navigateToDashboard"
>
    <!-- Selected Value Display -->
    <template #value="slotProps">
        <div v-if="slotProps.value" class="flex items-center">
            <img :src="slotProps.value.avatar" :alt="slotProps.value.name" class="mr-3 rounded-xl" style="width: 32px; height: 32px; object-fit: cover;" />
            <div class="text-lg">{{ slotProps.value.name }}</div>
        </div>
        <span v-else class="text-lg">
            {{ slotProps.placeholder }}
        </span>
    </template>

    <!-- Dropdown Option Display -->
    <template #option="slotProps">
        <div class="flex items-center py-2">
            <img :src="slotProps.option.avatar" :alt="slotProps.option.name" class="mr-3 rounded-xl" style="width: 32px; height: 32px; object-fit: cover;" />
            <div class="text-lg">{{ slotProps.option.name }}</div>
        </div>
    </template>

    <template #dropdownicon>
        <i class="pi pi-map text-lg" />
    </template>
</Select>

</div>

    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="i">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
