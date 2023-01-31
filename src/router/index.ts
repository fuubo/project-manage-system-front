import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    component: import('../views/MenuLayout.vue'),
    children: [{
      path: '/feature/list',
      name: 'featureList',
      meta: {
        title: '需求列表',
        keepAlive: true
      },
      component: () => import('../views/feature/FeatureList.vue')
    }, {
      path: '/feature/taskList',
      name: 'featureTaskList',
      meta: {
        title: '任务列表',
        keepAlive: true
      },
      component: () => import('../views/feature/FeatureTaskList.vue')
    }, {
      path: '/feature/chart',
      name: 'featureChart',
      meta: {
        title: '需求总览',
        keepAlive: true
      },
      component: () => import('../views/feature/FeatureChart.vue')
    }, {
      path: '/system',
      name: 'system',
      meta: {
        title: '系统设置',
        keepAlive: true
      },
      component: () => import('../views/base/SystemSetting.vue')
    }]
  }]
})

export default router
