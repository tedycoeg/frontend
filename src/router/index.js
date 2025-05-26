import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/profil",
    name: "Profil",
    component: () => import("@/views/ProfilePage.vue"),
  },
  {
    path: "/informasi",
    name: "Informasi",
    component: () => import("@/views/InformationPage.vue"),
  },
  {
    path: "/kontak",
    name: "Kontak",
    component: () => import("@/views/ContactPage.vue"),
  },
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

export default router
