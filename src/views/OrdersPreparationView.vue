<template>
  <div>
    <router-link :to="{ name: 'home' }" class="back-button"><AppIcon icon="arrow-left"/> Retour</router-link>
    <h1 class="main-title"><AppIcon icon="ustensils"/> Commandes à preparer</h1>
    <OrdersPreparation/>
  </div>
</template>

<script>
import OrdersPreparation from '@/components/OrdersPreparation';
import AppIcon from '@/components/AppIcon';

export default {
  name: 'home',
  components: {
    OrdersPreparation,
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

