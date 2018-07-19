<template>
  <div class="settings-container">
    <Menu @click="onMenuItemClick" :showChoices="true" class="menu-editor" />
    <button @click="seedMenu" class="btn btn-icon-left"><AppIcon icon="sync" />Réinitialiser le menu</button>
  </div>
</template>
<script>
import AppIcon from '@/components/AppIcon';
import Menu from '@/components/Menu';
import { mapActions } from 'vuex';

export default {
  components: {
    AppIcon,
    Menu,
  },
  methods: {
    ...mapActions('menu', { seedMenu: 'seed' }),
    ...mapActions('modal', ['showMenuItemEditor']),
    onMenuItemClick(item) {
      this.showMenuItemEditor({ plate: item });
    },
  },
};
</script>
<style scoped lang="scss">
@import '~@/styles/variables';

.menu-editor {
  max-width: 70rem;
  margin: auto;
  margin-bottom: $spacing;
}
</style>
