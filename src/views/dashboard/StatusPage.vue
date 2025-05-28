<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

// Demo: Ganti status ke 'processing', 'accepted', atau 'rejected' untuk melihat tampilan yang berbeda
const status = ref('processing')

// const status = ref('')
// const fetchStatus = async () => {
//   try {
//     const response = await api.get('/student/application-status')
//     status.value = response.data.status
//   } catch (error) {
//     console.error('Error fetching status:', error)
//   }
// }
// onMounted(fetchStatus)
</script>

<template>
  <div>
    <h1
      class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 transition-all duration-300 ease-in-out"
    >
      Hasil Seleksi
    </h1>

    <div v-if="status === 'processing'" class="flex flex-col items-center">
      <div
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

      <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6 w-full mx-auto">
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
    </div>

    <div v-else-if="status === 'accepted'" class="flex flex-col items-center">
      <div
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

      <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6 w-full mx-auto">
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

      <button
        class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-12 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center"
      >
        <Icon icon="material-symbols:download-rounded" width="24" height="24" class="mr-2" />
        Unduh
      </button>
    </div>

    <div v-else-if="status === 'rejected'" class="flex flex-col items-center">
      <div
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

      <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6 w-full mx-auto">
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
