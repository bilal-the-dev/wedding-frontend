<script setup>
import { ProductService } from '@/service/ProductService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

onMounted(() => {
    ProductService.getLicense().then((data) => (products.value = data));
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const statuses = ref([
    { label: 'BYBIT', value: 'bybit' },
    { label: 'EMAIL', value: 'email' }
]);

function formatCurrency(value) {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
}

function openNew() {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}

function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}

function saveProduct() {
    submitted.value = true;
    try {
        if (product?.value.product?.trim()) {
            if (product.value.id) {
                product.value.platform = product.value.platform.value ? product.value.platform.value : product.value.platform;
                products.value[findIndexById(product.value.id)] = product.value;
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                product.value.id = createId();
                products.value.push(product.value);
                product.value.platform = product.value.platform ? product.value.platform.value : 'INSTOCK';
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            productDialog.value = false;
            product.value = {};
        }
    } catch (e) {
        console.log(e);
    }
}

function editProduct(prod) {
    product.value = { ...prod };
    productDialog.value = true;
}

function confirmDeleteProduct(prod) {
    product.value = prod;
    deleteProductDialog.value = true;
}

function deleteProduct() {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
}

function findIndexById(id) {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

function createId() {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteProductsDialog.value = true;
}

function deleteSelectedProducts() {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}

const productSuggestions = ref([]);
const clientDiscordSuggestions = ref([]);
function searchProducts(event) {
    productSuggestions.value = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
    ].filter((item) => item.toLowerCase().startsWith(event.query.toLowerCase()));
}

function searchClientDiscord(event) {
    clientDiscordSuggestions.value = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
    ].filter((item) => item.toLowerCase().startsWith(event.query.toLowerCase()));
}

function getStatusLabel(status) {
    switch (status) {
        case 'BYBIT':
            return 'success';

        case 'EMAIL':
            return 'warn';

        default:
            return null;
    }
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true" :rows="10" :filters="filters">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Manage Products</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column field="product" header="Product" sortable style="min-width: 12rem"></Column>
                <Column field="clientDiscord" header="Client discord" sortable style="min-width: 12rem"></Column>
                <Column field="clientName" header="client name" sortable style="min-width: 12rem"></Column>
                <Column field="ipCap" header="IP cap" sortable style="min-width: 10rem"></Column>
                <Column field="hwidCap" header="Hwid cap" sortable style="min-width: 10rem"></Column>
                <Column field="note" header="Note" sortable style="min-width: 10rem"></Column>
                <Column field="platform" header="Platform" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.platform" :severity="getStatusLabel(slotProps.data.platform)" />
                    </template>
                </Column>
                <Column field="email" header="Email" sortable style="min-width: 10rem"></Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="name" class="block font-bold mb-3">Product</label>
                    <AutoComplete
                        id="name"
                        v-model="product.product"
                        :suggestions="productSuggestions"
                        @complete="searchProducts"
                        required="true"
                        autofocus
                        :invalid="submitted && !product.product"
                        class="w-full"
                        :inputClass="'w-full'"
                        :inputStyle="{ width: '100%' }"
                    />
                    <small v-if="submitted && !product.product" class="text-red-500">Product is required.</small>
                </div>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="clientDiscord" class="block font-bold mb-3">Client discord</label>
                        <InputText id="clientDiscord" v-model.trim="product.clientDiscord" required="true" autofocus :invalid="submitted && !product.clientDiscord" fluid />
                        <small v-if="submitted && !product.clientDiscord" class="text-red-500">Client Discord is required.</small>
                    </div>
                    <div class="col-span-6">
                        <label for="clientName" class="block font-bold mb-3">Client name</label>
                        <AutoComplete
                            id="name"
                            v-model="product.clientName"
                            :suggestions="clientDiscordSuggestions"
                            @complete="searchClientDiscord"
                            required="true"
                            autofocus
                            :invalid="submitted && !product.clientName"
                            class="w-full"
                            :inputClass="'w-full'"
                            :inputStyle="{ width: '100%' }"
                        />
                        <small v-if="submitted && !product.clientName" class="text-red-500">Client Name is required.</small>
                    </div>
                </div>
                <div>
                    <label for="note" class="block font-bold mb-3">Note</label>
                    <Textarea id="note" v-model="product.note" required="true" rows="3" cols="20" fluid />
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="ipCap" class="block font-bold mb-3">IP cap</label>
                        <InputText id="ipCap" v-model.trim="product.ipCap" required="true" autofocus :invalid="submitted && !product.ipCap" fluid />
                        <small v-if="submitted && !product.ipCap" class="text-red-500">IP Cap is required.</small>
                    </div>
                    <div class="col-span-6">
                        <label for="hwidCap" class="block font-bold mb-3">Hwid cap</label>
                        <InputText id="hwidCap" v-model.trim="product.hwidCap" required="true" autofocus :invalid="submitted && !product.hwidCap" fluid />
                        <small v-if="submitted && !product.hwidCap" class="text-red-500">Hwid cap is required.</small>
                    </div>
                </div>
                <div>
                    <label for="platform" class="block font-bold mb-3">Platform</label>
                    <Select id="platform" v-model="product.platform" :options="statuses" optionLabel="label" placeholder="Select a Status" fluid></Select>
                </div>
                <div>
                    <label for="name" class="block font-bold mb-3">Email</label>
                    <InputText id="name" v-model.trim="product.email" required="true" autofocus :invalid="submitted && !product.email" fluid />
                    <small v-if="submitted && !product.email" class="text-red-500">Email is required.</small>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Are you sure you want to delete <b>{{ product.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
            </template>
        </Dialog>
    </div>
</template>

<style scoped></style>
