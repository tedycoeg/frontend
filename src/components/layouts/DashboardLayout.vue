<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const isAuthenticated = await authStore.checkAuth()
  if (!isAuthenticated) {
    router.push('/login')
  }
})

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6">
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-1/4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-6 md:mb-0 md:mr-6 shadow-lg"
      >
        <div class="flex flex-col items-center mb-8">
          <img src="/images/profil-icon.png" alt="Logo" class="w-36 h-36 drop-shadow-xl mb-4" />
          <h2 class="text-2xl font-bold text-white">Calon Siswa</h2>
        </div>

        <div class="space-y-4">
          <router-link
            to="/dashboard"
            class="flex items-center justify-center bg-white text-primary font-medium py-2 px-4 rounded-lg w-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
            :class="{
              'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white':
                $route.path === '/dashboard',
            }"
          >
            Dashboard
          </router-link>

          <router-link
            to="/dashboard/data-siswa"
            class="flex items-center justify-center bg-white text-primary font-medium py-2 px-4 rounded-lg w-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
            :class="{
              'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white':
                $route.path === '/dashboard/data-siswa',
            }"
          >
            Data Calon Siswa
          </router-link>

          <router-link
            to="/dashboard/berkas"
            class="flex items-center justify-center bg-white text-primary font-medium py-2 px-4 rounded-lg w-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
            :class="{
              'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white':
                $route.path === '/dashboard/berkas',
            }"
          >
            Unggah Berkas
          </router-link>

          <router-link
            to="/dashboard/status"
            class="flex items-center justify-center bg-white text-primary font-medium py-2 px-4 rounded-lg w-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
            :class="{
              'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white':
                $route.path === '/dashboard/status',
            }"
          >
            Hasil Seleksi
          </router-link>

          <button
            @click="logout"
            class="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg w-full mt-8 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <Icon icon="material-symbols:logout-rounded" width="24" height="24" class="mr-2" />
            Keluar
          </button>
        </div>
      </div>

      <div class="w-full md:w-3/4 bg-white rounded-xl p-6 shadow-lg">
        <router-view />
      </div>
    </div>
  </div>
</template>
