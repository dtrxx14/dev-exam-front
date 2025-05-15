<template>
    <GuestLayout>
        <h2 class="text-2xl font-bold mb-4">Register</h2>
        <form @submit.prevent="handleRegister" class="space-y-4">
            <input v-model="name" type="text" placeholder="Name" class="w-full border p-2 rounded" required />
            <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" required />
            <input v-model="password" type="password" placeholder="Password" class="w-full border p-2 rounded"
                required />
            <button class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Register</button>
        </form>
        <p class="text-sm text-gray-500 mt-4">
            Already have an account?
            <RouterLink to="/login" class="text-blue-500 hover:underline">Login here</RouterLink>
        </p>
    </GuestLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import GuestLayout from '@/layouts/Guest.vue'

const auth = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')

const handleRegister = async () => {
    await auth.register(name.value, email.value, password.value)
    window.location.href = '/products'
}
</script>