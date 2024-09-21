<template>
    <div class="relative w-full max-w-[32rem]">
        <div class="relative">
            <div class="w-full px-4 py-2 min-h-[56px] text-white bg-[#172135] rounded focus-within:ring-2 focus-within:ring-blue-500 flex flex-wrap items-center gap-2" @click="openDropdown">
                <template v-if="multiple">
                    <span v-for="(item, index) in selectedItems" :key="index" class="bg-[#1f2c47] px-2 py-1 rounded flex items-center gap-1">
                        {{ item }}
                        <button @click.stop="removeItem(item)" class="text-gray-400 hover:text-white">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </span>
                </template>
                <input type="text" v-model="inputValue" @input="filterItems" :placeholder="multiple && selectedItems.length ? '' : 'Select an option'" class="bg-transparent focus:outline-none flex-grow" />
            </div>
            <span class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'transform rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </span>
        </div>

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div v-if="isOpen && filteredItems.length > 0" class="absolute z-10 w-full mt-1 bg-[#172135] rounded shadow-lg max-h-60 overflow-y-auto">
                <ul class="py-1">
                    <li v-for="(item, index) in filteredItems" :key="index" @click="selectItem(item)" class="px-4 py-2 hover:bg-[#1f2c47] cursor-pointer flex items-center gap-2" :class="{ 'bg-[#1f2c47]': isItemSelected(item) }">
                        <span v-if="multiple" class="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
                            <svg v-if="isItemSelected(item)" class="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                        {{ item }}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    multiple: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedItems = ref([]);
const inputValue = ref('');
const filteredItems = ref([...props.items]);

const openDropdown = () => {
    isOpen.value = true;
    filteredItems.value = [...props.items];
};

const filterItems = () => {
    filteredItems.value = props.items.filter((item) => item.toLowerCase().includes(inputValue.value.toLowerCase()));
    isOpen.value = filteredItems.value.length > 0;
};

const selectItem = (item) => {
    if (props.multiple) {
        const index = selectedItems.value.indexOf(item);
        if (index === -1) {
            selectedItems.value.push(item);
        } else {
            selectedItems.value.splice(index, 1);
        }
        inputValue.value = '';
    } else {
        selectedItems.value = [item];
        inputValue.value = item;
        isOpen.value = false;
    }
    emitValue();
};

const removeItem = (item) => {
    const index = selectedItems.value.indexOf(item);
    if (index !== -1) {
        selectedItems.value.splice(index, 1);
        emitValue();
    }
};

const isItemSelected = (item) => {
    return selectedItems.value.includes(item);
};

const emitValue = () => {
    emit('update:modelValue', props.multiple ? selectedItems.value : selectedItems.value[0] || null);
};

const handleClickOutside = (event) => {
    if (!event.target.closest('.relative')) {
        isOpen.value = false;
    }
};

watch(
    () => props.items,
    () => {
        filteredItems.value = [...props.items];
    },
    { deep: true }
);

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* You can add any additional styles here if needed */
</style>
