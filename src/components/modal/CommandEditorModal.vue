<template>
  <form class="command-creator" @submit.prevent="onSubmit">
    <h3 class="title">Modifier la commande</h3>
    <div v-if="command.isEnded">
      <button class="btn-link" type="button" @click="reOpenCommand"><AppIcon icon="sync" />Continuer la commande</button>
    </div>
    <CommandInfosEditor v-model="commandEdition" />
    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
      <button class="btn btn-small" type="submit">Enregistrer</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CommandInfosEditor from '@/components/command/CommandInfosEditor';
import AppIcon from '@/components/AppIcon';

export default {
  components: {
    CommandInfosEditor,
    AppIcon,
  },
  props: {
    commandId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      commandEdition: {},
    };
  },
  computed: {
    ...mapState('commands', ['commands']),
    command() {
      return this.commands.find(command => command.id === this.commandId);
    },
  },
  mounted() {
    const {
      type,
      numberOfGuest,
      name,
    } = this.command;
    this.commandEdition = Object.assign({}, {
      type,
      numberOfGuest,
      name,
    });
  },
  methods: {
    ...mapActions('commands', ['updateCommand', 'openCommand']),
    onSubmit() {
      this.updateCommand({
        ...this.commandEdition,
        id: this.commandId,
      });
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    },
    reOpenCommand() {
      this.openCommand({
        commandId: this.commandId,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixins';

</style>
