import Vue from 'vue';
import Firebase from 'firebase/app';
import db from '@/utils/db';
import CommandUtils from '@/utils/command-utils';
import { RESET_COMMAND_LIST, UPDATE_COMMAND, PUSH_COMMAND } from './commandsMutation.types';

const COMMANDS_COLLECTION = 'commands';

export default {
  namespaced: true,
  state() {
    return {
      commands: [],
      commandHistory: [],
    };
  },
  getters: {
    // currentCommandTotal({ currentCommand }) {
    //   return currentCommand.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    // },
  },
  mutations: {
    [PUSH_COMMAND](state, command) {
      state.commands.push(command);
    },
    [RESET_COMMAND_LIST](state) {
      state.commands = [];
    },
    [UPDATE_COMMAND](state, command) {
      const commandIndex = state.commands.findIndex(pl => pl.id === command.id);
      Vue.set(state.commands, commandIndex, command);
    },
  },
  actions: {
    initFromFirebase({ commit }) {
      commit(RESET_COMMAND_LIST);

      db.collection(COMMANDS_COLLECTION).onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            commit(PUSH_COMMAND, {
              id: change.doc.id,
              ...change.doc.data(),
            });
          }
          if (change.type === 'modified') {
            commit(UPDATE_COMMAND, {
              id: change.doc.id,
              ...change.doc.data(),
            });
          }
        });
      });
    },
    async addCommand(context, command) {
      console.log(command);
      const newCommand = {
        ...command,
        items: {},
      };

      await db.collection(COMMANDS_COLLECTION).add(newCommand);
    },
    async addItemToCommand({ state }, params) {
      const {
        commandId,
        itemId,
        variationId,
        choiceId,
      } = params;

      const itemFullId = CommandUtils.commandItemFullId(itemId, variationId, choiceId);
      let set = {
        plateId: itemId,
        quantity: 1,
      };
      if (variationId) {
        set.variationId = variationId;
      }

      if (choiceId) {
        set.choiceId = choiceId;
      }
      const currentCommand = state.commands.find(command => command.id === commandId);
      const currentItem = currentCommand.items[itemFullId];

      if (currentItem) {
        set = {
          quantity: currentItem.quantity + 1,
        };
      }

      await db.collection(COMMANDS_COLLECTION).doc(commandId).set({
        items: {
          [itemFullId]: set,
        },
      }, { merge: true });
    },
    async removeItemToCommand({ state }, params) {
      const {
        commandId,
        itemId,
        variationId,
        choiceId,
      } = params;
      let {
        quantity,
      } = params;


      const itemFullId = CommandUtils.commandItemFullId(itemId, variationId, choiceId);
      const currentCommand = state.commands.find(command => command.id === commandId);
      const currentItem = currentCommand.items[itemFullId];

      if (!currentItem) {
        return;
      }

      quantity = quantity || 1;

      const newQuantity = currentItem.quantity - quantity;
      if (newQuantity <= 0) {
        await db.collection(COMMANDS_COLLECTION).doc(commandId).set({
          items: {
            [itemFullId]: Firebase.firestore.FieldValue.delete(),
          },
        }, { merge: true });
        return;
      }

      await db.collection(COMMANDS_COLLECTION).doc(commandId).set({
        items: {
          [itemFullId]: {
            quantity: newQuantity,
          },
        },
      }, { merge: true });
    },
  },
};
