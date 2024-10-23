<template>
    <CustomDeleteAlertModel
        ref="deleteModal"
        title="Delete Autoresponder"
        message="Are you sure you want to delete this autoresponder? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Yes, Delete"
        :onConfirm="confirmDeleteAutoresponder"
    />
    <NavCreate title="Create New Autoresponder" icon="/images/svg/plus_sign.svg" :onClick="goToCreatePanel" />

    <div class="card flex flex-col gap-4 mt-4">
        <PageHeader title="Your Autoresponders" />
        <div v-if="isLoading" class="flex justify-center items-center h-64">
            <CustomProgressSpinner />
        </div>

        <div v-else class="flex flex-col gap-4 mb-4">
            <label class="text-[#9090a3] font-bold">Search Autoresponders</label>
            <IconField>
                <InputIcon class="pi pi-search" />
                <InputText v-model="textInput" placeholder="Enter a keyword (e.g., trigger, status)" />
            </IconField>
        </div>

        <div v-else class="card rounded-lg overflow-hidden">
            <DataTable :value="filteredAutoresponders" tableStyle="min-width: 70rem; width: 100%;" class="custom-datatable">
                <Column field="trigger" header="Trigger" style="width: 40%">
                    <template #body="slotProps">
                        <p class="text-large data-cell font-bold">{{ slotProps.data.trigger }}</p>
                    </template>
                </Column>
                <Column field="status" header="Status" style="width: 20%">
                    <template #body="slotProps">
                        <span :class="{ 'text-green-500': slotProps.data.status === 'Active', 'text-red-500': slotProps.data.status === 'Inactive' }" class="text-large data-cell">
                            {{ slotProps.data.status }}
                        </span>
                    </template>
                </Column>
                <Column field="reply" header="Reply" style="width: 20%">
                    <template #body="slotProps">
                        <p class="text-large data-cell">{{ slotProps.data.reply }}</p>
                    </template>
                </Column>
                <Column>
                    <template #body="slotProps">
                        <div class="flex items-center">
                            <Button icon="pi pi-trash" @click="showDeleteModal(slotProps.data.id)" size="large" class="p-button-rounded p-button-danger p-button-text" />
                            <Button icon="pi pi-file-edit" @click="() => handleEditPanel(slotProps.data.id)" size="large" class="p-button-rounded p-button-text" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavCreate from '../../components/NavCreate.vue';
import PageHeader from '../../components/PageHeader.vue';
import { deleteAutoResponser, getAutoResponser } from '../../service/settings.services';
import CustomProgressSpinner from '../../components/CustomProgressSpinner.vue';
import CustomDeleteAlertModel from '../../components/CustomDeleteAlertModel.vue';

const isLoading = ref(true);

const autorespondersData = ref([]);
const textInput = ref('');
const router = useRouter();
const route = useRoute();
const id = route.params.id;

function summarizeText(text) {
    const trimmedText = text.trim();
    if (trimmedText.length > 25) {
        return trimmedText.slice(0, 25) + '...';
    }
    return trimmedText;
}

const filteredAutoresponders = computed(() => {
    const query = textInput.value.toLowerCase();
    if (!query) return autorespondersData.value;

    return autorespondersData.value.filter((autoresponder) => autoresponder.trigger.toLowerCase().includes(query) || autoresponder.status.toLowerCase().includes(query));
});

async function deleteAutoresponder(responseId) {
    await deleteAutoResponser(id, responseId);
    autorespondersData.value = autorespondersData.value.filter((autoresponder) => autoresponder.id !== responseId);
}

const deleteModal = ref(null);
let selectedResponseId = null;

function showDeleteModal(responseId) {
    selectedResponseId = responseId;
    deleteModal.value.openModal();
}

async function confirmDeleteAutoresponder() {
    if (selectedResponseId) {
        await deleteAutoResponser(id, selectedResponseId);
        autorespondersData.value = autorespondersData.value.filter((autoresponder) => autoresponder.id !== selectedResponseId);
        selectedResponseId = null;
    }
}

function goToCreatePanel() {
    router.push(`/autoresponders/create/${id}`);
}

function handleEditPanel(responseId) {
    router.push(`/autoresponders/edit/${responseId}/${id}`);
}

onMounted(async () => {
    try {
        const { settings } = await getAutoResponser(id);
        const autoResponders = settings.autoResponders;
        autorespondersData.value = autoResponders.map((response) => {
            return {
                id: response._id,
                status: 'Active',
                trigger: response.trigger,
                reply: summarizeText(response.reply)
            };
        });
    } catch (error) {
        console.error('Error fetching autoresponders:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<style scoped>
.custom-datatable ::v-deep(.p-datatable-wrapper) {
    background-color: #1e1e2d;
}

.custom-datatable ::v-deep(.p-datatable-tbody > tr) {
    color: white;
    border-bottom: 1px solid #2d2d3d;
}

.custom-datatable ::v-deep(.p-datatable-tbody > tr:last-child) {
    border-bottom: none;
}

.text-large {
    font-size: 1.25rem;
}

.data-cell {
    padding: 10px 0px;
}

:deep(.p-inputtext) {
    width: 100%;
    max-width: 120rem;
    height: 3.3rem;
    background-color: #172135;
}
</style>
