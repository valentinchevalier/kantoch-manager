<template>
  <div class="order-link" @click="onClick" v-long-press="700" @long-press="onLongClick" >
    <div class="regular" v-if="order.isRegular"><AppIcon icon="star" /></div>
    <div class="name" v-if="order.name">{{order.name}}</div>
    <div class="number-of-guests">{{order.numberOfGuest}} personnes</div>
  </div>
</template>

<script>
import AppIcon from '@/components/utils/AppIcon';

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
  methods: {
    onClick() {
      this.$router.push({
        name: 'order',
        params: {
          id: this.order.id,
        },
      });
    },
    onLongClick() {
      this.$emit('long-click');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.order-link {
  border-radius: $radius;
  text-decoration: none;
  border: 2px solid $secondary-color;
  padding: $spacing $spacing-small;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  cursor: pointer;
  color: $secondary-color;
  position: relative;
  transition: background-color $transition-duration ease, color $transition-duration ease;

  .name {
    font-size: 1.9rem;
    line-height: 1;
  }

  .number-of-guests {
    font-style: italic;
    font-size: 1.4rem;
  }

  .regular {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
  }

  &:hover,
  &:focus {
    background-color: $secondary-color;
    color: $primary-color;
  }
}
</style>
