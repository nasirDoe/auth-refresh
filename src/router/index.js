import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticate = store.getters['user/isAuthenticated']
  const publicPages = ['/', '/register']
  if (isAuthenticate) {
    if (publicPages.includes(to.path)) next('/dashboard')
    else next()
  } else {
    if (publicPages.includes(to.path)) next()
    else next('/')
  }
})

export default router
