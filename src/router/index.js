import Vue from 'vue'
import VueRouter from 'vue-router'
import listPromotion from '../views/ListePromotions.vue'
import listArticle from '../views/ListeArticle.vue'
import createPromotion from '../views/CreatePromotions.vue'
import createArticle from '../views/CreateArticle.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/liste-promotion',
    name: 'list-promotion',
    component: listPromotion
  },
  {
    path: '/create-promotion',
    name: 'create-promotion',
    component: createPromotion
  },
  {
    path: '/liste-article',
    name: 'list-article',
    component:listArticle
  },
  {
    path: '/create-article',
    name: 'create-article',
    component: createArticle
  },
  // {
  //   path: '/*',
  //   name: 'Login',
  //   component: Login
  // }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
