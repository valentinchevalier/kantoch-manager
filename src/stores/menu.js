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
      return Object.values(plates)
        .filter(item => item.category === 'food')
        .sort((itemA, itemB) => itemA.order - itemB.order);
    },
    drinkItems({ plates }) {
      return Object.values(plates)
        .filter(item => item.category === 'drink')
        .sort((itemA, itemB) => itemA.order - itemB.order);
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
      defaultMenu.plates.forEach((plate, index) => {
        console.log(index);
        menuRef.doc(plate.id).set({
          ...plate,
          available: true,
          order: index,
        });
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
    async togglePlateAvailability(context, params) {
      const {
        plateId,
        available,
      } = params;

      await db.collection('plates').doc(plateId).set({
        available,
      }, { merge: true });
    },
    async addPlateChoice({ state }, params) {
      const {
        plateId,
        choiceLabel,
      } = params;
      const currentPlate = state.plates[plateId];
      const choices = currentPlate.choices ? JSON.parse(JSON.stringify(currentPlate.choices)) : [];

      choices.push({
        id: utils.generateID(),
        label: choiceLabel,
        available: true,
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

      const currentPlate = state.plates[plateId];
      const choices = JSON.parse(JSON.stringify(currentPlate.choices));

      choices.splice(choiceIndex, 1);

      await db.collection('plates').doc(plateId).set({
        choices,
      }, { merge: true });
    },
    async togglePlateChoiceAvailability({ state }, params) {
      const {
        plateId,
        choiceIndex,
        available,
      } = params;

      const currentPlate = state.plates[plateId];
      const choices = JSON.parse(JSON.stringify(currentPlate.choices));

      choices[choiceIndex].available = available;

      await db.collection('plates').doc(plateId).set({
        choices,
      }, { merge: true });
    },
  },
};
