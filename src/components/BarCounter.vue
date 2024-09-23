<template>
    <div class="flex w-full max-w-[32rem]">
        <div class="flex items-center justify-between w-full bg-[#172135] rounded-lg overflow-hidden shadow-lg">
            <button @click="decrement" class="p-3 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <span class="text-2xl">-</span>
            </button>
            <span class="text-2xl font-bold text-white px-4">{{ modelValue }}</span>
            <button @click="increment" class="p-3 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <span class="text-2xl">+</span>
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(['update:modelValue']);

const decrement = () => {
    if (props.modelValue > 0) {
        emit('update:modelValue', props.modelValue - 1);
    }
};

const increment = () => {
    emit('update:modelValue', props.modelValue + 1);
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
