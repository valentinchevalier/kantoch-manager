<template>
  <div class="regular-customer-details" v-if="regularCustomer">
    <h1 class="main-title"><AppIcon icon="star"/> {{regularCustomer.name}}</h1>
    <h2 class="medium-title">Dépôt</h2>
    <TransactionsTable :transactions="regularCustomer.moneyDeposits" :extraLines="[{
      label: 'Solde inital',
      amount: regularCustomer.startAmount
    }]" />
    <h2 class="medium-title">Commandes</h2>
    <TransactionsTable :transactions="regularCustomer.orders" sign="-"/>
    <h2 class="medium-title">Balance</h2>
    <p class="balance" :class="[balanceAmount < 0 ? 'color-red' : 'color-green']">{{balanceAmount | price(true)}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RegularCustomerUtils from '@/utils/regular-customer-utils';
import AppIcon from '@/components/utils/AppIcon';
import TransactionsTable from '@/components/utils/TransactionsTable';

export default {
  components: {
    TransactionsTable,
    AppIcon,
  },
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    ...mapState('regularCustomers', ['regularCustomers']),
    regularCustomer() {
      return this.regularCustomers.find(regularCustomer => regularCustomer.id === this.id);
    },
    balanceAmount() {
      return RegularCustomerUtils.balanceAmount(this.regularCustomer);
    },
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.balance {
  font-size: 1.8rem;
  font-weight: $bold-weight;
}
</style>
