<script setup>
import { FilterMatchMode } from '@primevue/core/api';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';
import { deleteProductLicense, fetchDiscordMembers, fetchProductAllLicenses, fetchProducts, fetchProductsLicenses, saveProductsLicense, updateProductLicense } from '../../service/auth.services';
const loader = ref(false);
const productOptions = ref([
    { name: 'Product A', code: 'PA' },
    { name: 'Product B', code: 'PB' },
    { name: 'Product C', code: 'PC' }
]);

const clientNameOptions = ref([
    { name: 'Client 1', code: 'C1' },
    { name: 'Client 2', code: 'C2' },
    { name: 'Client 3', code: 'C3' }
    // Add more client name options as needed
]);
onMounted(async () => {
    loader.value = true;
    try {
        const products = await fetchProducts();
        productOptions.value = products;
        if (products.length) {
            selectedDropDownProduct.value = products[0];
        }

        const members = await fetchDiscordMembers();
        clientNameOptions.value = members.members;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    } finally {
    }
    console.log(loader.value);
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedDropDownProduct = ref({});
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const statuses = ref([
    { label: 'BYBIT', value: 'bybit' },
    { label: 'EMAIL', value: 'email' }
]);

function openNew() {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}

function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}

async function saveProduct() {
    submitted.value = true;
    try {
        console.log(product.value);
        if (product.value.productId) {
            loader.value = true;
            products.value[findIndexById(product.value.productId)] = product.value;
            await updateProductLicense(product.value._id, product.value);
            const data = await fetchProductsLicenses(product.value.productId);
            products.value = data.licenses;
            loader.value = false;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            loader.value = true;
            product.value.id = createId();
            await saveProductsLicense(product.value.product.productId, product.value);
            selectedDropDownProduct.value = product.value.product;
            loader.value = false;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
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

async function deleteProduct() {
    loader.value = true;
    await deleteProductLicense(product.value._id);
    const data = await fetchProductsLicenses(product.value.productId);
    products.value = data.licenses;
    loader.value = false;
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

watch(selectedDropDownProduct, async (newVal, oldVal) => {
    loader.value = true;
    const data = await fetchProductAllLicenses(newVal.productId);
    products.value = data.licenses;
    loader.value = false;
});
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable :loading="loader" ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true" :rows="10" :filters="filters">
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <Select id="name" v-model="selectedDropDownProduct" :options="productOptions" optionLabel="name" placeholder="Select a Product" class="w-56" />
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column field="productName" header="Product" sortable style="min-width: 12rem"></Column>
                <Column field="_id" header="License Key" sortable style="min-width: 12rem"></Column>
                <Column field="discordUsername" header="Client discord" sortable style="min-width: 12rem"></Column>
                <Column field="clientName" header="client name" sortable style="min-width: 12rem"></Column>
                <Column field="ipCap" header="IP cap" sortable style="min-width: 10rem"></Column>
                <Column field="hwidCap" header="Hwid cap" sortable style="min-width: 10rem"></Column>
                <Column field="note" header="Note" sortable style="min-width: 10rem"></Column>
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
                <div v-if="!product.productId">
                    <label for="name" class="block font-bold mb-3">Product</label>
                    <Select :loading="loader" id="name" v-model="product.product" :options="productOptions" optionLabel="name" placeholder="Select a Product" class="w-full" :class="{ 'p-invalid': submitted && !product.product }" />
                    <small v-if="submitted && !product.product" class="text-red-500">Product is required.</small>
                </div>
                <div class="grid grid-cols-12 gap-4">
                    <div v-if="!product.productId" class="col-span-6">
                        <label for="clientDiscord" class="block font-bold mb-3">Client discord</label>
                        <Select
                            :loading="loader"
                            id="clientName"
                            v-model="product.clientDiscord"
                            :options="clientNameOptions"
                            optionLabel="user.username"
                            placeholder="Select a Client Name"
                            class="w-full"
                            :class="{ 'p-invalid': submitted && !product.clientDiscord }"
                        />
                        <small v-if="submitted && !product.clientDiscord" class="text-red-500">Client Discord is required.</small>
                    </div>
                    <div v-if="!product.productId" class="col-span-6">
                        <label for="clientName" class="block font-bold mb-3">Client name</label>
                        <InputText id="clientDiscord" v-model.trim="product.clientName" required="true" autofocus :invalid="submitted && !product.clientName" fluid />

                        <small v-if="submitted && !product.clientName" class="text-red-500">Client Name is required.</small>
                    </div>
                </div>
                <div v-if="!product.productId">
                    <label for="note" class="block font-bold mb-3">Note</label>
                    <Textarea id="note" v-model="product.note" required="true" rows="3" cols="20" fluid />
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="ipCap" class="block font-bold mb-3">IP cap</label>
                        <InputNumber id="ipCap" v-model.trim="product.ipCap" required="true" autofocus :invalid="submitted && !product.ipCap" fluid />
                        <small v-if="submitted && !product.ipCap" class="text-red-500">IP Cap is required.</small>
                    </div>
                    <div class="col-span-6">
                        <label for="hwidCap" class="block font-bold mb-3">Hwid cap</label>
                        <InputNumber id="hwidCap" v-model.trim="product.hwidCap" required="true" autofocus :invalid="submitted && !product.hwidCap" fluid />
                        <small v-if="submitted && !product.hwidCap" class="text-red-500">Hwid cap is required.</small>
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button :disabled="loader" @click="saveProduct">
                    <template v-if="loader">
                        <ProgressSpinner style="width: 2rem; height: 2rem" strokeWidth="8" />
                    </template>
                    <template v-else class="text-lg"> Save </template>
                </Button>
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
                <Button label="Yes" :disabled="loader" icon="pi pi-check" text @click="deleteSelectedProducts">
                    <template v-if="loader">
                        <ProgressSpinner style="width: 2rem; height: 2rem" strokeWidth="8" />
                    </template>
                    <template v-else class="text-lg"> Save </template>
                </Button>
            </template>
        </Dialog>
    </div>
</template>

<style scoped>
:deep(.p-paginator-first, ) {
    display: none;
}
:deep(.p-paginator-prev) {
    display: none;
}
:deep(.p-paginator-next) {
    display: none;
}
:deep(.p-paginator-last) {
    display: none;
}
:deep(.p-toolbar) {
    border: 0;
}
</style>
