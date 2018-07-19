import Vue from 'vue';
import Router from 'vue-router';
import HomeView from './views/HomeView';
import CommandEditionView from './views/CommandEditionView';
import CommandsOfTheDayView from './views/CommandsOfTheDayView';
import CommandHistoryView from './views/CommandHistoryView';
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
