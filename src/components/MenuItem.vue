<template>
  <button type="button" class="menu-item" @click="onClick" v-long-press="700" @long-press="onLongClick" :class="{disable: !item.available}">
    <div class="plate-label">{{item.label}}</div>
    <div class="plate-label-extra" v-if="item.labelExtra">{{item.labelExtra}}</div>
    <div class="price">{{item.price | price}}</div>
    <div class="choices" v-if="showChoices && item.choices && item.choices.length > 0">
      <div class="choice" :class="{disable: !choice.available}" v-for="choice in item.choices" :key="choice.id">{{choice.label}}</div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    showChoices: {
      type: Boolean,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
    onLongClick() {
      this.$emit('long-click');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixins';

.menu-item {
  position: relative;
  background-color: $white;
  border-radius: $radius;
  border: 2px solid $black;
  padding: $spacing-small;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  cursor: pointer;
  color: $black;
  transition: background-color $transition-duration ease, color $transition-duration ease;

  @include responsive($small-breakpoint) {
    padding: $spacing-small $spacing-xsmall;
  }

  .price {
    font-size: 2rem;
    margin-top: $spacing-small;

    @include responsive($small-breakpoint) {
      font-size: 1.5rem;
      margin-top: $spacing-xsmall;
    }
  }

  .plate-label {
    line-height: 1.1;
  }

  .plate-label-extra {
    font-size: 1.2rem;
  }

  .choices {
    font-size: 1.2rem;
    margin-top: $spacing-xsmall;

    .choice {
      &.disable {
        opacity: 0.4;
      }
    }
  }

  &.disable {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:not(.disable) {
    &:hover,
    &:focus {
      background-color: $black;
      color: $white;
    }
  }
}
</style>
