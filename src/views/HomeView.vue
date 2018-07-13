<template>
  <div class="home">
    <router-link :to="{ name: 'settings' }" class="back-button"><AppIcon icon="cog"/> Paramètres</router-link>
    <CommandManager />
  </div>
</template>

<script>
import CommandManager from '@/components/CommandManager';
import AppIcon from '@/components/AppIcon';

export default {
  name: 'home',
  components: {
    CommandManager,
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

