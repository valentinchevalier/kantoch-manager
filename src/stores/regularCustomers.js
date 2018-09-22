import Vue from 'vue';
// import Firebase from 'firebase/app';
import db from '../utils/db';
import Utils from '../utils/utils';
import { RESET_REGULAR_CUSTOMER_LIST, UPDATE_REGULAR_CUSTOMER, ADD_REGULAR_CUSTOMER, REMOVE_REGULAR_CUSTOMER } from './regularCustomers.types';

const REGULAR_CUSTOMERS_COLLECTION = 'regularCustomers';

export default {
  namespaced: true,
  state() {
    return {
      regularCustomers: [],
    };
  },
  getters: {},
  mutations: {
    [ADD_REGULAR_CUSTOMER](state, regularCustomer) {
      const regularCustomerIndex = state.regularCustomers.findIndex(pl => pl.id === regularCustomer.id);
      if (regularCustomerIndex === -1) {
        state.regularCustomers.push(regularCustomer);
      } else {
        Vue.set(state.regularCustomers, regularCustomerIndex, regularCustomer);
      }
    },
    [REMOVE_REGULAR_CUSTOMER](state, regularCustomer) {
      const regularCustomerIndex = state.regularCustomers.findIndex(pl => pl.id === regularCustomer.id);
      state.regularCustomers.splice(regularCustomerIndex, 1);
    },
    [UPDATE_REGULAR_CUSTOMER](state, regularCustomer) {
      const regularCustomerIndex = state.regularCustomers.findIndex(pl => pl.id === regularCustomer.id);
      Vue.set(state.regularCustomers, regularCustomerIndex, regularCustomer);
    },
    [RESET_REGULAR_CUSTOMER_LIST](state) {
      state.regularCustomers = [];
    },
  },
  actions: {
    initFromFirebase({ commit }) {
      commit(RESET_REGULAR_CUSTOMER_LIST);

      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);

      db.collection(REGULAR_CUSTOMERS_COLLECTION)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            switch (change.type) {
              case 'added':
                commit(ADD_REGULAR_CUSTOMER, {
                  id: change.doc.id,
                  ...change.doc.data(),
                });
                break;
              case 'modified':
                commit(UPDATE_REGULAR_CUSTOMER, {
                  id: change.doc.id,
                  ...change.doc.data(),
                });
                break;
              case 'removed':
                commit(REMOVE_REGULAR_CUSTOMER, {
                  id: change.doc.id,
                });
                break;
              default:
                break;
            }
          });
        });
    },
    async addRegularCustomer(context, regularCustomer) {
      const {
        name,
        startAmount,
      } = regularCustomer;

      const newRegularCustomer = {
        name,
        startAmount,
        orders: {},
        moneyDeposits: {},
        addedAt: new Date(),
      };

      await db.collection(REGULAR_CUSTOMERS_COLLECTION).add(newRegularCustomer);
    },
    async deleteRegularCustomer(context, params) {
      const regularCustomerId = params.id;
      if (!regularCustomerId) {
        return;
      }

      await db.collection(REGULAR_CUSTOMERS_COLLECTION).doc(regularCustomerId).delete();
    },
    async updateRegularCustomerInDB(context, params) {
      const {
        regularCustomerId,
        set,
        merge,
      } = params;

      await db.collection(REGULAR_CUSTOMERS_COLLECTION).doc(regularCustomerId).set(set, { merge: merge || true });
    },
    async updateRegularCustomer({ dispatch }, regularCustomer) {
      const {
        name,
        startAmount,
      } = regularCustomer;

      dispatch('updateRegularCustomerInDB', {
        regularCustomerId: regularCustomer.id,
        set: {
          name,
          startAmount,
        },
      });
    },
    async creditRegularCustomer({ dispatch }, params) {
      const {
        regularCustomerId,
        amount,
      } = params;

      if (amount === 0) {
        return;
      }

      const newId = Utils.generateID();

      dispatch('updateRegularCustomerInDB', {
        regularCustomerId,
        set: {
          moneyDeposits: {
            [newId]: {
              amount,
              addedAt: new Date(),
            },
          },
        },
      });
    },
    addOrderToRegularCustomer: {
      root: true,
      handler({ dispatch }, params) {
        const {
          regularCustomerId,
          orderId,
          amount,
        } = params;

        if (!regularCustomerId || amount === 0) {
          return;
        }

        dispatch('updateRegularCustomerInDB', {
          regularCustomerId,
          set: {
            orders: {
              [orderId]: {
                amount,
                addedAt: new Date(),
              },
            },
          },
        });
      },
    },
    // async addOrder({ dispatch }, params) {
    //   const {
    //     regularCustomerId,
    //     orderId,
    //     amount,
    //   } = params;

    //   if (!regularCustomerId || amount === 0) {
    //     return;
    //   }

    //   console.log(regularCustomerId, orderId, amount);

    //   // dispatch('updateRegularCustomerInDB', {
    //   //   regularCustomerId,
    //   //   set: {
    //   //     orders: {
    //   //       [orderId]: {
    //   //         amount,
    //   //         addedAt: new Date(),
    //   //       },
    //   //     },
    //   //   },
    //   // });
    // },
  },
};
