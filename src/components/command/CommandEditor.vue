<template>
  <div class="command-editor" >
    <div class="column">
      <Menu @click="onItemClick"/>
    </div>
    <div class="column" v-if="command">
      <CommandTitle :command="command"/>
      <CommandDetails :command="command"/>
    </div>
    <AppLoader :loading="!command" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Menu from '@/components/Menu';
import AppLoader from '@/components/AppLoader';
import CommandTitle from './CommandTitle';
import CommandDetails from './CommandDetails';

export default {
  components: {
    CommandDetails,
    Menu,
    AppLoader,
    CommandTitle,
  },
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    ...mapState('commands', ['commands']),
    command() {
      return this.commands.find(command => command.id === this.id);
    },
  },
  methods: {
    ...mapActions('commands', ['addItemToCommand']),
    ...mapActions('modal', ['showComplexItemEditor']),
    onItemClick(item) {
      if (item.choices && item.choices.length > 0) {
        this.showComplexItemEditor({
          item,
          commandId: this.id,
        });
        return;
      }
      this.addItemToCommand({
        commandId: this.id,
        item: {
          plateId: item.id,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.command-editor {
  display: grid;
  grid-template-columns: auto minmax(450px, 25%);
  grid-gap: $spacing-small 0;
  padding: 0;
  height: 100vh;

  @include responsive($small-breakpoint) {
    grid-template-columns: auto;
    height: auto;
  }

  .column {
    overflow: auto;
    padding: $spacing $spacing-small $spacing-small;

    @include responsive($small-breakpoint) {
      padding-top: 0;
    }
  }

  .command-title {
    .table-number {
      font-size: 2rem;
      margin-bottom: $spacing-xsmall;

      .number {
        font-weight: $bold-weight;
      }
    }

    .infos {
      display: flex;
      justify-content: center;
      line-height: 1;

      > * {
        &:not(:last-child) {
          margin-right: $spacing;
          padding-right: $spacing;
          border-right: 1px solid $black;
        }
      }
    }
  }
}
</style>
