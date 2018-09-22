export const TAKE_AWAY = 'TAKE_AWAY';
export const ON_SITE = 'ON_SITE';

export default {
  orderItems(order) {
    const res = Object.keys(order.itemGroups)
      .map(index => order.itemGroups[index])
      .reduce((items, orderItemGroup) => {
        items.push(...Object.values(orderItemGroup));
        return items;
      }, []);

    return res;
  },
  orderItemFullId(plateId, choiceId) {
    let fullId = plateId;
    if (choiceId) {
      fullId += `_${choiceId}`;
    }

    return fullId;
  },
  cleanBillItems(items) {
    const res = {};
    Object.values(items).forEach((item) => {
      if (res[item.plateId]) {
        res[item.plateId].quantity += item.quantity;
      } else {
        res[item.plateId] = {
          plateId: item.plateId,
          quantity: item.quantity,
        };
      }
    });

    return res;
  },
  degroupItems(itemGroups) {
    const items = {};

    Object.values(itemGroups).forEach((itemGroup) => {
      Object.keys(itemGroup).forEach((itemKey) => {
        if (items[itemKey]) {
          items[itemKey].quantity += itemGroup[itemKey].quantity;
        } else {
          items[itemKey] = itemGroup[itemKey];
        }
      });
    });

    return items;
  },
  generateBill(orderItemGroups, plates) {
    const orderItems = this.degroupItems(orderItemGroups);
    const billItems = this.cleanBillItems(orderItems);

    const formules = this.generateFormules(
      this.formuleMainItems(billItems, plates),
      this.formuleEntreeItems(billItems, plates),
      this.formuleDessertItems(billItems, plates),
      plates,
    );

    formules.forEach((formule) => {
      billItems[formule.main.plateId].quantity -= 1;
      if (formule.entree) {
        billItems[formule.entree.plateId].quantity -= 1;
      }
      if (formule.dessert) {
        billItems[formule.dessert.plateId].quantity -= 1;
      }
    });

    const singleItems = this.addPrices(Object.values(billItems), plates);
    const totalPrice = formules.reduce((acc, formule) => acc + formule.price, 0) + singleItems.reduce((acc, formule) => acc + formule.totalPrice, 0);

    return {
      singleItems,
      formules,
      totalPrice,
    };
  },
  getItemsTotalQuantity(items) {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  },
  generateFormules(mains, entrees, desserts, plates) {
    const nbMaxFormules = Math.min(mains.length, entrees.length + desserts.length);

    const filteredMains = this.addUnitPrice(mains, plates).sort((item1, item2) => item2.unitPrice - item1.unitPrice).slice(0, nbMaxFormules);
    const filteredEntrees = this.addUnitPrice(entrees, plates).sort((item1, item2) => item2.unitPrice - item1.unitPrice).slice(0, nbMaxFormules);
    const filteredDesserts = this.addUnitPrice(desserts, plates).sort((item1, item2) => item2.unitPrice - item1.unitPrice).slice(0, nbMaxFormules);

    const formules = filteredMains.map(item => ({
      main: item,
    }));

    filteredEntrees.forEach((item, index) => {
      formules[index].entree = item;
    });

    filteredDesserts.forEach((item, index) => {
      formules[nbMaxFormules - (index + 1)].dessert = item;
    });

    formules.forEach((formule) => {
      const isBig = formule.entree && formule.dessert;
      const price = plates[formule.main.plateId].formules[isBig ? 'big' : 'small'];
      formule.price = price;
      formule.label = `${isBig ? 'Grande' : 'Petite'} formule`;
      formule.labelExtra = plates[formule.main.plateId].label;
    });

    return formules;
  },
  formuleMainItems(items, plates) {
    const arrayItems = Object.values(items).filter(item => plates[item.plateId] && plates[item.plateId].isFormuleMain);

    return this.spreadItemsByQuantity(arrayItems);
  },
  formuleEntreeItems(items, plates) {
    const arrayItems = Object.values(items).filter(item => plates[item.plateId] && plates[item.plateId].isFormuleEntree);

    return this.spreadItemsByQuantity(arrayItems);
  },
  formuleDessertItems(items, plates) {
    const arrayItems = Object.values(items).filter(item => plates[item.plateId] && plates[item.plateId].isFormuleDessert);

    return this.spreadItemsByQuantity(arrayItems);
  },
  spreadItemsByQuantity(items) {
    const res = [];

    items.forEach((item) => {
      for (let i = 0; i < item.quantity; i += 1) {
        res.push({
          plateId: item.plateId,
          choiceId: item.choiceId,
        });
      }
    });
    return res;
  },
  addUnitPrice(items, plates) {
    return items.map((item) => {
      const unitPrice = plates[item.plateId].price;
      return {
        ...item,
        unitPrice,
      };
    });
  },
  addPrices(items, plates) {
    return items.map((item) => {
      const unitPrice = plates[item.plateId].price;
      const totalPrice = unitPrice * item.quantity;
      return {
        ...item,
        unitPrice,
        totalPrice,
      };
    });
  },
};
