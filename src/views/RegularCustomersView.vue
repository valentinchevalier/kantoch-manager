<template>
  <div>
    <router-link :to="{ name: 'home' }" class="back-button"><AppIcon icon="arrow-left"/> Retour</router-link>
    <h1 class="main-title"><AppIcon icon="star"/> Gestion des habitués</h1>
    <RegularCustomersManager/>
  </div>
</template>

<script>
import RegularCustomersManager from '@/components/RegularCustomersManager';
import AppIcon from '@/components/utils/AppIcon';

export default {
  components: {
    RegularCustomersManager,
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
  color: $secondary-color;
  z-index: 1000;
  background-color: rgba($primary-color, .8);

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

