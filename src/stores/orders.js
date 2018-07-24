import Vue from 'vue';
import Firebase from 'firebase/app';
import db from '../utils/db';
import OrderUtils from '../utils/order-utils';
import { RESET_COMMAND_LIST, UPDATE_COMMAND, ADD_COMMAND, REMOVE_COMMAND } from './ordersMutation.types';

const COMMANDS_COLLECTION = 'orders';

export default {
  namespaced: true,
  state() {
    return {
      orders: [],
    };
  },
  getters: {},
  mutations: {
    [ADD_COMMAND](state, order) {
      state.orders.push(order);
    },
    [REMOVE_COMMAND](state, order) {
      const orderIndex = state.orders.findIndex(pl => pl.id === order.id);
      state.orders.splice(orderIndex, 1);
    },
    [UPDATE_COMMAND](state, order) {
      const orderIndex = state.orders.findIndex(pl => pl.id === order.id);
      Vue.set(state.orders, orderIndex, order);
    },
    [RESET_COMMAND_LIST](state) {
      state.orders = [];
    },
  },
  actions: {
    initFromFirebase({ commit }) {
      commit(RESET_COMMAND_LIST);

      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);

      db.collection(COMMANDS_COLLECTION)
        .where('addedAt', '>', start)
        .where('addedAt', '<', end)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            switch (change.type) {
              case 'added':
                commit(ADD_COMMAND, {
                  id: change.doc.id,
                  ...change.doc.data(),
                });
                break;
              case 'modified':
                commit(UPDATE_COMMAND, {
                  id: change.doc.id,
                  ...change.doc.data(),
                });
                break;
              case 'removed':
                commit(REMOVE_COMMAND, {
                  id: change.doc.id,
                });
                break;
              default:
                break;
            }
          });
        });
    },
    async addOrder(context, order) {
      const newOrder = {
        ...order,
        items: {},
        addedAt: new Date(),
      };

      await db.collection(COMMANDS_COLLECTION).add(newOrder);
    },
    async updateOrder({ dispatch }, order) {
      const {
        type,
        name,
        numberOfGuest,
      } = order;

      dispatch('updateInDB', {
        orderId: order.id,
        set: {
          type,
          name,
          numberOfGuest,
        },
      });
    },
    async updateInDB(context, params) {
      const {
        orderId,
        set,
        merge,
      } = params;

      await db.collection(COMMANDS_COLLECTION).doc(orderId).set(set, { merge: merge || true });
    },
    async addItemToOrder({ state, dispatch }, params) {
      const {
        orderId,
        item,
      } = params;

      if (!item.plateId) {
        return;
      }

      const itemFullId = OrderUtils.orderItemFullId(item.plateId, item.choiceId);
      let set = {
        plateId: item.plateId,
        quantity: 1,
      };

      if (item.choiceId) {
        set.choiceId = item.choiceId;
      }
      const currentOrder = state.orders.find(order => order.id === orderId);
      const currentItem = currentOrder.items[itemFullId];

      if (currentItem) {
        set = {
          quantity: currentItem.quantity + 1,
        };
      }

      dispatch('updateInDB', {
        orderId,
        set: {
          items: {
            [itemFullId]: set,
          },
        },
      });
    },
    async removeItemToOrder({ state, dispatch }, params) {
      const {
        orderId,
        item,
      } = params;
      let {
        quantity,
      } = params;

      if (!item.plateId) {
        return;
      }

      const itemFullId = OrderUtils.orderItemFullId(item.plateId, item.choiceId);
      const currentOrder = state.orders.find(order => order.id === orderId);
      const currentItem = currentOrder.items[itemFullId];

      if (!currentItem) {
        return;
      }

      quantity = quantity || 1;

      const newQuantity = currentItem.quantity - quantity;
      if (newQuantity <= 0) {
        dispatch('updateInDB', {
          orderId,
          set: {
            items: {
              [itemFullId]: Firebase.firestore.FieldValue.delete(),
            },
          },
        });
        return;
      }

      dispatch('updateInDB', {
        orderId,
        set: {
          items: {
            [itemFullId]: {
              quantity: newQuantity,
            },
          },
        },
      });
    },
    async closeOrder({ dispatch }, params) {
      const {
        orderId,
        bill,
      } = params;

      dispatch('updateInDB', {
        orderId,
        set: {
          bill: JSON.parse(JSON.stringify(bill)),
          endedAt: new Date(),
          isEnded: true,
        },
      });
    },
    async openOrder({ dispatch }, params) {
      const {
        orderId,
      } = params;

      dispatch('updateInDB', {
        orderId,
        set: {
          endedAt: Firebase.firestore.FieldValue.delete(),
          isEnded: false,
        },
      });
    },
  },
};
