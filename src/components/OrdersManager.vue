<template>
  <div class="orders-of-the-day">
    <p class="no-items" v-if="orders.length <= 0">Aucunes commandes</p>
    <h2 class="medium-title" v-if="ordersOnSite.length > 0">Sur place</h2>
    <div class="order-list">
      <OrderLink v-for="order in ordersOnSite" :order="order" :key="order.id" @long-click="editOrderInfos(order)"/>
    </div>
    <h2 class="medium-title" v-if="ordersTakeAway.length > 0">À emporter</h2>
    <div class="order-list" v-if="ordersTakeAway.length > 0">
      <OrderLink v-for="order in ordersTakeAway" :order="order" :key="order.id" @long-click="editOrderInfos(order)"/>
    </div>
    <h2 class="medium-title" v-if="ordersEnded.length > 0">Commandes terminées</h2>
    <OrderHistoryList :orders="ordersEnded" @order-click="showBill" @order-long-click="editOrderInfos"/>
    <button type="button" class="btn btn-small btn-icon-left add-btn" @click="openOrderCreatorModal"><AppIcon icon="plus" />Nouvelle commande</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppIcon from '@/components/AppIcon';
import OrderLink from '@/components/order/OrderLink';
import OrderHistoryList from '@/components/order/OrderHistoryList';
import { ON_SITE, TAKE_AWAY } from '@/utils/order-utils';

export default {
  components: {
    AppIcon,
    OrderLink,
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
    ...mapActions('modal', ['showOrderCreatorModal', 'showOrderEditorModal', 'showOrderBillModal']),
    openOrderCreatorModal() {
      this.showOrderCreatorModal();
    },
    editOrderInfos(order) {
      this.showOrderEditorModal({ orderId: order.id });
    },
    showBill(order) {
      this.showOrderBillModal({ order });
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

.order-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 15rem);
  grid-auto-rows: 1fr;
  flex-direction: row;
  justify-content: center;
  grid-gap: $spacing-small;
  margin-bottom: $spacing-small;

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
