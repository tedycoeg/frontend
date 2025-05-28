<script setup>
import NavbarLayout from '@/components/layouts/NavbarLayout.vue'
import FooterLayout from '@/components/layouts/FooterLayout.vue'
</script>

<template>
  <div class="layout-main">
    <NavbarLayout />
    <router-view />
    <FooterLayout />
  </div>
</template>
