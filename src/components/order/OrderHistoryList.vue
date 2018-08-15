<template>
  <div class="order-history-list" v-if="orders.length > 0">
    <h2 class="medium-title"></h2>
    <OrdersTable :orders="normalOrders" @order-click="onOrderClick" @order-long-click="onOrderLongClick"/>
    <h2 class="small-title"><AppIcon icon="star" /> Habitués <AppIcon icon="star" /></h2>
    <OrdersTable :orders="regularOrders" :showName="true" @order-click="onOrderClick" @order-long-click="onOrderLongClick"/>
    <div class="total-price">Total du jour : <span class="amount">{{ordersTotalPrice | price}}</span></div>
  </div>
</template>

<script>
import OrdersTable from '@/components/order/utils/OrdersTable';
import AppIcon from '@/components/utils/AppIcon';

export default {
  components: {
    OrdersTable,
    AppIcon,
  },
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  computed: {
    normalOrders() {
      return this.orders.filter(order => !order.isRegular);
    },
    regularOrders() {
      return this.orders.filter(order => order.isRegular);
    },
    ordersTotalPrice() {
      return this.orders.reduce((acc, order) => acc + (order.bill ? order.bill.totalPrice : 0), 0);
    },
  },
  methods: {
    onOrderClick(order) {
      this.$emit('order-click', order);
    },
    onOrderLongClick(order) {
      this.$emit('order-long-click', order);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.order-history-list {
  width: 100%;
  margin: auto;
  display: table;

  .orders-table {
    width: 100%;
  }

  .total-price {
    margin-top: $spacing-small;

    .amount {
      font-weight: $bold-weight;
    }
  }
}
</style>
