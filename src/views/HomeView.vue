<template>
  <div class="home">
    <div class="home-menu">
      <router-link :to="{ name: 'orders-of-the-day' }" class="btn btn-icon-left"><AppIcon icon="calendar-check"/> Commandes du jour</router-link>
      <router-link :to="{ name: 'order-history' }" class="btn btn-icon-left"><AppIcon icon="history"/> Historique des commandes</router-link>
      <router-link :to="{ name: 'settings' }" class="btn btn-icon-left"><AppIcon icon="cog"/> Paramètres</router-link>
    </div>

  </div>
</template>

<script>
import AppIcon from '@/components/AppIcon';

export default {
  name: 'home',
  components: {
    AppIcon,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.home-menu {
  padding: $spacing-medium 0;
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 30rem;

  .btn {
    margin-bottom: $spacing;
  }
}
</style>

