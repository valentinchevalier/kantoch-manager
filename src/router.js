import Vue from 'vue';
import Router from 'vue-router';
import HomeView from './views/HomeView';
import CommandEditionView from './views/CommandEditionView';
import CommandManagerView from './views/CommandManagerView';
import SettingsView from './views/SettingsView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/command/:id',
      name: 'command',
      component: CommandEditionView,
    },
    {
      path: '/command-manager',
      name: 'command-manager',
      component: CommandManagerView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
});
