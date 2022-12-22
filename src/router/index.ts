import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/me',
      name: 'me',
      meta: {
        title: '我的'
      },
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/contract',
      name: 'contract',
      meta: {
        title: '合同'
      },
      component: () => import('../views/ContractPage.vue')
    },
    {
      path: '/contract/preview',
      name: 'contractPreview',
      meta: {
        title: '合同查看'
      },
      component: () => import('../views/ContractPreview.vue')
    }
  ]
})

export default router
