<template>
    <div class="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">

        <div v-if="error" class="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
            <p>{{ error }}</p>
        </div>

        <div v-if="success" class="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded">
            <p>{{ success }}</p>
        </div>

        <div v-if="product">
            <form @submit.prevent="updateProduct" class="space-y-5">
                <div>
                    <label for="name" class="block font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" v-model="product.name"
                        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                <div>
                    <label for="description" class="block font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" v-model="product.description" rows="4"
                        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                </div>

                <div>
                    <label for="price" class="block font-medium text-gray-700 mb-1">Price</label>
                    <input type="text" id="price" v-model="product.price"
                        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>

                <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Update Product
                </button>
            </form>
        </div>

        <div v-else class="text-center text-gray-500 mt-4">
            <p>Loading...</p>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/api/axios'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'ProductEdit',
    setup() {
        const product = ref({
            name: '',
            description: '',
            price: 0,
        });

        const error = ref<string | null>(null);
        const success = ref<string | null>(null);

        const route = useRoute();
        const productId = Number(route.params.id); // Get product ID from route

        onMounted(() => {
            getProduct(productId);
        });

        const getProduct = async (id: number) => {
            try {
                const response = await api.get(`/products/${id}`);
                product.value = response.data;
            } catch (err) {
                error.value = 'Failed to fetch product data.';
                console.error(err);
            }
        };

        const updateProduct = async () => {
            try {
                await api.put(`/products/${productId}`, product.value);
                success.value = 'Product updated successfully!';
                error.value = null;
            } catch (err) {
                error.value = 'Failed to update product.';
                success.value = null;
                console.error(err);
            }
        };

        return {
            product,
            error,
            success,
            updateProduct,
        };
    },
};
</script>