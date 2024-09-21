<script setup lang="ts">
import { ref } from 'vue';
import CustomColorPicker from '../../components/CustomColorPicker.vue';
import CustomDropDown from '../../components/CustomDropDown.vue';
import CustomTextField from '../../components/CustomTextField.vue';
import PageHeader from '../../components/PageHeader.vue';
import ToggleBar from '../../components/ToggleBar.vue';

const textInput = ref('');

const checked = ref(false);
const color = ref('#FF5733');
const dropdownItems = ['Shard bot', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne', 'Commands Cooldown', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne'];
</script>
<template>
    <PageHeader title="Settings" description="Modify Tickety's general settings to your desire." />
    <div class="card">
        <PageHeader title="Admin Role" description="Select a role that will be able to execute all commands and view all the tickets in your server." />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Administrator Role</label>
            <CustomDropDown :items="dropdownItems" />
        </div>
    </div>
    <div class="card">
        <PageHeader title="Language" description="Choose one of the many languages we offer for the best user experience." />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Bot Language</label>
            <CustomDropDown :items="dropdownItems" />
        </div>
    </div>
    <div class="card">
        <PageHeader title="Customalization" description="Give Tickety's responses the looks of their dreams." />
        <div class="flex flex-col gap-4 mb-4">
            <label class="text-[#9090a3] font-bold">Default Message Footer</label>
            <CustomTextField v-model="textInput" />
        </div>
        <div class="flex flex-col gap-4">
            <label class="text-[#9090a3] font-bold">Default Embed Color</label>
            <CustomColorPicker v-model="color" />
        </div>
    </div>
    <div class="card">
        <PageHeader title="Logging" description="Track all actions performed by Tickety in a single channel." />
        <div class="flex flex-col gap-2 mb-4">
            <label class="text-[#9090a3] font-bold">Logging Channel</label>
            <CustomDropDown :items="dropdownItems" />
        </div>
        <ToggleBar v-model="checked" label="Enable Logging?" />
    </div>
</template>

<style scoped></style>
