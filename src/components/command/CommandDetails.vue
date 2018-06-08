<template>
  <div class="command-details">
    <p class="no-items" v-if="command.items.length <= 0">Aucuns produits</p>
    <template v-else>
      <div class="items">
        <div class="command-item" v-for="commandItem in command.items" :key="commandItem.id">
          <div class="quantity">
            <div class="quantity-button remove-button" @click="onRemoveClick(commandItem)"><AppIcon icon="minus"/></div>
            <span class="number">{{commandItem.quantity}}</span>
            <div class="quantity-button add-button" @click="onAddClick(commandItem)"><AppIcon icon="plus"/></div>
          </div>
          <div class="plate-name" v-html="getPlate(commandItem.id).name"></div>
          <div class="unit-price">({{commandItem.price | price}})</div>
          <div class="total-price">{{(commandItem.quantity * commandItem.price) | price}}</div>
        </div>
      </div>
      <div class="command-total">Total: <span class="number">{{total | price}}</span></div>
      <div class="actions">
        <button class="btn" type="button">Terminer</button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppIcon from '@/components/AppIcon';

export default {
  components: {
    AppIcon,
  },
  props: {
    command: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('kantoch', ['menu']),
    total() {
      return this.command.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },
  methods: {
    getPlate(plateId) {
      return this.menu.plates.find(plate => plate.id === plateId);
    },
    onAddClick(item) {
      this.$emit('addItem', item.id);
    },
    onRemoveClick(item) {
      this.$emit('removeItem', item.id);
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

.command-total {
  text-align: right;
  padding: $spacing-small;

  .number {
    font-weight: $bold-weight;
  }
}

.command-item {
  display: flex;
  border-bottom: 2px solid $dark-gray;
  padding: $spacing-small 0;
  align-items: center;
  cursor: pointer;

  .plate-name {
    text-align: left;
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
    }
  }

  .unit-price {
    margin-left: $spacing-small;
    flex: 1;
    text-align: left;
  }

  .total-price {
    font-weight: $bold-weight;
  }
}
</style>
