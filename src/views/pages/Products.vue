<script setup>
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { computed, onMounted, ref } from 'vue';
import axiosInstance from '../../service/api';
import { downloadProductFile, fetchProducts } from '../../service/auth.services';

const loader = ref(false);

const isAdmin = computed(() => {
    const userData = localStorage.getItem('userData');
    return userData === 'true';
});
onMounted(async () => {
    try {
        loader.value = true;
        products.value = await fetchProducts();
        loader.value = false;
    } catch (e) {
        console.log(e.message);
    }
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
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
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

async function saveProduct() {
    submitted.value = true;

    if (product?.value.name?.trim()) {
        if (product.value.id) {
            try {
                loader.value = true;
                const obj = product.value;
                if (obj.productId) {
                    obj.id = obj.productId;
                    product.value = obj;
                }
                await axiosInstance.put(`/products/${product.value.id}`, product.value);
                products.value = await fetchProducts();
                products.value[findIndexById(product.value.id)] = product.value;

                toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                productDialog.value = false;
                loader.value = false;
                product.value = {};
            } catch (e) {
                loader.value = false;
                toast.add({ severity: 'error', summary: 'Error', detail: e.response.data.message, life: 3000 });
                product.value.id = null;
            }
        } else {
            try {
                loader.value = true;
                product.value.id = createId();
                const obj = product.value;
                if (obj.productId) {
                    obj.id = obj.productId;
                    product.value = obj;
                }
                await axiosInstance.post('/products', product.value);
                products.value = await fetchProducts();
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                loader.value = false;
                productDialog.value = false;
                product.value = {};
            } catch (err) {
                loader.value = false;
                toast.add({ severity: 'error', summary: 'Error', detail: err.response.data.message, life: 3000 });
                product.value.id = null;
            }
        }
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
    try {
        loader.value = true;
        await axiosInstance.delete(`/products/${product.value.productId}`);
        products.value = await fetchProducts();
        loader.value = false;
    } catch (e) {
        console.log(e);
    }
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

function getStatusLabel(status) {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}

async function downloadProduct(data) {
    try {
        await downloadProductFile(data.productId);
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Successful', detail: e.message, life: 3000 });
    }
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button v-if="isAdmin" label="New" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable :loading="loader" ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true" :rows="10" :filters="filters">
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
                <Column field="productId" header="ID" sortable style="min-width: 16rem"></Column>
                <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>

                <Column field="version" header="Version" sortable style="min-width: 16rem"></Column>
                <Column field="price" header="Price" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.price) }}
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" v-if="isAdmin" outlined class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" v-if="isAdmin" class="mr-2" outlined severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                        <Button icon="pi pi-cloud-download" outlined severity="info" @click="downloadProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Add New Product" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="id" class="block font-bold mb-3">ID</label>
                    <InputText id="name" v-model.trim="product.productId" required="true" autofocus :invalid="submitted && !product.productId" fluid />
                    <small v-if="product.productId" class="text-blue-300">*Id should be unique</small>
                    <small v-if="submitted && !product.productId" class="text-red-500">Id is required.</small>
                </div>
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" fluid />
                    <small v-if="product.name" class="text-blue-300">*Name should be unique</small>
                    <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
                </div>
                <div>
                    <label for="version" class="block font-bold mb-3">Version</label>
                    <Textarea id="version" v-model="product.version" required="true" rows="3" cols="20" fluid />
                    <small v-if="submitted && !product.version" class="text-red-500">Version is required.</small>
                </div>
                <div>
                    <label for="price" class="block font-bold mb-3">Price</label>
                    <InputNumber id="price" required="true" v-model="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                    <small v-if="submitted && !product.price" class="text-red-500">Price is required.</small>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button :disabled="loader" @click="saveProduct" class="w-24">
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
                <Button @click="deleteProduct">
                    <template v-if="loader">
                        <ProgressSpinner style="width: 2rem; height: 2rem" strokeWidth="8" />
                    </template>
                    <template v-else class="text-lg"> Delete </template>
                </Button>
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
