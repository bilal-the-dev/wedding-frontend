<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

// Define your menu items as an array
const allMenuItems = [
    {
        label: 'Tickety',
        items: [
            { label: 'Overview', icon: 'pi pi-fw pi-eye', to: '/' },
            { label: 'Server', icon: 'pi pi-fw pi-database', to: '/servers' },
            { label: 'Plans', icon: 'pi pi-fw pi-credit-card', to: '/plans' },
            { label: 'Settings', icon: 'pi pi-fw pi-spin pi-cog', to: '/settings' },
            { label: 'AutoResponder', icon: 'pi pi-fw pi-comment', to: '/autoresponders' }
        ]
    },
    {
        label: 'Tickets',
        items: [
            { label: 'Ticket Panel', icon: 'pi pi-fw pi-ticket', to: '/tickets/panels' },
            { label: 'Ticket Logs', icon: 'pi pi-fw pi-file', to: '/tickets/logs' }
        ]
    }
];

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
