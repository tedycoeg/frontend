<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNewsStore } from '@/stores/berita'
import NewsCard from '@/components/BeritaCard.vue'

const router = useRouter()
const newsStore = useNewsStore()

onMounted(() => {
  newsStore.setPage(1)
})

const news = computed(() => {
  return newsStore.getNewsByPage
})

const achievements = computed(() => {
  return newsStore.getAchievementsByPage
})

const goToDetail = (id, type) => {
  router.push({ name: 'ContentDetail', params: { type, id } })
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-12">
      <h2 class="text-3xl md:text-4xl font-extrabold text-center text-primary mb-12">BERITA</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NewsCard
          v-for="item in news"
          :key="item.id"
          :item="item"
          @click="goToDetail(item.id, 'berita')"
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
    </div>

    <div class="container mx-auto px-4 py-12">
      <h2 class="text-3xl md:text-4xl font-extrabold text-center text-primary mb-12">PRESTASI</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NewsCard
          v-for="item in achievements"
          :key="item.id"
          :item="item"
          @click="goToDetail(item.id, 'prestasi')"
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
    </div>
  </div>
</template>
