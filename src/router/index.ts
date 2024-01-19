import { createRouter, createWebHistory } from 'vue-router'
import NanimachiView from '@/views/NanimachiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: NanimachiView,
    },
    {
      path: '/nanikiru',
      name: 'nanikiru',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/NanikiruView.vue'),
    },
    {
      path: '/help',
      name: 'help',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/HelpView.vue'),
    },
  ],
})

export default router
