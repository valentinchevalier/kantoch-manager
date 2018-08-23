<template>
  <div class="orders-manager">
    <h2 class="medium-title">Sur place</h2>
    <div class="no-results" v-if="ordersOnSite.length <= 0">Aucune commande sur place</div>
    <OrderDetailedList :orders="ordersOnSite" v-else/>
    <h2 class="medium-title">À emporter</h2>
    <div class="no-results" v-if="ordersTakeAway.length <= 0">Aucune commande à emporter</div>
    <OrderDetailedList :orders="ordersTakeAway" v-else/>
    <h2 class="medium-title">Commandes terminées</h2>
    <button class="btn-link btn-small" @click="endedOrdersVisible = !endedOrdersVisible"><AppIcon :icon="!endedOrdersVisible ? 'eye' : 'eye-slash'"/>{{!endedOrdersVisible ? 'Afficher' : 'Masquer'}}</button>
    <div class="no-results" v-if="endedOrdersVisible && ordersEnded.length <= 0">Aucune commande terminée</div>
    <OrderHistoryList v-if="endedOrdersVisible && ordersEnded.length > 0" :orders="ordersEnded" @order-click="showBill" @order-long-click="editOrderInfos"/>
    <button type="button" class="btn btn-small btn-icon-left add-btn" @click="openOrderCreatorModal"><AppIcon icon="plus" />Nouvelle commande</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AppIcon from '@/components/utils/AppIcon';
import OrderDetailedList from '@/components/order/OrderDetailedList';
import OrderHistoryList from '@/components/order/OrderHistoryList';
import { ON_SITE, TAKE_AWAY } from '@/utils/order-utils';

export default {
  components: {
    AppIcon,
    OrderDetailedList,
    OrderHistoryList,
  },
  data() {
    return {
      endedOrdersVisible: false,
    };
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
    ...mapActions('modal', ['showOrderCreatorModal', 'showOrderInfosEditorModal', 'showOrderBillModal']),
    openOrderCreatorModal() {
      this.showOrderCreatorModal();
    },
    showBill(order) {
      this.showOrderBillModal({ order });
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

.orders-manager {
  padding-bottom: $spacing-large;

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
</style>
