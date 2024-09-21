<template>
    <div class="flex w-full max-w-[32rem]">
        <div class="flex items-center justify-between w-full bg-[#172135] rounded-lg overflow-hidden shadow-lg">
            <button @click="decrement" class="p-3 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <span class="text-2xl">-</span>
            </button>
            <span class="text-2xl font-bold text-white px-4">{{ count }}</span>
            <button @click="increment" class="p-3 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <span class="text-2xl">+</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(1);

const decrement = () => {
    if (count.value > 0) {
        count.value--;
    }
};

const increment = () => {
    count.value++;
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
