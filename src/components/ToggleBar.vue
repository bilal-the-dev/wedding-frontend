<template>
    <div class="flex items-center justify-between w-full max-w-[32rem] mt-8">
        <label class="text-white text-xl font-bold">{{ label }}</label>
        <div class="relative inline-block w-20 h-10 cursor-pointer" @click="toggle">
            <div class="absolute inset-0 rounded-full transition duration-300 ease-in-out" :class="modelValue ? 'bg-green-500' : 'bg-gray-700'"></div>
            <div class="absolute left-1 top-1 w-8 h-8 bg-white rounded-full shadow transition duration-300 ease-in-out transform" :class="{ 'translate-x-10': modelValue }"></div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: 'Enable Feature?'
    },
    modelValue: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const toggle = () => {
    emit('update:modelValue', !props.modelValue);
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
