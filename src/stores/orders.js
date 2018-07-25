import Vue from 'vue';
import Firebase from 'firebase/app';
import db from '../utils/db';
import OrderUtils from '../utils/order-utils';
import { RESET_ORDER_LIST, UPDATE_ORDER, ADD_ORDER, REMOVE_ORDER } from './ordersMutation.types';

const ORDERS_COLLECTION = 'orders';

export default {
  namespaced: true,
  state() {
    return {
      orders: [],
    };
  },
  getters: {},
  mutations: {
    [ADD_ORDER](state, order) {
      state.orders.push(order);
    },
    [REMOVE_ORDER](state, order) {
      const orderIndex = state.orders.findIndex(pl => pl.id === order.id);
      state.orders.splice(orderIndex, 1);
    },
    [UPDATE_ORDER](state, order) {
      const orderIndex = state.orders.findIndex(pl => pl.id === order.id);
      Vue.set(state.orders, orderIndex, order);
    },
    [RESET_ORDER_LIST](state) {
      state.orders = [];
    },
  },
  actions: {
    initFromFirebase({ commit }) {
      commit(RESET_ORDER_LIST);

      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);

      db.collection(ORDERS_COLLECTION)
        .where('addedAt', '>', start)
        .where('addedAt', '<', end)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            switch (change.type) {
              case 'added':
                commit(ADD_ORDER, {
                  id: change.doc.id,
                  ...change.doc.data(),
                });
                break;
              case 'modified':
                commit(UPDATE_ORDER, {
                  id: change.doc.id,
                  ...change.doc.data(),
                });
                break;
              case 'removed':
                commit(REMOVE_ORDER, {
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

      await db.collection(ORDERS_COLLECTION).add(newOrder);
    },
    async deleteOrder(context, params) {
      const orderId = params.id;
      if (!orderId) {
        return;
      }

      await db.collection(ORDERS_COLLECTION).doc(orderId).delete();
    },
    async updateOrderInDB(context, params) {
      const {
        orderId,
        set,
        merge,
      } = params;

      await db.collection(ORDERS_COLLECTION).doc(orderId).set(set, { merge: merge || true });
    },
    async updateOrder({ dispatch }, order) {
      const {
        type,
        name,
        numberOfGuest,
      } = order;

      dispatch('updateOrderInDB', {
        orderId: order.id,
        set: {
          type,
          name,
          numberOfGuest,
        },
      });
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

      dispatch('updateOrderInDB', {
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
        dispatch('updateOrderInDB', {
          orderId,
          set: {
            items: {
              [itemFullId]: Firebase.firestore.FieldValue.delete(),
            },
          },
        });
        return;
      }

      dispatch('updateOrderInDB', {
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

      dispatch('updateOrderInDB', {
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

      dispatch('updateOrderInDB', {
        orderId,
        set: {
          endedAt: Firebase.firestore.FieldValue.delete(),
          isEnded: false,
        },
      });
    },
  },
};
