<template>
    <form @submit.prevent="handleSubmit" class="mb-6 p-4 bg-white shadow rounded space-y-4">
        <input v-model="product.name" type="text" placeholder="Name" class="w-full border p-2 rounded" required />
        <textarea v-model="product.description" placeholder="Description" class="w-full border p-2 rounded"></textarea>

        <input v-model.number="product.price" type="text" placeholder="Price" class="w-full border p-2 rounded"
            required />
        <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
    </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import api from '@/api/axios'
import { Product } from '@/types/product'

const emit = defineEmits(['saved'])

const product = ref<Partial<Product>>({
    name: '',
    price: 0,
    description: ''
})

const handleSubmit = async () => {
    await api.post('/products', product.value)
    product.value = { name: '', price: 0, description: '' }
    emit('saved')
}
</script>