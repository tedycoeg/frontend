<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const API_ENDPOINTS = {
  STATUS: `${API_BASE_URL}/pendaftaran/cekstatus`
}

const status = ref('processing')
const isLoading = ref(true)
const errorMsg = ref('')

const makeApiRequest = async (url, method = 'GET', body = null) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Token tidak ditemukan')
    }

    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(url, options)
    
    if (response.status === 404) {
      return { notFound: true }
    }
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error(`API request error:`, error)
    throw error
  }
}

const fetchStatus = async () => {
  isLoading.value = true
  
  try {
    const result = await makeApiRequest(API_ENDPOINTS.STATUS)
    
    if (result.notFound) {
      return
    }
    
    const data = result.data
    
    if (data?.payload?.data?.status) {
      const statusCode = data.payload.data.status
      
      if (statusCode === 2) {
        status.value = 'accepted'
      } else if (statusCode === 3) {
        status.value = 'rejected'
      }
    }
  } catch (error) {
    console.error('Status fetch error:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchStatus)
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Hasil Seleksi</h1>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span class="ml-3 text-lg text-blue-500 font-medium">Memuat status pendaftaran...</span>
    </div>

    <div v-else class="flex flex-col items-center">
      <!-- Processing UI -->
      <div v-if="status === 'processing'"
        class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 flex flex-col items-center justify-center mb-6 w-full shadow-md border border-blue-200 transform transition-all duration-500 hover:shadow-lg"
      >
        <div
          class="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center mb-4 shadow-md"
        >
          <svg
            class="w-12 h-12 text-white animate-spin-slow"
            xmlns="http://www.w3.org/2000/svg"
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
        </div>
        <h3 class="text-2xl font-bold text-blue-600 mb-2">Proses</h3>
        <div class="flex space-x-1 mt-2">
          <div
            class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style="animation-delay: 0ms"
          ></div>
          <div
            class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style="animation-delay: 150ms"
          ></div>
          <div
            class="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style="animation-delay: 300ms"
          ></div>
        </div>
      </div>

      <!-- Processing info box -->
      <div v-if="status === 'processing'" class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6 w-full mx-auto">
        <div class="flex items-start">
          <div class="flex-shrink-0 pt-0.5">
            <Icon icon="healthicons:info-24px" width="20" height="20" class="text-primary" />
          </div>
          <div class="ml-3">
            <p class="text-lg font-medium text-gray-700 mb-2">Informasi Status Pendaftaran</p>
            <p class="text-gray-600">
              Berkas dan data Anda sedang kami tinjau secara menyeluruh. Mohon pastikan semua
              dokumen telah diunggah dan valid.
            </p>
            <p class="text-gray-600 mt-2">
              Proses verifikasi biasanya membutuhkan waktu 3-5 hari kerja. Anda akan mendapatkan
              notifikasi setelah proses selesai.
            </p>
          </div>
        </div>
      </div>

      <!-- Accepted UI -->
      <div v-if="status === 'accepted'"
        class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8 flex flex-col items-center justify-center mb-6 w-full shadow-md border border-green-200 transform transition-all duration-500 hover:shadow-lg"
      >
        <div
          class="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mb-4 shadow-md animate-pulse"
        >
          <svg
            class="w-12 h-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-green-600 mb-2">Diterima</h3>
        <div class="animate-bounce mt-2">
          <svg
            class="w-6 h-6 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <!-- Accepted info box -->
      <div v-if="status === 'accepted'" class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6 w-full mx-auto">
        <div class="flex items-start">
          <div class="flex-shrink-0 pt-0.5">
            <Icon icon="icon-park-solid:check-one" width="24" height="24" class="text-green-500" />
          </div>
          <div class="ml-3">
            <p class="text-lg font-medium text-gray-700 mb-2">Selamat!</p>
            <p class="text-gray-600">
              Anda telah resmi diterima sebagai calon peserta didik di Sekolah Al-Farabi.
            </p>
            <p class="text-gray-600 mt-2">
              Silakan unduh surat penerimaan dan ikuti tahapan selanjutnya melalui menu Instruksi
              Daftar Ulang.
            </p>
            <p class="text-gray-600 mt-2">
              Silahkan fotocopy berkas yang telah diunggah lalu ke sekolah Al-Farabi dengan membawa
              berkas tersebut dan surat keterangan lulus seleksi.
            </p>
          </div>
        </div>
      </div>

      <!-- Download button for accepted status -->
      <button v-if="status === 'accepted'"
        class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-12 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center"
      >
        <Icon icon="material-symbols:download-rounded" width="24" height="24" class="mr-2" />
        Unduh
      </button>

      <!-- Rejected UI -->
      <div v-if="status === 'rejected'"
        class="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-8 flex flex-col items-center justify-center mb-6 w-full shadow-md border border-red-200 transform transition-all duration-500 hover:shadow-lg"
      >
        <div
          class="w-24 h-24 rounded-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center mb-4 shadow-md"
        >
          <svg
            class="w-12 h-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-red-600 mb-2">Ditolak</h3>
      </div>

      <!-- Rejected info box -->
      <div v-if="status === 'rejected'" class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6 w-full mx-auto">
        <div class="flex items-start">
          <div class="flex-shrink-0 pt-0.5">
            <Icon icon="mingcute:warning-fill" width="24" height="24" class="text-red-500" />
          </div>
          <div class="ml-3">
            <p class="text-lg font-medium text-gray-700 mb-2">Mohon Maaf</p>
            <p class="text-gray-600">
              Berdasarkan hasil verifikasi data dan kuota yang tersedia, saat ini Anda belum lolos
              seleksi.
            </p>
            <p class="text-gray-600 mt-4">
              Jika Anda memiliki pertanyaan, silakan hubungi kami melalui:
            </p>
            <div class="mt-2 flex items-center">
              <Icon icon="bi:telephone" width="24" height="24" class="text-gray-500 mr-2" />
              <span class="text-gray-600">0812-3456-7890</span>
            </div>
            <div class="mt-1 flex items-center">
              <Icon
                icon="material-symbols:mail-outline"
                width="24"
                height="24"
                class="text-gray-500 mr-2"
              />
              <span class="text-gray-600">info@alfarabi.sch.id</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
</style>
