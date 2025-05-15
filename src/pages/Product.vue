<template>
    <AuthtLayout>
        <div class="flex justify-between mb-4">
            <h2 class="text-xl font-semibold">Products</h2>
            <button @click="toggleForm" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                {{ showForm ? 'Close' : 'Add Product' }}
            </button>
        </div>
        <ProductForm v-if="showForm" @saved="refreshProducts" />
        <div class="p-6">
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
                        <tr v-for="item in products.data" :key="item.id" class="border-t hover:bg-gray-50">
                            <td class="p-3">{{ item.name }}</td>
                            <td class="p-3">${{ parseFloat(item.price).toFixed(2) }}</td>
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
                        <tr v-if="products.data.length === 0">
                            <td colspan="4" class="p-4 text-center text-gray-500">No products found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination Controls -->
            <div class="mt-4 flex justify-center space-x-2">
                <button v-for="page in pagination.last_page" :key="page" @click="fetchProducts(page)"
                    class="px-3 py-1 border rounded" :class="{
                        'bg-blue-500 text-white': page === pagination.current_page,
                        'bg-white text-gray-700': page !== pagination.current_page
                    }">
                    {{ page }}
                </button>
            </div>
        </div>
    </AuthtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'  // <-- Import useRouter
import api from '@/api/axios'
import AuthtLayout from '@/layouts/Auth.vue'
import ProductForm from '@/components/ProductForm.vue'
import { Product } from '@/types/product'

const router = useRouter()  // <-- Initialize router

// State for products, pagination, and showForm
const products = ref<{ data: Array<any>, current_page: number, last_page: number }>({
    data: [],
    current_page: 1,
    last_page: 1
})
const pagination = ref({ current_page: 1, last_page: 1 })
const showForm = ref(false) // <-- Added state for toggling the form

// Fetch products based on the current page
const fetchProducts = async (page = 1) => {
    try {
        const res = await api.get(`/products?page=${page}`)

        products.value = res.data
        pagination.value = {
            current_page: res.data.current_page,
            last_page: res.data.last_page
        }
    } catch (error) {
        console.error('Error fetching products:', error)
        alert('Error fetching products.')
    }
}

// Delete product
const deleteProduct = async (id: number) => {
    try {
        if (confirm('Are you sure you want to delete this product?')) {
            await api.delete(`/products/${id}`)
            fetchProducts(pagination.value.current_page) // Refresh the product list after deletion
        }
    } catch (error) {
        console.error('Failed to delete product:', error)
        alert('Error deleting product.')
    }
}

// View product details
const viewProduct = (id: number) => {
    router.push({ name: 'ProductDetails', params: { id } })  // Ensure correct route name and parameters
}

// Edit product
const editProduct = (id: number) => {
    router.push({ name: 'ProductEdit', params: { id } })  // Ensure correct route name and parameters
}

// Toggle the visibility of the add product form
const toggleForm = () => {
    showForm.value = !showForm.value
}

// Refresh product list after adding a new product
const refreshProducts = () => {
    fetchProducts(pagination.value.current_page)
}

// Fetch products when component is mounted
onMounted(() => {
    fetchProducts()
})
</script>

<style scoped>
/* Optional: Add any custom styles for your table */
</style>
