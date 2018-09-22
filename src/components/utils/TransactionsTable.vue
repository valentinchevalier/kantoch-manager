<template>
  <div class="transactions-table">
    <div class="transaction-row header">
      <div class="transaction-cell addedAt">Date</div>
      <div class="transaction-cell amount">Montant</div>
    </div>
    <div class="transaction-row" v-for="transaction in arrayTransactions" :key="transaction.id">
      <div class="transaction-cell addedAt">{{transaction.addedAt.toDate() | moment('dddd Do MMMM YYYY')}}</div>
      <div class="transaction-cell amount">{{sign}}{{transaction.amount | price}}</div>
    </div>
    <div class="transaction-row" v-for="extraLine in extraLines" :key="extraLine.id">
      <div class="transaction-cell addedAt">{{extraLine.label}}</div>
      <div class="transaction-cell amount">{{sign}}{{extraLine.amount | price}}</div>
    </div>
    <div class="transaction-row total">
      <div class="transaction-cell total-label">Total</div>
      <div class="transaction-cell amount">{{sign}}{{total | price}}</div>
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/utils/AppIcon';

export default {
  components: {
    AppIcon,
  },
  props: {
    transactions: {
      type: Object,
      required: true,
    },
    sign: {
      type: String,
      default: '',
    },
    extraLines: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    arrayTransactions() {
      if (!this.transactions) {
        return [];
      }
      return Object.keys(this.transactions).map(key => ({
        id: key,
        ...this.transactions[key],
      })).sort((a, b) => b.addedAt.toDate() - a.addedAt.toDate());
    },
    totalExtraLines() {
      return this.extraLines.reduce((total, extraLine) => total + extraLine.amount, 0);
    },
    total() {
      return this.totalExtraLines + this.arrayTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.transactions-table {
  width: 100%;
  margin: auto;
  display: table;

  .transaction-row {
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

      &.addedAt {
        text-align: left;
        width: 80%;
        text-transform: capitalize;
      }

      &.amount {
        text-align: center;
        font-weight: $bold-weight;
      }
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
