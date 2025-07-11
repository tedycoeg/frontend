<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import NewsCard from '@/components/BeritaCard.vue'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const API_ENDPOINTS = {
  GET_ALL_BERITA: `${API_BASE_URL}/getAllBerita`
}

const router = useRouter()
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

const news = computed(() => allNews.value.filter(item => item.typeBerita === 'umum'))
const achievements = computed(() => allNews.value.filter(item => item.typeBerita === 'prestasi'))

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString('id-ID')
  } catch (error) {
    console.error('Date formatting error:', error)
    return dateString
  }
}

const mapItemToCardProps = (item, type) => ({
  id: item.id_berita,
  title: item.judul,
  content: item.isi,
  image: item.gambar_url,
  date: formatDate(item.createdAt),
  type
})

const navigateToDetail = (id, type) => {
  router.push({ name: 'ContentDetail', params: { type, id } })
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
      <section class="container mx-auto px-4 py-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-center text-primary mb-12">BERITA</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NewsCard
            v-for="item in news"
            :key="item.id_berita"
            :item="mapItemToCardProps(item, 'berita')"
            @click="navigateToDetail(item.id_berita, 'berita')"
          />
        </div>

        <div class="flex justify-center mt-10">
          <router-link
            to="/berita/semua"
            class="bg-blue-300 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-xl"
          >
            Baca Lebih Lanjut
          </router-link>
        </div>
      </section>

      <section class="container mx-auto px-4 py-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-center text-primary mb-12">PRESTASI</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NewsCard
            v-for="item in achievements"
            :key="item.id_berita"
            :item="mapItemToCardProps(item, 'prestasi')"
            @click="navigateToDetail(item.id_berita, 'prestasi')"
          />
        </div>

        <div class="flex justify-center mt-10">
          <router-link
            to="/prestasi/semua"
            class="bg-blue-300 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-xl"
          >
            Baca Lebih Lanjut
          </router-link>
        </div>
      </section>
    </template>
  </div>
</template>
