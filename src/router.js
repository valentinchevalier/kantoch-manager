import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

import HomeView from './views/HomeView';
import OrderEditionView from './views/OrderEditionView';
import OrdersOfTheDayView from './views/OrdersOfTheDayView';
import OrderHistoryView from './views/OrderHistoryView';
import SettingsView from './views/SettingsView';
import LoginView from './views/LoginView';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        noAuth: true,
      },
    },
    {
      path: '/order/:id',
      name: 'order',
      component: OrderEditionView,
    },
    {
      path: '/orders-of-the-day',
      name: 'orders-of-the-day',
      component: OrdersOfTheDayView,
    },
    {
      path: '/order-history',
      name: 'order-history',
      component: OrderHistoryView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => !record.meta.noAuth);

  if (!requiresAuth) {
    next();
    return;
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      next();
    } else {
      next('login');
    }
  });
});

export default router;
