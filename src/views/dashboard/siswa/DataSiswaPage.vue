<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Icon } from '@iconify/vue'

const authStore = useAuthStore()
const isSaving = ref(false)
const isSavingParent = ref(false)
const errorMsg = ref('')
const showSuccessMsg = ref(false)
const successMsg = ref('')

// State untuk data siswa
const profile = ref({
  educationLevel: '',
  gender: '',
  nik: '',
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
  registrationType: '',
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

// Utility untuk HTTP requests
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

// Fungsi untuk menampilkan pesan sukses sementara
const showSuccess = (message) => {
  successMsg.value = message
  showSuccessMsg.value = true
  setTimeout(() => {
    showSuccessMsg.value = false
  }, 3000)
}

// Fungsi untuk memetakan data siswa ke format API
const mapProfileToApiBody = () => {
  return {
    jenjang_pendidikan: profile.value.educationLevel,
    nama_lengkap: profile.value.fullName,
    nik: profile.value.nik,
    tempat_lahir: profile.value.birthPlace,
    tanggal_lahir: profile.value.birthDate || '',
    jenis_kelamin: profile.value.gender,
    agama: profile.value.religion,
    kewarganegaraan: profile.value.citizenship,
    alamat_lengkap: profile.value.fullAddress,
    kodepos: profile.value.postalCode,
    tinggal_bersama: profile.value.livingWith,
    kontak_darurat: profile.value.emergencyContact,
    jalur_pendaftaran: profile.value.registrationType || '',
    asal_sekolah: profile.value.previousSchool
  }
}

// Fungsi untuk menyimpan data siswa
const saveProfile = async () => {
  isSaving.value = true
  errorMsg.value = ''

  try {
    const body = mapProfileToApiBody()
    await makeApiRequest('https://api.al-farabi.id/siswa/biodata', 'POST', body)
    
    showSuccess('Data berhasil disimpan')
  } catch (error) {
    console.error('Error saving profile:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat menyimpan data'
  } finally {
    isSaving.value = false
  }
}

// Fungsi untuk menyimpan data orang tua
const saveParentProfile = async () => {
  isSavingParent.value = true
  errorMsg.value = ''
  
  try {
    await makeApiRequest('https://api.al-farabi.id/siswa/orangtua', 'POST', parentProfile.value)
    
    showSuccess('Data orang tua berhasil disimpan')
  } catch (error) {
    console.error('Error saving parent profile:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat menyimpan data orang tua'
  } finally {
    isSavingParent.value = false
  }
}

// Fungsi untuk mendapatkan data siswa dan orang tua yang telah tersimpan
const fetchExistingData = async () => {
  try {
    // Fetch profile data
    const profileResponse = await makeApiRequest('https://api.al-farabi.id/siswa/biodata')
    const profileData = await profileResponse.json()
    
    if (profileData.payload && profileData.payload.data) {
      // Map API data to form fields
      const data = profileData.payload.data
      profile.value = {
        educationLevel: data.jenjang_pendidikan || '',
        gender: data.jenis_kelamin || '',
        nik: data.nik || '',
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
        registrationType: data.jalur_pendaftaran || '',
        activeEmail: data.email || authStore.currentUser?.email || '',
      }
    }
    
    // Fetch parent data
    const parentResponse = await makeApiRequest('https://api.al-farabi.id/siswa/orangtua')
    const parentData = await parentResponse.json()
    
    if (parentData.payload && parentData.payload.data) {
      parentProfile.value = parentData.payload.data
    }
    
  } catch (error) {
    console.error('Error fetching existing data:', error)
    // Silent fail - we just won't pre-fill the form
  }
}

// Load data saat komponen dimuat
onMounted(() => {
  fetchExistingData()
})
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
      Form Pengisian Data Calon Siswa
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

    <form @submit.prevent="saveProfile" class="space-y-8">
      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Jenjang Pendidikan</h2>
        <div class="flex flex-wrap gap-4">
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 'bg-blue-100 border-blue-300': profile.educationLevel === 'TK' }"
          >
            <input
              type="radio"
              v-model="profile.educationLevel"
              value="TK"
              class="mr-2 accent-blue-600"
            />
            <span class="font-medium">TK</span>
          </label>
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 'bg-blue-100 border-blue-300': profile.educationLevel === 'SD' }"
          >
            <input
              type="radio"
              v-model="profile.educationLevel"
              value="SD"
              class="mr-2 accent-blue-600"
            />
            <span class="font-medium">SD</span>
          </label>
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 'bg-blue-100 border-blue-300': profile.educationLevel === 'SMP' }"
          >
            <input
              type="radio"
              v-model="profile.educationLevel"
              value="SMP"
              class="mr-2 accent-blue-600"
            />
            <span class="font-medium">SMP</span>
          </label>
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 'bg-blue-100 border-blue-300': profile.educationLevel === 'SMK' }"
          >
            <input
              type="radio"
              v-model="profile.educationLevel"
              value="SMK"
              class="mr-2 accent-blue-600"
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
            :class="{ 'bg-blue-100 border-blue-300': profile.gender === 'Laki-laki' }"
          >
            <input
              type="radio"
              v-model="profile.gender"
              value="Laki-laki"
              class="mr-2 accent-blue-600"
            />
            <span class="font-medium">Laki-laki</span>
          </label>
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 'bg-blue-100 border-blue-300': profile.gender === 'Perempuan' }"
          >
            <input
              type="radio"
              v-model="profile.gender"
              value="Perempuan"
              class="mr-2 accent-blue-600"
            />
            <span class="font-medium">Perempuan</span>
          </label>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Data Pribadi Siswa</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm text-gray-600">NIK</label>
            <input
              type="text"
              v-model="profile.nik"
              placeholder="Nomor Induk Kependudukan"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Lengkap</label>
            <input
              type="text"
              v-model="profile.fullName"
              placeholder="Nama lengkap sesuai akta kelahiran"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tempat Lahir</label>
            <input
              type="text"
              v-model="profile.birthPlace"
              placeholder="Jakarta"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tanggal Lahir</label>
            <input
              type="date"
              v-model="profile.birthDate"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Agama</label>
            <select
              v-model="profile.religion"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
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
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tinggal Bersama</label>
            <select
              v-model="profile.livingWith"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
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
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Asal Sekolah (jika ada)</label>
            <input
              type="text"
              v-model="profile.previousSchool"
              placeholder="Nama sekolah sebelumnya"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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

      <div class="flex justify-center pt-4">
        <button
          type="submit"
          class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-12 rounded-lg w-full md:w-auto min-w-[200px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          :disabled="isSaving"
        >
          <span v-if="isSaving" class="flex items-center justify-center">
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
    </form>

    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 mt-12">
      Form Pengisian Data Orang Tua
    </h1>

    <form @submit.prevent="saveParentProfile" class="space-y-8">
      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Data Ayah</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Ayah</label>
            <input
              type="text"
              v-model="parentProfile.nama_ayah"
              placeholder="Nama lengkap ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tempat Lahir Ayah</label>
            <input
              type="text"
              v-model="parentProfile.tempat_lahir_ayah"
              placeholder="Tempat lahir ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tanggal Lahir Ayah</label>
            <input
              type="date"
              v-model="parentProfile.tanggal_lahir_ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Pendidikan Terakhir Ayah</label>
            <select
              v-model="parentProfile.pendidikan_terakhir_ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            >
              <option value="" disabled selected>Pilih pendidikan</option>
              <option value="SD">SD/Sederajat</option>
              <option value="SMP">SMP/Sederajat</option>
              <option value="SMA">SMA/Sederajat</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Pekerjaan Ayah</label>
            <input
              type="text"
              v-model="parentProfile.pekerjaan_ayah"
              placeholder="Pekerjaan ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>
        </div>

        <h2 class="text-lg font-semibold text-gray-700 mb-4 mt-8">Data Ibu</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Ibu</label>
            <input
              type="text"
              v-model="parentProfile.nama_ibu"
              placeholder="Nama lengkap ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tempat Lahir Ibu</label>
            <input
              type="text"
              v-model="parentProfile.tempat_lahir_ibu"
              placeholder="Tempat lahir ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tanggal Lahir Ibu</label>
            <input
              type="date"
              v-model="parentProfile.tanggal_lahir_ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Pendidikan Terakhir Ibu</label>
            <select
              v-model="parentProfile.pendidikan_terakhir_ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            >
              <option value="" disabled selected>Pilih pendidikan</option>
              <option value="SD">SD/Sederajat</option>
              <option value="SMP">SMP/Sederajat</option>
              <option value="SMA">SMA/Sederajat</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Pekerjaan Ibu</label>
            <input
              type="text"
              v-model="parentProfile.pekerjaan_ibu"
              placeholder="Pekerjaan ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>
        </div>

        <h2 class="text-lg font-semibold text-gray-700 mb-4 mt-8">Data Kontak</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Wali (Jika ada)</label>
            <input
              type="text"
              v-model="parentProfile.nama_wali"
              placeholder="Nama lengkap wali"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nomor HP/WA Aktif</label>
            <input
              type="tel"
              v-model="parentProfile.nohp_hpwa_aktif"
              placeholder="Contoh: 081234567890"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Email Aktif</label>
            <input
              type="email"
              v-model="parentProfile.email_aktif"
              placeholder="Contoh: orangtua@email.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center pt-4">
        <button
          type="submit"
          class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-12 rounded-lg w-full md:w-auto min-w-[200px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          :disabled="isSavingParent"
        >
          <span v-if="isSavingParent" class="flex items-center justify-center">
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
          <span v-else>Simpan Data Orang Tua</span>
        </button>
      </div>
    </form>
  </div>
</template>
