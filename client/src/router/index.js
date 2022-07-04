import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import AdminLogin from "@/views/AdminLogin"
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'adminLogin',
    component: AdminLogin
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
