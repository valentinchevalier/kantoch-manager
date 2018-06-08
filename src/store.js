import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import kantoch from './stores/kantoch';
import modal from './stores/modal';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    kantoch,
    modal,
  },
  strict: debug,
  plugins: [createPersistedState()],
});
