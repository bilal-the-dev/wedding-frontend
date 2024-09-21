<script setup lang="ts">
import { ref } from 'vue';
import BarCounter from '../../components/BarCounter.vue';
import CustomExclaimTooltip from '../../components/CustomExclaimTooltip.vue';
import CustomTextField from '../../components/CustomTextField.vue';
import PageHeader from '../../components/PageHeader.vue';
import PanelNavigation from '../../components/sections/panels/PanelNavigation.vue';
import ToggleBar from '../../components/ToggleBar.vue';

const dropdownItems = ['Shard bot', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne', 'Commands Cooldown', 'admin', 'Role bot', 'Currencies', 'Liqta Ping', 'CROWN: Trio', 'Charlemagne'];
const headerButtons = [
    {
        label: 'Create',
        onClick: () => {
            // Your publish logic here
        }
    }
];
const checked = ref(false);
</script>

<template>
    <div class="flex flex-col gap-8">
        <PanelNavigation :showDropdown="false" title="Create a Auto Responders" backLink="/autoresponders" :buttons="headerButtons" />

        <div class="card flex flex-col gap-4">
            <PageHeader title="Autoresponder Settings" />
            <CustomTextField placeholder="e.g How i can become a  moderator?" label="Trigger" />
            <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] font-bold flex gap-2">Ignored Channels <CustomExclaimTooltip tooltipText="ok" /></label>
                <CustomDropDown :items="dropdownItems" :multiple="true" />
                <ToggleBar v-model="checked" label="Reply only in tickets" />
                <ToggleBar v-model="checked" label="Delete trigger message" />
                <ToggleBar v-model="checked" label="Admin Role Only" />
            </div>
        </div>

        <div class="card flex flex-col gap-4">
            <PageHeader title="Autoresponder Reply" />
            <div class="flex flex-col gap-2">
                <label class="text-[#9090a3] flex gap-2 font-bold"
                    >Automatically Delete Response
                    <CustomExclaimTooltip tooltipText="ok" />
                </label>
                <BarCounter />
            </div>
            <div class="mb-2 mt-2">
                <p class="text-md">Autoresponder Reply</p>
                <p class="text-sm font-normal text-gray-300">Customize the reply to your needs</p>
            </div>
            <CustomTextField placeholder="e.g we are not looking for moderators" />
        </div>
    </div>
</template>
