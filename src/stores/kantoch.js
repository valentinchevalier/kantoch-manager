import defaultMenu from '@/kantoch-menu';
import utils from '@/utils';
import { ADD_COMMAND, ADD_ITEM_TO_COMMAND, REMOVE_ITEM_TO_COMMAND } from './kantochMutation.types';

export default {
  namespaced: true,
  state() {
    return {
      menu: Object.assign({}, defaultMenu),
      commands: [],
      commandHistory: [],
    };
  },
  getters: {
    foodItems({ menu }) {
      return menu.plates.filter(item => item.category === 'food');
    },
    drinkItems({ menu }) {
      return menu.plates.filter(item => item.category === 'drink');
    },
    formuleItems({ menu }) {
      return menu.plates.filter(item => item.category === 'formule');
    },
    // currentCommandTotal({ currentCommand }) {
    //   return currentCommand.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    // },
  },
  mutations: {
    [ADD_COMMAND](state, command) {
      state.commands.push({
        id: utils.generateID(),
        ...command,
        items: [],
      });
    },
    [ADD_ITEM_TO_COMMAND](state, { commandId, itemId }) {
      const currentCommand = state.commands.find(command => command.id === commandId);
      const currentPlate = state.menu.plates.find(plate => plate.id === itemId);
      const currentItem = currentCommand.items.find(listItem => itemId === listItem.id);

      if (!currentItem) {
        currentCommand.items.push({
          id: itemId,
          quantity: 1,
          price: currentPlate.price,
        });
      } else {
        currentItem.quantity += 1;
      }
    },
    [REMOVE_ITEM_TO_COMMAND](state, { commandId, itemId, quantity }) {
      const currentCommand = state.commands.find(command => command.id === commandId);
      const currentItemIndex = currentCommand.items.findIndex(listItem => itemId === listItem.id);

      if (currentItemIndex === -1) {
        return;
      }

      console.dir(currentItemIndex);

      quantity = quantity || 1;

      const newQuantity = currentCommand.items[currentItemIndex].quantity - quantity;
      if (newQuantity <= 0) {
        currentCommand.items.splice(currentItemIndex, 1);
        return;
      }

      currentCommand.items[currentItemIndex].quantity = newQuantity;
    },
  },
  actions: {

  },
};
