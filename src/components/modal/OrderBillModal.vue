<template>
  <div class="order-billing" v-if="order.bill.totalPrice">
    <OrderTitle :order="order"/>
    <OrderBill :bill="order.bill" :numberOfGuest="order.numberOfGuest" />
    <div class="actions">
      <button type="button" class="btn btn-small" @click="close">Retour</button>
    </div>
  </div>
</template>

<script>
import OrderTitle from '@/components/order/OrderTitle';
import OrderBill from '@/components/order/OrderBill';

export default {
  components: {
    OrderTitle,
    OrderBill,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

</style>

