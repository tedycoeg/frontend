<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const isSubmitting = ref(false)
const selectedFile = ref(null)
const uploadSuccess = ref(false)
const fileInput = ref(null)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    alert('Ukuran file terlalu besar. Maksimal 5MB.')
    event.target.value = ''
    return
  }

  if (file.type !== 'application/pdf') {
    alert('Format file harus PDF.')
    event.target.value = ''
    return
  }

  selectedFile.value = file
}

const removeFile = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' bytes'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else return (bytes / 1048576).toFixed(1) + ' MB'
}

const submitDocuments = async () => {
  if (!selectedFile.value) {
    alert('Silahkan pilih file terlebih dahulu.')
    return
  }

  isSubmitting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log('Document submitted:', selectedFile.value)

    uploadSuccess.value = true
  } catch (error) {
    console.error('Error submitting document:', error)
    alert('Terjadi kesalahan saat mengirim dokumen')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <h1
      class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 transition-all duration-300 ease-in-out"
    >
      Unggah Berkas
    </h1>

    <div v-if="!uploadSuccess">
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
        <p class="text-green-600 text-center">
          Berkas Anda telah berhasil diunggah dan sedang dalam proses verifikasi
        </p>
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
