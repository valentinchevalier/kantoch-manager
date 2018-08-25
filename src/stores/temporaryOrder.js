import Vue from 'vue';
import OrderUtils from '../utils/order-utils';
import { SET_ITEM, RESET_ITEMS } from './temporaryOrder.types';

export default {
  namespaced: true,
  state() {
    return {
      items: {},
    };
  },
  getters: {},
  mutations: {
    [SET_ITEM](state, { fullId, item }) {
      if (item.quantity <= 0) {
        Vue.delete(state.items, fullId);
        return;
      }
      Vue.set(state.items, fullId, item);
    },
    [RESET_ITEMS](state) {
      state.items = {};
    },
  },
  actions: {
    resetItems({ commit }) {
      commit(RESET_ITEMS);
    },
    addOneItem({ state, dispatch }, params) {
      const {
        item,
        quantity,
      } = params;

      if (!item.plateId) {
        return;
      }

      const itemFullId = OrderUtils.orderItemFullId(item.plateId, item.choiceId);
      const newQuantity = state.items[itemFullId] ? state.items[itemFullId].quantity + quantity : quantity;

      dispatch('setItemQuantity', { item, quantity: newQuantity });
    },
    setItemQuantity({ state, commit }, params) {
      const {
        item,
        quantity,
      } = params;

      if (!item.plateId) {
        return;
      }

      const itemFullId = OrderUtils.orderItemFullId(item.plateId, item.choiceId);
      let currentItem;

      if (!state.items[itemFullId]) {
        currentItem = {
          plateId: item.plateId,
          quantity,
        };

        if (item.choiceId) {
          currentItem.choiceId = item.choiceId;
        }
      } else {
        currentItem = Object.assign({}, state.items[itemFullId]);
        currentItem.quantity = quantity;
      }

      commit(SET_ITEM, {
        fullId: itemFullId,
        item: currentItem,
      });
    },
  },
};
