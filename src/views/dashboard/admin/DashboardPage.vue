<script setup>
import { ref } from 'vue'

const dashboardData = ref({
  totalPendaftar: 3000,
  diterima: {
    tk: 89,
    sd: 78,
    smp: 108,
    smk: 102,
  },
  ditolak: {
    tk: 14,
    sd: 12,
    smp: 14,
    smk: 33,
  },
})

const downloadData = () => {
  // This would be replaced with an actual API call to download data
  alert('Data akan diunduh dalam format Excel')
}
</script>

<template>
  <div>
    <!-- <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Dashboard Admin</h1> -->
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-8">
      <h1 class="text-3xl font-bold text-white">Dashboard Admin</h1>
    </div>

    <div class="bg-blue-300 rounded-xl p-8 mb-8 text-center">
      <h2 class="text-6xl font-bold text-white mb-4">{{ dashboardData.totalPendaftar }}</h2>
      <p class="text-2xl font-medium text-white">Pendaftar</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-green-500 rounded-xl p-6 text-center">
        <p class="text-lg font-medium text-white mb-2">Diterima</p>
        <h3 class="text-5xl font-bold text-white mb-2">{{ dashboardData.diterima.tk }}</h3>
        <p class="text-lg font-medium text-white">Siswa TK</p>
      </div>

      <div class="bg-green-500 rounded-xl p-6 text-center">
        <p class="text-lg font-medium text-white mb-2">Diterima</p>
        <h3 class="text-5xl font-bold text-white mb-2">{{ dashboardData.diterima.sd }}</h3>
        <p class="text-lg font-medium text-white">Siswa SD</p>
      </div>

      <div class="bg-green-500 rounded-xl p-6 text-center">
        <p class="text-lg font-medium text-white mb-2">Diterima</p>
        <h3 class="text-5xl font-bold text-white mb-2">{{ dashboardData.diterima.smp }}</h3>
        <p class="text-lg font-medium text-white">Siswa SMP</p>
      </div>

      <div class="bg-green-500 rounded-xl p-6 text-center">
        <p class="text-lg font-medium text-white mb-2">Diterima</p>
        <h3 class="text-5xl font-bold text-white mb-2">{{ dashboardData.diterima.smk }}</h3>
        <p class="text-lg font-medium text-white">Siswa SMK</p>
      </div>

      <div class="bg-red-500 rounded-xl p-6 text-center">
        <p class="text-lg font-medium text-white mb-2">Ditolak</p>
        <h3 class="text-5xl font-bold text-white mb-2">{{ dashboardData.ditolak.tk }}</h3>
        <p class="text-lg font-medium text-white">Siswa TK</p>
      </div>

      <div class="bg-red-500 rounded-xl p-6 text-center">
        <p class="text-lg font-medium text-white mb-2">Ditolak</p>
        <h3 class="text-5xl font-bold text-white mb-2">{{ dashboardData.ditolak.sd }}</h3>
        <p class="text-lg font-medium text-white">Siswa SD</p>
      </div>

      <div class="bg-red-500 rounded-xl p-6 text-center">
        <p class="text-lg font-medium text-white mb-2">Ditolak</p>
        <h3 class="text-5xl font-bold text-white mb-2">{{ dashboardData.ditolak.smp }}</h3>
        <p class="text-lg font-medium text-white">Siswa SMP</p>
      </div>

      <div class="bg-red-500 rounded-xl p-6 text-center">
        <p class="text-lg font-medium text-white mb-2">Ditolak</p>
        <h3 class="text-5xl font-bold text-white mb-2">{{ dashboardData.ditolak.smk }}</h3>
        <p class="text-lg font-medium text-white">Siswa SMK</p>
      </div>
    </div>

    <div class="flex justify-center">
      <button
        @click="downloadData"
        class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-lg cursor-pointer"
      >
        Download Data
      </button>
    </div>
  </div>
</template>
