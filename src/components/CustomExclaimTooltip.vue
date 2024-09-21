<template>
    <div v-tooltip="tooltipText">
        <img src="/images/svg/exclaimation_sign.svg" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    tooltipText: string; // Define the prop for tooltip text
}>();
</script>

<style scoped>
/* Add any necessary styles here */
</style>
