import Vue from 'vue'
import VueRouter from 'vue-router'
import listPromotion from '../views/ListePromotions.vue'
import listArticle from '../views/ListeArticle.vue'
import listQRCodes from '../views/ListeQRCodes.vue'
import Login from '../views/Login.vue'
import {store} from "@/store/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      needsAuth: false,
    },
  },
  {
    path: '/liste-promotion',
    name: 'list-promotion',
    component: listPromotion,
    meta: {
      needsAuth: true,
    },
  },
  {
    path: '/liste-article',
    name: 'list-article',
    component:listArticle,
    meta: {
      needsAuth: true,
    },
  },
  {
    path: '/liste-qrcodes',
    name: 'list-qrcodes',
    component:listQRCodes,
    meta: {
      needsAuth: true,
    },
  }
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

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    if (!store.getters['getToken']) {

      return router.replace("/");
    }
  }
  next();
});

export default router
