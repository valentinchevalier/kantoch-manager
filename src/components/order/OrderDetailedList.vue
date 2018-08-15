<template>
  <div class="order-detailed-list">
    <div class="order" v-for="order in orders" :key="order.id">
      <OrderTitle :order="order" :editable="true" :hideType="true"/>
      <OrderItemsCooking :order="order" />
      <div class="actions">
        <button class="btn btn-icon-left btn-small" type="button" @click="editOrder(order)"><AppIcon icon="ustensils" /> Modifier</button>
        <button class="btn btn-icon-left btn-small" type="button" @click="endOrder(order)"><AppIcon icon="receipt" /> Terminer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppIcon from '@/components/utils/AppIcon';
import OrderItemsCooking from '@/components/order/OrderItemsCooking';
import OrderTitle from '@/components/order/utils/OrderTitle';

export default {
  components: {
    AppIcon,
    OrderItemsCooking,
    OrderTitle,
  },
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions('modal', ['showOrderCreatorModal', 'showOrderEndingModal', 'showOrderInfosEditorModal', 'showOrderBillModal']),
    openOrderCreatorModal() {
      this.showOrderCreatorModal();
    },
    showBill(order) {
      this.showOrderBillModal({ order });
    },
    endOrder(order) {
      this.showOrderEndingModal({ orderId: order.id });
    },
    editOrder(order) {
      this.$router.push({
        name: 'order',
        params: {
          id: order.id,
        },
      });
    },
    editOrderInfos(order) {
      this.showOrderInfosEditorModal({ orderId: order.id });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.orders-of-the-day {
  @include responsive($small-breakpoint) {
    margin-bottom: $spacing-large;
  }
}

.medium-title {
  margin-bottom: $spacing-small;
}

.order-detailed-list,
.no-results {
  margin-bottom: $spacing;
}

.order-detailed-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 30rem);
  justify-content: center;
  align-items: start;
  grid-gap: $spacing;

  @include responsive($small-breakpoint) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.add-btn {
  position: fixed;
  bottom: $spacing;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  @include responsive($small-breakpoint) {
    right: -50%;
  }
}

.order-history-list {
  max-width: 40rem;
}

.order {
  padding: $spacing-small $spacing;
  border: 2px solid $black;
  border-radius: $radius;

  .order-title {
    margin-bottom: $spacing-small;
  }

  .actions {
    margin-top: $spacing-small;

    > * + * {
      margin: $spacing-xsmall;
    }
  }
}
</style>
