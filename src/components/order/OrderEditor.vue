<template>
  <div class="item-group-editor" >
    <div class="column">
      <Menu @click="onMenuItemClick" @long-click="onItemLongClick" />
    </div>
    <div class="column" v-if="order && itemGroup">
      <OrderTitle :order="order" />
      <TemporaryOrderItems :order="order"/>
      <div class="add-to-command btn btn-small" @click="addTemporaryOrderItemsToCommand" v-if="hasTemporaryOrderItems">Ajouter à la commande</div>
      <h2 class="small-title mt">Produits en cours de préparation</h2>
      <OrderItemsEditor :order="order"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Menu from '@/components/menu/Menu';
import OrderTitle from '@/components/order/utils/OrderTitle';
import OrderItemsEditor from './OrderItemsEditor';
import TemporaryOrderItems from './TemporaryOrderItems';

export default {
  components: {
    OrderItemsEditor,
    Menu,
    TemporaryOrderItems,
    OrderTitle,
  },
  data() {
    return {
      itemGroup: {},
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    // this.resetItems();
  },
  computed: {
    ...mapState('orders', ['orders']),
    ...mapState('menu', ['plates']),
    ...mapState('temporaryOrder', ['items']),
    order() {
      return this.orders.find(order => order.id === this.id);
    },
    hasTemporaryOrderItems() {
      return Object.values(this.items).length > 0;
    },
  },
  methods: {
    ...mapActions('temporaryOrder', ['setItemQuantity', 'resetItems']),
    ...mapActions('orders', ['addItemsGroupToOrder']),
    ...mapActions('modal', ['showItemChoiceSelector', 'showMenuItemEditor']),
    onMenuItemClick(item) {
      if (!item.available) {
        return;
      }

      this.showItemChoiceSelector({
        item,
        orderId: this.id,
      });
    },
    onQuantityUpdate(item, value) {
      this.setItemQuantity({ item, quantity: value });
    },
    addTemporaryOrderItemsToCommand() {
      this.addItemsGroupToOrder({
        orderId: this.id,
        itemGroup: this.items,
      });
      this.resetItems();
    },
    onItemLongClick(item) {
      this.showMenuItemEditor({ plate: item });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.order-items-editor {
  margin-top: $spacing;
}

.no-items {
  margin-top: $spacing-medium;
}

.item-group-editor {
  display: grid;
  grid-template-columns: auto minmax(350px, 25%);
  grid-gap: $spacing-small $spacing;
  padding: 0;
  height: 100vh;

  @include responsive(820px) {
    grid-template-columns: auto;
    height: auto;
  }

  .column {
    overflow: auto;
    padding: $spacing $spacing-small $spacing-small;

    @include responsive($small-breakpoint) {
      padding: 0 0 $spacing-small;
    }
  }
}

.order-item {
  display: flex;
  padding: $spacing-small 0;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid $secondary-color;
  }

  .quantity {
    margin-left: auto;
  }

  .order-item-label {
    text-align: left;
  }
}
</style>
