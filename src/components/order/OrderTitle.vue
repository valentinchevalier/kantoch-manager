<template>
  <div class="order-title">
    <div class="name"><AppIcon icon="star" class="regular" v-if="order.isRegular"/> {{order.name}}</div>
    <div class="infos">
      <div class="number-of-guests">{{order.numberOfGuest}} personnes</div>
      <div class="type">{{ order.type | orderType }}</div>
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/AppIcon';

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
    line-height: 1;

    > * {
      &:not(:last-child) {
        margin-right: $spacing;
        padding-right: $spacing;
        border-right: 1px solid $black;
      }
    }
  }
}
</style>
