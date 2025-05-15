<template>
    <div class="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
        <div v-if="product">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
            <p class="text-gray-600 mb-2">
                {{ product.description || 'No description provided.' }}
            </p>
            <p class="text-lg font-semibold text-blue-600">
                Price: ${{ product.price }}
            </p>
        </div>

        <div v-else-if="error" class="text-red-700 bg-red-100 border border-red-300 p-4 rounded">
            <p>{{ error }}</p>
        </div>

        <div v-else class="text-center text-gray-500">
            <p>Loading...</p>
        </div>
    </div>
</template>

<script lang="ts">
import api from '@/api/axios'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'ProductDetails',
    setup() {
        const product = ref(null);
        const error = ref<string | null>(null);

        const route = useRoute();
        const productId = Number(route.params.id); // Dynamically from route

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

        return { product, error };
    },
};
</script>