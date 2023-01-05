import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    redirect: '/contract/list'
  },
  {
    path: '/contract',
    component: () => import('../views/contract/ContractLayout.vue'),
    children: [{
      path: 'list',
      name: 'contractList',
      meta: {
        title: '合同',
        keepAlive: true
      },
      component: () => import('../views/contract/ContractPage.vue')
    },
    {
      path: 'me',
      name: 'contractMe',
      meta: {
        title: '我的'
      },
      component: () => import('../views/contract/HomePage.vue')
    },
    {
      path: 'preview',
      name: 'contractPreview',
      meta: {
        title: '合同查看'
      },
      component: () => import('../views/contract/ContractPreview.vue')
    }]
  }
  ]
})

export default router
