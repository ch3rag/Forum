import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import LoginToken from '../views/LoginToken.vue';
import Admin from '../views/Admin.vue';
import Forum from '../views/Forum.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/forum',
    name: 'Forum',
    component: Forum,
  },
  {
    path: '/login/token/:token',
    name: 'login-token',
    component: LoginToken,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter(to, from, next) {
      if (store.getters.isLoggedIn) {
        next();
      } else {
        next('/');
      }
    },
  },
];

const router = new VueRouter({
//   mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
