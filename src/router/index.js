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
      },
      {
        path: "profil",
        name: "Profil",
        component: () => import("@/views/ProfilePage.vue"),
      },
      {
        path: "informasi",
        name: "Informasi",
        component: () => import("@/views/InformationPage.vue"),
      },
      {
        path: "berita",
        name: "Berita",
        component: () => import("@/views/BeritaPage.vue"),
      },
      {
        path: "berita/semua",
        name: "BeritaList",
        component: () => import("@/views/ContentListPage.vue"),
        props: {
          contentType: 'berita'
        }
      },
      {
        path: "prestasi/semua",
        name: "PrestasiList",
        component: () => import("@/views/ContentListPage.vue"),
        props: {
          contentType: 'prestasi'
        }
      },
      {
        path: ":type/:id",
        name: "ContentDetail",
        component: () => import("@/views/ContentDetailPage.vue"),
      },
      {
        path: "kontak",
        name: "Kontak",
        component: () => import("@/views/ContactPage.vue"),
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
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/LoginPage.vue"),
      },
    ]
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/views/dashboard/DashboardPage.vue"),
      },
      {
        path: "data-siswa",
        name: "DataSiswa",
        component: () => import("@/views/dashboard/DataSiswaPage.vue"),
      },
      {
        path: "berkas",
        name: "Berkas",
        component: () => import("@/views/dashboard/BerkasPage.vue"),
      },
      {
        path: "status",
        name: "Status",
        component: () => import("@/views/dashboard/StatusPage.vue"),
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

// Navigation Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = localStorage.getItem('token')

  if (requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
