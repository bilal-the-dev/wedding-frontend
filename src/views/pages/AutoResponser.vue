<template>
    <NavCreate title="Create New Autoresponder" icon="/images/svg/plus_sign.svg" :onClick="goToCreatePanel" />

    <div class="card flex flex-col gap-4 mt-4">
        <PageHeader title="Your Autoresponders" />
        <div class="flex flex-col gap-4 mb-4">
            <label class="text-[#9090a3] font-bold">Search Autoresponders</label>
            <CustomTextField customWidth="max-w-[120rem]" :isIcon="true" iconSrc="/images/svg/textField_icon.svg" v-model="textInput" placeholder="Enter a keyword (e.g., trigger, status)" />
        </div>

        <!-- Custom DataTable -->
        <div class="card rounded-lg overflow-hidden">
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
                <Column field="match" header="Match" style="width: 20%">
                    <template #body="slotProps">
                        <p class="text-large data-cell">{{ slotProps.data.match }}%</p>
                    </template>
                </Column>
                <Column>
                    <template #body>
                        <div class="flex items-center">
                            <Button icon="pi pi-trash" size="large" class="p-button-rounded p-button-danger p-button-text" />
                            <Button icon="pi pi-file-edit" size="large" class="p-button-rounded p-button-text" />
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
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import CustomTextField from '../../components/CustomTextField.vue';
import NavCreate from '../../components/NavCreate.vue';
import PageHeader from '../../components/PageHeader.vue';

// Sample data for autoresponders
const autoresponders = ref([
    { trigger: 'Welcome Message', status: 'Active', match: 100 },
    { trigger: 'Abandoned Cart', status: 'Active', match: 85 },
    { trigger: 'Follow Up', status: 'Inactive', match: 70 },
    { trigger: 'Thank You', status: 'Active', match: 95 }
]);

const textInput = ref('');
const router = useRouter();

// Computed property for filtering autoresponders
const filteredAutoresponders = computed(() => {
    const query = textInput.value.toLowerCase();
    if (!query) return autoresponders.value;

    return autoresponders.value.filter((autoresponder) => autoresponder.trigger.toLowerCase().includes(query) || autoresponder.status.toLowerCase().includes(query));
});

function goToCreatePanel() {
    router.push('/autoresponders/create');
}
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
    font-size: 1.25rem; /* Adjust this size as needed */
}

/* Added padding to table cells */
.data-cell {
    padding: 10px 0px; /* Adjust top/bottom and left/right padding as needed */
}
</style>
