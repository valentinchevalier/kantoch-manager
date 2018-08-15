<template>
  <div class="order-items-editor" v-if="order && orderItems.length > 0">
    <div class="items">
      <div class="order-item" v-for="orderItem in orderItems" :key="orderItem.id">
        <PlateLabel :plateId="orderItem.plateId" :choiceId="orderItem.choiceId" />
        <div class="quantity">
          <div class="quantity-button remove-button" @click="onRemoveClick(orderItem)"><AppIcon icon="minus"/></div>
          <span class="number">{{orderItem.quantity}}</span>
          <div class="quantity-button add-button" @click="onAddClick(orderItem)"><AppIcon icon="plus"/></div>
        </div>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-icon-left btn-icon-medium" type="button" @click="onBillClick()"><AppIcon icon="receipt" /> Addition</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OrderUtils from '@/utils/order-utils';
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
  computed: {
    ...mapState('menu', ['plates']),
    orderItems() {
      return OrderUtils.orderItems(this.order);
    },
  },
  methods: {
    ...mapActions('orders', ['addItemToOrder', 'removeItemToOrder']),
    ...mapActions('modal', ['showOrderEndingModal']),
    onAddClick(item) {
      this.addItemToOrder({
        orderId: this.order.id,
        item,
      });
    },
    onRemoveClick(item) {
      this.removeItemToOrder({
        orderId: this.order.id,
        item,
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

.order-title {
  margin: $spacing-small 0;
}

.no-items {
  margin-top: $spacing-medium;
}

.actions {
  margin-top: $spacing;
}

.order-item {
  display: flex;
  padding: $spacing-small 0;
  align-items: center;

  .smaller & {
    padding: $spacing-xsmall 0;

    .quantity {
      > * {
        padding: $spacing-xsmall;
      }
    }
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

    > * {
      padding: $spacing-small;
    }

    .quantity-button {
      font-size: 1.8rem;
      line-height: 1;
      cursor: pointer;
    }
  }
}
</style>

