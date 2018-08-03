<template>
  <form class="order-creator" @submit.prevent="onSubmit">
    <h3 class="title">Nouvelle commande</h3>
    <OrderInfosEditor v-model="order" />
    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
      <button class="btn btn-small" type="submit">Créer la commande</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import OrderInfosEditor from '@/components/order/OrderInfosEditor';
import { ON_SITE } from '@/utils/order-utils';

export default {
  components: {
    OrderInfosEditor,
  },
  data() {
    return {
      order: {
        numberOfGuest: 2,
        name: '',
        type: ON_SITE,
        isRegular: false,
      },
    };
  },
  methods: {
    ...mapActions('orders', ['addOrder']),
    onSubmit() {
      this.addOrder(this.order);
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixins';

</style>
