<template>
    <Transition name="modal-fade">
        <div v-if="isOpen" class="modal-overlay" @click="closeModal">
            <div class="modal-content" @click.stop>
                <h2 class="modal-title">{{ title }}</h2>
                <p class="modal-message">{{ message }}</p>
                <div class="modal-buttons">
                    <button class="btn-cancel" @click="closeModal">{{ cancelText }}</button>
                    <button class="btn-delete" @click="confirmDelete">{{ confirmText }}</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Are you absolutely sure?'
    },
    message: {
        type: String,
        default: 'This action cannot be undone. This will permanently delete your panel from the database.'
    },
    cancelText: {
        type: String,
        default: 'Cancel'
    },
    confirmText: {
        type: String,
        default: 'Delete Panel'
    },
    onConfirm: {
        type: Function,
        required: true
    }
});

const isOpen = ref(false);

const openModal = () => {
    isOpen.value = true;
};

const closeModal = () => {
    isOpen.value = false;
};

const confirmDelete = () => {
    props.onConfirm();
    closeModal();
};

defineExpose({ openModal });
</script>

<style scoped>
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
    background-color: #2f3136;
    border-radius: 8px;
    padding: 24px;
    max-width: 400px;
    width: 90%;
}

.modal-title {
    color: #ffffff;
    font-size: 20px;
    margin-bottom: 12px;
}

.modal-message {
    color: #b9bbbe;
    font-size: 14px;
    margin-bottom: 24px;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.btn-cancel,
.btn-delete {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn-cancel {
    background-color: #4f545c;
    color: #ffffff;
    border: none;
}

.btn-cancel:hover {
    background-color: #5d6269;
}

.btn-delete {
    background-color: #ed4245;
    color: #ffffff;
    border: none;
}

.btn-delete:hover {
    background-color: #f04748;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>
