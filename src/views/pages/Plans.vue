<template>
    <div class="relative text-white p-8">
        <!-- Overlay -->
        <div v-if="showOverlay" class="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center z-10">
            <div class="bg-[#172135] text-black rounded-lg p-12 shadow-lg flex flex-col items-center justify-center text-center space-y-6">
                <i class="pi pi-exclamation-triangle text-[140px] text-red-500" style="font-size: 8rem"></i>
                <h2 class="text-4xl font-bold text-gray-200">Under Construction</h2>
                <p class="text-2xl font-semibold text-gray-200">We're working hard to bring this feature to you soon!</p>
            </div>
        </div>
        <!-- Page content -->
        <div class="flex flex-col items-center text-center gap-4">
            <h1 class="font-bold tracking-[1px] text-[33px]">Up your Game with Tickety Premium</h1>
            <h2 class="text-[#cfd0d7] font-[450] max-w-[37rem] mb-[29px] text-[18px] mx-auto">Unlock all of Tickety's premium features to stand out from the competition and enhance your server experience.</h2>
        </div>
        <h1 class="text-3xl font-bold mb-8">Addons</h1>
        <!-- Addons Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div class="bg-[#111827] rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-2">Custom Bot</h2>
                <p class="text-[#8e9297] text-sm">Easily tailor your bot's look to match your server's style. This addon is required to use the personalizer page!</p>
            </div>
            <div class="bg-[#111827] rounded-lg p-6">
                <div class="flex justify-between">
                    <h2 class="text-xl font-semibold mb-2">One Time Donation</h2>
                    <span class="text-lg font-bold">$10.00</span>
                </div>
                <p class="text-[#8e9297] text-sm mb-2">Help your favorite bot with a small contribution and receive a special discord role!</p>
            </div>
        </div>

        <!-- Pricing Plans -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Monthly Plan -->
            <div class="card rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-2">Monthly Plan</h2>
                <p class="text-[#8e9297] text-sm mb-4">The perfect choice for the average user which unlocks all features.</p>
                <div class="text-3xl font-bold mb-4">$5.99 <span class="text-sm font-normal text-[#8e9297]">/Month</span></div>
                <button class="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold py-2 px-4 rounded mb-6">Purchase Monthly</button>
                <ul class="space-y-6">
                    <li class="flex items-center">
                        <i class="pi pi-check-circle text-[#5865f2] mr-2"></i>
                        <span>Private Support</span>
                    </li>
                    <li class="flex items-center">
                        <i class="pi pi-check-circle text-[#5865f2] mr-2"></i>
                        <span>Transferable to another server</span>
                    </li>
                    <li class="flex items-center">
                        <i class="pi pi-check-circle text-[#5865f2] mr-2"></i>
                        <span>Unlock <span class="text-[#ffd700]">Premium</span> features</span>
                    </li>
                </ul>
            </div>

            <!-- Lifetime Plan -->
            <div class="card rounded-lg p-6 relative">
                <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <i class="pi pi-crown text-[#ffd700] text-3xl"></i>
                </div>
                <h2 class="text-xl font-semibold mb-2">Lifetime Plan</h2>
                <p class="text-[#8e9297] text-sm mb-4">The ultimate choice when you are planning on using Tickety for a longer period.</p>
                <div class="text-3xl font-bold mb-4">$69.99 <span class="text-sm font-normal text-[#8e9297]">/Lifetime</span></div>
                <button class="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold py-2 px-4 rounded mb-6">Purchase Lifetime</button>
                <ul class="space-y-6">
                    <li class="flex items-center">
                        <i class="pi pi-check-circle text-[#5865f2] mr-2"></i>
                        <span>Biggest savings</span>
                    </li>
                    <li class="flex items-center">
                        <i class="pi pi-check-circle text-[#5865f2] mr-2"></i>
                        <span>Private Support</span>
                    </li>
                    <li class="flex items-center">
                        <i class="pi pi-check-circle text-[#5865f2] mr-2"></i>
                        <span>Transferable to another server</span>
                    </li>
                    <li class="flex items-center">
                        <i class="pi pi-check-circle text-[#5865f2] mr-2"></i>
                        <span>Unlock <span class="text-[#ffd700]">Premium</span> features</span>
                    </li>
                </ul>
            </div>

            <!-- Yearly Plan -->
            <div class="card rounded-lg p-6">
                <h2 class="text-xl font-semibold mb-2">Yearly Plan</h2>
                <p class="text-[#8e9297] text-sm mb-4">The optimal approach for initiating communities seeking a good deal.</p>
                <div class="text-3xl font-bold mb-4">$3.75 <span class="text-sm font-normal text-[#8e9297]">/Month</span></div>
                <p class="text-[#8e9297] text-sm mb-4">€44.99/year, billed annually</p>
                <button class="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold py-2 px-4 rounded mb-6">Purchase Yearly</button>
                <ul class="space-y-6">
                    <li class="flex items-center">
                        <i class="pi pi-check-circle text-[#5865f2] mr-2"></i>
                        <span>Private Support</span>
                    </li>
                    <li class="flex items-center">
                        <i class="pi pi-check-circle text-[#5865f2] mr-2"></i>
                        <span>Transferable to another server</span>
                    </li>
                    <li class="flex items-center">
                        <i class="pi pi-check-circle text-[#5865f2] mr-2"></i>
                        <span>Unlock <span class="text-[#ffd700]">Premium</span> features</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showOverlay = ref(true); // Set this to `false` to hide the overlay
</script>

<style scoped>
/* Overlay Styles */
.overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
}
</style>
