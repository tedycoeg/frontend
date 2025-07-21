import { createRouter, createWebHistory } from "vue-router"
import MainLayout from "@/components/layouts/MainLayout.vue"
import AuthLayout from "@/components/layouts/AuthLayout.vue"
import DashboardLayout from "@/components/layouts/DashboardLayout.vue"

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/HomePage.vue"),
        meta: { title: "Al-Farabi - Beranda" }
      },
      {
        path: "profil",
        name: "Profil",
        component: () => import("@/views/ProfilePage.vue"),
        meta: { title: "Al-Farabi - Profil Sekolah" }
      },
      {
        path: "informasi",
        name: "Informasi",
        component: () => import("@/views/InformationPage.vue"),
        meta: { title: "Al-Farabi - Informasi Pendaftaran" }
      },
      {
        path: "berita",
        name: "Berita",
        component: () => import("@/views/BeritaPage.vue"),
        meta: { title: "Al-Farabi - Berita" }
      },
      {
        path: "berita/semua",
        name: "BeritaList",
        component: () => import("@/views/ContentListPage.vue"),
        props: {
          contentType: 'berita'
        },
        meta: { title: "Al-Farabi - Semua Berita" }
      },
      {
        path: "prestasi/semua",
        name: "PrestasiList",
        component: () => import("@/views/ContentListPage.vue"),
        props: {
          contentType: 'prestasi'
        },
        meta: { title: "Al-Farabi - Semua Prestasi" }
      },
      {
        path: ":type/:id",
        name: "ContentDetail",
        component: () => import("@/views/ContentDetailPage.vue"),
        meta: { title: "Al-Farabi - Detail" }
      },
      {
        path: "kontak",
        name: "Kontak",
        component: () => import("@/views/ContactPage.vue"),
        meta: { title: "Al-Farabi - Kontak" }
      },
    ]
  },
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "daftar",
        name: "Daftar",
        component: () => import("@/views/DaftarPage.vue"),
        meta: { title: "Al-Farabi - Pendaftaran" }
      },
      {
        path: "login",
        name: "SiswaLogin",
        component: () => import("@/views/LoginPage.vue"),
        meta: { title: "Al-Farabi - Login Siswa" }
      },
      {
        path: "admin/login",
        name: "AdminLogin",
        component: () => import("@/views/dashboard/admin/LoginPage.vue"),
        meta: { title: "Al-Farabi - Login Admin" }
      },{
        path: "forgot-password",
        name: "ForgotPassword",
        component: () => import("@/views/ForgotPasswordPage.vue"),
        meta: { title: "Al-Farabi - Lupa Password" }
      },
      {
        path: "reset-password/:token",
        name: "ResetPassword",
        component: () => import("@/views/ResetPasswordPage.vue"),
        meta: { title: "Al-Farabi - Reset Password" }
      },
      
    ]
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    props: { role: 'siswa' },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/dashboard/siswa/DashboardPage.vue"),
        meta: { title: "Al-Farabi - Dashboard Siswa" }
      },
      {
        path: "data-siswa",
        name: "DataSiswa",
        component: () => import("@/views/dashboard/siswa/DataSiswaPage.vue"),
        meta: { title: "Al-Farabi - Data Siswa" }
      },
      {
        path: "berkas",
        name: "Berkas",
        component: () => import("@/views/dashboard/siswa/BerkasPage.vue"),
        meta: { title: "Al-Farabi - Berkas Pendaftaran" }
      },
      {
        path: "status",
        name: "Status",
        component: () => import("@/views/dashboard/siswa/StatusPage.vue"),
        meta: { title: "Al-Farabi - Status Pendaftaran" }
      },
    ]
  },
  {
    path: "/admin",
    component: DashboardLayout,
    meta: { requiresAdminAuth: true },
    props: { role: 'admin' },
    children: [
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () => import("@/views/dashboard/admin/DashboardPage.vue"),
        meta: { title: "Al-Farabi - Dashboard Admin" }
      },
      {
        path: "berita",
        name: "AdminBerita",
        component: () => import("@/views/dashboard/admin/BeritaPage.vue"),
        meta: { title: "Al-Farabi - Kelola Berita" }
      },
      {
        path: "prestasi",
        name: "AdminPrestasi",
        component: () => import("@/views/dashboard/admin/PrestasiPage.vue"),
        meta: { title: "Al-Farabi - Kelola Prestasi" }
      },
      {
        path: "data-calon-siswa",
        name: "AdminDataCalonSiswa",
        component: () => import("@/views/dashboard/admin/DataCalonSiswaPage.vue"),
        meta: { title: "Al-Farabi - Data Calon Siswa" }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  const defaultTitle = 'Al-Farabi Islamic School'
  document.title = to.meta.title || defaultTitle

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdminAuth = to.matched.some(record => record.meta.requiresAdminAuth)
  const token = localStorage.getItem('token')
  const adminToken = localStorage.getItem('adminToken')

  // Cek autentikasi
  if (requiresAuth && !token) {
    next('/login')
  } else if (requiresAdminAuth && !adminToken) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router
