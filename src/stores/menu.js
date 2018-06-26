import Vue from 'vue';
import defaultMenu from '@/utils/default-menu';
import utils from '@/utils/utils';
import db from '@/utils/db';
import { RESET_PLATE_LIST, PUSH_PLATE, UPDATE_PLATE } from './menuMutation.types';

export default {
  namespaced: true,
  state() {
    return {
      formules: [],
      formuleItems: {},
      plates: [],
    };
  },
  getters: {
    availableItems({ plates }) {
      return plates.filter(plate => plate.isDisable);
    },
    foodItems({ plates }) {
      return plates.filter(item => item.category === 'food');
    },
    drinkItems({ plates }) {
      return plates.filter(item => item.category === 'drink');
    },
    formuleItems({ plates }) {
      return plates.filter(item => item.category === 'formule');
    },
  },
  mutations: {
    [PUSH_PLATE](state, plate) {
      state.plates.push(plate);
    },
    [RESET_PLATE_LIST](state) {
      state.plates = [];
    },
    [UPDATE_PLATE](state, plate) {
      const plateIndex = state.plates.findIndex(pl => pl.id === plate.id);
      Vue.set(state.plates, plateIndex, plate);
    },
  },
  actions: {
    seed() {
      const menuRef = db.collection('plates');
      defaultMenu.plates.forEach((plate) => {
        menuRef.doc(plate.id).set(plate);
      });
      const formulesRef = db.collection('formules');
      defaultMenu.formules.forEach((formule) => {
        formulesRef.doc(formule.id).set(formule);
      });
    },
    initFromFirebase({ commit }) {
      commit(RESET_PLATE_LIST);

      db.collection('plates').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            commit(PUSH_PLATE, {
              id: change.doc.id,
              ...change.doc.data(),
            });
          }
          if (change.type === 'modified') {
            commit(UPDATE_PLATE, {
              id: change.doc.id,
              ...change.doc.data(),
            });
          }
        });
      });
    },
    async addPlateChoice({ state }, params) {
      const {
        plateId,
        choiceLabel,
      } = params;
      const currentPlate = state.plates.find(plate => plate.id === plateId);
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
      const currentPlate = state.plates.find(plate => plate.id === plateId);
      const choices = currentPlate.choices.slice();

      choices.splice(choiceIndex, 1);

      await db.collection('plates').doc(plateId).set({
        choices,
      }, { merge: true });
    },
  },
};
