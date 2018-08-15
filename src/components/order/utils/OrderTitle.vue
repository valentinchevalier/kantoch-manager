<template>
  <div class="order-title">
    <div class="name"><AppIcon icon="star" class="regular" v-if="order.isRegular"/> {{order.name}} </div>
    <div class="infos">
      <div class="number-of-guests">{{order.numberOfGuest}} personnes</div>
      <div class="type" v-if="!hideType">{{ order.type | orderType }}</div>
      <div class="edit-btn btn-link btn-small" v-if="editable" @click="editOrderInfos"><AppIcon icon="edit" /></div>
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/utils/AppIcon';
import { mapActions } from 'vuex';

export default {
  components: {
    AppIcon,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    hideType: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapActions('modal', ['showOrderInfosEditorModal']),
    editOrderInfos() {
      this.showOrderInfosEditorModal({ orderId: this.order.id });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.order-title {
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
        border-right: 1px solid $black;
      }
    }
  }

  .edit-btn {
    padding: $spacing-xsmall;
  }
}
</style>
