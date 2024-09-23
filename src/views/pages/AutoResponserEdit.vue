<script setup lang="ts">
import { ref } from 'vue';
import AutoResponserReply from '../../components/sections/autoResponser/autoResponserReply.vue';
import AutoResponserSettings from '../../components/sections/autoResponser/autoResponserSettings.vue';
import PanelNavigation from '../../components/sections/panels/PanelNavigation.vue';
const editPanelData = ref({
    trigger: 'Nice',
    ignoredChannels: ['Shard bot', 'CROWN: Trio'],
    replyOnlyInTickets: false,
    deleteTriggerMessage: false,
    adminRoleOnly: true,
    deleteResponse: 4,
    autoResponseReply: 'not we are not'
});
const headerButtons = [
    {
        label: 'Save',
        onClick: () => {}
    }
];
</script>

<template>
    <div class="flex flex-col gap-8">
        <PanelNavigation :showDropdown="false" title="Create a Auto Responders" backLink="/autoresponders" :buttons="headerButtons" />
        <AutoResponserSettings v-model:settingsData="editPanelData" />
        <AutoResponserReply v-model:settingsData="editPanelData" />
    </div>
</template>
