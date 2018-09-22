import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import menu from './stores/menu';
import orders from './stores/orders';
import regularCustomers from './stores/regularCustomers';
import modal from './stores/modal';
import temporaryOrder from './stores/temporaryOrder';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {},
  modules: {
    menu,
    orders,
    regularCustomers,
    modal,
    temporaryOrder,
  },
  strict: debug,
  plugins: [createPersistedState()],
});
