<template>
    <div @click="handleClick" :class="`card rounded-md p-5 cursor-pointer flex justify-between items-center hover:bg-[#1d212d] transition ease-in-out delay-30 ${customClass}`">
        <label class="text-xl">{{ title }}</label>
        <img :src="icon" v-if="icon" alt="icon" />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: '/images/svg/plus_sign.svg'
    },
    onClick: {
        type: Function,
        required: true
    },
    customClass: {
        type: String,
        default: ''
    }
});

const handleClick = () => {
    props.onClick();
};
</script>
