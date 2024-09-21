<template>
    <div class="header flex justify-between">
        <h4 class="text-[1.6rem] flex gap-4 font-medium items-center">
            <RouterLink class="cursor-pointer" :to="backLink">
                <img src="/images/svg/back_sign.svg" />
            </RouterLink>
            {{ title }}
        </h4>
        <div class="flex gap-5">
            <CustomDropDown v-if="showDropdown" :items="dropdownItems" />
            <template v-for="(button, index) in buttons" :key="index">
                <button class="flex items-center justify-center md:w-[100%] w-full min-w-[121px] h-12 bg-[#5b5bef] rounded" @click="button.onClick">
                    {{ button.label }}
                </button>
            </template>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import CustomDropDown from '../../CustomDropDown.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    backLink: {
        type: String,
        required: true
    },
    showDropdown: {
        type: Boolean,
        default: true
    },
    dropdownItems: {
        type: Array,
        default: () => []
    },
    buttons: {
        type: Array,
        default: () => []
    }
});
</script>
