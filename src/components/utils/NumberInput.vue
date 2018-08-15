<template>
  <div class="number-input">
    <button type="button" class="minus-button" @click="onMinusClick" :disabled="minusDisable"><AppIcon icon="minus"/></button>
    <span class="number">{{value}}</span>
    <button type="button" class="plus-button" @click="onPlusClick" :disabled="plusDisable"><AppIcon icon="plus"/></button>
  </div>
</template>

<script>
import AppIcon from '@/components/utils/AppIcon';

export default {
  components: {
    AppIcon,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  computed: {
    plusDisable() {
      return this.max ? this.value >= this.max : false;
    },
    minusDisable() {
      return this.min ? this.value <= this.min : false;
    },
  },
  methods: {
    onMinusClick() {
      this.$emit('input', this.value - 1);
    },
    onPlusClick() {
      this.$emit('input', this.value + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables";

.number-input {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  > * {
    padding: $spacing-small;
  }

  .minus-button,
  .plus-button {
    font-size: 1.8rem;
    line-height: 1;
    background: none;
  }
}
</style>
