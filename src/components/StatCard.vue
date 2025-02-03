<template>
    <div class="card mb-0">
        <div class="flex justify-between mb-4">
            <div class="flex gap-3 items-center">
                <div class="bg-[#232633] p-[0.5rem] rounded-md">
                    <img :src="icon" />
                </div>
                <div>
                    <p class="text-[18px]">{{ title }}</p>
                </div>
            </div>
        </div>
        <div class="gap-2 flex flex-col mt-3">
            <p class="text-[1.5rem]">{{ count }}</p>
            <p class="text-[14px] text-[#81869b]">
                <span class="px-1.5 bg-[#4c9a5e24] text-[#4fbd68] mr-1 font-normal text-[13px] rounded-md p-[2px]">
                    {{ change }}
                </span>
                more in the last 24h
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    count: Number,
    change: String,
    icon: String
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
