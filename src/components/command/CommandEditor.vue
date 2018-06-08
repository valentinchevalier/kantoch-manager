<template>
  <div class="command-editor">
    <div class="column">
      <Menu @addItem="addItemToCommand"/>
    </div>
    <div class="column">
      <div class="command-title">
        <div class="table-number">Table <span class="number">{{command.tableNumber}}</span></div>
        <div class="infos">
          <div class="number-of-guests">{{command.numberOfGuest}} personnes</div>
          <div class="name" v-if="command.name">{{command.name}}</div>
        </div>
      </div>
      <CommandDetails :command="command" @removeItem="removeItemToCommand" @addItem="addItemToCommand"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Menu from '@/components/Menu';
import { ADD_ITEM_TO_COMMAND, REMOVE_ITEM_TO_COMMAND } from '@/stores/kantochMutation.types';
import CommandDetails from './CommandDetails';

export default {
  components: {
    CommandDetails,
    Menu,
  },
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    ...mapState('kantoch', ['commands']),
    command() {
      return this.commands.find(command => command.id === this.id);
    },
  },
  methods: {
    ...mapMutations('kantoch', [ADD_ITEM_TO_COMMAND, REMOVE_ITEM_TO_COMMAND]),
    addItemToCommand(itemId) {
      this[ADD_ITEM_TO_COMMAND]({ commandId: this.id, itemId });
    },
    removeItemToCommand(itemId) {
      this[REMOVE_ITEM_TO_COMMAND]({ commandId: this.id, itemId });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.command-editor {
  display: grid;
  grid-template-columns: minmax(50%, 800px) 400px;
  grid-gap: $spacing-small 0;
  padding: 0;
  height: 100vh;

  .column {
    overflow: auto;
    padding: $spacing $spacing-small $spacing-small;
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
