<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNewsStore } from '@/stores/berita'

const router = useRouter()
const route = useRoute()
const newsStore = useNewsStore()

const contentItem = computed(() => {
  return newsStore.getItemById(route.params.id)
})

const contentParagraphs = computed(() => {
  if (!contentItem.value) return []
  return contentItem.value.content.split('\n\n').filter((p) => p.trim() !== '')
})

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div v-if="contentItem" class="container mx-auto px-4 py-12 max-w-4xl">
      <h2 class="text-3xl md:text-4xl font-extrabold text-primary mb-2">{{ contentItem.title }}</h2>
      <p class="text-xl text-gray-600 mb-6">{{ contentItem.subtitle }}</p>
      <p class="text-gray-500 mb-8">{{ contentItem.date }}</p>

      <div class="mb-10 rounded-lg overflow-hidden">
        <img :src="contentItem.image" :alt="contentItem.title" class="w-full h-auto" />
      </div>

      <div class="prose prose-lg max-w-none">
        <p v-for="(paragraph, index) in contentParagraphs" :key="index" class="mb-4 text-justify">
          {{ paragraph }}
        </p>
      </div>

      <div class="mt-12">
        <button
          @click="goBack"
          class="bg-blue-300 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-xl"
        >
          Kembali
        </button>
      </div>
    </div>

    <div v-else class="container mx-auto px-4 py-12 text-center">
      <p class="text-xl text-gray-600">Konten tidak ditemukan</p>
      <button
        @click="goBack"
        class="mt-6 bg-blue-300 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-xl"
      >
        Kembali
      </button>
    </div>
  </div>
</template>
