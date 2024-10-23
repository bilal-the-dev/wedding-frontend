<template>
    <div class="flex flex-col gap-6">
        <span class="content-center flex gap-3 text-2xl items-center">{{ label }}</span>
        <div class="flex gap-6 items-end">
            <div>
                <CustomEmojiPicker v-model="localButtonConfig.emoji" @update:modelValue="updateButtonConfig" />
            </div>
            <InputText v-model="localButtonConfig.label" placeholder="e.g Support Ticket" @input="updateButtonConfig" />
            <CustomColorPicker v-model="localButtonConfig.color" :selective="true" @update:modelValue="updateButtonConfig" />
        </div>
        <div class="truncate flex items-center gap-1 w-max max-w-[50%] px-7 py-3 mt-2 text-[17px] font-normal rounded-lg transition-colors" :style="{ backgroundColor: localButtonConfig.color }">
            <span v-if="localButtonConfig.emoji">{{ localButtonConfig.emoji.i }}</span>
            <p class="truncate w-max">{{ localButtonConfig.label }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue';
import CustomColorPicker from '../../CustomColorPicker.vue';
import CustomEmojiPicker from '../../CustomEmojiPicker.vue';

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
        required: true
    }
});

const emit = defineEmits(['update:buttonConfig']);

const localButtonConfig = ref({ ...props.buttonConfig });

watch(
    () => props.buttonConfig,
    (newVal) => {
        localButtonConfig.value = { ...newVal };
    },
    { deep: true }
);

const updateButtonConfig = () => {
    emit('update:buttonConfig', { ...localButtonConfig.value });
};
</script>

<style scoped>
:deep(.p-inputtext) {
    width: 100%;
    max-width: 16rem;
    height: 3.6rem;
    background-color: #172135;
}
</style>
