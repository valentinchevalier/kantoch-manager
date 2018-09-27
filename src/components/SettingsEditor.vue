<template>
  <div class="settings-container">
    <button @click="signOut" class="btn btn-icon-left"><AppIcon icon="sign-out" />Se déconnecter</button>
    <Menu @click="onMenuItemClick" :showChoices="true" class="menu-editor" />
    <button @click="seedMenu" class="btn btn-icon-left"><AppIcon icon="sync" />Réinitialiser le menu</button>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import Authentication from '@/utils/authentication';
import AppIcon from '@/components/utils/AppIcon';
import Menu from '@/components/menu/Menu';

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
    addMenuItem() {
      this.showMenuItemCreator();
    },
    signOut() {
      Authentication.signOut()
        .then(() => {
          this.$router.replace({ name: 'login' });
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import '~@/styles/variables';

.settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + * {
    margin-top: $spacing;
  }
}

.menu-editor {
  max-width: 70rem;
  width: 100%;
  margin: auto;
}
</style>
