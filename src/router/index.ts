import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import { useAuthStore } from '@/stores/auth'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/index',
      name: 'index',
      component: IndexView,
          children: [
            {
              path: '/index/follow', //
              name: 'follow',
              component: () => import('../views/FollowView.vue'),
            },
            {
              path: '/index/hotarticle', //
              name: 'hotarticle',
              component: () => import('../views/HotActicle.vue'),
            },
            {
              path: '/index/video', //
              name: 'video',
              component: () => import('../views/CreateView.vue'),
            },
            {
              path: '/index/novels', //
              name: 'search',
              component: () => import('../views/NovelView.vue'),
            },
          ],
    },
    
    {
      path: '/other',
      name: 'other',
      component: () => import('../views/NovelView.vue'),
    },
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: () => import('../views/LoginView.vue'),
    // },
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: () => import('../views/LoginView.vue'),
    // },
  ],
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.loadStoredToken()
  console.log('开始验证路由')
  if (!authStore.isAuthenticated() && to.path !== '/login') {
    return next({ name: 'login' })
  }
  // 如果用户已登录且访问登录页面，跳转到首页
  if (authStore.isAuthenticated() && to.path === '/login') {
    return next({ name: 'home' })
  }
  next()
})
export default router
