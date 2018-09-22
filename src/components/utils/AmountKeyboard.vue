<template>
  <div class="amount-keyboard">
    <div class="value">{{value | price}}</div>

    <div class="keyboard">
      <button type="button" class="keyboard-button number-button" :class="'number-value-' + (number -1)" v-for="number in 10" :key="number -1" @click="onNumberClick(number - 1)">
        <span class="label">{{number - 1}}</span>
      </button>
      <button type="button" class="keyboard-button delete-button" @click="onDeleteClick()" :disabled="deleteDisable">
        <AppIcon icon="del" class="label" />
      </button>
    </div>

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
  },
  computed: {
    deleteDisable() {
      return this.value === 0;
    },
  },
  methods: {
    onDeleteClick() {
      const newValue = Math.trunc(this.value * 10) / 100;
      this.emitNewValue(newValue);
    },
    onNumberClick(number) {
      let add = 0;
      if (number !== 0) {
        add = number / 100;
      }
      const newValue = (this.value * 10) + add;
      this.emitNewValue(newValue);
    },
    emitNewValue(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables";

.amount-keyboard {
  .value {
    padding: $spacing-small 0;
    font-size: 2rem;
  }

  .keyboard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 1fr;
    grid-gap: $spacing-small;
    // padding: 0 $spacing-medium;
    max-width: 20rem;
    margin: auto;
  }

  .number-value-0 {
    grid-column: 2;
    grid-row: 4;
  }

  .delete-button {
    grid-column: 3;
    grid-row: 4;

    .label {
      font-size: 2.8rem;
      margin-right: 0.4rem;
    }
  }


  .keyboard-button {
    font-size: 1.8rem;
    line-height: 1;
    background: none;
    position: relative;
    border: 2px solid $secondary-color-alt;
    border-radius: 50%;

    .label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: $bold-weight;
    }

    &::before {
      content: '';
      display: block;
      padding-top: 100%;
    }
  }
}
</style>
