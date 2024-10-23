<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

// Define your menu items as an array
const id = localStorage.getItem('guildid');
console.log(id);
const allMenuItems = [
    {
        label: 'Tickety',
        items: [
            { label: 'Overview', icon: 'pi pi-fw pi-eye', to: `/dashboard/${id}` },
            { label: 'Server', icon: 'pi pi-fw pi-database', to: '/servers' },
            { label: 'Plans', icon: 'pi pi-fw pi-credit-card', to: `/plans/${id}` },
            { label: 'Settings', icon: 'pi pi-fw pi-spin pi-cog', to: `/settings/${id}` },
            { label: 'AutoResponder', icon: 'pi pi-fw pi-comment', to: `/autoresponders/${id}` }
        ]
    },
    {
        label: 'Tickets',
        items: [
            { label: 'Ticket Panel', icon: 'pi pi-fw pi-ticket', to: `/tickets/panels/${id}` },
            { label: 'Ticket Logs', icon: 'pi pi-fw pi-file', to: `/tickets/logs/${id}` }
        ]
    }
];
const selectedItems = ref('');

const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
const model = ref(allMenuItems);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="i">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
