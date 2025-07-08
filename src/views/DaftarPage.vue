<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRegistrationStore } from '@/stores/registration'

const registrationStore = useRegistrationStore()

// Constants
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const CAPTCHA_URL = `${API_BASE_URL}/captcha`

// State
const captchaUrl = ref('')
const captchaLoading = ref(false)
const formData = ref({
  fullName: '',
  email: '',
  password: '',
  captcha: '',
})

const fetchCaptcha = async () => {
  captchaLoading.value = true
  try {
    const url = `${CAPTCHA_URL}?${Date.now()}`
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch captcha: ${response.status}`)
    }
    
    const blob = await response.blob()
    captchaUrl.value = URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error fetching captcha:', error)
  } finally {
    captchaLoading.value = false
  }
}

const submitForm = async () => {
  await registrationStore.submitRegistration({
    ...formData.value,
  })
}

const printRegistration = () => {
  window.print()
}

// Initialize component
onMounted(() => {
  registrationStore.resetRegistration()
  fetchCaptcha()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-6 print:hidden">
      <div class="flex flex-col items-center">
        <router-link to="/" class="mb-4">
          <img src="/images/logo.svg" alt="Al-Farabi Logo" class="h-24" />
        </router-link>
        <div class="text-center">
          <h1 class="text-xl md:text-2xl font-bold text-primary">PENDAFTARAN PESERTA DIDIK BARU</h1>
          <h2 class="text-lg md:text-xl font-semibold text-primary">
            YAYASAN PENDIDIKAN MUTTAQIN AL-FARABI
          </h2>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-300 w-full print:hidden"></div>

    <div
      v-if="!registrationStore.registrationSuccess"
      class="container mx-auto px-4 py-8 max-w-4xl"
    >
      <div class="bg-blue-100/50 rounded-lg p-6 mb-8">
        <p class="text-lg text-primary text-center">
          Silahkan lengkapi formulir berikut dengan data sebenarnya
        </p>
      </div>

      <form @submit.prevent="submitForm">
        <div class="space-y-6">
          <div>
            <input
              type="text"
              v-model="formData.fullName"
              placeholder="Nama Lengkap Calon Siswa"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="email"
              v-model="formData.email"
              placeholder="Email"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              v-model="formData.password"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="space-y-3">
            <div class="flex items-center">
              <span class="text-gray-700 mr-4">CAPTCHA</span>
              <div class="text-white px-4 py-2 rounded font-mono text-lg">
                <div v-if="captchaLoading" class="h-16 flex items-center justify-center">
                  <svg class="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <img v-else :src="captchaUrl" alt="CAPTCHA" class="h-16 w-auto">
              </div>
              <button
                type="button"
                @click="fetchCaptcha"
                class="ml-2 p-2 text-blue-600 hover:text-blue-800"
                title="Refresh Captcha"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
            <div>
              <input
                type="text"
                v-model="formData.captcha"
                placeholder="Captcha ?"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div
            v-if="registrationStore.registrationError"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span class="block sm:inline">{{ registrationStore.registrationError }}</span>
          </div>

          <div class="mt-8">
            <button
              type="submit"
              class="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              :disabled="registrationStore.isSubmitting"
            >
              {{ registrationStore.isSubmitting ? 'MENGIRIM...' : 'KIRIM DATA PENDAFTARAN' }}
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-else class="container mx-auto px-4 py-8">
      <div class="hidden print:block print:mb-8">
        <div class="text-center border-b border-gray-300 pb-4 mb-6">
          <h1 class="text-xl font-bold">PENDAFTARAN PESERTA DIDIK BARU</h1>
          <h2 class="text-lg">YAYASAN PENDIDIKAN MUTTAQIN AL-FARABI</h2>
        </div>
      </div>

      <div id="registration-success">
        <h1 class="text-3xl font-bold text-center mb-8">
          Registrasi Pendaftaran Calon Peserta Didik Baru
        </h1>

        <div
          class="max-w-3xl mx-auto bg-green-50 rounded-lg p-8 mb-8 border border-green-200 print:bg-white print:border-none"
        >
          <p class="text-lg mb-6">
            Selamat, tahap pertama anda sudah selesai. Data pendaftaran anda adalah:
          </p>

          <div class="space-y-4">
            <div class="flex">
              <div class="w-48">Nama Lengkap</div>
              <div class="font-semibold">: {{ registrationStore.registrationData.fullName }}</div>
            </div>

            <div class="flex">
              <div class="w-48">Email</div>
              <div class="font-semibold">: {{ registrationStore.registrationData.email }}</div>
            </div>

            <div class="flex">
              <div class="w-48">Password</div>
              <div class="font-semibold">: {{ registrationStore.registrationData.password }}</div>
            </div>

            <div class="flex text-blue-700 mt-2">
              Password harap disimpan dengan baik, untuk digunakan pada proses login berikutnya
            </div>
          </div>

          <div class="mt-8">
            <p class="mb-2 text-justify">
              Untuk selanjutnya silahkan masuk ke dashboard Calon Peserta Didik Baru
              <a href="/login" class="font-semibold text-blue-500">link berikut</a> untuk
              pendaftaran ulang dan pelengkapan berkas yang dibutuhkan
            </p>
          </div>
        </div>

        <div class="flex justify-center mt-6 print:hidden">
          <button
            @click="printRegistration"
            class="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-12 rounded-lg"
          >
            DOWNLOAD
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
