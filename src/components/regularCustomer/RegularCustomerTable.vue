<template>
  <div class="regular-customers-table" v-if="regularCustomers.length > 0">
    <div class="regular-customer-table-row header">
      <div class="regular-customer-table-cell name">Nom</div>
      <div class="regular-customer-table-cell number">Dépots</div>
      <div class="regular-customer-table-cell number">Achats</div>
      <div class="regular-customer-table-cell number">Balance</div>
      <div></div>
    </div>
    <div class="regular-customer-table-row" v-for="regularCustomer in regularCustomers" :key="regularCustomer.id">
      <div class="regular-customer-table-cell name">{{regularCustomer.name}}</div>
      <div class="regular-customer-table-cell number">{{creditTotalAmount(regularCustomer) | price}}</div>
      <div class="regular-customer-table-cell number">{{debitTotalAmount(regularCustomer) | price}}</div>
      <div class="regular-customer-table-cell number balance" :class="[balanceAmount(regularCustomer) < 0 ? 'color-red' : 'color-green']">{{balanceAmount(regularCustomer) | price(true) }}</div>
      <div class="regular-customer-table-cell actions">
        <button class="btn btn-xsmall" @click="creditRegularCustomer(regularCustomer)"><AppIcon icon="money-bill"/>Créditer</button>
        <button class="btn btn-xsmall" @click="editRegularCustomerInfos(regularCustomer)"><AppIcon icon="edit"/>Modifier</button>
        <button class="btn btn-xsmall" @click="goToRegularCustomerDetails(regularCustomer)"><AppIcon icon="eye"/>Détails</button>

      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/utils/AppIcon';
import RegularCustomerUtils from '@/utils/regular-customer-utils';
import { mapActions } from 'vuex';

export default {
  components: {
    AppIcon,
  },
  props: {
    regularCustomers: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions('modal', ['showRegularCustomerInfosEditorModal', 'showRegularCustomerCreditorModal']),
    editRegularCustomerInfos(regularCustomer) {
      this.showRegularCustomerInfosEditorModal({ regularCustomerId: regularCustomer.id });
    },
    creditRegularCustomer(regularCustomer) {
      this.showRegularCustomerCreditorModal({ regularCustomerId: regularCustomer.id });
    },
    goToRegularCustomerDetails(regularCustomer) {
      this.$router.push({
        name: 'regular-customer',
        params: {
          id: regularCustomer.id,
        },
      });
    },
    creditTotalAmount(regularCustomer) {
      return RegularCustomerUtils.creditTotalAmount(regularCustomer);
    },
    debitTotalAmount(regularCustomer) {
      return RegularCustomerUtils.debitTotalAmount(regularCustomer);
    },
    balanceAmount(regularCustomer) {
      return RegularCustomerUtils.balanceAmount(regularCustomer);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.regular-customers-table {
  width: 100%;
  margin: auto;
  display: table;

  .regular-customer-table-row {
    text-decoration: none;
    padding: $spacing-small 0;
    color: $secondary-color;
    display: table-row;
    user-select: none;

    &.header {
      background-color: $secondary-color-alt;
      color: $primary-color;
    }

    > * {
      display: table-cell;
      text-align: left;
      padding: $spacing-small $spacing-xsmall;
      border-bottom: 1px solid $secondary-color;

      &.actions {
        text-align: right;
        width: 30rem;

        > * + * {
          margin-left: $spacing-small;
        }
      }

      &.number {
        text-align: center;
      }

      &.name {
        width: 30rem;
      }

      &.balance {
        font-size: 1.8rem;
        font-weight: $bold-weight;
      }
    }
  }
}
</style>
