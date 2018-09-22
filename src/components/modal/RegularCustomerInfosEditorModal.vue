<template>
  <form class="regular-customer-editor" @submit.prevent="onSubmit">
    <h3 class="title">Modification</h3>
    <RegularCustomerInfosEditor v-model="regularCustomerEdition" />
    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
      <button class="btn btn-small" type="submit">Enregistrer</button>
    </div>
    <button class="btn-link" type="button" @click="startDeletingRegularCustomer" v-if="!isDeleting"><AppIcon icon="trash" /> Supprimer la commande</button>
    <button class="btn-link" type="button" @click="confirmDeletingRegularCustomer" v-if="isDeleting">Confirmer la suppression ?</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import RegularCustomerInfosEditor from '@/components/regularCustomer/RegularCustomerInfosEditor';
import AppIcon from '@/components/utils/AppIcon';

export default {
  components: {
    RegularCustomerInfosEditor,
    AppIcon,
  },
  props: {
    regularCustomerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      regularCustomerEdition: {},
      isDeleting: false,
    };
  },
  computed: {
    ...mapState('regularCustomers', ['regularCustomers']),
    regularCustomer() {
      return this.regularCustomers.find(regularCustomer => regularCustomer.id === this.regularCustomerId);
    },
  },
  mounted() {
    const {
      name,
      startAmount,
    } = this.regularCustomer;
    this.regularCustomerEdition = Object.assign({}, {
      name,
      startAmount,
    });
  },
  methods: {
    ...mapActions('regularCustomers', ['updateRegularCustomer', 'openRegularCustomer', 'deleteRegularCustomer']),
    onSubmit() {
      this.updateRegularCustomer({
        ...this.regularCustomerEdition,
        id: this.regularCustomerId,
      });
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    },
    startDeletingRegularCustomer() {
      this.isDeleting = true;
    },
    confirmDeletingRegularCustomer() {
      this.deleteRegularCustomer(this.regularCustomer);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixins';

</style>
