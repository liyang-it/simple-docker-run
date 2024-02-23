import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
const IndexView = () => import('../views/IndexView.vue')
const router = createRouter({
  history: createWebHashHistory(
    import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'IndexView',
    component: IndexView
  }]
})

export default router