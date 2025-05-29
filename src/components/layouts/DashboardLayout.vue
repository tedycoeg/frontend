<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  role: {
    type: String,
    default: 'siswa', // 'siswa' atau 'admin'
    required: false,
  },
})

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const isAuthenticated = await authStore.checkAuth(props.role)
  if (!isAuthenticated) {
    router.push(props.role === 'admin' ? '/admin/login' : '/login')
  }
})

const logout = () => {
  authStore.logout(props.role)
  router.push(props.role === 'admin' ? '/admin/login' : '/login')
}

const isAdmin = computed(() => props.role === 'admin')
const menuItems = computed(() => {
  if (isAdmin.value) {
    return [
      { path: '/admin/dashboard', label: 'Dashboard' },
      { path: '/admin/berita', label: 'Berita' },
      { path: '/admin/prestasi', label: 'Prestasi' },
      { path: '/admin/data-calon-siswa', label: 'Data Calon Siswa' },
    ]
  } else {
    return [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/dashboard/data-siswa', label: 'Data Calon Siswa' },
      { path: '/dashboard/berkas', label: 'Unggah Berkas' },
      { path: '/dashboard/status', label: 'Hasil Seleksi' },
    ]
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6">
    <div class="flex flex-col md:flex-row">
      <div
        class="w-full md:w-1/4 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 mb-6 md:mb-0 md:mr-6 shadow-lg"
      >
        <div class="flex flex-col items-center mb-8">
          <img src="/images/profil-icon.png" alt="Logo" class="w-36 h-36 drop-shadow-xl mb-4" />
          <h2 class="text-2xl font-bold text-white">{{ isAdmin ? 'Admin' : 'Calon Siswa' }}</h2>
        </div>

        <div class="space-y-4">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center justify-center bg-white text-primary font-medium py-2 px-4 rounded-lg w-full shadow-sm hover:shadow-md"
            :class="{
              'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white':
                $route.path === item.path,
            }"
          >
            {{ item.label }}
          </router-link>

          <button
            @click="logout"
            class="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg w-full mt-8 shadow-sm hover:shadow-md cursor-pointer"
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
