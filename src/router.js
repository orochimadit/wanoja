import Vue from 'vue'
import Router from 'vue-router'
// import component Home dan About 
import Home from './views/Home.vue' // boleh juga -> import CHeader from '@/views/Home.vue'
import About from './views/About.vue'
import store from './store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // jika routenya / maka component yang akan ditampilkan pada router-view adalah Home
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import( /* webpackChunkName: "categories" */ './views/Categories.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import( /* webpackChunkName: "books" */ './views/Products.vue')
},
{
  path: '/category/:slug',
  name: 'category',
  component: () => import( /* webpackChunkName: "category" */ './views/Category.vue')
},
{
  path: '/product/:slug',
  name: 'product',
  component: () => import( /* webpackChunkName: "book" */ './views/Product.vue')
},
{
  path: '/checkout',
  name: 'checkout',
  component: () => import( /* webpackChunkName: "checkout" */ './views/Checkout.vue'),
  meta: { auth: true } //ini yaa dit jgn lupa
},
{
  path: '/payment',
  name: 'payment',
  component: () => import( /* webpackChunkName: payment */ './views/Payment.vue'),
  meta: { auth: true }
},
{
  path: '/profile',
  name: 'profile',
  component: () => import( /* webpackChunkName: "profile" */ './views/Profile.vue'),
  meta: { auth: true }
},
    // jika routensya apapun selain definisi di atas maka component yang akan ditampilkan pada router-view 
    // adalah Home, route default untuk mencegah error
    { 
      path: '*', 
      redirect: { 
        name: 'home' 
      }
    },
  ],
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if(store.getters['auth/guest']){
      store.dispatch('alert/set', {
        status : true,
        text  : 'Login first',
        type  : 'error',
      })
      store.dispatch('setPrevUrl', to.path)
      store.dispatch('dialog/setComponent', 'login')
      store.dispatch('dialog/setStatus', true)
    }
    else{
      next()
    } 
  }
  else{
      next()
  }
})

export default router