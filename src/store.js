import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import menu from './stores/menu';
import commands from './stores/commands';
import modal from './stores/modal';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {},
  modules: {
    menu,
    commands,
    modal,
  },
  strict: debug,
  plugins: [createPersistedState()],
});
