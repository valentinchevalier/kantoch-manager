<template>
  <div class="orders-of-the-day">
    <p class="no-items" v-if="orders.length <= 0">Aucunes commandes</p>
    <h2 class="small-title" v-if="ordersOnSite.length > 0">Sur place</h2>
    <div class="order-detailed-list">
      <OrderItemsCooking :order="order" v-for="order in ordersOnSite" :key="order.id" />
    </div>
    <h2 class="small-detailed-title" v-if="ordersTakeAway.length > 0">À emporter</h2>
    <div class="order-detailed-list" v-if="ordersTakeAway.length > 0">
      <OrderItemsCooking :order="order" v-for="order in ordersTakeAway" :key="order.id" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppIcon from '@/components/AppIcon';
import OrderItemsCooking from '@/components/order/OrderItemsCooking';
import OrderHistoryList from '@/components/order/OrderHistoryList';
import { ON_SITE, TAKE_AWAY } from '@/utils/order-utils';

export default {
  components: {
    AppIcon,
    OrderItemsCooking,
    OrderHistoryList,
  },
  computed: {
    ...mapState('orders', ['orders']),
    ordersTakeAway() {
      return this.orders.filter(order => !order.isEnded && order.type === TAKE_AWAY);
    },
    ordersOnSite() {
      return this.orders.filter(order => !order.isEnded && order.type === ON_SITE);
    },
    ordersEnded() {
      return this.orders.filter(order => order.isEnded);
    },
  },
  methods: {
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

.small-title {
  margin-bottom: $spacing-small;
}

.order-detailed-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 30rem);
  justify-content: center;
  align-items: start;
  grid-gap: $spacing;
  margin-bottom: $spacing;

  @include responsive($small-breakpoint) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.order-history-list {
  max-width: 40rem;
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
</style>
