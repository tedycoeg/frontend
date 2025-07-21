<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const token = route.params.token

const password = ref('')
const confirmPassword = ref('')
const message = ref('')
const error = ref('')
const isSubmitting = ref(false)

const handleReset = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Password tidak cocok.'
    return
  }

  isSubmitting.value = true
  error.value = ''
  message.value = ''

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Gagal mereset password.')

    message.value = 'Password berhasil direset. Kamu akan diarahkan ke login.'
    setTimeout(() => router.push('/login'), 3000)
  } catch (err) {
    error.value = err.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Reset Password</h2>

      <form @submit.prevent="handleReset">
        <input
          type="password"
          v-model="password"
          placeholder="Password baru"
          class="w-full border px-4 py-2 mb-4 rounded"
          required
        />
        <input
          type="password"
          v-model="confirmPassword"
          placeholder="Konfirmasi password"
          class="w-full border px-4 py-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          {{ isSubmitting ? 'Memproses...' : 'Reset Password' }}
        </button>
      </form>

      <div v-if="message" class="mt-4 text-green-600">{{ message }}</div>
      <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
    </div>
  </div>
</template>
