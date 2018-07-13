<template>
  <div class="detailed-price" @click="deployed = !deployed">
    <div class="simple-price" :class="{ visible: !deployed }">{{ amount | price }}</div>
    <div class="detailed-price-container" :class="{ visible: deployed }">
      <div class="price">
        <span class="label">HT</span>
        <span class="value">{{ ht | price}}</span>
      </div>
      <div class="price">
        <span class="label">TVA ({{taxRate}}%)</span>
        <span class="value">{{ tax | price}}</span>
      </div>
      <div class="price">
        <span class="label">TTC</span>
        <span class="value">{{ amount | price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Settings from '@/utils/settings';

export default {
  props: {
    amount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      deployed: false,
      taxRate: Settings.taxRate,
    };
  },
  computed: {
    taxRatePercent() {
      return this.taxRate / 100;
    },
    ht() {
      return this.amount / (1 + this.taxRatePercent);
    },
    tax() {
      return this.ht * this.taxRatePercent;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixins';

.detailed-price {
  cursor: pointer;
}

.simple-price,
.detailed-price-container {
  display: none;

  &.visible {
    display: block;
  }
}

.simple-price {
  width: 10rem;
  padding: $spacing-small 0;
}

.detailed-price-container {
  .price {
    margin-bottom: $spacing-xsmall;
  }

  .label {
    margin-right: $spacing-small;
  }

  .value {
    display: inline-block;
    width: 10rem;

    @include responsive($small-breakpoint) {
      width: auto;
    }
  }
}
</style>
