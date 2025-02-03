<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const selectedCity = ref();
const allMenuItems = [
    {
        label: 'DayZ',
        items: [
            { label: 'Overview', icon: 'pi pi-fw pi-eye', to: `/dashboard`, alone : "/dashboard", params : true },
            { label: 'Servers', icon: 'pi pi-fw pi-database', to: '/servers', alone : "/servers", params : false },
            { label: 'Plans', icon: 'pi pi-fw pi-credit-card', to: `/plans/`, alone : "/plans", params : true },
            { label: 'Game Server', icon: 'pi pi-fw pi-spin pi-cog', to: `/game/server` ,alone : "/game/server" , params : true },
            { label: 'Economy', icon: 'pi pi-fw pi-money-bill', to: `/economy/settings` ,alone : "/economy/settings" , params : true },
            { label: 'Leaderboard', icon: 'pi pi-fw pi-sort-alt', to: `/leaderboard` ,alone : "/leaderboard" , params : true },
        ]
    },
];
;
const model = ref(allMenuItems);
</script>

<template>
    <div class="flex  items-center p-4">
  <img src="/public/images/png/logo.png" alt="Logo" class="h-16 w-16" />
  <span class="text-[35px] font-medium text-gray-200 ml-4">KillFeed</span>
</div>

<div class="flex justify-center">
        <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" class="w-full md:w-68 " />
    </div>

    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="i">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
