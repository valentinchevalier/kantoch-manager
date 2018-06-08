<template>
  <div class="menu-item">
    <div class="plate-name" v-html="item.name"></div>
    <div class="price">{{item.price | price}}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables';

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

  .price {
    font-size: 2rem;
    margin-top: $spacing-small;
  }

  .plate-name {
    line-height: 1.1;

    .small {
      font-size: 1.2rem;
    }
  }

  &:hover,
  &:focus {
    background-color: $black;
    color: $white;
  }
}
</style>
