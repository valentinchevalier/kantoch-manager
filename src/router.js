import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Command from './views/Command';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/command/:id',
      name: 'command',
      component: Command,
    },
  ],
});
