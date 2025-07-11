<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const API_ENDPOINTS = {
  GET_STATISTIK_DASHBOARD: `${API_BASE_URL}/admin/getStatikDashboard`,
  DOWNLOAD_SHEET: `${API_BASE_URL}/admin/downloadSheet`
}

const dashboardData = ref({
  totalPendaftar: 0,
  statistik: {}
})
const isLoading = ref(false)
const errorMsg = ref('')

// Utility untuk HTTP requests
const makeRequest = async (url, method = 'GET', body = null) => {
  const token = localStorage.getItem('adminToken')
  if (!token) {
    throw new Error('Token tidak ditemukan, silakan login kembali')
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

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `Gagal melakukan operasi ${method}`)
  }

  return response
}

// Fetch dashboard statistics
const fetchDashboardData = async () => {
  isLoading.value = true
  errorMsg.value = ''
  
  try {
    const response = await makeRequest(API_ENDPOINTS.GET_STATISTIK_DASHBOARD)
    const data = await response.json()
    
    if (data && data.payload && data.payload.data) {
      dashboardData.value = data.payload.data
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat mengambil data dashboard'
  } finally {
    isLoading.value = false
  }
}

// Download Excel sheet
const downloadData = async () => {
  try {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      throw new Error('Token tidak ditemukan, silakan login kembali')
    }
    
    const response = await fetch(API_ENDPOINTS.DOWNLOAD_SHEET, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      throw new Error(`Gagal mengunduh data: ${response.status}`)
    }
    
    const blob = await response.blob()
    
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `data-pendaftar-${new Date().toISOString().split('T')[0]}.xlsx`)
    
    document.body.appendChild(link)
    link.click()
    
    window.URL.revokeObjectURL(url)
    document.body.removeChild(link)
    
  } catch (error) {
    console.error('Error downloading data:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat mengunduh data'
  }
}

// Load data on component mount
onMounted(() => {
  fetchDashboardData()
})
</script>

<template>
  <div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-8">
      <h1 class="text-3xl font-bold text-white">Dashboard Admin</h1>
    </div>

    <!-- Error message -->
    <div v-if="errorMsg" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      <span>{{ errorMsg }}</span>
      <button @click="errorMsg = ''" class="float-right font-bold">&times;</button>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span class="ml-3 text-lg text-blue-500 font-medium">Memuat data dashboard...</span>
    </div>

    <template v-else>
      <div class="bg-blue-300 rounded-xl p-8 mb-8 text-center">
        <h2 class="text-6xl font-bold text-white mb-4">{{ dashboardData.totalPendaftar || 0 }}</h2>
        <p class="text-2xl font-medium text-white">Pendaftar</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <!-- TK -->
        <div class="bg-green-500 rounded-xl p-6 text-center">
          <p class="text-lg font-medium text-white mb-2">Diterima</p>
          <h3 class="text-5xl font-bold text-white mb-2">
            {{ dashboardData.statistik && dashboardData.statistik['1'] ? dashboardData.statistik['1'].diterima : 0 }}
          </h3>
          <p class="text-lg font-medium text-white">Siswa TK</p>
        </div>

        <!-- SD -->
        <div class="bg-green-500 rounded-xl p-6 text-center">
          <p class="text-lg font-medium text-white mb-2">Diterima</p>
          <h3 class="text-5xl font-bold text-white mb-2">
            {{ dashboardData.statistik && dashboardData.statistik['2'] ? dashboardData.statistik['2'].diterima : 0 }}
          </h3>
          <p class="text-lg font-medium text-white">Siswa SD</p>
        </div>

        <!-- SMP -->
        <div class="bg-green-500 rounded-xl p-6 text-center">
          <p class="text-lg font-medium text-white mb-2">Diterima</p>
          <h3 class="text-5xl font-bold text-white mb-2">
            {{ dashboardData.statistik && dashboardData.statistik['3'] ? dashboardData.statistik['3'].diterima : 0 }}
          </h3>
          <p class="text-lg font-medium text-white">Siswa SMP</p>
        </div>

        <!-- SMA/SMK -->
        <div class="bg-green-500 rounded-xl p-6 text-center">
          <p class="text-lg font-medium text-white mb-2">Diterima</p>
          <h3 class="text-5xl font-bold text-white mb-2">
            {{ dashboardData.statistik && dashboardData.statistik['4'] ? dashboardData.statistik['4'].diterima : 0 }}
          </h3>
          <p class="text-lg font-medium text-white">Siswa SMA/SMK</p>
        </div>

        <!-- TK Ditolak -->
        <div class="bg-red-500 rounded-xl p-6 text-center">
          <p class="text-lg font-medium text-white mb-2">Ditolak</p>
          <h3 class="text-5xl font-bold text-white mb-2">
            {{ dashboardData.statistik && dashboardData.statistik['1'] ? dashboardData.statistik['1'].ditolak : 0 }}
          </h3>
          <p class="text-lg font-medium text-white">Siswa TK</p>
        </div>

        <!-- SD Ditolak -->
        <div class="bg-red-500 rounded-xl p-6 text-center">
          <p class="text-lg font-medium text-white mb-2">Ditolak</p>
          <h3 class="text-5xl font-bold text-white mb-2">
            {{ dashboardData.statistik && dashboardData.statistik['2'] ? dashboardData.statistik['2'].ditolak : 0 }}
          </h3>
          <p class="text-lg font-medium text-white">Siswa SD</p>
        </div>

        <!-- SMP Ditolak -->
        <div class="bg-red-500 rounded-xl p-6 text-center">
          <p class="text-lg font-medium text-white mb-2">Ditolak</p>
          <h3 class="text-5xl font-bold text-white mb-2">
            {{ dashboardData.statistik && dashboardData.statistik['3'] ? dashboardData.statistik['3'].ditolak : 0 }}
          </h3>
          <p class="text-lg font-medium text-white">Siswa SMP</p>
        </div>

        <!-- SMA/SMK Ditolak -->
        <div class="bg-red-500 rounded-xl p-6 text-center">
          <p class="text-lg font-medium text-white mb-2">Ditolak</p>
          <h3 class="text-5xl font-bold text-white mb-2">
            {{ dashboardData.statistik && dashboardData.statistik['4'] ? dashboardData.statistik['4'].ditolak : 0 }}
          </h3>
          <p class="text-lg font-medium text-white">Siswa SMA/SMK</p>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="downloadData"
          class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-lg cursor-pointer flex items-center"
        >
          <Icon icon="mdi:file-download" class="mr-2" width="24" height="24" />
          Download Data Excel
        </button>
      </div>
    </template>
  </div>
</template>
