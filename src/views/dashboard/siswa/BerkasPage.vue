<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

// API Configuration
const API_BASE_URL = '/api'
const API_ENDPOINTS = {
  DOKUMEN: `${API_BASE_URL}/siswa/dokumen`,
  STATUS: `${API_BASE_URL}/pendaftaran/cekstatus`,
  PENDAFTARAN: `${API_BASE_URL}/pendaftaran`
}

// State untuk unggah dokumen
const isSubmitting = ref(false)
const selectedFile = ref(null)
const uploadSuccess = ref(false)
const fileInput = ref(null)
const isLoading = ref(true)
const documentStatus = ref(null)
const errorMsg = ref('')
const showErrorModal = ref(false)

// Constants untuk validasi file
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB dalam bytes
const ALLOWED_FILE_TYPE = 'application/pdf'

// Utility untuk HTTP requests
const makeApiRequest = async (url, method = 'GET', body = null) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token tidak ditemukan, silakan login kembali')
  }

  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  if (body) {
    options.body = body
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `Gagal melakukan operasi ${method}`)
  }

  return response
}

// Fungsi untuk menampilkan pesan error
const showError = (message) => {
  errorMsg.value = message
  showErrorModal.value = true
  setTimeout(() => {
    showErrorModal.value = false
  }, 5000) 
}

// Fungsi untuk menutup modal error
const closeErrorModal = () => {
  showErrorModal.value = false
}

// Fungsi untuk mengirim notifikasi pendaftaran selesai
const sendRegistrationCompletionNotification = async () => {
  try {
    // POST request tanpa body ke endpoint pendaftaran
    await makeApiRequest(API_ENDPOINTS.PENDAFTARAN, 'POST')
    console.log('Notifikasi pendaftaran selesai berhasil dikirim')
  } catch (error) {
    console.error('Error sending registration completion notification:', error)
    // Tidak menampilkan error ke user karena ini adalah proses background
  }
}

// Fungsi untuk memeriksa status dokumen saat halaman dimuat
const checkDocumentStatus = async () => {
  isLoading.value = true
  try {
    const response = await makeApiRequest(API_ENDPOINTS.STATUS)
    const data = await response.json()
    
    // Jika sudah ada status pendaftaran
    if (data.payload && data.payload.data) {
      documentStatus.value = data.payload.data
      
      // Jika status = 1 (diproses) atau lebih besar, berarti dokumen sudah diupload
      if (data.payload.data.status >= 1) {
        uploadSuccess.value = true
      }
    }
  } catch (error) {
    console.error('Error checking document status:', error)
    // Error menampilkan status tidak mengubah tampilan
  } finally {
    isLoading.value = false
  }
}

// Validasi file yang dipilih
const validateFile = (file) => {
  if (file.size > MAX_FILE_SIZE) {
    showError('Ukuran file terlalu besar. Maksimal 5MB.')
    return false
  }

  if (file.type !== ALLOWED_FILE_TYPE) {
    showError('Format file harus PDF.')
    return false
  }

  return true
}

// Handler untuk file yang diupload
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!validateFile(file)) {
    event.target.value = ''
    return
  }

  selectedFile.value = file
}

// Hapus file yang dipilih
const removeFile = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Format ukuran file untuk tampilan
const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' bytes'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else return (bytes / 1048576).toFixed(1) + ' MB'
}

// Kirim dokumen ke server
const submitDocuments = async () => {
  if (!selectedFile.value) {
    showError('Silahkan pilih file terlebih dahulu.')
    return
  }

  isSubmitting.value = true

  try {
    // Membuat form data untuk upload
    const formData = new FormData()
    formData.append('dokumen', selectedFile.value)
    
    await makeApiRequest(API_ENDPOINTS.DOKUMEN, 'POST', formData)

    // Sukses upload
    uploadSuccess.value = true
    
    // Refresh status dokumen
    await checkDocumentStatus()
    
    // Kirim notifikasi pendaftaran selesai
    await sendRegistrationCompletionNotification()
  } catch (error) {
    console.error('Error submitting document:', error)
    showError(error.message || 'Terjadi kesalahan saat mengirim dokumen')
  } finally {
    isSubmitting.value = false
  }
}

// Load data saat komponen dimuat
onMounted(() => {
  checkDocumentStatus()
})
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Unggah Berkas</h1>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span class="ml-3 text-lg text-blue-500 font-medium">Memuat status dokumen...</span>
    </div>

    <!-- Form upload dokumen -->
    <div v-else-if="!uploadSuccess">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          class="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-5 text-white shadow-md transform hover:scale-102 transition-all duration-300"
        >
          <h3 class="text-2xl font-bold mb-3 text-center">TK</h3>
          <ol class="list-decimal pl-5 space-y-1">
            <li>Kartu Keluarga</li>
            <li>Akta Kelahiran</li>
          </ol>
        </div>

        <div
          class="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-5 text-white shadow-md transform hover:scale-102 transition-all duration-300"
        >
          <h3 class="text-2xl font-bold mb-3 text-center">SD</h3>
          <ol class="list-decimal pl-5 space-y-1">
            <li>Kartu Keluarga</li>
            <li>Akta Kelahiran</li>
            <li>Ijazah TK</li>
          </ol>
        </div>

        <div
          class="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-5 text-white shadow-md transform hover:scale-102 transition-all duration-300"
        >
          <h3 class="text-2xl font-bold mb-3 text-center">SMP</h3>
          <ol class="list-decimal pl-5 space-y-1">
            <li>Kartu Keluarga</li>
            <li>Akta Kelahiran</li>
            <li>Surat Keterangan Lulus SD/MI</li>
            <li>Ijazah SD/MI</li>
          </ol>
        </div>

        <div
          class="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-5 text-white shadow-md transform hover:scale-102 transition-all duration-300"
        >
          <h3 class="text-2xl font-bold mb-3 text-center">SMK</h3>
          <ol class="list-decimal pl-5 space-y-1">
            <li>Kartu Keluarga</li>
            <li>Akta Kelahiran</li>
            <li>Surat Keterangan Lulus SMP/MTS</li>
            <li>Ijazah SMP/MTS</li>
          </ol>
        </div>
      </div>

      <div
        class="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-8 flex flex-col items-center justify-center mb-6 shadow-md"
      >
        <div class="mb-4 transform hover:scale-110 transition-transform duration-300">
          <Icon
            icon="material-symbols:drive-folder-upload"
            width="64"
            height="64"
            class="text-white"
          />
        </div>
        <h3 class="text-xl font-bold text-white mb-3">Unggah Berkas</h3>
        <p class="text-white mb-4 text-center">Gabungkan semua dokumen menjadi satu file PDF</p>
        <input
          type="file"
          @change="handleFileUpload"
          ref="fileInput"
          class="hidden"
          accept=".pdf"
        />
        <button
          @click="$refs.fileInput.click()"
          class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
          Pilih File
        </button>

        <div
          v-if="selectedFile"
          class="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200 w-full max-w-md"
        >
          <div class="flex items-center">
            <Icon icon="fa6-regular:file-pdf" width="36" height="36" class="mr-3 text-primary" />
            <div class="flex-1">
              <p class="font-medium text-primary">{{ selectedFile.name }}</p>
              <p class="text-xs text-primary">{{ formatFileSize(selectedFile.size) }}</p>
            </div>
            <button @click="removeFile" class="text-red-500 hover:text-red-700">
              <Icon icon="material-symbols:delete-outline" width="24" height="24" />
            </button>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
        <div class="flex items-start">
          <div class="flex-shrink-0 pt-0.5">
            <Icon icon="healthicons:info-24px" width="24" height="24" class="text-primary" />
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700">
              Semua dokumen wajib digabungkan menjadi satu file
              <span class="font-bold">berformat PDF</span> dengan ukuran
              <span class="font-bold">maksimal 5 MB</span>.
            </p>
            <p class="text-sm text-blue-700 mt-1">
              Pastikan seluruh dokumen terlihat jelas dan tidak buram untuk mempermudah proses
              verifikasi.
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="submitDocuments"
          class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-12 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          :disabled="!selectedFile || isSubmitting"
        >
          <span v-if="isSubmitting" class="flex items-center justify-center">
            <svg
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Menyimpan...
          </span>
          <span v-else>Simpan</span>
        </button>
      </div>
    </div>

    <!-- Status sukses -->
    <div v-else class="flex flex-col items-center">
      <div
        class="bg-green-50 rounded-xl p-8 flex flex-col items-center justify-center mb-6 w-full shadow-md border border-green-200"
      >
        <div
          class="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-4 shadow-md animate-bounce"
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
        <h3 class="text-2xl font-bold text-green-600 mb-2">Berkas Telah Diunggah</h3>
        <p class="text-green-600 text-center mb-3">
          Berkas Anda telah berhasil diunggah dan sedang dalam proses verifikasi
        </p>
      </div>

      <!-- Info section -->
      <div class="bg-blue-50 rounded-xl p-8 border border-blue-200 mb-6 w-full">
        <div class="flex items-start">
          <div class="flex-shrink-0 pt-0.5">
            <Icon icon="healthicons:info-24px" width="24" height="24" class="text-primary" />
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700">
              Semua dokumen wajib digabungkan menjadi satu file
              <span class="font-bold">berformat PDF</span> dengan ukuran
              <span class="font-bold">maksimal 5 MB</span>.
            </p>
            <p class="text-sm text-blue-700 mt-1">
              Pastikan seluruh dokumen terlihat jelas dan tidak buram untuk mempermudah proses
              verifikasi.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <div 
      v-if="showErrorModal" 
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity"
    >
      <div class="bg-white rounded-lg max-w-md mx-auto p-6 shadow-2xl transform transition-all">
        <div class="flex items-start justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-100 rounded-full p-2">
              <Icon icon="mdi:alert" width="24" height="24" class="text-red-600" />
            </div>
            <h3 class="ml-3 text-lg font-medium text-gray-900">Error</h3>
          </div>
          <button 
            @click="closeErrorModal" 
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <Icon icon="mdi:close" width="24" height="24" />
          </button>
        </div>
        <div class="mt-3">
          <p class="text-sm text-gray-500">{{ errorMsg }}</p>
        </div>
        <div class="mt-5 flex justify-end">
          <button
            type="button"
            @click="closeErrorModal"
            class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scale {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>
