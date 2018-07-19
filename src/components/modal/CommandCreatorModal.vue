<template>
  <form class="command-creator" @submit.prevent="onSubmit">
    <h3 class="title">Nouvelle commande</h3>
    <CommandInfosEditor v-model="command" />
    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
      <button class="btn btn-small" type="submit">Créer la commande</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import CommandInfosEditor from '@/components/command/CommandInfosEditor';
import { ON_SITE } from '@/utils/command-utils';

export default {
  components: {
    CommandInfosEditor,
  },
  data() {
    return {
      command: {
        numberOfGuest: 2,
        name: '',
        type: ON_SITE,
      },
    };
  },
  methods: {
    ...mapActions('commands', ['addCommand']),
    onSubmit() {
      this.addCommand(this.command);
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixins';

</style>
