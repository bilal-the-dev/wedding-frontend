<template>
    <div class="flex flex-col gap-6">
        <span class="content-center flex gap-3 text-2xl items-center">{{ label }}</span>
        <div class="flex gap-6">
            <div>
                <CustomEmojiPicker v-model="selectedButtonConfig.emoji" />
            </div>
            <CustomTextField :label="labelText" v-model="selectedButtonConfig.label" :customWidth="customWidth" />
            <CustomColorPicker v-model="selectedButtonConfig.color" :selective="true" />
        </div>
        <div class="truncate flex items-center gap-1 w-max max-w-[50%] px-7 py-3 mt-2 text-[17px] font-normal rounded-lg transition-colors" :style="{ backgroundColor: selectedButtonConfig.color }">
            <span v-if="selectedButtonConfig.emoji">{{ selectedButtonConfig.emoji.i }}</span>
            <p class="truncate w-max">{{ selectedButtonConfig.label }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
import CustomColorPicker from '../../CustomColorPicker.vue';
import CustomEmojiPicker from '../../CustomEmojiPicker.vue';
import CustomTextField from '../../CustomTextField.vue';
const props = defineProps({
    label: {
        type: String,
        default: 'Panel Button'
    },
    labelText: {
        type: String,
        default: 'Label'
    },
    customWidth: {
        type: String,
        default: 'max-w-[16rem]'
    },
    buttonConfig: {
        type: Object,
        default: () => ({
            emoji: null,
            label: '',
            color: '#FFFFFF' // Default color
        })
    }
});

const selectedButtonConfig = ref({ ...props.buttonConfig });

// Watch for changes in buttonConfig prop to update selectedButtonConfig
watch(
    () => props.buttonConfig,
    (newVal) => {
        selectedButtonConfig.value = { ...newVal };
    }
);
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
