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
      path: '/index',
      name: 'index',
      component: IndexView,
          children: [
            {
              path: 'follow', //
              name: 'follow',
              component: () => import('../views/CorrectionView.vue'),
            },
            {
              path: 'hotarticle', //
              name: 'hotarticle',
              component: () => import('../views/HotActicle.vue'),
            },
            {
              path: 'create', //
              name: 'create',
              component: () => import('../views/CreateView.vue'),
            },
            {
              path: 'novels', //
              name: 'novels',
              component: () => import('../views/NovelView.vue'),
            },
            {
              path: 'profile',
              name: 'profile',
              component: () => import('../views/ProfileView.vue'),
            },
            {
              path: 'correction',
              name: 'correction',
              component: () => import('../views/CorrectionView.vue'),
            },
            {
              path: 'comment',
              name: 'comment',
              component: () => import('../views/CommentsView.vue'),
            },
            {
              path: 'myarticle',
              name: 'myarticle',
              component: () => import('../views/MyChapterView.vue'),
            },
            {
              path: 'collection',
              name: 'collection',
              component: () => import('../views/MyCollectView.vue'),
            },
            {
              path: 'chapterdetail',
              name: 'chapterdetail',
              component: () => import('../views/ArticleDetail.vue'),
            },
            {
              path: 'convert',
              name: 'convert',
              component: () => import('../views/ConvertView.vue'),
            },
            {
              path: 'search',
              name: 'search',
              component: () => import('../components/SearchResuList.vue'),
            },
          ],
    },

  ],
})
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   authStore.loadStoredToken()
//   console.log('开始验证路由')
//   if (!authStore.isAuthenticated() && to.path !== '/login') {
//     return next({ name: 'login' })
//   }
//   // 如果用户已登录且访问登录页面，跳转到首页
//   if (authStore.isAuthenticated() && to.path === '/login') {
//     return next({ name: 'home' })
//   }
//   next()
// })
export default router
