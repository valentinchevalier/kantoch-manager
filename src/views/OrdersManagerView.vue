<template>
  <div>
    <router-link :to="{ name: 'home' }" class="back-button"><AppIcon icon="arrow-left"/> Retour</router-link>
    <h1 class="main-title"><AppIcon icon="clipboard-list"/> Prise de commandes</h1>
    <OrdersManager/>
  </div>
</template>

<script>
import OrdersManager from '@/components/OrdersManager';
import AppIcon from '@/components/AppIcon';

export default {
  name: 'home',
  components: {
    OrdersManager,
    AppIcon,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';


.settings-button {
  padding: $spacing-small + .5rem;
  position: absolute;
  top: 0;
  left: 0;
  text-decoration: none;
  color: $black;
  z-index: 1000;
  background-color: rgba($white, .8);

  .icon {
    margin-right: 0.5rem;
    transition: transform $transition-duration ease;
    font-size: 1.8rem;
  }

  &:hover,
  &:focus {
    .icon {
      transform: translateX(-.5rem);
    }
  }
}
</style>

