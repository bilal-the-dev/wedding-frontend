<template>
    <div :class="['relative w-full flex flex-col gap-2', customWidth]">
        <label class="text-[#9090a3] text-lg" v-if="label">{{ label }}</label>
        <input
            type="text"
            :value="modelValue"
            @input="updateValue"
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
    modelValue: {
        type: String,
        default: ''
    },
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

const isFocused = ref(false);

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};

const handleBlur = () => {
    isFocused.value = false;
};

// Watch for changes in the modelValue prop
watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue !== undefined) {
            // Update the input value when the prop changes
            const inputElement = document.querySelector('input');
            if (inputElement) {
                inputElement.value = newValue;
            }
        }
    }
);
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
