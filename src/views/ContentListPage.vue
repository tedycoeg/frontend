<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import NewsCard from '@/components/BeritaCard.vue'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const API_ENDPOINTS = {
  GET_ALL_BERITA: `${API_BASE_URL}/getAllBerita`
}

const ITEMS_PER_PAGE = 9

const props = defineProps({
  contentType: {
    type: String,
    required: true,
    validator: (value) => ['news', 'achievement'].includes(value),
  },
})

const router = useRouter()
const route = useRoute()
const currentPage = ref(1)
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

const initializePage = async () => {
  const page = parseInt(route.query.page) || 1
  currentPage.value = page
  await fetchNews()
}

onMounted(initializePage)

watch(currentPage, (newPage) => {
  router.push({ query: { page: newPage } })
})

const filteredItems = computed(() => {
  const type = props.contentType === 'news' ? 'umum' : 'prestasi'
  return allNews.value.filter(item => item.typeBerita === type)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return filteredItems.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / ITEMS_PER_PAGE)
})

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString('id-ID')
  } catch (error) {
    console.error('Date formatting error:', error)
    return dateString
  }
}

const mapItemToCardProps = (item) => ({
  id: item.id_berita,
  title: item.judul,
  content: item.isi,
  image: item.gambar_url,
  date: formatDate(item.createdAt),
  type: props.contentType === 'news' ? 'berita' : 'prestasi'
})

const navigateToDetail = (id) => {
  const type = props.contentType === 'news' ? 'berita' : 'prestasi'
  router.push({ name: 'ContentDetail', params: { type, id } })
}

const updatePage = (direction) => {
  if (direction === 'next' && currentPage.value < totalPages.value) {
    currentPage.value++
  } else if (direction === 'prev' && currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <header class="bg-primary-500 py-16 md:py-24">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl md:text-5xl font-extrabold text-center text-primary">
          {{ contentType === 'news' ? 'BERITA' : 'PRESTASI' }}
        </h1>
      </div>
    </header>

    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="errorMsg" class="container mx-auto px-4 py-12">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
        {{ errorMsg }}
      </div>
    </div>

    <template v-else>
      <main class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NewsCard 
            v-for="item in paginatedItems" 
            :key="item.id_berita" 
            :item="mapItemToCardProps(item)" 
            @click="navigateToDetail(item.id_berita)" 
          />
        </div>

        <nav v-if="totalPages > 1" class="flex justify-center mt-10" aria-label="Pagination">
          <button
            @click="updatePage('prev')"
            :disabled="currentPage === 1"
            :class="[
              'px-4 py-2 mx-1 rounded-md',
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-300 text-white hover:bg-blue-500',
            ]"
            aria-label="Previous page"
          >
            Sebelumnya
          </button>

          <button
            @click="updatePage('next')"
            :disabled="currentPage === totalPages"
            :class="[
              'px-4 py-2 mx-1 rounded-md',
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-300 text-white hover:bg-blue-500',
            ]"
            aria-label="Next page"
          >
            Selanjutnya
          </button>
        </nav>
      </main>
    </template>
  </div>
</template>
