<template>
  <div class="regular-customers-manager">
    <h2 class="medium-title">Habitués</h2>
    <div class="no-results" v-if="regularCustomers.length <= 0">Aucun habitués</div>
    <RegularCustomerTable :regularCustomers="regularCustomers" v-else/>
    <button type="button" class="btn btn-small btn-icon-left add-btn" @click="openRegularCustomerCreatorModal"><AppIcon icon="plus" />Ajouter un habitué</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import RegularCustomerTable from '@/components/regularCustomer/RegularCustomerTable';
import AppIcon from '@/components/utils/AppIcon';

export default {
  components: {
    AppIcon,
    RegularCustomerTable,
  },
  data() {
    return {
      endedOrdersVisible: false,
    };
  },
  computed: {
    ...mapState('regularCustomers', ['regularCustomers']),
  },
  methods: {
    ...mapActions('modal', ['showRegularCustomerCreatorModal']),
    openRegularCustomerCreatorModal() {
      this.showRegularCustomerCreatorModal();
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.regular-customers-manager {
  padding-bottom: $spacing-large;

  @include responsive($small-breakpoint) {
    margin-bottom: $spacing-large;
  }
}

.medium-title {
  margin-bottom: $spacing-small;
}

.regular-customer-detailed-list,
.no-results {
  margin-bottom: $spacing;
}

.add-btn {
  position: fixed;
  bottom: $spacing;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

  @include responsive($small-breakpoint) {
    right: -50%;
  }
}

.regular-customer-history-list {
  max-width: 40rem;
}
</style>
