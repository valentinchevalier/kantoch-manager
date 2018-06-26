<template>
  <div class="command-editor">
    <div class="column">
      <Menu @click="onItemClick"/>
    </div>
    <div class="column">
      <div class="command-title">
        <div class="table-number">Table <span class="number">{{command.tableNumber}}</span></div>
        <div class="infos">
          <div class="number-of-guests">{{command.numberOfGuest}} personnes</div>
          <div class="name" v-if="command.name">{{command.name}}</div>
        </div>
      </div>
      <CommandDetails :command="command" @removeItem="onRemoveItem" @addItem="onAddItem"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Menu from '@/components/Menu';
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
    ...mapState('commands', ['commands']),
    command() {
      return this.commands.find(command => command.id === this.id);
    },
  },
  methods: {
    ...mapActions('commands', ['addItemToCommand', 'removeItemToCommand']),
    ...mapActions('modal', ['showComplexItemEditor']),
    onItemClick(item) {
      if ((item.variations && item.variations.length > 0) || (item.choices && item.choices.length > 0)) {
        this.showComplexItemEditor({
          item,
          commandId: this.id,
        });
        console.log('Has variations or choices', item);
        return;
      }
      this.addItemToCommand({
        commandId: this.id,
        itemId: item.id,
      });
    },
    onAddItem(itemId, variationId, choiceId) {
      this.addItemToCommand({
        commandId: this.id,
        itemId,
        variationId,
        choiceId,
      });
    },
    onRemoveItem(itemId, variationId, choiceId) {
      this.removeItemToCommand({
        commandId: this.id,
        itemId,
        variationId,
        choiceId,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.command-editor {
  display: grid;
  grid-template-columns: auto minmax(450px, 25%);
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
