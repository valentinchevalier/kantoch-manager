<template>
  <div class="order-name">
    <AppIcon icon="star" class="regular" v-if="order.isRegular"/> {{orderName}}
  </div>
</template>

<script>
import AppIcon from '@/components/utils/AppIcon';
import { mapState } from 'vuex';

export default {
  components: {
    AppIcon,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('regularCustomers', ['regularCustomers']),
    orderName() {
      if (this.order.isRegular && this.order.regularCustomerId && this.regularCustomer) {
        return this.regularCustomer.name;
      }
      return this.order.name;
    },
    regularCustomer() {
      if (!this.order.isRegular || !this.order.regularCustomerId || this.regularCustomers.length === 0) {
        return false;
      }
      return this.regularCustomers.find(regularCustomer => regularCustomer.id === this.order.regularCustomerId);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.order-name {
  .name {
    font-size: 2rem;
    margin-bottom: $spacing-xsmall;

    .number {
      font-weight: $bold-weight;
    }

    .regular {
      font-size: 1.6rem;
      vertical-align: middle;
      margin-bottom: 0.4rem;
    }
  }

  .infos {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;

    > * {
      &:not(:last-child) {
        margin-right: $spacing-small;
        padding-right: $spacing-small;
        border-right: 1px solid $secondary-color;
      }
    }
  }

  .edit-btn {
    padding: $spacing-xsmall;
  }
}
</style>
