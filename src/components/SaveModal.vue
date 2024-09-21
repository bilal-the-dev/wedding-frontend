<!-- BottomModal.vue -->
<template>
    <transition name="slide-up">
        <div v-if="isVisible" class="fixed bottom-0 left-0 right-0 z-50 p-4">
            <div class="bg-[#0e0f17] text-white flex justify-between items-center flex-wrap gap-3 rounded-md md:p-5 p-3">
                <div class="dash_text_center__J8alQ">
                    <p class="text-lg">You have unsaved changes!</p>
                </div>
                <div class="dash_buttonsStyle__aCR4_ flex gap-3">
                    <button
                        @click="closeModal"
                        class="w-[112px] text-lg font-normal bg-[#3d3e54] hover:bg-[#4c5067] transition-all focus:shadow-[#43485d36] inline-flex h-[45px] items-center justify-center rounded-md px-6 leading-none outline-none focus:shadow-[0_0_0_2px]"
                    >
                        Cancel
                    </button>
                    <button
                        @click="saveChanges"
                        class="w-[92px] text-lg font-normal bg-[#5c70d4] hover:bg-[#667ada] transition-all focus:shadow-[#43485d36] inline-flex h-[45px] items-center justify-center rounded-md px-6 leading-none outline-none focus:shadow-[0_0_0_2px]"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
const props = defineProps({
    isVisible: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['close', 'save']);

const closeModal = () => {
    emit('close');
};

const saveChanges = () => {
    emit('save');
};
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s ease;
}
.slide-up-enter {
    transform: translateY(100%);
    opacity: 0;
}
.slide-up-enter-to {
    transform: translateY(0);
    opacity: 1;
}
.slide-up-leave {
    transform: translateY(0);
    opacity: 1;
}
.slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
</style>
