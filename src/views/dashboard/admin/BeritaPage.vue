<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const API_ENDPOINTS = {
  GET_ALL_BERITA: `${API_BASE_URL}/admin/getAllBerita`,
  BERITA: `${API_BASE_URL}/admin/berita`,
}

const beritaList = ref([])
const selectedBerita = ref(null)
const isEditing = ref(false)
const isAdding = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')

const newBerita = ref({
  judul: '',
  isi: '',
  gambar: null,
  fileToUpload: null
})

const fileInput = ref(null)

const makeFormDataRequest = async (url, method, formData) => {
  const token = localStorage.getItem('adminToken')
  if (!token) {
    throw new Error('Token tidak ditemukan, silakan login kembali')
  }

  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `Gagal melakukan operasi ${method}`)
  }

  return response
}

// Fungsi untuk mengambil semua berita
const fetchBerita = async () => {
  isLoading.value = true
  try {
    // Using direct fetch since we need the full URL path
    const response = await fetch(API_ENDPOINTS.GET_ALL_BERITA, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Gagal mengambil data berita')
    }
    
    const data = await response.json()
    
    if (data && data.payload && Array.isArray(data.payload.data)) {
      beritaList.value = data.payload.data
      .filter(berita => berita.typeBerita === 'umum')
      .map(berita => ({
        id: berita.id_berita,
        judul: berita.judul,
        isi: berita.isi,
        gambar: berita.gambar_url,
        createdAt: berita.createdAt
      }))
    }
  } catch (error) {
    console.error('Error fetching berita:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat mengambil data berita'
  } finally {
    isLoading.value = false
  }
}

// Menambahkan berita baru
const addBerita = () => {
  newBerita.value = {
    judul: '',
    isi: '',
    gambar: null,
    fileToUpload: null
  }
  isAdding.value = true
  isEditing.value = false
}

// Menyiapkan edit berita
const editBerita = (berita) => {
  selectedBerita.value = { 
    ...berita,
    fileToUpload: null
  }
  isEditing.value = true
  isAdding.value = false
}

// Menyimpan berita (create/update)
const saveBerita = async () => {
  isLoading.value = true
  
  try {
    const formData = new FormData()
    
    if (isEditing.value && selectedBerita.value) {
      formData.append('judul', selectedBerita.value.judul)
      formData.append('isi', selectedBerita.value.isi)
      
      if (selectedBerita.value.fileToUpload) {
        formData.append('gambar', selectedBerita.value.fileToUpload)
      }
      
      await makeFormDataRequest(
        `${API_ENDPOINTS.BERITA}/${selectedBerita.value.id}`, 
        'PUT', 
        formData
      )
      
      isEditing.value = false
      selectedBerita.value = null
      
    } else if (isAdding.value) {
      formData.append('judul', newBerita.value.judul)
      formData.append('isi', newBerita.value.isi)
      
      if (newBerita.value.fileToUpload) {
        formData.append('gambar', newBerita.value.fileToUpload)
      } else {
        throw new Error('Gambar harus diunggah')
      }
      
      await makeFormDataRequest(API_ENDPOINTS.BERITA, 'POST', formData)
      
      isAdding.value = false
      newBerita.value = {
        judul: '',
        isi: '',
        gambar: null,
        fileToUpload: null
      }
    }
    
    // Refresh data berita
    await fetchBerita()
    
  } catch (error) {
    console.error('Error saving berita:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat menyimpan berita'
  } finally {
    isLoading.value = false
  }
}

// Menghapus berita
const deleteBerita = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
    return
  }
  
  isLoading.value = true
  
  try {
    await fetch(`${API_ENDPOINTS.BERITA}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    
    // Refresh data berita
    await fetchBerita()
    
  } catch (error) {
    console.error('Error deleting berita:', error)
    errorMsg.value = error.message || 'Terjadi kesalahan saat menghapus berita'
  } finally {
    isLoading.value = false
  }
}

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  if (!file.type.match('image.*')) {
    alert('Format file harus gambar (JPG, PNG, dll)')
    event.target.value = ''
    return
  }
  
  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran gambar terlalu besar. Maksimal 2MB.')
    event.target.value = ''
    return
  }
  
  const fakeUrl = URL.createObjectURL(file)
  
  if (isEditing.value && selectedBerita.value) {
    selectedBerita.value.gambar = fakeUrl
    selectedBerita.value.fileToUpload = file
  } else if (isAdding.value) {
    newBerita.value.gambar = fakeUrl
    newBerita.value.fileToUpload = file
  }
}

// Format tanggal
const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString('id-ID')
  } catch (error) {
    return dateString
  }
}

// Load berita saat halaman dimuat
onMounted(() => {
  fetchBerita()
})
</script>

<template>
  <div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-8">
      <h1 class="text-3xl font-bold text-white">Berita</h1>
    </div>

    <div v-if="errorMsg" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
      <span>{{ errorMsg }}</span>
      <button @click="errorMsg = ''" class="float-right font-bold">&times;</button>
    </div>

    <div class="flex justify-between items-center mb-8">
      <button
        @click="addBerita"
        class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-medium py-2 px-4 rounded-lg flex items-center shadow-lg cursor-pointer"
      >
        <Icon icon="ic:round-plus" width="24" height="24" class="mr-2" />
        Tambah
      </button>
      <div class="text-gray-500 text-sm">
        Total: {{ beritaList.length }} berita
      </div>
    </div>

    <div v-if="isEditing || isAdding" class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-bold text-primary mb-6">
        {{ isEditing ? 'Edit Berita' : 'Tambah Berita' }}
      </h2>

      <div class="space-y-6">
        <div>
          <label class="block text-gray-700 mb-2">Judul</label>
          <input
            type="text"
            :value="isEditing ? (selectedBerita ? selectedBerita.judul : '') : newBerita.judul"
            @input="
              (e) =>
                isEditing
                  ? selectedBerita
                    ? (selectedBerita.judul = e.target.value)
                    : null
                  : (newBerita.judul = e.target.value)
            "
            placeholder="Tambah Judul"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Gambar</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div
              v-if="(isEditing && selectedBerita.gambar) || (isAdding && newBerita.gambar)"
              class="mb-4"
            >
              <img
                :src="isEditing ? selectedBerita.gambar : newBerita.gambar"
                alt="Preview"
                class="mx-auto max-h-48"
              />
            </div>
            <label class="cursor-pointer text-gray-500 hover:text-blue-500 transition duration-300">
              <div class="flex flex-col items-center">
                <Icon icon="mdi:image-plus" width="32" height="32" class="mb-2" />
                <span>Tambah Foto</span>
              </div>
              <input type="file" class="hidden" @change="handleFileUpload" accept="image/*" ref="fileInput" />
            </label>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Deskripsi</label>
          <textarea
            :value="isEditing ? (selectedBerita ? selectedBerita.isi : '') : newBerita.isi"
            @input="
              (e) =>
                isEditing
                  ? selectedBerita
                    ? (selectedBerita.isi = e.target.value)
                    : null
                  : (newBerita.isi = e.target.value)
            "
            placeholder="Isi Deskripsi"
            rows="6"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div class="flex justify-between">
          <button
            @click="isEditing ? (isEditing = false) : (isAdding = false)"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition duration-300 cursor-pointer"
          >
            Batal
          </button>
          <button
            @click="saveBerita"
            class="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg transition duration-300 cursor-pointer"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
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
    </div>

    <div v-else-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span class="ml-3 text-lg text-blue-500 font-medium">Memuat data berita...</span>
    </div>

    <div v-else-if="beritaList.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
      <div class="text-gray-500 mb-4">
        <Icon icon="mdi:information-outline" width="48" height="48" class="mx-auto" />
      </div>
      <h3 class="text-xl font-medium text-gray-600 mb-2">Belum Ada Berita</h3>
      <p class="text-gray-500 mb-4">Klik tombol "Tambah" untuk membuat berita baru.</p>
    </div>

    <div v-else>
      <div class="space-y-4">
        <div
          v-for="berita in beritaList"
          :key="berita.id"
          class="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition duration-300"
        >
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold text-primary mb-2">{{ berita.judul }}</h3>
            <div class="flex space-x-3">
              <button
                @click="editBerita(berita)"
                class="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <Icon icon="mdi:pencil" width="20" height="20" />
              </button>
              <button
                @click.stop="deleteBerita(berita.id)"
                class="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Icon icon="material-symbols:delete-outline-rounded" width="20" height="20" />
              </button>
            </div>
          </div>
          
          <p class="text-gray-500 text-sm mb-3">
            {{ formatDate(berita.createdAt) }}
          </p>
          
          <div>
            <p class="text-gray-700 line-clamp-3">{{ berita.isi }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
