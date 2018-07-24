<template>
  <form class="order-creator" @submit.prevent="onSubmit">
    <h3 class="title">Modifier la commande</h3>
    <div v-if="order.isEnded">
      <button class="btn-link" type="button" @click="reOpenOrder"><AppIcon icon="sync" />Continuer la commande</button>
    </div>
    <OrderInfosEditor v-model="orderEdition" />
    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
      <button class="btn btn-small" type="submit">Enregistrer</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OrderInfosEditor from '@/components/order/OrderInfosEditor';
import AppIcon from '@/components/AppIcon';

export default {
  components: {
    OrderInfosEditor,
    AppIcon,
  },
  props: {
    orderId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      orderEdition: {},
    };
  },
  computed: {
    ...mapState('orders', ['orders']),
    order() {
      return this.orders.find(order => order.id === this.orderId);
    },
  },
  mounted() {
    const {
      type,
      numberOfGuest,
      name,
    } = this.order;
    this.orderEdition = Object.assign({}, {
      type,
      numberOfGuest,
      name,
    });
  },
  methods: {
    ...mapActions('orders', ['updateOrder', 'openOrder']),
    onSubmit() {
      this.updateOrder({
        ...this.orderEdition,
        id: this.orderId,
      });
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    },
    reOpenOrder() {
      this.openOrder({
        orderId: this.orderId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixins';

</style>
