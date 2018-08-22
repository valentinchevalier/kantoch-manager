<template>
  <div class="orders-table" v-if="orders.length > 0">
    <div class="order-table-row" v-for="order in orders" :key="order.id" @click="onOrderClick(order)" v-long-press="700" @long-press="onOrderLongClick(order)">
      <div class="order-table-cell name" v-if="showName">{{order.name}}</div>
      <div class="order-table-cell order-type">{{ order.type | orderType }}</div>
      <div class="order-table-cell number-of-guests">{{order.numberOfGuest}} personnes</div>
      <div class="order-table-cell total-price">{{order.bill ? order.bill.totalPrice : 0 | price}}</div>
    </div>
    <div class="order-table-row total">
      <div v-if="showName"></div>
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
    showName: {
      type: Boolean,
      default: false,
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

.orders-table {
  width: 100%;
  margin: auto;
  display: table;

  .order-table-row {
    text-decoration: none;
    padding: $spacing-small 0;
    color: $secondary-color;
    display: table-row;
    cursor: pointer;
    user-select: none;

    > * {
      display: table-cell;
      text-align: left;
      padding: $spacing-small 0;
      border-bottom: 1px solid $secondary-color;
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
