<template>
  <div class="order">
    <router-link :to="{ name: 'home' }" class="back-button"><AppIcon icon="arrow-left"/> Retour</router-link>
    <h1 class="main-title"><AppIcon icon="cog"/> Paramètres</h1>
    <SettingsEditor />
  </div>
</template>


<script>
import SettingsEditor from '@/components/SettingsEditor';
import AppIcon from '@/components/AppIcon';

export default {
  name: 'order',
  components: {
    AppIcon,
    SettingsEditor,
  },
};
</script>
