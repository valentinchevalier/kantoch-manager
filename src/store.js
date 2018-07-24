import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import menu from './stores/menu';
import orders from './stores/orders';
import modal from './stores/modal';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {},
  modules: {
    menu,
    orders,
    modal,
  },
  strict: debug,
  plugins: [createPersistedState()],
});
