<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const beritaList = ref([
  {
    id: 1,
    judul: 'Penerimaan Siswa Baru Tahun Ajaran 2024/2025',
    tanggal: '2024-05-15',
    gambar: '/images/berita/berita-1.png',
    isi: 'Sekolah Al-Farabi membuka pendaftaran siswa baru untuk tahun ajaran 2024/2025...',
  },
  {
    id: 2,
    judul: 'Prestasi Siswa dalam Olimpiade Matematika',
    tanggal: '2024-04-20',
    gambar: '/images/berita/berita-2.png',
    isi: 'Siswa Al-Farabi berhasil meraih medali emas dalam Olimpiade Matematika Nasional...',
  },
  {
    id: 3,
    judul: 'Kunjungan Industri ke PT. Teknologi Indonesia',
    tanggal: '2024-03-10',
    gambar: '/images/berita/berita-3.png',
    isi: 'Siswa SMK Al-Farabi melakukan kunjungan industri ke PT. Teknologi Indonesia...',
  },
])

const selectedBerita = ref(null)
const isEditing = ref(false)
const isAdding = ref(false)

const newBerita = ref({
  judul: '',
  tanggal: '',
  gambar: null,
  isi: '',
})

const editBerita = (berita) => {
  selectedBerita.value = { ...berita }
  isEditing.value = true
  isAdding.value = false
}

const addBerita = () => {
  newBerita.value = {
    judul: '',
    tanggal: new Date().toISOString().split('T')[0],
    gambar: null,
    isi: '',
  }
  isAdding.value = true
  isEditing.value = false
}

const saveBerita = () => {
  if (isEditing.value && selectedBerita.value) {
    const index = beritaList.value.findIndex((item) => item.id === selectedBerita.value.id)
    if (index !== -1) {
      beritaList.value[index] = { ...selectedBerita.value }
    }
    isEditing.value = false
    selectedBerita.value = null
  } else if (isAdding.value) {
    const newId = Math.max(0, ...beritaList.value.map((item) => item.id)) + 1
    beritaList.value.push({
      ...newBerita.value,
      id: newId,
    })
    isAdding.value = false
    newBerita.value = {
      judul: '',
      tanggal: '',
      gambar: null,
      isi: '',
    }
  }
}

const deleteBerita = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
    beritaList.value = beritaList.value.filter((item) => item.id !== id)
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const fakeUrl = URL.createObjectURL(file)
    if (isEditing.value && selectedBerita.value) {
      selectedBerita.value.gambar = fakeUrl
    } else if (isAdding.value) {
      newBerita.value.gambar = fakeUrl
    }
  }
}
</script>

<template>
  <div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-8">
      <h1 class="text-3xl font-bold text-white">Berita</h1>
    </div>

    <div class="flex justify-start mb-8">
      <button
        @click="addBerita"
        class="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white font-medium py-2 px-4 rounded-lg flex items-center shadow-lg cursor-pointer"
      >
        <Icon icon="ic:round-plus" width="24" height="24" class="mr-2" />
        Tambah
      </button>
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
            <label class="cursor-pointer text-gray-500">
              Tambah Foto
              <input type="file" class="hidden" @change="handleFileUpload" accept="image/*" />
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

        <div class="flex justify-center">
          <button
            @click="saveBerita"
            class="bg-blue-300 hover:bg-blue-400 text-white font-medium py-3 px-8 rounded-lg transition duration-300 cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="space-y-6">
        <div
          v-for="berita in beritaList"
          :key="berita.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 cursor-pointer"
          @click="editBerita(berita)"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-primary">{{ berita.judul }}</h3>
            <button
              @click.stop="deleteBerita(berita.id)"
              class="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <Icon icon="material-symbols:delete-outline-rounded" width="24" height="24" />
            </button>
          </div>
          <p class="text-gray-500 mb-4">
            {{ new Date(berita.tanggal).toLocaleDateString('id-ID') }}
          </p>
          <p class="text-gray-700 line-clamp-3">{{ berita.isi }}</p>
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
