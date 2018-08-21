<template>
  <div class="order-billing">
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
import AppIcon from '@/components/utils/AppIcon';
import OrderTitle from '@/components/order/utils/OrderTitle';
import OrderBill from '@/components/order/utils/OrderBill';

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
    this.bill = OrderUtils.generateBill(this.order.itemGroups, this.plates);
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

</style>

