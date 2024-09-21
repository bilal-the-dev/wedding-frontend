<!-- DynamicDataTable.vue -->
<template>
    <div class="card mt-8 rounded-lg overflow-hidden">
        <CustomTextField customWidth="max-w-[120rem]" :isIcon="true" iconSrc="/images/svg/textField_icon.svg" v-model="textInput" :placeholder="placeholder" />
        <DataTable :value="filteredData" tableStyle="min-width: 50rem" class="custom-datatable">
            <Column v-for="col in columns" :key="col.field" :field="col.field" :header="col.header">
                <template #body="slotProps">
                    <slot :data="slotProps.data" :col="col" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { computed, defineProps, ref } from 'vue';
import CustomTextField from './CustomTextField.vue';

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Enter a keyword'
    }
});

const textInput = ref('');

const filteredData = computed(() => {
    const query = textInput.value.toLowerCase();
    if (!query) return props.data;

    return props.data.filter((item) => props.columns.some((col) => String(item[col.field]).toLowerCase().includes(query)));
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
</style>
