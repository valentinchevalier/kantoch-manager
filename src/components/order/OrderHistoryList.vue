<template>
  <div class="order-history-list" v-if="orders.length > 0">
    <div class="order-history-item" v-for="order in orders" :key="order.id" @click="onOrderClick(order)" v-long-press="700" @long-press="onOrderLongClick(order)">
      <div class="order-type">{{ order.type | orderType }}</div>
      <div class="number-of-guests">{{order.numberOfGuest}} personnes</div>
      <div class="total-price">{{order.bill ? order.bill.totalPrice : 0 | price}}</div>
    </div>
    <div class="order-history-item total">
      <div></div>
      <div class="total-label">Total :</div>
      <div class="total-price">{{ordersTotalPrice | price}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  computed: {
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

  .order-history-item {
    text-decoration: none;
    padding: $spacing-small 0;
    color: $black;
    display: table-row;
    cursor: pointer;

    > * {
      display: table-cell;
      text-align: left;
      padding: $spacing-small 0;
      border-bottom: 1px solid $black;
    }

    .total-price {
      text-align: right;
      font-weight: $bold-weight;
    }

    &.total {
      > * {
        border-bottom: 0;
      }

      .total-label {
        font-weight: $bold-weight;
        text-align: right;
      }
    }
  }
}
</style>
