<template>
  <form class="regular-customer-creditor" @submit.prevent="onSubmit">
    <h3 class="title"><AppIcon icon="money-bill"/> Ajout de crédit</h3>
      <AmountKeyboard v-model="amount"/>

    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
      <button class="btn btn-small" type="submit">Créditer</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppIcon from '@/components/utils/AppIcon';
import AmountKeyboard from '@/components/utils/AmountKeyboard';

export default {
  components: {
    AppIcon,
    AmountKeyboard,
  },
  props: {
    regularCustomerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      amount: 0,
    };
  },
  computed: {
    ...mapState('regularCustomers', ['regularCustomers']),
    regularCustomer() {
      return this.regularCustomers.find(regularCustomer => regularCustomer.id === this.regularCustomerId);
    },
  },
  methods: {
    ...mapActions('regularCustomers', ['creditRegularCustomer']),
    onSubmit() {
      this.creditRegularCustomer({
        regularCustomerId: this.regularCustomerId,
        amount: this.amount,
      });
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
