import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        components: {
          default: () => import('../pages/IndexPage/IndexPage.vue'),
          fabs: () => import('../pages/IndexPage/IndexPageFabs.vue')
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/404',
    alias: '/:catchAll(.*)*',
    component: () => import('../pages/Error404Page.vue')
  }
]

export default routes
