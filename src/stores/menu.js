import Vue from 'vue';
import defaultMenu from '@/utils/default-menu';
import utils from '@/utils/utils';
import db from '@/utils/db';
import { RESET_PLATE_LIST, ADD_PLATE, REMOVE_PLATE } from './menuMutation.types';

export default {
  namespaced: true,
  state() {
    return {
      plates: {},
    };
  },
  getters: {
    foodItems({ plates }) {
      return Object.values(plates).filter(item => item.category === 'food');
    },
    drinkItems({ plates }) {
      return Object.values(plates).filter(item => item.category === 'drink');
    },
  },
  mutations: {
    [ADD_PLATE](state, plate) {
      Vue.set(state.plates, plate.id, plate);
    },
    [REMOVE_PLATE](state, plate) {
      Vue.delete(state.plates, plate.id);
    },
    [RESET_PLATE_LIST](state) {
      state.plates = {};
    },
  },
  actions: {
    seed({ state }) {
      const menuRef = db.collection('plates');
      Object.keys(state.plates).forEach((plateId) => {
        menuRef.doc(plateId).delete();
      });
      defaultMenu.plates.forEach((plate) => {
        menuRef.doc(plate.id).set(plate);
      });
    },
    initFromFirebase({ commit }) {
      commit(RESET_PLATE_LIST);

      db.collection('plates').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          switch (change.type) {
            case 'added':
            case 'modified':
              commit(ADD_PLATE, {
                id: change.doc.id,
                ...change.doc.data(),
              });
              break;
            case 'removed':
              commit(REMOVE_PLATE, {
                id: change.doc.id,
              });
              break;
            default:
              break;
          }
        });
      });
    },
    async addPlateChoice({ state }, params) {
      const {
        plateId,
        choiceLabel,
      } = params;
      const currentPlate = state.plates[plateId];
      const choices = currentPlate.choices ? currentPlate.choices.slice() : [];

      choices.push({
        id: utils.generateID(),
        label: choiceLabel,
      });

      await db.collection('plates').doc(plateId).set({
        choices,
      }, { merge: true });
    },
    async removePlateChoice({ state }, params) {
      const {
        plateId,
        choiceIndex,
      } = params;

      console.log(choiceIndex);
      const currentPlate = state.plates[plateId];
      const choices = currentPlate.choices.slice();

      choices.splice(choiceIndex, 1);

      await db.collection('plates').doc(plateId).set({
        choices,
      }, { merge: true });
    },
  },
};
