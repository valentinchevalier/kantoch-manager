<template>
  <div class="home">
    <div class="home-menu">
      <h1 class="main-title">Kantoch Manager</h1>
      <h2 class="small-title">Commandes du jour</h2>
      <router-link :to="{ name: 'orders-manager' }" class="btn btn-icon-left"><AppIcon icon="clipboard-list"/> Prise des commandes</router-link>
      <router-link :to="{ name: 'orders-preparation' }" class="btn btn-icon-left"><AppIcon icon="ustensils"/> Préparation des commandes</router-link>
      <h2 class="small-title">Autres</h2>
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

