<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const API_ENDPOINTS = {
  GET_ALL_BERITA: `${API_BASE_URL}/getAllBerita`
}

const router = useRouter()
const route = useRoute()
const allNews = ref([])
const isLoading = ref(false)
const errorMsg = ref('')

const makeApiRequest = async (url, method = 'GET') => {
  try {
    const response = await fetch(url, { method })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('API request failed:', error)
    return { success: false, error: error.message }
  }
}

const fetchNews = async () => {
  isLoading.value = true
  errorMsg.value = ''
  
  const { success, data, error } = await makeApiRequest(API_ENDPOINTS.GET_ALL_BERITA)
  
  if (success && data?.payload?.data) {
    allNews.value = data.payload.data
  } else {
    errorMsg.value = error || 'Gagal mengambil data berita'
  }
  
  isLoading.value = false
}

const contentItem = computed(() => {
  return allNews.value.find(item => item.id_berita === parseInt(route.params.id))
})

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString('id-ID')
  } catch (error) {
    console.error('Date formatting error:', error)
    return dateString
  }
}

const contentParagraphs = computed(() => {
  if (!contentItem.value?.isi) return []
  return contentItem.value.isi
    .split('\n\n')
    .filter(p => p.trim() !== '')
    .map(p => p.trim())
})

const updatePageTitle = (item) => {
  if (item) {
    const contentType = item.typeBerita === 'umum' ? 'Berita' : 'Prestasi'
    document.title = `Al-Farabi - ${contentType}: ${item.judul}`
  } else {
    document.title = 'Al-Farabi - Konten Tidak Ditemukan'
  }
}

watch(contentItem, updatePageTitle, { immediate: true })

const navigateBack = () => {
  router.back()
}

onMounted(fetchNews)
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="errorMsg" class="container mx-auto px-4 py-12">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        {{ errorMsg }}
      </div>
    </div>

    <template v-else>
      <article v-if="contentItem" class="container mx-auto px-4 py-12">
        <nav class="mb-8">
          <button
            @click="navigateBack"
            class="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300"
            aria-label="Kembali ke halaman sebelumnya"
          >
            <span class="text-2xl mr-2">&larr;</span> Kembali
          </button>
        </nav>

        <div class="bg-white rounded-lg shadow-xl overflow-hidden">
          <figure class="w-full h-96 overflow-hidden">
            <img
              :src="contentItem.gambar_url"
              :alt="contentItem.judul"
              class="w-full h-full object-cover"
            />
          </figure>
          
          <div class="p-8">
            <header class="mb-8">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ contentItem.judul }}</h1>
              <time 
                :datetime="contentItem.createdAt"
                class="text-gray-500"
              >
                {{ formatDate(contentItem.createdAt) }}
              </time>
            </header>

            <div class="prose max-w-none">
              <p
                v-for="(paragraph, index) in contentParagraphs"
                :key="index"
                class="mb-4 text-gray-700 leading-relaxed"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </article>

      <div v-else class="container mx-auto px-4 py-12 text-center">
        <h2 class="text-2xl font-bold text-gray-700">Konten tidak ditemukan</h2>
        <button
          @click="navigateBack"
          class="mt-4 text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          Kembali ke halaman sebelumnya
        </button>
      </div>
    </template>
  </div>
</template>
