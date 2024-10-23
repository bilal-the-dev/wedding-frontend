<template>
    <div class="card flex flex-col gap-4">
        <PageHeader :title="headerTitle" />
        <div class="mb-8 mt-2">
            <p class="text-md">{{ subTitle }}</p>
            <p class="text-sm font-normal text-gray-300">{{ description }}</p>
        </div>
        <div class="flex flex-col gap-4">
            <CustomColorPicker v-model="localPanelData.color" />
            <div class="bg-[#232633] mr-[-3px] transform p-4 rounded-tr-md rounded-br-md rounded-tl-sm rounded-bl-sm relative w-full max-w-[32rem]" :style="borderStyle">
                <div class="flex items-start gap-4 justify-between">
                    <div class="flex gap-3 flex-col">
                        <div class="dash_embed_fixyiQwU flex gap-3">
                            <input class="dash_input_embed2QEhe p-2 font-normal rounded-lg w-full bg-[#232633]" style="border: 1px solid #414559" placeholder="Embed Header" maxlength="250" v-model="localPanelData.embedHeader" />
                            <input class="dash_input_embed2QEhe p-2 font-normal rounded-lg w-full bg-[#232633]" placeholder="Header URL" maxlength="250" style="border: 1px solid #414559" v-model="localPanelData.headerURL" />
                        </div>
                        <input class="dash_input_embed2QEhe p-2 mt-2 font-normal rounded-lg w-full bg-[#232633]" style="border: 1px solid #414559" placeholder="Embed Title" maxlength="250" v-model="localPanelData.embedTitle" />
                        <textarea
                            class="dash_input_embed2QEhe p-2 mt-2 font-normal rounded-lg w-full h-[200px] resize-none bg-[#232633]"
                            placeholder="Embed Description"
                            maxlength="4000"
                            style="border: 1px solid #414559"
                            v-model="localPanelData.embedDescription"
                        />
                    </div>
                    <div class="dash_embed_imageJDaqc relative ml-3 cursor-pointer"></div>
                </div>
                <div class="flex items-center mt-4">
                    <input class="dash_input_embed__2QEhe p-2 font-normal rounded-lg w-full bg-[#232633]" style="border: 1px solid #414559" placeholder="Embed Footer" maxlength="2000" v-model="localPanelData.embedFooter" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import CustomColorPicker from '../../CustomColorPicker.vue';

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    },
    headerTitle: { type: String, default: 'Panel Message' },
    subTitle: { type: String, default: 'Panel Embed' },
    description: { type: String, default: 'Customize the panel embed to your needs.' }
});

const emit = defineEmits(['update:modelValue']);

// Create a local copy of panel data for binding
const localPanelData = ref({ ...props.modelValue });

// Watch for changes in the prop and update local data
watch(
    () => props.modelValue,
    (newVal) => {
        Object.assign(localPanelData.value, newVal);
    },
    { deep: true }
);

// Watch local data changes and emit updates
watch(
    localPanelData,
    (newVal) => {
        emit('update:modelValue', newVal);
    },
    { deep: true }
);

const borderStyle = computed(() => ({
    borderLeft: `3px solid ${localPanelData.value.color}`
}));
</script>

<style scoped>
:deep(.p-colorpicker-preview) {
    width: 16rem;
    height: 3rem;
}
</style>
