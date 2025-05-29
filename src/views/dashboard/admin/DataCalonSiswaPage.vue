<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const calonSiswaList = ref([
  {
    id: 1,
    nik: '3201234567890001',
    nama: 'Ahmad Fauzi',
    jenisPendaftaran: 'Reguler',
    jenjang: 'TK',
    tanggalDaftar: '2024-05-15',
    status: 'pending',
    gender: 'Pria',
    birthPlace: 'Jakarta, 10 Januari 2018',
    religion: 'Islam',
    citizenship: 'Indonesia',
    fullAddress: 'Jl. Merdeka No. 123, Jakarta',
    postalCode: '12345',
    livingWith: 'Orang Tua',
    emergencyContact: '081234567890',
    previousSchool: '',
    fatherName: 'Budi Fauzi',
    fatherBirthPlace: 'Jakarta, 15 Mei 1985',
    fatherEducation: 'S1',
    fatherJob: 'Karyawan Swasta',
    motherName: 'Siti Aminah',
    motherBirthPlace: 'Bandung, 20 Juni 1987',
    motherEducation: 'S1',
    motherJob: 'Guru',
    guardianName: '',
    phoneNumber: '081234567890',
    email: 'ahmad@example.com',
  },
  {
    id: 2,
    nik: '3201234567890002',
    nama: 'Siti Nurhaliza',
    jenisPendaftaran: 'Khusus Anak Yatim',
    jenjang: 'SD',
    tanggalDaftar: '2024-05-14',
    status: 'diterima',
    gender: 'Wanita',
    birthPlace: 'Surabaya, 5 Maret 2016',
    religion: 'Islam',
    citizenship: 'Indonesia',
    fullAddress: 'Jl. Pahlawan No. 45, Jakarta',
    postalCode: '12346',
    livingWith: 'Wali',
    emergencyContact: '081234567891',
    previousSchool: 'TK Ceria',
    fatherName: '-',
    fatherBirthPlace: '-',
    fatherEducation: '-',
    fatherJob: '-',
    motherName: 'Nurhayati',
    motherBirthPlace: 'Jakarta, 12 April 1990',
    motherEducation: 'SMA',
    motherJob: 'Wirausaha',
    guardianName: 'Ahmad Ridwan',
    phoneNumber: '081234567891',
    email: 'siti@example.com',
  },
  {
    id: 3,
    nik: '3201234567890003',
    nama: 'Budi Santoso',
    jenisPendaftaran: 'Reguler',
    jenjang: 'SMP',
    tanggalDaftar: '2024-05-13',
    status: 'ditolak',
    gender: 'Pria',
    birthPlace: 'Bandung, 20 November 2010',
    religion: 'Kristen',
    citizenship: 'Indonesia',
    fullAddress: 'Jl. Sudirman No. 78, Jakarta',
    postalCode: '12347',
    livingWith: 'Orang Tua',
    emergencyContact: '081234567892',
    previousSchool: 'SD Negeri 05',
    fatherName: 'Joko Santoso',
    fatherBirthPlace: 'Solo, 8 Agustus 1980',
    fatherEducation: 'S2',
    fatherJob: 'Dosen',
    motherName: 'Ratna Dewi',
    motherBirthPlace: 'Yogyakarta, 15 September 1982',
    motherEducation: 'S1',
    motherJob: 'Dokter',
    guardianName: '',
    phoneNumber: '081234567892',
    email: 'budi@example.com',
  },
  {
    id: 4,
    nik: '3201234567890004',
    nama: 'Dewi Lestari',
    jenisPendaftaran: 'Reguler',
    jenjang: 'SMK',
    tanggalDaftar: '2024-05-12',
    status: 'diterima',
    gender: 'Wanita',
    birthPlace: 'Jakarta, 25 Juli 2007',
    religion: 'Islam',
    citizenship: 'Indonesia',
    fullAddress: 'Jl. Gatot Subroto No. 32, Jakarta',
    postalCode: '12348',
    livingWith: 'Orang Tua',
    emergencyContact: '081234567893',
    previousSchool: 'SMP Negeri 10',
    fatherName: 'Agus Lestari',
    fatherBirthPlace: 'Jakarta, 10 Oktober 1975',
    fatherEducation: 'D3',
    fatherJob: 'Wiraswasta',
    motherName: 'Yanti Susanti',
    motherBirthPlace: 'Semarang, 5 Mei 1978',
    motherEducation: 'SMA',
    motherJob: 'Ibu Rumah Tangga',
    guardianName: '',
    phoneNumber: '081234567893',
    email: 'dewi@example.com',
  },
  {
    id: 5,
    nik: '3201234567890005',
    nama: 'Eko Prasetyo',
    jenisPendaftaran: 'Khusus Anak Yatim',
    jenjang: 'TK',
    tanggalDaftar: '2024-05-11',
    status: 'pending',
    gender: 'Pria',
    birthPlace: 'Tangerang, 15 Desember 2019',
    religion: 'Islam',
    citizenship: 'Indonesia',
    fullAddress: 'Jl. Diponegoro No. 56, Jakarta',
    postalCode: '12349',
    livingWith: 'Wali',
    emergencyContact: '081234567894',
    previousSchool: '',
    fatherName: '-',
    fatherBirthPlace: '-',
    fatherEducation: '-',
    fatherJob: '-',
    motherName: 'Endang Susilowati',
    motherBirthPlace: 'Jakarta, 20 Januari 1985',
    motherEducation: 'SMP',
    motherJob: 'Buruh',
    guardianName: 'Hadi Suwarno',
    phoneNumber: '081234567894',
    email: 'eko@example.com',
  },
])

const filterJenjang = ref('semua')
const filterStatus = ref('semua')
const filterJenisPendaftaran = ref('semua')
const searchQuery = ref('')
const selectedSiswa = ref(null)
const isDetailOpen = ref(false)

const filteredSiswaList = computed(() => {
  return calonSiswaList.value.filter((siswa) => {
    // Filter by jenjang
    if (filterJenjang.value !== 'semua' && siswa.jenjang !== filterJenjang.value) {
      return false
    }

    // Filter by status
    if (filterStatus.value !== 'semua' && siswa.status !== filterStatus.value) {
      return false
    }

    // Filter by jenis pendaftaran
    if (
      filterJenisPendaftaran.value !== 'semua' &&
      siswa.jenisPendaftaran !== filterJenisPendaftaran.value
    ) {
      return false
    }

    // Filter by search query (nama or NIK)
    if (
      searchQuery.value &&
      !siswa.nama.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      !siswa.nik.includes(searchQuery.value)
    ) {
      return false
    }

    return true
  })
})

const viewDetail = (siswa) => {
  selectedSiswa.value = siswa
  isDetailOpen.value = true
}

const closeDetail = () => {
  isDetailOpen.value = false
}

const updateStatus = (id, newStatus) => {
  const siswa = calonSiswaList.value.find((s) => s.id === id)
  if (siswa) {
    siswa.status = newStatus
  }
}

const downloadData = () => {
  // This would be replaced with an actual API call to download data
  alert('Data calon siswa akan diunduh dalam format Excel')
}

const downloadDocument = (id) => {
  // This would be replaced with an actual API call to download document
  alert(`Dokumen siswa dengan ID ${id} akan diunduh dalam format PDF`)
}
</script>

<template>
  <div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-8">
      <h1 class="text-3xl font-bold text-white">Data Calon Siswa</h1>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label class="block text-gray-700 mb-2">Cari (Nama/NIK)</label>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Cari nama/NIK siswa..."
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
            <option value="TK">TK</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMK">SMK</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Filter Status</label>
          <select
            v-model="filterStatus"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="semua">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="diterima">Diterima</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Jenis Pendaftaran</label>
          <select
            v-model="filterJenisPendaftaran"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="semua">Semua Jenis</option>
            <option value="Reguler">Reguler</option>
            <option value="Khusus Anak Yatim">Khusus Anak Yatim</option>
          </select>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8 overflow-x-auto">
      <table class="w-full">
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
            v-for="(siswa, index) in filteredSiswaList"
            :key="siswa.id"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="py-3 px-4">{{ index + 1 }}</td>
            <td class="py-3 px-4">{{ siswa.nik }}</td>
            <td class="py-3 px-4">{{ siswa.nama }}</td>
            <td class="py-3 px-4">{{ siswa.jenisPendaftaran }}</td>
            <td class="py-3 px-4">{{ siswa.jenjang }}</td>
            <td class="py-3 px-4">
              {{ new Date(siswa.tanggalDaftar).toLocaleDateString('id-ID') }}
            </td>
            <td class="py-3 px-4">
              <span
                :class="{
                  'px-2 py-1 rounded-full text-xs font-medium': true,
                  'bg-yellow-100 text-yellow-800': siswa.status === 'pending',
                  'bg-green-100 text-green-800': siswa.status === 'diterima',
                  'bg-red-100 text-red-800': siswa.status === 'ditolak',
                }"
              >
                {{
                  siswa.status === 'pending'
                    ? 'Pending'
                    : siswa.status === 'diterima'
                      ? 'Diterima'
                      : 'Ditolak'
                }}
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
          <tr v-if="filteredSiswaList.length === 0">
            <td colspan="8" class="py-8 text-center text-gray-500">
              Tidak ada data yang sesuai dengan filter
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-center mb-8">
      <button
        @click="downloadData"
        class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-lg cursor-pointer"
      >
        Download Data
      </button>
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
            <p class="font-medium">{{ selectedSiswa.jenjang }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Jenis Kelamin</h3>
            <p class="font-medium">{{ selectedSiswa.gender }}</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Data Pribadi Siswa</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="text-gray-500">NIK</h4>
                <p class="font-medium">{{ selectedSiswa.nik }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Nama Lengkap</h4>
                <p class="font-medium">{{ selectedSiswa.nama }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tempat Tanggal Lahir</h4>
                <p class="font-medium">{{ selectedSiswa.birthPlace }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Agama</h4>
                <p class="font-medium">{{ selectedSiswa.religion }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Kewarganegaraan</h4>
                <p class="font-medium">{{ selectedSiswa.citizenship }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Jenis Pendaftaran</h4>
                <p class="font-medium">{{ selectedSiswa.jenisPendaftaran }}</p>
              </div>
              <div class="md:col-span-2">
                <h4 class="text-gray-500">Alamat Lengkap</h4>
                <p class="font-medium">{{ selectedSiswa.fullAddress }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Kode Pos</h4>
                <p class="font-medium">{{ selectedSiswa.postalCode }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tinggal Bersama</h4>
                <p class="font-medium">{{ selectedSiswa.livingWith }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Kontak Darurat</h4>
                <p class="font-medium">{{ selectedSiswa.emergencyContact }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Asal Sekolah</h4>
                <p class="font-medium">{{ selectedSiswa.previousSchool || '-' }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Data Orang Tua</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="text-gray-500">Nama Ayah</h4>
                <p class="font-medium">{{ selectedSiswa.fatherName }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tempat Tanggal Lahir Ayah</h4>
                <p class="font-medium">{{ selectedSiswa.fatherBirthPlace }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Pendidikan Terakhir Ayah</h4>
                <p class="font-medium">{{ selectedSiswa.fatherEducation }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Pekerjaan Ayah</h4>
                <p class="font-medium">{{ selectedSiswa.fatherJob }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Nama Ibu</h4>
                <p class="font-medium">{{ selectedSiswa.motherName }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Tempat Tanggal Lahir Ibu</h4>
                <p class="font-medium">{{ selectedSiswa.motherBirthPlace }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Pendidikan Terakhir Ibu</h4>
                <p class="font-medium">{{ selectedSiswa.motherEducation }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Pekerjaan Ibu</h4>
                <p class="font-medium">{{ selectedSiswa.motherJob }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Nama Wali (Jika ada)</h4>
                <p class="font-medium">{{ selectedSiswa.guardianName || '-' }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Nomor HP/WA Aktif</h4>
                <p class="font-medium">{{ selectedSiswa.phoneNumber }}</p>
              </div>
              <div>
                <h4 class="text-gray-500">Email Aktif</h4>
                <p class="font-medium">{{ selectedSiswa.email }}</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Status Pendaftaran</h3>
            <div class="flex items-center">
              <span
                :class="{
                  'px-3 py-1 rounded-full text-sm font-medium': true,
                  'bg-yellow-100 text-yellow-800': selectedSiswa.status === 'pending',
                  'bg-green-100 text-green-800': selectedSiswa.status === 'diterima',
                  'bg-red-100 text-red-800': selectedSiswa.status === 'ditolak',
                }"
              >
                {{
                  selectedSiswa.status === 'pending'
                    ? 'Pending'
                    : selectedSiswa.status === 'diterima'
                      ? 'Diterima'
                      : 'Ditolak'
                }}
              </span>
              <p class="ml-3 text-gray-500">
                Tanggal Pendaftaran:
                {{ new Date(selectedSiswa.tanggalDaftar).toLocaleDateString('id-ID') }}
              </p>
            </div>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-700 mb-3">Dokumen Pendaftaran</h3>
            <div class="flex justify-start">
              <button
                @click="downloadDocument(selectedSiswa.id)"
                class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-2 px-6 rounded-lg transition duration-300 flex items-center cursor-pointer"
              >
                <Icon icon="mdi:file-download" class="mr-2" width="20" height="20" />
                Download Berkas PDF
              </button>
            </div>
          </div>

          <div class="pt-6 flex justify-center space-x-4">
            <button
              v-if="selectedSiswa.status === 'pending'"
              @click="
                () => {
                  updateStatus(selectedSiswa.id, 'diterima')
                  closeDetail()
                }
              "
              class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 cursor-pointer"
            >
              Terima Pendaftaran
            </button>
            <button
              v-if="selectedSiswa.status === 'pending'"
              @click="
                () => {
                  updateStatus(selectedSiswa.id, 'ditolak')
                  closeDetail()
                }
              "
              class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 cursor-pointer"
            >
              Tolak Pendaftaran
            </button>
            <button
              v-if="selectedSiswa.status !== 'pending'"
              @click="
                () => {
                  updateStatus(selectedSiswa.id, 'pending')
                  closeDetail()
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
