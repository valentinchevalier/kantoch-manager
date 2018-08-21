<template>
  <div class="order-cooking-editor">
    <p class="no-items" v-if="orderItemsToCook.length <= 0">Aucuns produits en cours</p>
    <template v-else>
      <div class="items">
        <div class="order-item" v-for="orderItem in orderItemsToCook" :key="orderItem.id" v-long-press="700" @long-press="startDeletingItem(orderItem)" >
          <div class="order-item-btn validate" @click="setCooked(orderItem, true)"><AppIcon icon="check-circle" /></div>
          <OrderItemLabel :plateId="orderItem.plateId" :choiceId="orderItem.choiceId" />
          <div class="quantity">{{orderItem.quantity}}</div>
          <div class="order-item-btn" @click="deleteItem(orderItem)" v-if="isDeleting(orderItem)"><AppIcon icon="trash" /></div>
        </div>
      </div>
    </template>
    <template v-if="orderItemsAlreadyCooked.length > 0">
      <button class="btn-link btn-small" @click="isCookedVisible = !isCookedVisible"><AppIcon :icon="!isCookedVisible ? 'eye' : 'eye-slash'" />
        <template v-if="isCookedVisible">Masquer les produits déjà servis</template>
        <template v-else>Afficher {{orderItemsAlreadyCooked.length}} produits déjà servis</template>
      </button>
      <div class="cooked-items" :class="{ visible: isCookedVisible }">
        <div class="order-item cooked" v-for="orderItem in orderItemsAlreadyCooked" :key="orderItem.id">
          <div class="order-item-btn validate" @click="setCooked(orderItem, false)"><AppIcon icon="cross-circle" /></div>
          <OrderItemLabel :plateId="orderItem.plateId" :choiceId="orderItem.choiceId" />
          <div class="quantity">{{orderItem.quantity}}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppIcon from '@/components/utils/AppIcon';
import OrderTitle from '@/components/order/utils/OrderTitle';
import OrderItemLabel from '@/components/order/utils/OrderItemLabel';

export default {
  components: {
    AppIcon,
    OrderItemLabel,
    OrderTitle,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isCookedVisible: false,
      deletingItem: undefined,
    };
  },
  computed: {
    ...mapState('menu', ['plates']),
    orderItems() {
      const res = this.orderItemGroups
        .reduce((items, orderItemGroup) => {
          const tempItems = Object.values(orderItemGroup.items).map(item => ({
            groupIndex: orderItemGroup.index,
            ...item,
          }));
          items.push(...tempItems);
          return items;
        }, []);

      return res;
    },
    orderItemsToCook() {
      return this.orderItems.filter(item => !item.isCooked);
    },
    orderItemsAlreadyCooked() {
      return this.orderItems.filter(item => item.isCooked);
    },
    orderItemGroups() {
      return Object.keys(this.order.itemGroups).map(index => ({
        index,
        items: this.order.itemGroups[index],
      }));
    },
  },
  methods: {
    ...mapActions('orders', ['setCookedItem', 'removeItemToOrder']),
    ...mapActions('modal', ['showOrderEndingModal']),
    orderItemGroupReducer(items, orderItemGroup) {
      const tempItems = Object.values(orderItemGroup.items).map(item => ({
        ...item,
        groupIndex: orderItemGroup.index,
      }));
      items.push(...tempItems);
      return items;
    },
    setCooked(orderItem, isCooked) {
      this.setCookedItem({
        orderId: this.order.id,
        item: orderItem,
        groupIndex: orderItem.groupIndex,
        isCooked,
      });
    },
    onBillClick() {
      this.showOrderEndingModal({
        orderId: this.order.id,
      });
    },
    startDeletingItem(orderItem) {
      if (this.isDeleting(orderItem)) {
        this.deletingItem = false;
      } else {
        this.deletingItem = orderItem;
      }
    },
    deleteItem(orderItem) {
      this.removeItemToOrder({
        orderId: this.order.id,
        item: orderItem,
        groupIndex: orderItem.groupIndex,
      });
    },
    isDeleting(orderItem) {
      console.log(this.deletingItem, orderItem);
      return this.deletingItem && this.deletingItem.plateId === orderItem.plateId && this.deletingItem.choiceId === orderItem.choiceId && this.deletingItem.groupIndex === orderItem.groupIndex;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.order-cooking-editor {
  display: flex;
  align-items: center;
  flex-direction: column;

  > * + * {
    margin-top: $spacing-small;
  }
}

.items,
.cooked-items {
  align-self: stretch;
}

.cooked-items {
  display: none;

  &.visible {
    display: block;
  }
}

.order-item {
  display: flex;
  padding: $spacing-xsmall 0;
  align-items: center;

  &.cooked {
    opacity: 0.6;
  }

  &:not(:last-child) {
    border-bottom: 1px solid $secondary-color;
  }

  .order-item-label {
    text-align: left;
    margin-right: auto;
  }

  .quantity {
    margin-right: $spacing-small;
    display: flex;
    align-items: center;
    padding: $spacing-xsmall;
  }

  .order-item-btn {
    padding: $spacing-small;
    cursor: pointer;
    line-height: 1;
    font-size: 1.5rem;

    &.validate {
      margin-left: -$spacing-small;
      font-size: 2rem;
    }
  }
}
</style>
