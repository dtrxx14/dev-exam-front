<template>
    <GuestLayout>
        <h2 class="text-2xl font-bold mb-4">Login</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
            <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" required />
            <input v-model="password" type="password" placeholder="Password" class="w-full border p-2 rounded"
                required />
            <button class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
        </form>
        <p class="text-sm text-gray-500 mt-4">
            Don't have an account?
            <RouterLink to="/register" class="text-blue-500 hover:underline">Register here</RouterLink>
        </p>
    </GuestLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import GuestLayout from '@/layouts/Guest.vue'

const auth = useAuthStore()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
    await auth.login(email.value, password.value)
    window.location.href = '/products'
}
</script>