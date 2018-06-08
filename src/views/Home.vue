<template>
  <div class="home">
    <CommandManager />
  </div>
</template>

<script>
import CommandManager from '@/components/CommandManager';

export default {
  name: 'home',
  components: {
    CommandManager,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
</style>

