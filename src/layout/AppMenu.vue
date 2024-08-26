<script setup>
import { onMounted, ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

// Define your menu items as an array
const allMenuItems = [
    {
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        items: [
            {
                label: 'Products',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/products'
            }
        ]
    },
    {
        items: [
            {
                label: 'License',
                icon: 'pi pi-fw pi-database',
                to: '/pages/license'
            }
        ]
    },
    {
        items: [
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-database',
                to: '/pages/profile'
            }
        ]
    },
    {
        items: [
            {
                label: 'Admin License',
                icon: 'pi pi-fw pi-discord',
                to: '/pages/admin/license'
            }
        ]
    }
];

const model = ref([]);

const initializeMenuItems = () => {
    const userData = localStorage.getItem('userData');
    const user = userData === 'true';
    model.value = allMenuItems.filter((menuItem) => {
        if (menuItem.items[0].label === 'Admin License' && !user) {
            return false;
        }
        return true;
    });
};

onMounted(() => {
    initializeMenuItems();
});
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
