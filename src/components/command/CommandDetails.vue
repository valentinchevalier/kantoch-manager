<template>
  <div class="command-details">
    <p class="no-items" v-if="commandItems.length <= 0">Aucuns produits</p>
    <template v-else>
      <div class="items">
        <div class="command-item" v-for="commandItem in commandItems" :key="commandItem.id">
          <PlateLabel :plateId="commandItem.plateId" :choiceId="commandItem.choiceId" />
          <div class="quantity">
            <div class="quantity-button remove-button" @click="onRemoveClick(commandItem)"><AppIcon icon="minus"/></div>
            <span class="number">{{commandItem.quantity}}</span>
            <div class="quantity-button add-button" @click="onAddClick(commandItem)"><AppIcon icon="plus"/></div>
          </div>
        </div>
      </div>
      <div class="actions">
        <button class="btn btn-icon-left btn-icon-medium" type="button" @click="onBillClick()"><AppIcon icon="receipt" /> Addition</button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AppIcon from '@/components/AppIcon';
import PlateLabel from './PlateLabel';

export default {
  components: {
    AppIcon,
    PlateLabel,
  },
  props: {
    command: {
      type: Object,
      required: true,
    },
  },
  computed: {
    commandItems() {
      return Object.values(this.command.items);
    },
  },
  methods: {
    ...mapActions('commands', ['addItemToCommand', 'removeItemToCommand']),
    ...mapActions('modal', ['showCommandBilling']),
    onAddClick(item) {
      this.addItemToCommand({
        commandId: this.command.id,
        item,
      });
    },
    onRemoveClick(item) {
      this.removeItemToCommand({
        commandId: this.command.id,
        item,
      });
    },
    onBillClick() {
      this.showCommandBilling({ command: this.command });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.no-items {
  margin-top: $spacing-medium;
}

.command-details {
  padding: 0 $spacing-small;
}

.actions {
  margin-top: $spacing;
}

.command-item {
  display: flex;
  padding: $spacing-small 0;
  align-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid $black;
  }

  .plate-label {
    text-align: left;
    margin-right: auto;
  }

  .quantity {
    margin-right: $spacing-small;
    display: flex;
    align-items: center;
    margin-left: -$spacing-small;

    > * {
      padding: $spacing-small;
    }

    .quantity-button {
      font-size: 1.8rem;
      line-height: 1;
      cursor: pointer;
    }
  }
}
</style>

