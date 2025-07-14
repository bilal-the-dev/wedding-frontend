export const ProductService = {
    getProductsData() {
        return [
            {
                id: '1015',
                productId: '34545',
                name: 'Light Green T-Shirt',
                version: 'Product Description',
                price: 49
            }
        ];
    },

    getLicenseData() {
        return [
            {
                id: '1000',
                product: 'product1',
                clientDiscord: 'Jason',
                clientName: 'Product',
                ipCap: '2322323232',
                hwidCap: 'CD332KDKS',
                note: '2332432',
                platform: 'EMAIL',
                email: 'ahan@gmail.com'
            }
        ];
    },
    getProductsWithOrdersData() {
        return [];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    },
    getLicense() {
        return Promise.resolve(this.getLicenseData());
    }
};
