import axiosInstance from './api';

export async function fetchProducts() {
    try {
        const res = await axiosInstance.get('/products');
        const { data, status } = res.data;
        if (status === 'success') {
            return data.products.map((product) => {
                return {
                    ...product,
                    productId: product.id,
                    id: product._id
                };
            });
        }
    } catch (e) {
        console.log(e);
    }
}

export function fetchDiscordMembers() {
    return axiosInstance
        .get('/guild/members')
        .then((res) => {
            const { data, status } = res.data;
            if (status === 'success') {
                return data;
            }
        })
        .catch((e) => {
            console.log(e);
        });
}

export function fetchProductsLicenses(productId) {
    return axiosInstance
        .get(`/products/${productId}/licenses/users/@me`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === 'success') {
                return data;
            }
        })
        .catch((e) => {
            console.log(e);
        });
}

export function fetchProductAllLicenses(productId) {
    return axiosInstance
        .get(`/products/${productId}/licenses`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === 'success') {
                return data;
            }
        })
        .catch((e) => {
            console.log(e);
        });
}

export async function saveProductsLicense(productId, data) {
    await axiosInstance.post(`/products/${productId}/licenses`, data);
}

export async function updateProductLicense(licenseId, data) {
    await axiosInstance.put(`/licenses/${licenseId}`, data);
}

export async function deleteProductLicense(licenseId) {
    await axiosInstance.delete(`/licenses/${licenseId}`);
}

export async function downloadProductFile(productId) {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/products/${productId}/download`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // Add any additional headers here if needed
        },
        credentials: 'include'
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    const data = await response.blob();
    console.log(data);
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-file';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export async function me() {
    const res = await axiosInstance.get('/users/@me');
    return res.data;
}
