<template>
    <PageHeader title="Logs" description="Tickety's log module allows you to review all closed and created tickets." />

    <div v-if="isLoading" class="flex justify-center items-center h-64">
        <CustomProgressSpinner />
    </div>

    <div v-else class="card flex flex-col gap-4">
        <PageHeader title="Your Ticket Log" />
        <div class="flex flex-col gap-4 mb-4">
            <label class="text-[#9090a3] font-bold">Search Logs</label>
            <CustomTextField customWidth="max-w-[120rem]" :isIcon="true" iconSrc="/images/svg/textField_icon.svg" v-model="textInput" placeholder="Enter a keyword (e.g., panel name, status, creator)" />
        </div>

        <!-- Custom DataTable -->
        <div class="card rounded-lg overflow-hidden">
            <DataTable :value="filteredLogs" tableStyle="min-width: 70rem; width: 100%;" class="custom-datatable">
                <Column field="panel" header="Panel" style="width: 25%">
                    <template #body="slotProps">
                        <p class="text-large data-cell">{{ slotProps.data.panel }}</p>
                    </template>
                </Column>
                <Column field="status" header="Status" style="width: 15%">
                    <template #body="slotProps">
                        <span :class="{ 'text-green-500': slotProps.data.status === 'active', 'text-red-500': slotProps.data.status === 'closed' }" class="text-large data-cell">
                            {{ slotProps.data.status }}
                        </span>
                    </template>
                </Column>
                <Column field="creator" header="Creator" style="width: 25%">
                    <template #body="slotProps">
                        <p class="text-large data-cell">{{ slotProps.data.creator }}</p>
                    </template>
                </Column>
                <Column field="openDate" header="Open Date" style="width: 25%">
                    <template #body="slotProps">
                        <p class="text-large data-cell">{{ slotProps.data.openDate }}</p>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import CustomProgressSpinner from '../../../components/CustomProgressSpinner.vue'; // Assuming you have this component for loading spinner
import CustomTextField from '../../../components/CustomTextField.vue';
import PageHeader from '../../../components/PageHeader.vue';
import { getPanelTickets } from '../../../service/panels.services';

const route = useRoute();
const guildId = route.params.id;

const logs = ref([]);
const textInput = ref('');
const isLoading = ref(true); // New state for loader

const filteredLogs = computed(() => {
    const query = textInput.value.toLowerCase();
    if (!query) return logs.value;

    return logs.value.filter((log) => log.panel.toLowerCase().includes(query) || log.status.toLowerCase().includes(query) || log.creator.toLowerCase().includes(query));
});

onMounted(async () => {
    try {
        const data = await getPanelTickets(guildId);
        logs.value = data.tickets.map((ticket) => {
            return {
                creator: ticket.creatorName,
                status: ticket.status,
                panel: ticket.panelId ? ticket.panelId.panelName : 'None',
                openDate: '2024-08-15'
            };
        });
    } catch (error) {
        console.error('Error fetching ticket logs:', error);
    } finally {
        isLoading.value = false; // Stop the loader after the API call
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
</style>
