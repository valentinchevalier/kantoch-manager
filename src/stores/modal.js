import {
  SHOW_MODAL,
  HIDE_MODAL,
} from './modalMutation.types';

export default {
  namespaced: true,
  state() {
    return {
      isVisible: false,
      component: undefined,
      componentData: {},
    };
  },
  mutations: {
    [SHOW_MODAL](state, { component, componentData }) {
      state.component = component;
      state.componentData = componentData;
      state.isVisible = true;
    },
    [HIDE_MODAL](state) {
      state.isVisible = false;
    },
  },
  actions: {
    hide({ commit }) {
      commit(HIDE_MODAL);
    },
    showCommandCreator({ commit }) {
      commit(SHOW_MODAL, {
        component: 'CommandCreator',
        componentData: { test: 'test' },
      });
    },
  },
};
