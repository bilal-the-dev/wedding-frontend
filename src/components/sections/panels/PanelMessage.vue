<template>
    <div class="card flex flex-col gap-4">
        <PageHeader title="Panel Message" />
        <div class="mb-8 mt-2">
            <p class="text-md">Panel Embed</p>
            <p class="text-sm font-normal text-gray-300">Customize the panel embed to your needs.</p>
        </div>
        <div class="flex flex-col gap-4">
            <CustomColorPicker v-model="color" />
            <div class="bg-[#232633] mr-[-3px] transform p-4 rounded-tr-md rounded-br-md rounded-tl-sm rounded-bl-sm relative w-full max-w-[32rem]" :style="borderStyle">
                <div class="flex items-start gap-4 justify-between">
                    <div class="flex gap-3 flex-col">
                        <div class="dash_embed_fix__yiQwU flex gap-3">
                            <div class="relative w-max cursor-pointer">
                                <input accept=".png, .jpg, .jpeg, .webp, .gif" class="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" type="file" @change="onImageChange($event, 'header')" />
                                <div class="p-3 px-[0.7rem] border-1 border-dashed border w-max rounded-full border-[#414559] hover:border-[#fff] transition-colors h-12 w-12 flex items-center justify-center">
                                    <img :src="headerImage" v-if="headerImage" class="h-full w-full object-cover rounded-full" />
                                    <img src="/images/svg/embed_img.svg" v-else />
                                </div>
                            </div>
                            <input class="dash_input_embed__2QEhe p-2 font-normal rounded-lg w-full bg-[#232633]" style="border: 1px solid #414559" placeholder="Embed Header" maxlength="250" v-model="embedHeader" />
                            <input class="dash_input_embed__2QEhe p-2 font-normal rounded-lg w-full bg-[#232633]" placeholder="Header URL" maxlength="250" style="border: 1px solid #414559" v-model="headerURL" />
                        </div>
                        <input class="dash_input_embed__2QEhe p-2 mt-2 font-normal rounded-lg w-full bg-[#232633]" style="border: 1px solid #414559" placeholder="Embed Title" maxlength="250" v-model="embedTitle" />
                        <textarea
                            class="dash_input_embed__2QEhe p-2 mt-2 font-normal rounded-lg w-full h-[200px] resize-none bg-[#232633]"
                            placeholder="Embed Description"
                            maxlength="4000"
                            style="border: 1px solid #414559"
                            v-model="embedDescription"
                        />
                    </div>
                    <div class="dash_embed_image__JDaqc relative ml-3 cursor-pointer">
                        <input accept=".png, .jpg, .jpeg, .webp, .gif" class="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" type="file" @change="onImageChange($event, 'main')" />
                        <div class="dash_embed_image__JDaqc p-5 flex justify-center items-center border-1 border-dashed border w-max rounded-md border-[#414559] hover:border-[#fff] transition-colors h-32 w-32">
                            <img :src="mainImage" v-if="mainImage" class="h-full w-full object-cover" />
                            <img src="/images/svg/embed_img.svg" v-else />
                        </div>
                    </div>
                </div>
                <div class="relative cursor-pointer">
                    <input accept=".png, .jpg, .jpeg, .webp, .gif" class="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" type="file" @change="onImageChange($event, 'main')" />
                    <div class="p-5 w-full mt-5 h-[160px] flex justify-center items-center border-1 border-dashed border rounded-md border-[#414559] hover:border-[#fff] transition-colors">
                        <img :src="mainImage" v-if="mainImage" class="h-full w-full object-cover" />
                        <img src="/images/svg/embed_img.svg" v-else />
                    </div>
                </div>
                <div class="flex items-center gap-3 mt-4">
                    <div class="relative cursor-pointer">
                        <input accept=".png, .jpg, .jpeg, .webp, .gif" class="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10" type="file" @change="onImageChange($event, 'footer')" />
                        <div class="p-3 px-[0.7rem] border-1 border-dashed border w-max rounded-full border-[#414559] hover:border-[#fff] transition-colors h-12 w-12 flex items-center justify-center">
                            <img :src="footerImage" v-if="footerImage" class="h-full w-full object-cover rounded-full" />
                            <img src="/images/svg/embed_img.svg" v-else />
                        </div>
                    </div>
                    <input class="dash_input_embed__2QEhe p-2 font-normal rounded-lg w-full bg-[#232633]" style="border: 1px solid #414559" placeholder="Embed Footer" maxlength="2000" v-model="embedFooter" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import CustomColorPicker from '../../CustomColorPicker.vue';

const embedHeader = ref('');
const headerURL = ref('');
const embedTitle = ref('Ticket Creation');
const embedDescription = ref('To create a ticket, please click on the button below.');
const embedFooter = ref('Tickety | Tickety.top');
const borderStyle = computed(() => ({
    borderLeft: `3px solid ${color.value}`
}));
const color = ref('#FF5733');
const mainImage = ref(null);
const headerImage = ref(null);
const footerImage = ref(null);
const onImageChange = (event, type) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (type === 'main') {
                mainImage.value = e.target?.result;
            } else if (type === 'header') {
                headerImage.value = e.target?.result;
            } else if (type === 'footer') {
                footerImage.value = e.target?.result;
            }
        };
        reader.readAsDataURL(file);
    }
};
</script>
