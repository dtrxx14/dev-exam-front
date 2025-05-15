import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import ProductDetails from '@/pages/ProductDetail.vue'
import ProductEdit from '@/pages/ProductEdit.vue'

const routes = [
  {
    path: '/',
    redirect: '/products',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guest: true },
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/pages/Product.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: ProductEdit,
    props: true,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (auth.token) {
    // User logged in: redirect away from guest pages
    if (to.meta.guest) {
      return next({ name: 'Products' }) // Redirect to Products page
    }
    return next() // Proceed normally
  } else {
    // User NOT logged in: protect routes requiring auth
    if (to.meta.requiresAuth) {
      return next({ name: 'Login' }) // Redirect to login page
    }
    return next() // Allow access to guest pages
  }
})

export default router
