<template>
  <div class="settings-container">
    <button @click="seedStores" class="btn btn-icon-left"><AppIcon icon="sync" />Réinitialiser les données</button>
  </div>
</template>
<script>
import AppIcon from '@/components/AppIcon';
import { mapActions } from 'vuex';

export default {
  components: {
    AppIcon,
  },
  methods: {
    ...mapActions('menu', { seedMenu: 'seed' }),
    seedStores() {
      this.seedMenu();
    },
  },
};
</script>
<style scoped lang="scss">
@import '~@/styles/variables';

.settings-container {
  padding: $spacing-medium 0;
}
</style>
