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
    showOrderCreatorModal({ commit }) {
      commit(SHOW_MODAL, {
        component: 'OrderCreatorModal',
        componentData: {},
      });
    },
    showRegularCustomerCreatorModal({ commit }) {
      commit(SHOW_MODAL, {
        component: 'RegularCustomerCreatorModal',
        componentData: {},
      });
    },
    showRegularCustomerInfosEditorModal({ commit }, { regularCustomerId }) {
      commit(SHOW_MODAL, {
        component: 'RegularCustomerInfosEditorModal',
        componentData: {
          regularCustomerId,
        },
      });
    },
    showRegularCustomerCreditorModal({ commit }, { regularCustomerId }) {
      commit(SHOW_MODAL, {
        component: 'RegularCustomerCreditorModal',
        componentData: {
          regularCustomerId,
        },
      });
    },
    showOrderInfosEditorModal({ commit }, { orderId }) {
      commit(SHOW_MODAL, {
        component: 'OrderInfosEditorModal',
        componentData: {
          orderId,
        },
      });
    },
    showItemChoiceSelector({ commit }, { item }) {
      commit(SHOW_MODAL, {
        component: 'ItemChoiceSelector',
        componentData: {
          item,
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
    showOrderEndingModal({ commit }, { orderId }) {
      commit(SHOW_MODAL, {
        component: 'OrderEndingModal',
        componentData: {
          orderId,
          // class: 'modal-large',
        },
      });
    },
    showOrderBillModal({ commit }, { order }) {
      commit(SHOW_MODAL, {
        component: 'OrderBillModal',
        componentData: {
          order,
        },
      });
    },
  },
};
