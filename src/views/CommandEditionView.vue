<template>
  <div class="command">
    <router-link :to="{ name: 'commands-of-the-day' }" class="back-button"><AppIcon icon="arrow-left"/> Changer de commande</router-link>
    <CommandEditor :id="$route.params.id"/>
  </div>
</template>

<script>
import CommandEditor from '@/components/command/CommandEditor';
import AppIcon from '@/components/AppIcon';

export default {
  name: 'command',
  components: {
    AppIcon,
    CommandEditor,
  },
};
</script>
