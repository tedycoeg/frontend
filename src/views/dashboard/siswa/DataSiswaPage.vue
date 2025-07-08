<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Icon } from '@iconify/vue'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const API_ENDPOINTS = {
  BIODATA: `${API_BASE_URL}/siswa/biodata`,
  ORANGTUA: `${API_BASE_URL}/siswa/orangtua`
}

// Constants for mapping values
const JENJANG_PENDIDIKAN_TO_ID = {
  'TK': 1,
  'SD': 2,
  'SMP': 3,
  'SMK': 4
}

const JENJANG_PENDIDIKAN_FROM_ID = {
  1: 'TK',
  2: 'SD',
  3: 'SMP',
  4: 'SMK'
}

const JALUR_PENDAFTARAN_TO_ID = {
  'regular': 1,
  'khusus_anak_yatim': 2
}

const JALUR_PENDAFTARAN_FROM_ID = {
  1: 'regular',
  2: 'khusus_anak_yatim'
}

const authStore = useAuthStore()

// UI State
const isSaving = ref(false)
const isSavingParent = ref(false)
const errorMsg = ref('')
const showSuccessMsg = ref(false)
const successMsg = ref('')

// Success popup state
const showSuccessPopup = ref(false)
const successPopupMsg = ref('')

// Form State
const isFormFilled = ref(false)
const isParentFormFilled = ref(false)

// State untuk data siswa
const profile = ref({
  educationLevel: '',
  gender: '',
  nik: '',
  nisn: '', 
  fullName: authStore.currentUser?.name || '',
  birthPlace: '',
  birthDate: '',
  religion: '',
  citizenship: '',
  fullAddress: '',
  postalCode: '',
  livingWith: '',
  emergencyContact: '',
  previousSchool: '',
  registrationType: 'regular',
  activeEmail: authStore.currentUser?.email || '',
})

// State untuk data orang tua
const parentProfile = ref({
  nama_ayah: '',
  pekerjaan_ayah: '',
  pendidikan_terakhir_ayah: '',
  tempat_lahir_ayah: '',
  tanggal_lahir_ayah: '',
  nama_ibu: '',
  pekerjaan_ibu: '',
  pendidikan_terakhir_ibu: '',
  tempat_lahir_ibu: '',
  tanggal_lahir_ibu: '',
  nama_wali: '',
  nohp_hpwa_aktif: '',
  email_aktif: '',
})

// Computed properties
const showNisnField = computed(() => {
  return profile.value.educationLevel === 'SMP' || profile.value.educationLevel === 'SMK'
})

const makeApiRequest = async (url, method = 'GET', body = null) => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('Token tidak ditemukan, silakan login kembali')
  }

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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

const showSuccess = (message) => {
  successMsg.value = message
  showSuccessMsg.value = true
  setTimeout(() => {
    showSuccessMsg.value = false
  }, 3000)
}

// Menampilkan popup sukses
const showSuccessPopupMessage = (message) => {
  successPopupMsg.value = message
  showSuccessPopup.value = true
  setTimeout(() => {
    showSuccessPopup.value = false
  }, 5000)
}

// Menutup popup sukses
const closeSuccessPopup = () => {
  showSuccessPopup.value = false
}

const mapProfileToApiBody = () => {
  return {
    jenjang_pendidikan: JENJANG_PENDIDIKAN_TO_ID[profile.value.educationLevel] || '',
    nama_lengkap: profile.value.fullName,
    nik: profile.value.nik,
    nisn: profile.value.nisn || '',
    tempat_lahir: profile.value.birthPlace,
    tanggal_lahir: profile.value.birthDate || '',
    jenis_kelamin: profile.value.gender,
    agama: profile.value.religion,
    kewarganegaraan: profile.value.citizenship,
    alamat_lengkap: profile.value.fullAddress,
    kodepos: profile.value.postalCode,
    tinggal_bersama: profile.value.livingWith,
    kontak_darurat: profile.value.emergencyContact,
    jalur_pendaftaran: JALUR_PENDAFTARAN_TO_ID[profile.value.registrationType] || 1,
    asal_sekolah: profile.value.previousSchool
  }
}

const mapApiDataToProfile = (data) => {
  return {
    educationLevel: JENJANG_PENDIDIKAN_FROM_ID[data.jenjang_pendidikan] || '',
    gender: data.jenis_kelamin || '',
    nik: data.nik || '',
    nisn: data.nisn || '',
    fullName: data.nama_lengkap || authStore.currentUser?.name || '',
    birthPlace: data.tempat_lahir || '',
    birthDate: data.tanggal_lahir || '',
    religion: data.agama || '',
    citizenship: data.kewarganegaraan || '',
    fullAddress: data.alamat_lengkap || '',
    postalCode: data.kodepos || '',
    livingWith: data.tinggal_bersama || '',
    emergencyContact: data.kontak_darurat || '',
    previousSchool: data.asal_sekolah || '',
    registrationType: JALUR_PENDAFTARAN_FROM_ID[data.jalur_pendaftaran] || 'regular',
    activeEmail: data.email || authStore.currentUser?.email || '',
  }
}

const saveProfile = async () => {
  // Don't proceed if form is already filled
  if (isFormFilled.value) {
    showSuccess('Data sudah terisi dan tidak dapat diubah')
    return
  }

  isSaving.value = true
  errorMsg.value = ''

  try {
    const body = mapProfileToApiBody()
    await makeApiRequest(API_ENDPOINTS.BIODATA, 'POST', body)
    
    // Tampilkan popup sukses
    showSuccessPopupMessage('Data siswa berhasil disimpan')
    
    // Refresh data dan set form sebagai sudah terisi
    await fetchStudentBiodata()
    
  } catch (error) {
    console.error('Error saving profile:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat menyimpan data'
  } finally {
    isSaving.value = false
  }
}

const saveParentProfile = async () => {
  // Don't proceed if form is already filled
  if (isParentFormFilled.value) {
    showSuccess('Data orang tua sudah terisi dan tidak dapat diubah')
    return
  }

  isSavingParent.value = true
  errorMsg.value = ''
  
  try {
    await makeApiRequest(API_ENDPOINTS.ORANGTUA, 'POST', parentProfile.value)
    
    // Tampilkan popup sukses
    showSuccessPopupMessage('Data orang tua berhasil disimpan')
    
    // Refresh data dan set form sebagai sudah terisi
    await fetchParentData()
    
  } catch (error) {
    console.error('Error saving parent profile:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat menyimpan data orang tua'
  } finally {
    isSavingParent.value = false
  }
}

const fetchExistingData = async () => {
  try {
    // Fetch student biodata
    await fetchStudentBiodata()
    
    // Fetch parent data
    await fetchParentData()
  } catch (error) {
    console.error('Error fetching existing data:', error)
  }
}

const fetchStudentBiodata = async () => {
  try {
    const profileResponse = await makeApiRequest(API_ENDPOINTS.BIODATA)
    const profileData = await profileResponse.json()
    
    if (!profileData.payload?.data) return
    
    // Check if form is already filled
    if (profileData.payload.data.isFilled) {
      isFormFilled.value = true
      // Get data from nested structure
      const biodata = profileData.payload.data.data || {}
      profile.value = mapApiDataToProfile(biodata)
    } else {
      // Use regular structure
      profile.value = mapApiDataToProfile(profileData.payload.data)
    }
  } catch (error) {
    console.error('Error fetching student biodata:', error)
  }
}

const fetchParentData = async () => {
  try {
    const parentResponse = await makeApiRequest(API_ENDPOINTS.ORANGTUA)
    const parentData = await parentResponse.json()
    
    if (!parentData.payload?.data) return
    
    // Check if parent form is already filled
    if (parentData.payload.data.isFilled) {
      isParentFormFilled.value = true
      parentProfile.value = parentData.payload.data.data || {}
    } else {
      parentProfile.value = parentData.payload.data || {}
    }
  } catch (error) {
    console.error('Error fetching parent data:', error)
  }
}

// Load data when component is mounted
onMounted(fetchExistingData)
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
      {{ isFormFilled ? 'Data Calon Siswa' : 'Form Pengisian Data Calon Siswa' }}
    </h1>

    <!-- Error message -->
    <div v-if="errorMsg" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      <span>{{ errorMsg }}</span>
      <button @click="errorMsg = ''" class="float-right font-bold">&times;</button>
    </div>

    <!-- Success message -->
    <div v-if="showSuccessMsg" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
      <span>{{ successMsg }}</span>
      <button @click="showSuccessMsg = false" class="float-right font-bold">&times;</button>
    </div>

    <!-- Notifikasi data sudah terisi -->
    <div v-if="isFormFilled" class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg mb-4">
      <span>Data siswa sudah terisi dan tidak dapat diubah. Silakan lanjutkan ke tahap berikutnya.</span>
    </div>

    <form @submit.prevent="saveProfile" class="space-y-8">
      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Jenjang Pendidikan</h2>
        <div class="flex flex-wrap gap-4">
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 
              'bg-blue-100 border-blue-300': profile.educationLevel === 'TK',
              'cursor-not-allowed': isFormFilled 
            }"
          >
            <input
              type="radio"
              v-model="profile.educationLevel"
              value="TK"
              class="mr-2 accent-blue-600"
              :disabled="isFormFilled"
            />
            <span class="font-medium">TK</span>
          </label>
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 
              'bg-blue-100 border-blue-300': profile.educationLevel === 'SD',
              'cursor-not-allowed': isFormFilled 
            }"
          >
            <input
              type="radio"
              v-model="profile.educationLevel"
              value="SD"
              class="mr-2 accent-blue-600"
              :disabled="isFormFilled"
            />
            <span class="font-medium">SD</span>
          </label>
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 
              'bg-blue-100 border-blue-300': profile.educationLevel === 'SMP',
              'cursor-not-allowed': isFormFilled 
            }"
          >
            <input
              type="radio"
              v-model="profile.educationLevel"
              value="SMP"
              class="mr-2 accent-blue-600"
              :disabled="isFormFilled"
            />
            <span class="font-medium">SMP</span>
          </label>
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 
              'bg-blue-100 border-blue-300': profile.educationLevel === 'SMK',
              'cursor-not-allowed': isFormFilled 
            }"
          >
            <input
              type="radio"
              v-model="profile.educationLevel"
              value="SMK"
              class="mr-2 accent-blue-600"
              :disabled="isFormFilled"
            />
            <span class="font-medium">SMK</span>
          </label>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Jenis Kelamin</h2>
        <div class="flex flex-wrap gap-4">
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 
              'bg-blue-100 border-blue-300': profile.gender === 'Laki-laki',
              'cursor-not-allowed': isFormFilled 
            }"
          >
            <input
              type="radio"
              v-model="profile.gender"
              value="Laki-laki"
              class="mr-2 accent-blue-600"
              :disabled="isFormFilled"
            />
            <span class="font-medium">Laki-laki</span>
          </label>
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 
              'bg-blue-100 border-blue-300': profile.gender === 'Perempuan',
              'cursor-not-allowed': isFormFilled 
            }"
          >
            <input
              type="radio"
              v-model="profile.gender"
              value="Perempuan"
              class="mr-2 accent-blue-600"
              :disabled="isFormFilled"
            />
            <span class="font-medium">Perempuan</span>
          </label>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Biodata Calon Siswa</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm text-gray-600">NIK</label>
            <input
              type="text"
              v-model="profile.nik"
              placeholder="Nomor Induk Kependudukan"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            />
          </div>

          <div v-if="showNisnField" class="space-y-1">
            <label class="text-sm text-gray-600">NISN (jika ada)</label>
            <input
              type="text"
              v-model="profile.nisn"
              placeholder="Nomor Induk Siswa Nasional"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Lengkap</label>
            <input
              type="text"
              v-model="profile.fullName"
              placeholder="Nama Lengkap Siswa"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Jalur Pendaftaran</label>
            <select
              v-model="profile.registrationType"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            >
              <option value="regular">Regular</option>
              <option value="khusus_anak_yatim">Khusus Anak Yatim</option>
            </select>
          </div>

          <!-- Tambahkan disabled dan class untuk semua input lainnya -->
          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tempat Lahir</label>
            <input
              type="text"
              v-model="profile.birthPlace"
              placeholder="Tempat Lahir"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tanggal Lahir</label>
            <input
              type="date"
              v-model="profile.birthDate"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            />
          </div>

          <!-- Lanjutkan untuk semua field lainnya -->
          <div class="space-y-1">
            <label class="text-sm text-gray-600">Agama</label>
            <select
              v-model="profile.religion"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            >
              <option value="" disabled selected>Pilih agama</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katolik">Katolik</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddha">Buddha</option>
              <option value="Konghucu">Konghucu</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Kewarganegaraan</label>
            <input
              type="text"
              v-model="profile.citizenship"
              placeholder="Contoh: Indonesia"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            />
          </div>

          <div class="md:col-span-2 space-y-1">
            <label class="text-sm text-gray-600">Alamat Lengkap</label>
            <textarea
              v-model="profile.fullAddress"
              placeholder="Alamat lengkap tempat tinggal"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            ></textarea>
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Kode Pos</label>
            <input
              type="text"
              v-model="profile.postalCode"
              placeholder="Kode pos"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tinggal Bersama</label>
            <select
              v-model="profile.livingWith"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            >
              <option value="" disabled selected>Pilih</option>
              <option value="Orang Tua">Orang Tua</option>
              <option value="Wali">Wali</option>
              <option value="Asrama">Asrama</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Kontak Darurat</label>
            <input
              type="tel"
              v-model="profile.emergencyContact"
              placeholder="Nomor telepon darurat"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Asal Sekolah (jika ada)</label>
            <input
              type="text"
              v-model="profile.previousSchool"
              placeholder="Nama sekolah sebelumnya"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              :disabled="isFormFilled"
              :class="{ 'bg-gray-100': isFormFilled }"
            />
          </div>
        </div>
      </div>

      <div class="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <div class="flex items-start">
          <div class="flex-shrink-0 pt-0.5">
            <Icon icon="healthicons:info-24px" width="20" height="20" class="text-yellow-500" />
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              Perhatian: Periksa kembali semua informasi sebelum menekan tombol "Simpan"
            </p>
            <p class="text-sm text-yellow-700 mt-1">
              Data yang lengkap dan akurat akan mempercepat proses pendaftaran!
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors duration-300 flex items-center"
          :disabled="isFormFilled || isSaving"
          :class="{ 'opacity-50 cursor-not-allowed': isFormFilled || isSaving }"
        >
          <Icon v-if="isSaving" icon="eos-icons:loading" class="mr-2" />
          <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Data' }}</span>
        </button>
      </div>
    </form>

    <!-- Form data orang tua -->
    <form @submit.prevent="saveParentProfile" class="space-y-8 mt-12">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        {{ isParentFormFilled ? 'Data Orang Tua' : 'Form Pengisian Data Orang Tua' }}
      </h1>

      <!-- Notifikasi data orang tua sudah terisi -->
      <div v-if="isParentFormFilled" class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg mb-4">
        <span>Data orang tua sudah terisi dan tidak dapat diubah. Silakan lanjutkan ke tahap berikutnya.</span>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Data Ayah</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Lengkap Ayah</label>
            <input
              type="text"
              v-model="parentProfile.nama_ayah"
              placeholder="Nama Lengkap Ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Pekerjaan Ayah</label>
            <input
              type="text"
              v-model="parentProfile.pekerjaan_ayah"
              placeholder="Pekerjaan Ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Pendidikan Terakhir Ayah</label>
            <select
              v-model="parentProfile.pendidikan_terakhir_ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            >
              <option value="" disabled selected>Pilih pendidikan</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA/SMK">SMA/SMK</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tempat Lahir Ayah</label>
            <input
              type="text"
              v-model="parentProfile.tempat_lahir_ayah"
              placeholder="Tempat Lahir Ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tanggal Lahir Ayah</label>
            <input
              type="date"
              v-model="parentProfile.tanggal_lahir_ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Data Ibu</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Lengkap Ibu</label>
            <input
              type="text"
              v-model="parentProfile.nama_ibu"
              placeholder="Nama Lengkap Ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Pekerjaan Ibu</label>
            <input
              type="text"
              v-model="parentProfile.pekerjaan_ibu"
              placeholder="Pekerjaan Ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Pendidikan Terakhir Ibu</label>
            <select
              v-model="parentProfile.pendidikan_terakhir_ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            >
              <option value="" disabled selected>Pilih pendidikan</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
              <option value="SMA/SMK">SMA/SMK</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tempat Lahir Ibu</label>
            <input
              type="text"
              v-model="parentProfile.tempat_lahir_ibu"
              placeholder="Tempat Lahir Ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tanggal Lahir Ibu</label>
            <input
              type="date"
              v-model="parentProfile.tanggal_lahir_ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Data Wali & Kontak</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Wali (Opsional)</label>
            <input
              type="text"
              v-model="parentProfile.nama_wali"
              placeholder="Nama Wali jika ada"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">No. HP/WA Aktif</label>
            <input
              type="text"
              v-model="parentProfile.nohp_hpwa_aktif"
              placeholder="Nomor HP/WA yang aktif"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Email Aktif</label>
            <input
              type="email"
              v-model="parentProfile.email_aktif"
              placeholder="Email aktif"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
              :disabled="isParentFormFilled"
              :class="{ 'bg-gray-100': isParentFormFilled }"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors duration-300 flex items-center"
          :disabled="isParentFormFilled || isSavingParent"
          :class="{ 'opacity-50 cursor-not-allowed': isParentFormFilled || isSavingParent }"
        >
          <Icon v-if="isSavingParent" icon="eos-icons:loading" class="mr-2" />
          <span>{{ isSavingParent ? 'Menyimpan...' : 'Simpan Data Orang Tua' }}</span>
        </button>
      </div>
    </form>

    <!-- Success Popup -->
    <div 
      v-if="showSuccessPopup" 
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity"
    >
      <div class="bg-white rounded-lg max-w-md mx-auto p-6 shadow-2xl transform transition-all">
        <div class="flex items-start justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-100 rounded-full p-2">
              <Icon icon="mdi:check-circle" width="24" height="24" class="text-green-600" />
            </div>
            <h3 class="ml-3 text-lg font-medium text-gray-900">Berhasil</h3>
          </div>
          <button 
            @click="closeSuccessPopup" 
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <Icon icon="mdi:close" width="24" height="24" />
          </button>
        </div>
        <div class="mt-3">
          <p class="text-sm text-gray-700">{{ successPopupMsg }}</p>
        </div>
        <div class="mt-5 flex justify-end">
          <button
            type="button"
            @click="closeSuccessPopup"
            class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
