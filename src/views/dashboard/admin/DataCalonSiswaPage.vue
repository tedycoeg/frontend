<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const API_ENDPOINTS = {
  GET_ALL_CALON_SISWA: `${API_BASE_URL}/admin/getAllCalonSiswa`,
  DETAIL_CALON_SISWA: `${API_BASE_URL}/admin/detailCalonSiswa`,
  DOKUMEN: `${API_BASE_URL}/admin/dokumen`,
  VERIFIKASI: `${API_BASE_URL}/admin/verifikasi`
}

const JENJANG_LABELS = {
  1: 'TK',
  2: 'SD',
  3: 'SMP',
  4: 'SMA'
}

const STATUS_LABELS = {
  1: 'Pending',
  2: 'Diterima',
  3: 'Ditolak'
}

const JALUR_PENDAFTARAN_LABELS = {
  1: 'Reguler',
  2: 'Khusus Anak Yatim'
}

// State variables
const calonSiswaList = ref([])
const filterJenjang = ref('semua')
const filterStatus = ref('semua')
const filterJenisPendaftaran = ref('semua')
const searchQuery = ref('')
const selectedSiswa = ref(null)
const isDetailOpen = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')

// Filter options
const jenjangOptions = [
  { value: 1, label: 'TK' },
  { value: 2, label: 'SD' },
  { value: 3, label: 'SMP' },
  { value: 4, label: 'SMA' }
]

const statusOptions = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Diterima' },
  { value: 3, label: 'Ditolak' }
]

const jenisPendaftaranOptions = [
  { value: 1, label: 'Reguler' },
  { value: 2, label: 'Khusus Anak Yatim' }
]

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

// Fetch all calon siswa with filters
const fetchCalonSiswa = async () => {
  isLoading.value = true
  errorMsg.value = ''
  
  try {
    const queryParams = new URLSearchParams()
    
    if (searchQuery.value) {
      queryParams.append('nik', searchQuery.value)
    }
    
    if (filterJenjang.value !== 'semua') {
      queryParams.append('jenjang', filterJenjang.value)
    }
    
    if (filterStatus.value !== 'semua') {
      queryParams.append('status', filterStatus.value)
    }
    
    if (filterJenisPendaftaran.value !== 'semua') {
      queryParams.append('jalur_pendaftaran', filterJenisPendaftaran.value)
    }
    
    const url = `${API_ENDPOINTS.GET_ALL_CALON_SISWA}?${queryParams.toString()}`
    
    const response = await makeRequest(url)
    const data = await response.json()
    
    if (data && data.payload && Array.isArray(data.payload.data)) {
      calonSiswaList.value = data.payload.data
    } else {
      calonSiswaList.value = []
    }
  } catch (error) {
    console.error('Error fetching calon siswa:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat mengambil data calon siswa'
  } finally {
    isLoading.value = false
  }
}

// Fetch detail calon siswa by ID
const fetchDetailSiswa = async (idSiswa) => {
  isLoading.value = true
  errorMsg.value = ''
  
  try {
    const response = await makeRequest(`${API_ENDPOINTS.DETAIL_CALON_SISWA}/${idSiswa}`)
    const data = await response.json()
    
    if (data && data.payload && data.payload.data) {
      return data.payload.data
    }
    
    throw new Error('Data detail siswa tidak ditemukan')
  } catch (error) {
    console.error('Error fetching siswa detail:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat mengambil detail siswa'
    return null
  } finally {
    isLoading.value = false
  }
}

// View detail siswa
const viewDetail = async (siswa) => {
  const detailData = await fetchDetailSiswa(siswa.id_siswa)
  
  if (detailData) {
    selectedSiswa.value = detailData
    isDetailOpen.value = true
  }
}

// Close detail modal
const closeDetail = () => {
  isDetailOpen.value = false
  selectedSiswa.value = null
}

// Update status (terima/tolak)
const updateStatus = async (idDaftar, newStatus) => {
  isLoading.value = true
  errorMsg.value = ''
  
  try {
    await makeRequest(
      `${API_ENDPOINTS.VERIFIKASI}/${idDaftar}`,
      'PUT',
      { status: newStatus }
    )
    
    await fetchCalonSiswa()
    
    return true
  } catch (error) {
    console.error('Error updating status:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat memperbarui status'
    return false
  } finally {
    isLoading.value = false
  }
}

// Download document
const downloadDocument = async (idSiswa) => {
  try {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      throw new Error('Token tidak ditemukan, silakan login kembali')
    }
    
    const response = await fetch(`${API_ENDPOINTS.DOKUMEN}/${idSiswa}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      throw new Error(`Gagal mengunduh dokumen: ${response.status}`)
    }
    
    const blob = await response.blob()
    
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `dokumen-${idSiswa}.pdf`)
    
    document.body.appendChild(link)
    link.click()
    
    window.URL.revokeObjectURL(url)
    document.body.removeChild(link)
    
  } catch (error) {
    console.error('Error downloading document:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat mengunduh dokumen'
  }
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '-'
  
  try {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

// Load data on component mount
onMounted(() => {
  fetchCalonSiswa()
})
</script>

<template>
  <div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-8">
      <h1 class="text-3xl font-bold text-white">Data Calon Siswa</h1>
    </div>

    <!-- Error message -->
    <div v-if="errorMsg" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      <span>{{ errorMsg }}</span>
      <button @click="errorMsg = ''" class="float-right font-bold">&times;</button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label class="block text-gray-700 mb-2">Cari (NIK)</label>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari NIK siswa..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Filter Jenjang</label>
          <select
            v-model="filterJenjang"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="semua">Semua Jenjang</option>
            <option value="1">TK</option>
            <option value="2">SD</option>
            <option value="3">SMP</option>
            <option value="4">SMA</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Filter Status</label>
          <select
            v-model="filterStatus"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="semua">Semua Status</option>
            <option value="1">Pending</option>
            <option value="2">Diterima</option>
            <option value="3">Ditolak</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Jenis Pendaftaran</label>
          <select
            v-model="filterJenisPendaftaran"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="semua">Semua Jenis</option>
            <option value="1">Reguler</option>
            <option value="2">Khusus Anak Yatim</option>
          </select>
        </div>
      </div>
      
      <div class="mt-6 flex justify-end">
        <button
          @click="fetchCalonSiswa"
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center"
          :disabled="isLoading"
        >
          <Icon v-if="!isLoading" icon="mdi:filter" class="mr-2" width="20" height="20" />
          <span v-if="isLoading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memuat...
          </span>
          <span v-else>Terapkan Filter</span>
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8 overflow-x-auto">
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span class="ml-3 text-lg text-blue-500 font-medium">Memuat data siswa...</span>
      </div>
      
      <table v-else class="w-full">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-3 px-4 text-left">No</th>
            <th class="py-3 px-4 text-left">NIK</th>
            <th class="py-3 px-4 text-left">Nama</th>
            <th class="py-3 px-4 text-left">Pendaftaran</th>
            <th class="py-3 px-4 text-left">Jenjang</th>
            <th class="py-3 px-4 text-left">Tanggal Daftar</th>
            <th class="py-3 px-4 text-left">Status</th>
            <th class="py-3 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(siswa, index) in calonSiswaList"
            :key="siswa.id_siswa"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="py-3 px-4">{{ siswa.no || index + 1 }}</td>
            <td class="py-3 px-4">{{ siswa.nik }}</td>
            <td class="py-3 px-4">{{ siswa.nama }}</td>
            <td class="py-3 px-4">{{ JALUR_PENDAFTARAN_LABELS[siswa.jalur_pendaftaran] }}</td>
            <td class="py-3 px-4">{{ JENJANG_LABELS[siswa.jenjang] }}</td>
            <td class="py-3 px-4">
              {{ formatDate(siswa.tanggal_daftar) }}
            </td>
            <td class="py-3 px-4">
              <span
                :class="{
                  'px-2 py-1 rounded-full text-xs font-medium': true,
                  'bg-yellow-100 text-yellow-800': siswa.status === 1,
                  'bg-green-100 text-green-800': siswa.status === 2,
                  'bg-red-100 text-red-800': siswa.status === 3,
                }"
              >
                {{ STATUS_LABELS[siswa.status] }}
              </span>
            </td>
            <td class="py-3 px-4">
              <div class="flex space-x-2">
                <button
                  @click="viewDetail(siswa)"
                  class="bg-blue-300 hover:bg-blue-400 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Detail
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="calonSiswaList.length === 0">
            <td colspan="8" class="py-8 text-center text-gray-500">
              Tidak ada data yang sesuai dengan filter
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="isDetailOpen && selectedSiswa"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-primary">Detail Calon Siswa</h2>
          <button @click="closeDetail" class="text-gray-500 hover:text-gray-700 cursor-pointer">
            <Icon icon="mdi:close" width="24" height="24" />
          </button>
        </div>

        <div class="space-y-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Jenjang Pendidikan</h3>
            <p class="font-medium">{{ JENJANG_LABELS[selectedSiswa.jenjang_pendidikan] }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Jenis Kelamin</h3>
            <p class="font-medium">{{ selectedSiswa.jenis_kelamin }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Data Pribadi Siswa</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="text-gray-500">NIK</h4>
                <p class="font-medium">{{ selectedSiswa.nik }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">NISN</h4>
                <p class="font-medium">{{ selectedSiswa.nisn || '-' }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Nama Lengkap</h4>
                <p class="font-medium">{{ selectedSiswa.nama_lengkap }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tempat Lahir</h4>
                <p class="font-medium">{{ selectedSiswa.tempat_lahir }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tanggal Lahir</h4>
                <p class="font-medium">{{ formatDate(selectedSiswa.tanggal_lahir) }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Agama</h4>
                <p class="font-medium">{{ selectedSiswa.agama }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Kewarganegaraan</h4>
                <p class="font-medium">{{ selectedSiswa.kewarganegaraan }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Jenis Pendaftaran</h4>
                <p class="font-medium">{{ JALUR_PENDAFTARAN_LABELS[selectedSiswa.jalur_pendaftaran] }}</p>
              </div>
              <div class="md:col-span-2">
                <h4 class="text-gray-500">Alamat Lengkap</h4>
                <p class="font-medium">{{ selectedSiswa.alamat_lengkap }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Kode Pos</h4>
                <p class="font-medium">{{ selectedSiswa.kodepos }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tinggal Bersama</h4>
                <p class="font-medium">{{ selectedSiswa.tinggal_bersama }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Kontak Darurat</h4>
                <p class="font-medium">{{ selectedSiswa.kontak_darurat }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Asal Sekolah</h4>
                <p class="font-medium">{{ selectedSiswa.asal_sekolah || '-' }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg" v-if="selectedSiswa.orangtua">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Data Orang Tua</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="text-gray-500">Nama Ayah</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.nama_ayah }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tempat Lahir Ayah</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.tempat_lahir_ayah }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tanggal Lahir Ayah</h4>
                <p class="font-medium">{{ formatDate(selectedSiswa.orangtua.tanggal_lahir_ayah) }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Pendidikan Terakhir Ayah</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.pendidikan_terakhir_ayah }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Pekerjaan Ayah</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.pekerjaan_ayah }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Nama Ibu</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.nama_ibu }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tempat Lahir Ibu</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.tempat_lahir_ibu }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tanggal Lahir Ibu</h4>
                <p class="font-medium">{{ formatDate(selectedSiswa.orangtua.tanggal_lahir_ibu) }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Pendidikan Terakhir Ibu</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.pendidikan_terakhir_ibu }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Pekerjaan Ibu</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.pekerjaan_ibu }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Nama Wali (Jika ada)</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.nama_wali || '-' }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Nomor HP/WA Aktif</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.nohp_hpwa_aktif }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Email Aktif</h4>
                <p class="font-medium">{{ selectedSiswa.orangtua.email_aktif }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg" v-if="selectedSiswa.pendaftaran">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Status Pendaftaran</h3>
            <div class="flex items-center">
              <span
                :class="{
                  'px-3 py-1 rounded-full text-sm font-medium': true,
                  'bg-yellow-100 text-yellow-800': selectedSiswa.pendaftaran.status === 1,
                  'bg-green-100 text-green-800': selectedSiswa.pendaftaran.status === 2,
                  'bg-red-100 text-red-800': selectedSiswa.pendaftaran.status === 3,
                }"
              >
                {{ STATUS_LABELS[selectedSiswa.pendaftaran.status] }}
              </span>
              <p class="ml-3 text-gray-500">
                Tanggal Pendaftaran:
                {{ formatDate(selectedSiswa.pendaftaran.tanggal_daftar) }}
              </p>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Dokumen Pendaftaran</h3>
            <div class="flex justify-start">
              <button
                @click="downloadDocument(selectedSiswa.id_siswa)"
                class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center cursor-pointer"
              >
                <Icon icon="mdi:file-download" class="mr-2" width="20" height="20" />
                Download Berkas PDF
              </button>
            </div>
          </div>

          <div v-if="selectedSiswa.pendaftaran" class="pt-6 flex justify-center space-x-4">
            <button
              v-if="selectedSiswa.pendaftaran.status === 1"
              @click="
                async () => {
                  const success = await updateStatus(selectedSiswa.pendaftaran.id_daftar, 2)
                  if (success) closeDetail()
                }
              "
              class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 cursor-pointer"
            >
              Terima Pendaftaran
            </button>
            <button
              v-if="selectedSiswa.pendaftaran.status === 1"
              @click="
                async () => {
                  const success = await updateStatus(selectedSiswa.pendaftaran.id_daftar, 3)
                  if (success) closeDetail()
                }
              "
              class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 cursor-pointer"
            >
              Tolak Pendaftaran
            </button>
            <button
              v-if="selectedSiswa.pendaftaran.status !== 1"
              @click="
                async () => {
                  const success = await updateStatus(selectedSiswa.pendaftaran.id_daftar, 1)
                  if (success) closeDetail()
                }
              "
              class="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 cursor-pointer"
            >
              Reset ke Pending
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
