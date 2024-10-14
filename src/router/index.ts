import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
      component: HomeView,
      children: [
        {
          path: '/index', //首页
          name: 'index',
          redirect: '/index/follow',
          component: () => import('../views/IndexView.vue'),
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
              component: () => import('../views/VideoView.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
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
