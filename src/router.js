import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

import HomeView from './views/HomeView';
import CommandEditionView from './views/CommandEditionView';
import CommandsOfTheDayView from './views/CommandsOfTheDayView';
import CommandHistoryView from './views/CommandHistoryView';
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
      path: '/command/:id',
      name: 'command',
      component: CommandEditionView,
    },
    {
      path: '/commands-of-the-day',
      name: 'commands-of-the-day',
      component: CommandsOfTheDayView,
    },
    {
      path: '/command-history',
      name: 'command-history',
      component: CommandHistoryView,
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
