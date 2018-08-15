<template>
  <div class="order-cooking-editor">
    <p class="no-items" v-if="orderItemsToCook.length <= 0">Aucuns produits en cours</p>
    <template v-else>
      <div class="items">
        <div class="order-item" v-for="orderItem in orderItemsToCook" :key="orderItem.id" @click="setCooked(orderItem, true)">
          <PlateLabel :plateId="orderItem.plateId" :choiceId="orderItem.choiceId" />
          <div class="quantity">{{orderItem.quantity}}</div>
        </div>
      </div>
    </template>
    <template v-if="orderItemsAlreadyCooked.length > 0">
      <button class="btn-link" @click="isCookedVisible = !isCookedVisible"><AppIcon :icon="!isCookedVisible ? 'eye' : 'eye-slash'" />
        <template v-if="isCookedVisible">Masquer les produits déjà servis</template>
        <template v-else>Afficher {{orderItemsAlreadyCooked.length}} produits déjà servis</template>
      </button>
      <div class="cooked-items" :class="{ visible: isCookedVisible }">
        <div class="order-item cooked" v-for="orderItem in orderItemsAlreadyCooked" :key="orderItem.id" @click="setCooked(orderItem, false)">
          <PlateLabel :plateId="orderItem.plateId" :choiceId="orderItem.choiceId" />
          <div class="quantity">{{orderItem.quantity}}</div>
        </div>
      </div>
    </template>
    <button class="btn btn-icon-left btn-small btn-icon-medium" type="button" @click="onBillClick()"><AppIcon icon="receipt" /> Addition</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppIcon from '@/components/AppIcon';
import OrderTitle from './OrderTitle';
import PlateLabel from './PlateLabel';

export default {
  components: {
    AppIcon,
    PlateLabel,
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
    ...mapActions('orders', ['setCookedItem']),
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
    border-bottom: 1px solid $black;
  }

  .plate-label {
    text-align: left;
    margin-right: auto;
  }

  .quantity {
    margin-right: $spacing-small;
    display: flex;
    align-items: center;
    margin-left: -$spacing-small;
    padding: $spacing-xsmall;
  }
}
</style>

