<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-24">
        <div class="flex items-center space-x-4">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-16 h-16 flex-shrink-0">
              <img
                src="/images/logo.svg"
                alt="Logo Sekolah Al-Farabi"
                class="w-full h-full rounded-full"
              />
            </div>
            <div class="hidden sm:block">
              <h1 class="text-base font-bold text-primary leading-tight">
                PENDAFTARAN PESERTA DIDIK BARU
              </h1>
              <p class="text-base font-bold text-primary leading-tight">
                YAYASAN PENDIDIKAN MUTTAQIN AL-FARABI
              </p>
            </div>
          </router-link>
        </div>

        <div class="hidden lg:flex space-x-1">
          <router-link
            to="/"
            class="px-4 py-2 rounded font-bold text-sm transition-all duration-200"
            :class="
              $route.path === '/'
                ? 'bg-primary text-white shadow-md'
                : 'text-primary hover:text-primary hover:bg-blue-50'
            "
          >
            HOME
          </router-link>
          <router-link
            to="/profil"
            class="px-4 py-2 rounded font-bold text-sm transition-all duration-200"
            :class="
              $route.path === '/profil'
                ? 'bg-primary text-white shadow-md'
                : 'text-primary hover:text-primary hover:bg-blue-50'
            "
          >
            PROFIL
          </router-link>
          <router-link
            to="/informasi"
            class="px-4 py-2 rounded font-bold text-sm transition-all duration-200"
            :class="
              $route.path === '/informasi'
                ? 'bg-primary text-white shadow-md'
                : 'text-primary hover:text-primary hover:bg-blue-50'
            "
          >
            INFORMASI
          </router-link>
          <router-link
            to="/berita"
            class="px-4 py-2 rounded font-bold text-sm transition-all duration-200"
            :class="
              $route.path === '/berita'
                ? 'bg-primary text-white shadow-md'
                : 'text-primary hover:text-primary hover:bg-blue-50'
            "
          >
            BERITA
          </router-link>
          <router-link
            to="/kontak"
            class="px-4 py-2 rounded font-bold text-sm transition-all duration-200"
            :class="
              $route.path === '/kontak'
                ? 'bg-primary text-white shadow-md'
                : 'text-primary hover:text-primary hover:bg-blue-50'
            "
          >
            KONTAK
          </router-link>
          <router-link
            to="/daftar"
            class="px-4 py-2 rounded font-bold text-sm transition-all duration-200"
            :class="
              $route.path.includes('/daftar')
                ? 'bg-primary text-white shadow-md'
                : 'text-primary hover:text-blue-800 hover:bg-blue-50'
            "
          >
            DAFTAR
          </router-link>
          <router-link
            to="/login"
            class="px-4 py-2 rounded font-bold text-sm transition-all duration-200"
            :class="
              $route.path === '/login'
                ? 'bg-primary text-white shadow-md'
                : 'text-primary hover:text-blue-800 hover:bg-blue-50'
            "
          >
            LOGIN
          </router-link>
        </div>

        <div class="lg:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-primary hover:text-primary focus:outline-none"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
              />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="mobileMenuOpen" class="lg:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          <router-link
            to="/"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-bold rounded-md transition-all duration-200"
            :class="
              $route.path === '/'
                ? 'bg-primary text-white'
                : 'text-primary hover:text-primary hover:bg-blue-50'
            "
          >
            HOME
          </router-link>
          <router-link
            to="/profil"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-bold rounded-md transition-all duration-200"
            :class="
              $route.path === '/profil'
                ? 'bg-primary text-white'
                : 'text-primary hover:text-primary hover:bg-blue-50'
            "
          >
            PROFIL
          </router-link>
          <router-link
            to="/informasi"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-bold rounded-md transition-all duration-200"
            :class="
              $route.path === '/informasi'
                ? 'bg-primary text-white'
                : 'text-primary hover:text-primary hover:bg-blue-50'
            "
          >
            INFORMASI
          </router-link>
          <router-link
            to="/berita"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-bold rounded-md transition-all duration-200"
            :class="
              $route.path === '/berita'
                ? 'bg-primary text-white'
                : 'text-primary hover:text-primary hover:bg-blue-50'
            "
          >
            BERITA
          </router-link>
          <router-link
            to="/kontak"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-bold rounded-md transition-all duration-200"
            :class="
              $route.path === '/kontak'
                ? 'bg-primary text-white'
                : 'text-primary hover:text-primary hover:bg-blue-50'
            "
          >
            KONTAK
          </router-link>
          <router-link
            to="/daftar"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-bold rounded-md transition-all duration-200"
            :class="
              $route.path === '/daftar'
                ? 'bg-primary text-white'
                : 'text-primary hover:text-blue-800 hover:bg-blue-50'
            "
          >
            DAFTAR
          </router-link>
          <router-link
            to="/login"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-base font-bold rounded-md transition-all duration-200"
            :class="
              $route.path === '/login'
                ? 'bg-primary text-white'
                : 'text-primary hover:text-blue-800 hover:bg-blue-50'
            "
          >
            LOGIN
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
