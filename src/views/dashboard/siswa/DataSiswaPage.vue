<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Icon } from '@iconify/vue'

const authStore = useAuthStore()
const isSaving = ref(false)

const profile = ref({
  educationLevel: '',
  gender: '',
  nik: '',
  fullName: authStore.currentUser?.name || '',
  birthPlace: '',
  religion: '',
  citizenship: '',
  fullAddress: '',
  postalCode: '',
  livingWith: '',
  emergencyContact: '',
  previousSchool: '',
  fatherName: '',
  fatherBirthPlace: '',
  fatherEducation: '',
  fatherJob: '',
  motherName: '',
  motherBirthPlace: '',
  motherEducation: '',
  motherJob: '',
  guardianName: '',
  phoneNumber: '',
  activeEmail: authStore.currentUser?.email || '',
})

const saveProfile = async () => {
  isSaving.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('Profile data saved:', profile.value)

    alert('Data berhasil disimpan')
  } catch (error) {
    console.error('Error saving profile:', error)
    alert('Terjadi kesalahan saat menyimpan data')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
      Form Pengisian Data Calon Siswa
    </h1>

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
            :class="{ 'bg-blue-100 border-blue-300': profile.gender === 'Pria' }"
          >
            <input
              type="radio"
              v-model="profile.gender"
              value="Pria"
              class="mr-2 accent-blue-600"
            />
            <span class="font-medium">Pria</span>
          </label>
          <label
            class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50"
            :class="{ 'bg-blue-100 border-blue-300': profile.gender === 'Wanita' }"
          >
            <input
              type="radio"
              v-model="profile.gender"
              value="Wanita"
              class="mr-2 accent-blue-600"
            />
            <span class="font-medium">Wanita</span>
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
            <label class="text-sm text-gray-600">Tempat Tanggal Lahir</label>
            <input
              type="text"
              v-model="profile.birthPlace"
              placeholder="Contoh: Jakarta, 17 Agustus 2010"
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

      <div
        class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Data Orang Tua</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Ayah</label>
            <input
              type="text"
              v-model="profile.fatherName"
              placeholder="Nama lengkap ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tempat Tanggal Lahir Ayah</label>
            <input
              type="text"
              v-model="profile.fatherBirthPlace"
              placeholder="Contoh: Jakarta, 10 Januari 1980"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Pendidikan Terakhir Ayah</label>
            <select
              v-model="profile.fatherEducation"
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
              v-model="profile.fatherJob"
              placeholder="Pekerjaan ayah"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Ibu</label>
            <input
              type="text"
              v-model="profile.motherName"
              placeholder="Nama lengkap ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Tempat Tanggal Lahir Ibu</label>
            <input
              type="text"
              v-model="profile.motherBirthPlace"
              placeholder="Contoh: Surabaya, 15 Maret 1982"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Pendidikan Terakhir Ibu</label>
            <select
              v-model="profile.motherEducation"
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
              v-model="profile.motherJob"
              placeholder="Pekerjaan ibu"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nama Wali (Jika ada)</label>
            <input
              type="text"
              v-model="profile.guardianName"
              placeholder="Nama lengkap wali"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Nomor HP/WA Aktif</label>
            <input
              type="tel"
              v-model="profile.phoneNumber"
              placeholder="Contoh: 081234567890"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm text-gray-600">Email Aktif</label>
            <input
              type="email"
              v-model="profile.activeEmail"
              placeholder="Contoh: nama@email.com"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              required
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
  </div>
</template>
