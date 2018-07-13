import Vue from 'vue';
import Firebase from 'firebase/app';
import db from '@/utils/db';
import CommandUtils from '@/utils/command-utils';
import { RESET_COMMAND_LIST, UPDATE_COMMAND, ADD_COMMAND, REMOVE_COMMAND } from './commandsMutation.types';

const COMMANDS_COLLECTION = 'commands';

export default {
  namespaced: true,
  state() {
    return {
      commands: [],
    };
  },
  getters: {},
  mutations: {
    [ADD_COMMAND](state, command) {
      state.commands.push(command);
    },
    [REMOVE_COMMAND](state, command) {
      const commandIndex = state.commands.findIndex(pl => pl.id === command.id);
      state.commands.splice(commandIndex, 1);
    },
    [UPDATE_COMMAND](state, command) {
      const commandIndex = state.commands.findIndex(pl => pl.id === command.id);
      Vue.set(state.commands, commandIndex, command);
    },
    [RESET_COMMAND_LIST](state) {
      state.commands = [];
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
    async addCommand(context, command) {
      console.log(command);
      const newCommand = {
        ...command,
        items: {},
        addedAt: new Date(),
      };

      await db.collection(COMMANDS_COLLECTION).add(newCommand);
    },
    async updateInDB(context, params) {
      const {
        commandId,
        set,
        merge,
      } = params;

      console.log(set);

      await db.collection(COMMANDS_COLLECTION).doc(commandId).set(set, { merge: merge || true });
    },
    async addItemToCommand({ state, dispatch }, params) {
      const {
        commandId,
        item,
      } = params;

      if (!item.plateId) {
        return;
      }

      const itemFullId = CommandUtils.commandItemFullId(item.plateId, item.choiceId);
      let set = {
        plateId: item.plateId,
        quantity: 1,
      };

      if (item.choiceId) {
        set.choiceId = item.choiceId;
      }
      const currentCommand = state.commands.find(command => command.id === commandId);
      const currentItem = currentCommand.items[itemFullId];

      if (currentItem) {
        set = {
          quantity: currentItem.quantity + 1,
        };
      }

      dispatch('updateInDB', {
        commandId,
        set: {
          items: {
            [itemFullId]: set,
          },
        },
      });
    },
    async removeItemToCommand({ state, dispatch }, params) {
      const {
        commandId,
        item,
      } = params;
      let {
        quantity,
      } = params;

      if (!item.plateId) {
        return;
      }

      const itemFullId = CommandUtils.commandItemFullId(item.plateId, item.choiceId);
      const currentCommand = state.commands.find(command => command.id === commandId);
      const currentItem = currentCommand.items[itemFullId];

      if (!currentItem) {
        return;
      }

      quantity = quantity || 1;

      const newQuantity = currentItem.quantity - quantity;
      if (newQuantity <= 0) {
        dispatch('updateInDB', {
          commandId,
          set: {
            items: {
              [itemFullId]: Firebase.firestore.FieldValue.delete(),
            },
          },
        });
        return;
      }

      dispatch('updateInDB', {
        commandId,
        set: {
          items: {
            [itemFullId]: {
              quantity: newQuantity,
            },
          },
        },
      });
    },
    async finishCommand({ dispatch }, params) {
      const {
        commandId,
        bill,
      } = params;

      dispatch('updateInDB', {
        commandId,
        set: {
          bill: JSON.parse(JSON.stringify(bill)),
          endedAt: new Date(),
        },
      });
    },
  },
};
