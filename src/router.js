import Vue from 'vue';
import Router from 'vue-router';

import HomeView from './views/HomeView';
import OrderEditionView from './views/OrderEditionView';
import OrdersManagerView from './views/OrdersManagerView';
import OrderHistoryView from './views/OrderHistoryView';
import SettingsView from './views/SettingsView';
import LoginView from './views/LoginView';
import Authentication from './utils/authentication';

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
      path: '/orders-manager',
      name: 'orders-manager',
      component: OrdersManagerView,
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

  Authentication.isLoggedIn()
    .then((res) => {
      if (!res) {
        next('login');
      } else {
        next();
      }
    });
});

export default router;
