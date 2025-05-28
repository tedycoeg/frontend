<script setup>
import { onMounted, computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNewsStore } from '@/stores/berita'
import NewsCard from '@/components/BeritaCard.vue'

const props = defineProps({
  contentType: {
    type: String,
    required: true,
    validator: (value) => ['news', 'achievement'].includes(value),
  },
})

const router = useRouter()
const route = useRoute()
const newsStore = useNewsStore()
const currentPage = ref(1)

onMounted(() => {
  newsStore.setContentType(props.contentType)
  const page = parseInt(route.query.page) || 1
  currentPage.value = page
  newsStore.setPage(page)
})

watch(currentPage, (newPage) => {
  newsStore.setPage(newPage)
  router.push({ query: { page: newPage } })
})

const items = computed(() => {
  return newsStore.getItemsByPage
})

const totalPages = computed(() => {
  return newsStore.totalPages
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToDetail = (id) => {
  if (props.contentType === 'news') {
    router.push({ name: 'ContentDetail', params: { type: 'berita', id } })
  } else {
    router.push({ name: 'ContentDetail', params: { type: 'prestasi', id } })
  }
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="bg-primary-500 py-16 md:py-24">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl md:text-5xl font-extrabold text-center text-primary">
          {{ contentType === 'berita' ? 'BERITA' : 'PRESTASI' }}
        </h1>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NewsCard v-for="item in items" :key="item.id" :item="item" @click="goToDetail(item.id)" />
      </div>

      <div class="flex justify-center mt-10">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          :class="[
            'px-4 py-2 mx-1 rounded-md',
            currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-300 text-white hover:bg-blue-500',
          ]"
        >
          Sebelumnya
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          :class="[
            'px-4 py-2 mx-1 rounded-md',
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-300 text-white hover:bg-blue-500',
          ]"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </div>
</template>
