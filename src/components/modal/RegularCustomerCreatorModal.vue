<template>
  <form class="regular-customer-creator" @submit.prevent="onSubmit">
    <h3 class="title">Nouvel habitué</h3>
    <RegularCustomerInfosEditor v-model="regularCustomer" />
    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
      <button class="btn btn-small" type="submit">Créer l'habitué</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import RegularCustomerInfosEditor from '@/components/regularCustomer/RegularCustomerInfosEditor';

export default {
  components: {
    RegularCustomerInfosEditor,
  },
  data() {
    return {
      regularCustomer: {
        name: '',
        startAmount: 0,
      },
    };
  },
  methods: {
    ...mapActions('regularCustomers', ['addRegularCustomer']),
    onSubmit() {
      this.addRegularCustomer(this.regularCustomer);
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
