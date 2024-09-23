<script setup lang="ts">
import BarCounter from '../../BarCounter.vue';
import CustomExclaimTooltip from '../../CustomExclaimTooltip.vue';
import CustomTextField from '../../CustomTextField.vue';

const props = defineProps({
    settingsData: {
        type: Object,
        required: false
    }
});

const emit = defineEmits(['update:settingsData']);

const updateSetting = (key, value) => {
    emit('update:settingsData', { ...props.settingsData, [key]: value });
};
</script>

<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Autoresponder Reply" />
        <div class="flex flex-col gap-2">
            <label class="text-[#9090a3] flex gap-2 font-bold"
                >Automatically Delete Response
                <CustomExclaimTooltip tooltipText="ok" />
            </label>
            <BarCounter :modelValue="settingsData.deleteResponse" @update:modelValue="updateSetting('deleteResponse', $event)" />
        </div>
        <div class="mb-2 mt-2">
            <p class="text-md">Autoresponder Reply</p>
            <p class="text-sm font-normal text-gray-300">Customize the reply to your needs</p>
        </div>
        <CustomTextField :modelValue="settingsData.autoResponseReply" @update:modelValue="updateSetting('autoResponseReply', $event)" placeholder="e.g we are not looking for moderators" />
    </div>
</template>
