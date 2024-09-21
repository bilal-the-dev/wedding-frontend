<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Ticket Settings" />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Channel Name Generation</label>
            <CustomTextField placeholder="e.g Support Ticket" v-model="textInput" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Ticket Creation Reply</label>
            <CustomTextField placeholder="e.g Support Ticket" v-model="textInput" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Roles Required To Create Tickets</label>
            <CustomDropDown :items="dropdownItems" />
        </div>
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] font-bold">Max Open Tickets per User</label>
            <BarCounter />
        </div>
        <ToggleBar v-model="checked" label="Users Can Close Tickets?" />
    </div>
</template>
<script setup>
import { ref } from 'vue';

const checked = ref(false);
const dropdownItems = ['Shard bot', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne', 'Commands Cooldown', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne'];
</script>
