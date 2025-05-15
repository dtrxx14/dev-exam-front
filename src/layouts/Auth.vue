<template>
    <div class="min-h-screen bg-gray-100">
        <header class="bg-white shadow p-4 flex justify-between items-center">
            <h1 class="text-xl font-semibold">Product Manager</h1>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" @click="logout">
                Logout
            </button>
        </header>
        <main class="p-6">
            <slot />
        </main>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
const logout = () => {
    auth.logout()
    window.location.href = '/login'
}
</script>