<template>
  <div class="order-history">
    <datepicker class="datepicker" v-model="date" inline format="D d MMMM yyyy" monday-first :disabledDates="disabledDates" :language="datepickerLang" @selected="onDateChange"></datepicker>
    <AppLoader :loading="loading" :inline="true" />
    <div v-if="!loading">
      <h2 class="medium-title">{{date | moment('dddd Do MMMM YYYY')}}</h2>
      <OrderHistoryList :orders="orders" @order-click="showBill" class="results" />
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { fr } from 'vuejs-datepicker/dist/locale';

import db from '@/utils/db';
import AppIcon from '@/components/utils/AppIcon';
import AppLoader from '@/components/utils/AppLoader';
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
    from.setHours(24, 0, 0, 0);
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
  justify-items: stretch;

  .datepicker {
    justify-self: center;
  }

  @include responsive($small-breakpoint) {
    grid-template-columns: 1fr;

    .datepicker {
      margin-bottom: $spacing;
    }
  }

  .order-history-list {
    max-width: 60rem;
  }
}

</style>
