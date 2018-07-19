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
    showCommandCreatorModal({ commit }) {
      commit(SHOW_MODAL, {
        component: 'CommandCreatorModal',
        componentData: {},
      });
    },
    showCommandEditorModal({ commit }, { commandId }) {
      commit(SHOW_MODAL, {
        component: 'CommandEditorModal',
        componentData: {
          commandId,
        },
      });
    },
    showComplexItemEditor({ commit }, { item, commandId }) {
      commit(SHOW_MODAL, {
        component: 'ComplexItemEditor',
        componentData: {
          item,
          commandId,
        },
      });
    },
    showMenuItemEditor({ commit }, { plate }) {
      commit(SHOW_MODAL, {
        component: 'MenuItemEditor',
        componentData: {
          plateId: plate.id,
        },
      });
    },
    showCommandEndingModal({ commit }, { commandId }) {
      commit(SHOW_MODAL, {
        component: 'CommandEndingModal',
        componentData: {
          commandId,
          // class: 'modal-large',
        },
      });
    },
    showCommandBillModal({ commit }, { command }) {
      commit(SHOW_MODAL, {
        component: 'CommandBillModal',
        componentData: {
          command,
        },
      });
    },
  },
};
