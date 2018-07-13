<template>
  <div class="command">
    <router-link :to="{ name: 'home' }" class="back-button"><AppIcon icon="arrow-left"/> Retour</router-link>
    <SettingsEditor />
  </div>
</template>


<script>
import SettingsEditor from '@/components/SettingsEditor';
import AppIcon from '@/components/AppIcon';

export default {
  name: 'command',
  components: {
    AppIcon,
    SettingsEditor,
  },
};
</script>
