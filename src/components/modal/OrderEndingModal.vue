<template>
  <div class="order-billing" v-if="plates && bill.totalPrice">
    <OrderTitle :order="order"/>
    <OrderBill :bill="bill" :numberOfGuest="order.numberOfGuest" />
    <div class="actions">
      <button type="button" class="btn btn-small" @click="close">Retour</button>
      <button type="button" class="btn btn-small" @click="onCloseOrder">Terminer la commande</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import OrderUtils from '@/utils/order-utils';
import AppIcon from '@/components/AppIcon';
import OrderTitle from '@/components/order/OrderTitle';
import OrderBill from '@/components/order/OrderBill';

export default {
  components: {
    AppIcon,
    OrderTitle,
    OrderBill,
  },
  data() {
    return {
      bill: {},
    };
  },
  props: {
    orderId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('orders', ['orders']),
    ...mapState('menu', ['plates']),
    order() {
      return this.orders.find(order => order.id === this.orderId);
    },
  },
  mounted() {
    this.bill = OrderUtils.generateBill(this.order.items, this.plates);
  },
  methods: {
    ...mapActions('orders', ['closeOrder']),
    onCloseOrder() {
      this.closeOrder({
        orderId: this.order.id,
        bill: this.bill,
      });
      this.close();
      this.$router.push({ name: 'orders-manager' });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.has-items {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.formule-label {
  .extra-label {
    font-size: 1.3rem;
    line-height: 1.2;
  }
}

.bill-item {
  display: flex;
  padding: $spacing-small 0;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid $dark-gray;
  }

  .formule-label,
  .plate-label {
    text-align: left;
    margin-right: auto;
  }

  .unit-price,
  .total-price {
    margin-left: $spacing-small;
    flex: 0 0 10rem;
    text-align: right;

    @include responsive($small-breakpoint) {
      flex: 0 0 auto;
    }
  }

  .total-price {
    font-weight: $bold-weight;
  }
}

.total {
  display: flex;
  padding: $spacing-small 0;
  justify-content: flex-end;
  align-items: center;
  text-align: right;

  .total-price {
    font-weight: bold;
    margin-left: auto;
  }
}
</style>

