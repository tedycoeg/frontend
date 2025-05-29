<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const prestasiList = ref([
  {
    id: 1,
    judul: 'Juara 1 Olimpiade Matematika Tingkat Nasional',
    tanggal: '2024-05-10',
    gambar: '/images/prestasi/prestasi-1.png',
    isi: 'Siswa Al-Farabi berhasil meraih juara 1 dalam Olimpiade Matematika Tingkat Nasional...',
  },
  {
    id: 2,
    judul: 'Juara 2 Lomba Robotik Internasional',
    tanggal: '2024-04-15',
    gambar: '/images/prestasi/prestasi-2.png',
    isi: 'Tim robotik Al-Farabi berhasil meraih juara 2 dalam Lomba Robotik Internasional...',
  },
  {
    id: 3,
    judul: 'Juara 1 Kompetisi Sains Tingkat Provinsi',
    tanggal: '2024-03-20',
    gambar: '/images/prestasi/prestasi-3.png',
    isi: 'Siswa Al-Farabi berhasil meraih juara 1 dalam Kompetisi Sains Tingkat Provinsi...',
  },
])

const selectedPrestasi = ref(null)
const isEditing = ref(false)
const isAdding = ref(false)

const newPrestasi = ref({
  judul: '',
  tanggal: '',
  gambar: null,
  isi: '',
})

const editPrestasi = (prestasi) => {
  selectedPrestasi.value = { ...prestasi }
  isEditing.value = true
  isAdding.value = false
}

const addPrestasi = () => {
  newPrestasi.value = {
    judul: '',
    tanggal: new Date().toISOString().split('T')[0],
    gambar: null,
    isi: '',
  }
  isAdding.value = true
  isEditing.value = false
}

const savePrestasi = () => {
  if (isEditing.value && selectedPrestasi.value) {
    const index = prestasiList.value.findIndex((item) => item.id === selectedPrestasi.value.id)
    if (index !== -1) {
      prestasiList.value[index] = { ...selectedPrestasi.value }
    }
    isEditing.value = false
    selectedPrestasi.value = null
  } else if (isAdding.value) {
    const newId = Math.max(0, ...prestasiList.value.map((item) => item.id)) + 1
    prestasiList.value.push({
      ...newPrestasi.value,
      id: newId,
    })
    isAdding.value = false
    newPrestasi.value = {
      judul: '',
      tanggal: '',
      gambar: null,
      isi: '',
    }
  }
}

const deletePrestasi = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) {
    prestasiList.value = prestasiList.value.filter((item) => item.id !== id)
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // In a real application, this would upload the file to a server
    // For now, we'll just create a fake URL
    const fakeUrl = URL.createObjectURL(file)
    if (isEditing.value && selectedPrestasi.value) {
      selectedPrestasi.value.gambar = fakeUrl
    } else if (isAdding.value) {
      newPrestasi.value.gambar = fakeUrl
    }
  }
}
</script>

<template>
  <div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-8">
      <h1 class="text-3xl font-bold text-white">Prestasi</h1>
    </div>

    <div class="flex justify-start mb-8">
      <button
        @click="addPrestasi"
        class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-medium py-2 px-4 rounded-lg flex items-center shadow-lg cursor-pointer"
      >
        <Icon icon="ic:round-plus" width="24" height="24" class="mr-2" />
        Tambah
      </button>
    </div>

    <div v-if="isEditing || isAdding" class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-2xl font-bold text-primary mb-6">
        {{ isEditing ? 'Edit Prestasi' : 'Tambah Prestasi' }}
      </h2>

      <div class="space-y-6">
        <div>
          <label class="block text-gray-700 mb-2">Judul</label>
          <input
            type="text"
            :value="
              isEditing ? (selectedPrestasi ? selectedPrestasi.judul : '') : newPrestasi.judul
            "
            @input="
              (e) =>
                isEditing
                  ? selectedPrestasi
                    ? (selectedPrestasi.judul = e.target.value)
                    : null
                  : (newPrestasi.judul = e.target.value)
            "
            placeholder="Tambah Judul"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Gambar</label>
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div
              v-if="(isEditing && selectedPrestasi.gambar) || (isAdding && newPrestasi.gambar)"
              class="mb-4"
            >
              <img
                :src="isEditing ? selectedPrestasi.gambar : newPrestasi.gambar"
                alt="Preview"
                class="mx-auto max-h-48"
              />
            </div>
            <label class="cursor-pointer text-gray-500">
              Tambah Foto
              <input type="file" class="hidden" @change="handleFileUpload" accept="image/*" />
            </label>
          </div>
        </div>

        <div>
          <label class="block text-gray-700 mb-2">Deskripsi</label>
          <textarea
            :value="isEditing ? (selectedPrestasi ? selectedPrestasi.isi : '') : newPrestasi.isi"
            @input="
              (e) =>
                isEditing
                  ? selectedPrestasi
                    ? (selectedPrestasi.isi = e.target.value)
                    : null
                  : (newPrestasi.isi = e.target.value)
            "
            placeholder="Isi Deskripsi"
            rows="6"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div class="flex justify-center">
          <button
            @click="savePrestasi"
            class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition duration-300 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- Prestasi list -->
    <div v-else>
      <div class="space-y-6">
        <div
          v-for="prestasi in prestasiList"
          :key="prestasi.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 cursor-pointer"
          @click="editPrestasi(prestasi)"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-primary">{{ prestasi.judul }}</h3>
            <button
              @click.stop="deletePrestasi(prestasi.id)"
              class="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <Icon icon="material-symbols:delete-outline-rounded" width="24" height="24" />
            </button>
          </div>
          <p class="text-gray-500 mb-4">
            {{ new Date(prestasi.tanggal).toLocaleDateString('id-ID') }}
          </p>
          <p class="text-gray-700 line-clamp-3">{{ prestasi.isi }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
