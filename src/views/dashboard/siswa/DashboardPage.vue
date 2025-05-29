<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Dashboard Calon Peserta Didik</h1>

    <div
      class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-6 border border-blue-200 shadow-sm"
    >
      <div class="flex">
        <div class="flex-shrink-0 pt-0.5">
          <Icon icon="healthicons:info-24px" width="20" height="20" class="text-primary" />
        </div>
        <div class="ml-3">
          <p class="text-blue-800">
            Selamat datang di Dashboard Pendaftaran Peserta Didik Baru Al-Farabi. Silahkan lengkapi
            data dan dokumen yang dibutuhkan untuk melanjutkan proses pendaftaran.
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div
        class="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-102"
      >
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Icon icon="simple-line-icons:check" width="24" height="24" class="text-primary mr-2" />
          Status Pendaftaran
        </h2>
        <div class="flex items-center">
          <div
            class="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-400 flex items-center justify-center mr-4 shadow-md"
          >
            <Icon icon="mdi:clock-outline" width="28" height="28" class="text-white" />
          </div>
          <div>
            <p class="text-sm text-gray-600">Status saat ini</p>
            <p class="font-semibold text-yellow-500 text-lg">Menunggu Kelengkapan Data</p>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-102"
      >
        <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Icon icon="solar:arrow-down-linear" width="24" height="24" class="text-primary mr-2" />
          Langkah Selanjutnya
        </h2>
        <ol class="list-decimal pl-5 space-y-2 text-gray-600 mb-4">
          <li>Lengkapi data calon siswa</li>
          <li>Unggah berkas persyaratan</li>
          <li>Periksa hasil seleksi</li>
        </ol>
        <div class="mt-4">
          <router-link
            to="/dashboard/data-siswa"
            class="bg-blue-300 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center w-max"
          >
            <Icon icon="material-symbols:edit-rounded" width="20" height="20" class="mr-2" />
            Lengkapi Data
          </router-link>
        </div>
      </div>
    </div>

    <div
      class="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Icon icon="mdi:clock-outline" width="24" height="24" class="text-primary mr-2" />
        Timeline Pendaftaran
      </h2>
      <div class="relative">
        <div
          class="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-green-500 via-yellow-400 to-gray-300"
        ></div>

        <div class="relative flex items-start mb-6">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white z-10 shadow-md"
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-base font-medium text-gray-900">Registrasi Akun</h3>
            <p class="text-sm text-gray-500">16 Mei 2025</p>
            <p class="mt-1 text-sm text-gray-600">Pendaftaran akun berhasil dilakukan</p>
          </div>
        </div>

        <div class="relative flex items-start mb-6">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-white z-10 shadow-md animate-pulse"
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-base font-medium text-gray-900">Pengumpulan Dokumen</h3>
            <p class="text-sm text-gray-500">Dalam Proses</p>
            <p class="mt-1 text-sm text-gray-600">Silahkan lengkapi dokumen yang dibutuhkan</p>
          </div>
        </div>

        <div class="relative flex items-start mb-6">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white z-10 shadow-md"
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-base font-medium text-gray-400">Verifikasi Dokumen</h3>
            <p class="text-sm text-gray-400">Menunggu</p>
            <p class="mt-1 text-sm text-gray-400">Verifikasi dokumen oleh admin</p>
          </div>
        </div>

        <div class="relative flex items-start">
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white z-10 shadow-md"
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-base font-medium text-gray-400">Pendaftaran Selesai</h3>
            <p class="text-sm text-gray-400">Menunggu</p>
            <p class="mt-1 text-sm text-gray-400">Pendaftaran berhasil dan diterima</p>
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
