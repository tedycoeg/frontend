<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <footer>
    <div class="bg-primary text-white py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row flex-wrap justify-evenly gap-6">
          <div class="flex items-center space-x-3">
            <Icon icon="mdi:location" width="36" height="36" />
            <span class="text-sm">Jl. Perjuangan No.177, Desa Tanjung Selamat, Kec. Sunggal</span>
          </div>

          <div class="flex items-center space-x-3">
            <Icon icon="material-symbols:mail-outline" width="36" height="36" />
            <span class="text-sm">alfarabimuttaqin@gmail.com</span>
          </div>

          <div class="flex items-center space-x-3">
            <Icon icon="mingcute:phone-fill" width="36" height="36" />
            <span class="text-sm">0813 6223 2237</span>
          </div>

          <div class="flex items-center space-x-3">
            <Icon icon="ri:facebook-fill" width="36" height="36" />
            <span class="text-sm">Al Farabi</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-secondary py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-white font-medium text-sm">Copyright 2025 - PPDB AL-FARABI</p>
      </div>
    </div>
  </footer>
</template>
