<template>
    <div class="overflow-x-auto bg-white rounded shadow">
        <table class="w-full table-auto">
            <thead class="bg-gray-100 text-left">
                <tr>
                    <th class="p-3">Name</th>
                    <th class="p-3">Price</th>
                    <th class="p-3">Description</th>
                    <th class="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id" class="border-t hover:bg-gray-50">
                    <td class="p-3">{{ item.name }}</td>
                    <td class="p-3">${{ item.price.toFixed(2) }}</td>
                    <td class="p-3">{{ item.description || '-' }}</td>
                    <td class="p-3 space-x-2">
                        <button @click="viewProduct(item.id)" class="text-sm text-blue-600 hover:underline">
                            View
                        </button>
                        <button @click="editProduct(item.id)" class="text-sm text-yellow-600 hover:underline">
                            Edit
                        </button>
                        <button @click="deleteProduct(item.id)" class="text-sm text-red-600 hover:underline">
                            Delete
                        </button>
                    </td>
                </tr>
                <tr v-if="products.length === 0">
                    <td colspan="4" class="p-4 text-center text-gray-500">No products found.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script lang="ts" setup>
import { useRouter } from 'vue-router'
import api from '@/api/axios'
import { Product } from '@/types/product'

const props = defineProps<{
    products: Product[]
}>()

const emit = defineEmits<{
    (e: 'deleted'): void
}>()

const router = useRouter()

// Handle deleting a product
const deleteProduct = async (id: number) => {
    try {
        if (confirm('Are you sure you want to delete this product?')) {
            await api.delete(`/products/${id}`)
            emit('deleted') // Trigger the parent to fetch the updated list
        }
    } catch (error) {
        console.error('Failed to delete product:', error)
        alert('Error deleting product.')
    }
}

// View product details
const viewProduct = (id: number) => {
    router.push({ name: 'ProductDetails', params: { id } })
}

// Edit product
const editProduct = (id: number) => {
    router.push({ name: 'ProductEdit', params: { id } })
}
</script>
