<template>
    <div :class="['relative w-full flex flex-col gap-2', customWidth]">
        <label class="text-[#9090a3] text-lg" v-if="label">{{ label }}</label>
        <input
            type="text"
            v-model="inputValue"
            @focus="isFocused = true"
            @blur="handleBlur"
            :placeholder="placeholder"
            :class="['w-full py-4 text-white bg-[#172135] rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300', isIcon ? 'pl-12 pr-4' : 'px-4']"
        />
        <img v-if="isIcon" :src="iconSrc" alt="Icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 h-8 w-8" />
    </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from 'vue';

const props = defineProps({
    placeholder: {
        type: String,
        required: false,
        default: 'Overview'
    },
    isIcon: {
        type: Boolean,
        default: false
    },
    iconSrc: {
        type: String,
        required: false,
        default: ''
    },
    customWidth: {
        type: String,
        required: false,
        default: 'max-w-[32rem]'
    },
    label: {
        type: String,
        required: false
    }
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref('');
const isFocused = ref(false);

const handleBlur = () => {
    isFocused.value = false;
    emit('update:modelValue', inputValue.value);
};

watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue);
});
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
