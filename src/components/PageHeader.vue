<template>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <i v-if="icon" :class="icon" class="text-gray-200 text-[2rem]" style="font-size: 1.5rem"></i>
        <h4 class="text-[1.6rem] font-medium">{{ title }}</h4>
      </div>
      <p class="text-[20px] mt-3 text-[#9a9aa9]">{{ stats }}</p>
    </div>
    <p class="text-[15px]  text-[#9a9aa9]" v-if="description">{{ description }}</p>
    <CustomSeprator />
  </template>
  
  <script setup>
  import CustomSeprator from './CustomSeprator.vue';
  
  const props = defineProps({
    title: {
      type: String,
      required: true,
      default: 'Overview'
    },
    description: {
      type: String,
      required: false
    },
    stats: {
      type: String,
      required: false
    },
    icon: {
      type: String, // Pass icon class as a string, e.g., "pi pi-check"
      required: false
    }
  });
  </script>
  