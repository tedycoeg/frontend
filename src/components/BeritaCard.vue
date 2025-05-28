<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>

<template>
  <div
    @click="onClick"
    class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
  >
    <div class="h-48 overflow-hidden">
      <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold text-primary mb-2">{{ item.title }}</h3>
      <p class="text-gray-600 mb-4">{{ item.excerpt }}</p>
    </div>
  </div>
</template>
