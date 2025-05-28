<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const result = await authStore.login({
    email: email.value,
    password: password.value,
  })

  if (result.success) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-blue-300 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="flex flex-col items-center mb-8">
      <img src="/images/logo.png" alt="Al-Farabi Logo" class="h-32 mb-6" />
      <h1 class="text-2xl font-bold text-white text-center">PENDAFTARAN PESERTA DIDIK BARU</h1>
    </div>

    <h2 class="text-4xl font-bold text-white mb-8">LOGIN USER</h2>

    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div
          v-if="authStore.error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md"
          role="alert"
        >
          <span>{{ authStore.error }}</span>
        </div>

        <div>
          <button
            type="submit"
            class="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition duration-300 shadow-xl"
            :disabled="authStore.isLoading"
          >
            {{ authStore.isLoading ? 'Memproses...' : 'Login' }}
          </button>
        </div>
      </form>

      <div class="mt-16 text-center">
        <router-link
          to="/"
          class="inline-block bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium py-2 px-6 rounded-md transition duration-300"
        >
          Kembali Ke Homepage
        </router-link>
      </div>
    </div>
  </div>
</template>
