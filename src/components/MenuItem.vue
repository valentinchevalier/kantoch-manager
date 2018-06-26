<template>
  <div class="menu-item" v-long-press="700" @long-press="onLongClick()">
    <div class="plate-label" v-html="item.label"></div>
    <div class="price">{{item.price | price}}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    ...mapActions('modal', ['showPlateChoicesEditor']),
    onLongClick() {
      this.showPlateChoicesEditor({ plate: this.item });
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

  .plate-label {
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
