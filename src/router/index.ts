import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
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
              path: '/index/follow', //关注页面
              name: 'follow',
              component: () => import('../views/FollowView.vue'),
            },
            {
              path: '/index/hotarticle', //热榜帖子页面
              name: 'hotarticle',
              component: () => import('../views/HotActicle.vue'),
            },
            {
              path: '/index/video', //视频页面
              name: 'video',
              component: () => import('../views/CreateView.vue'),
            },
            {
              path: '/index/novels', //视频页面
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

export default router
