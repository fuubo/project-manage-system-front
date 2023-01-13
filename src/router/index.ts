import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    component: import('../views/MenuLayout.vue'),
    children: [{
      path: '/feature/list',
      name: 'contractList',
        meta: {
          title: '需求列表',
          keepAlive: true
        },
      component: () => import('../views/feature/FeatureList.vue')
    }]
  }]
})

export default router
