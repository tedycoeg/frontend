<script setup>
import { ref } from 'vue'

const email = ref('')
const message = ref('')
const error = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  error.value = ''
  message.value = ''

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Gagal mengirim email reset.')

    message.value = 'Link reset password telah dikirim ke email kamu.'
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
      <h2 class="text-2xl font-bold mb-6 text-center">Lupa Password</h2>

      <form @submit.prevent="handleSubmit">
        <input
          type="email"
          v-model="email"
          placeholder="Masukkan email terdaftar"
          class="w-full border px-4 py-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {{ isSubmitting ? 'Mengirim...' : 'Kirim Link Reset' }}
        </button>
      </form>

      <div v-if="message" class="mt-4 text-green-600">{{ message }}</div>
      <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
    </div>
  </div>
</template>
