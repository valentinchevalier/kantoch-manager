<template>
  <div class="home">
    <div class="home-menu">
      <h1 class="main-title">Kantoch Manager</h1>
      <h2 class="medium-title">Commandes du jour</h2>
      <router-link :to="{ name: 'orders-manager' }" class="btn btn-icon-left"><AppIcon icon="ustensils"/> Gestion des commandes</router-link>
      <h2 class="medium-title">Autres</h2>
      <router-link :to="{ name: 'regular-customers' }" class="btn btn-icon-left"><AppIcon icon="star"/> Gestion des habitués</router-link>
      <router-link :to="{ name: 'order-history' }" class="btn btn-icon-left"><AppIcon icon="history"/> Historique des commandes</router-link>
      <router-link :to="{ name: 'settings' }" class="btn btn-icon-left"><AppIcon icon="cog"/> Paramètres</router-link>
    </div>
  </div>
</template>

<script>
import AppIcon from '@/components/utils/AppIcon';

export default {
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

