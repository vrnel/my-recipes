import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { db, firebase } from "@/firebase";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresGuest: true } 
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/overview',
    name: 'Overview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Overview.vue'),
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const requiresGuest = to.matched.some(x => x.meta.requiresGuest);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (requiresGuest && currentUser) {
    next('/overview');
  } else {
    next();
  }
});

export default router;
