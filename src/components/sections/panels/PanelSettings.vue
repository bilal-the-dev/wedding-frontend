<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Panel Settings" />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Panel Name</label>
            <CustomTextField placeholder="e.g Support Ticket" v-model="textInput" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Support Roles</label>
            <CustomDropDown :items="dropdownItems" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Panel Category</label>
            <CustomDropDown :items="dropdownItems" />
        </div>
        <ToggleBar v-model="checked" label="Threading Mode?" />
        <ToggleBar v-model="checked" label="Save Transcripts?" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(false);
const dropdownItems = ['Shard bot', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne', 'Commands Cooldown', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne'];
</script>
