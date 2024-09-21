<template>
    <label class="text-[#9090a3] text-lg">Emoji</label>
    <div class="emoji-picker-container">
        <div @click="showEmojiPicker = true" class="bg-[#172135] rounded-lg p-3 w-max cursor-pointer flex items-center">
            <img src="/images/svg/plus_sign.svg" alt="Add Emoji" />
        </div>
        <Teleport to="body">
            <div v-if="showEmojiPicker" class="modal-overlay" @click="closeEmojiPicker">
                <div class="modal-content" @click.stop>
                    <EmojiPicker theme="auto" :native="true" @select="onSelectEmoji" class="dark-theme" />
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
import { defineModel, ref } from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

const modelValue = defineModel();
const showEmojiPicker = ref(false);

const closeEmojiPicker = () => {
    showEmojiPicker.value = false;
};

const onSelectEmoji = (emoji) => {
    console.log(emoji);
    modelValue.value = emoji;
    closeEmojiPicker();
};
</script>

<style scoped>
.emoji-picker-container {
    font-family: Arial, sans-serif;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: #dddddd;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
