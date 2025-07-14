<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppMenuItem from './AppMenuItem.vue';

const route = useRoute();

const allMenuItems = [
    {
        label: 'Pages',
        items: [
            { label: 'Overview', icon: 'pi pi-fw pi-eye', to: `/overview`, alone: '/overview', params: false },
            { label: 'Listed Events', icon: 'pi pi-fw pi-credit-card', to: `/events/`, alone: '/events', params: false },
            { label: 'Create Event', icon: 'pi pi-fw pi-database', to: '/event/create', alone: '/event/create', params: false }
        ]
    }
];
const model = ref(allMenuItems);
</script>

<template>
    <Toast />
    <div class="flex items-center p-4"><span class="text-[#FF5A60] font-['Pacifico'] font-medium text-[80px]">festivo</span></div>

    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="i">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
