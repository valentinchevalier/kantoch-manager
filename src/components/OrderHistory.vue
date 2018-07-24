<template>
  <div class="order-history">
    <datepicker class="datepicker" v-model="date" inline format="D d MMMM yyyy" monday-first :disabledDates="disabledDates" :language="datepickerLang" @selected="onDateChange"></datepicker>
    <AppLoader :loading="loading" :inline="true" />
    <div v-if="!loading">
      <h2 class="small-title">{{date | moment('dddd Do MMMM YYYY')}}</h2>
      <div class="no-result" v-if="orders.length === 0">Aucune commande</div>
      <div class="results" v-else>
        <OrderHistoryList :orders="orders" @order-click="showBill"/>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { fr } from 'vuejs-datepicker/dist/locale';

import db from '@/utils/db';
import AppIcon from '@/components/AppIcon';
import AppLoader from '@/components/AppLoader';
import OrderHistoryList from '@/components/order/OrderHistoryList';
import { ON_SITE } from '@/utils/order-utils';
import { mapActions } from 'vuex';

export default {
  components: {
    AppIcon,
    AppLoader,
    Datepicker,
    OrderHistoryList,
  },
  data() {
    const from = new Date();
    from.setHours(0, 0, 0, 0);
    return {
      date: undefined,
      orders: [],
      datepickerLang: fr,
      disabledDates: {
        from,
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions('modal', ['showOrderBillModal']),
    onDateChange(date) {
      this.loading = true;
      this.orders = [];
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      db.collection('orders')
        .where('addedAt', '>', start)
        .where('addedAt', '<', end)
        .where('isEnded', '==', true)
        .get()
        .then((querySnapshot) => {
          this.loading = false;
          querySnapshot.forEach((doc) => {
            this.orders.push({
              id: doc.id,
              ...doc.data(),
            });
          });
        });
    },
    isOnSite(order) {
      return order.type === ON_SITE;
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

.order-history {
  padding: $spacing;
  display: grid;
  grid-template-columns: 30rem auto;
  grid-column-gap: $spacing-medium;
  justify-items: center;

  @include responsive($small-breakpoint) {
    grid-template-columns: 1fr;

    .datepicker {
      margin-bottom: $spacing;
    }
  }
}

</style>
