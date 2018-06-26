<template>
  <div class="command-details">
    <p class="no-items" v-if="command.items.length <= 0">Aucuns produits</p>
    <template v-else>
      <div class="items">
        <div class="command-item" v-for="commandItem in commandItems" :key="commandItem.id">
          <div class="quantity">
            <div class="quantity-button remove-button" @click="onRemoveClick(commandItem)"><AppIcon icon="minus"/></div>
            <span class="number">{{commandItem.quantity}}</span>
            <div class="quantity-button add-button" @click="onAddClick(commandItem)"><AppIcon icon="plus"/></div>
          </div>
          <div class="plate-label">
            <div class="main-label" v-html="getPlateLabel(commandItem)"></div>
            <div v-if="commandItem.variationId" class="variation">{{getVariationLabel(commandItem)}}</div>
            <div v-if="commandItem.choiceId" class="choice">{{getChoiceLabel(commandItem)}}</div>
          </div>
          <div class="unit-price">({{getPlatePrice(commandItem) | price}})</div>
          <div class="total-price">{{(commandItem.quantity * getPlatePrice(commandItem)) | price}}</div>
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
    ...mapState('menu', ['plates']),
    commandItems() {
      return Object.values(this.command.items);
    },
    total() {
      return this.commandItems.reduce((total, item) => total + (this.getPlatePrice(item) * item.quantity), 0);
    },
  },
  methods: {
    getPlate(id) {
      return this.plates.find(plate => plate.id === id);
    },
    getPlatePrice({ plateId, variationId }) {
      const plate = this.getPlate(plateId);
      let { price } = plate;

      if (variationId) {
        const variationPrice = plate.variations.find(variat => variat.id === variationId).price;
        if (variationPrice) {
          price = variationPrice;
        }
      }
      return price;
    },
    getPlateLabel({ plateId }) {
      const plate = this.getPlate(plateId);
      return plate.label;
    },
    getVariationLabel({ plateId, variationId }) {
      if (!variationId) {
        return false;
      }
      const plate = this.getPlate(plateId);
      return plate.variations.find(variation => variation.id === variationId).label;
    },
    getChoiceLabel({ plateId, choiceId }) {
      if (!choiceId) {
        return false;
      }
      const plate = this.getPlate(plateId);
      return plate.choices.find(choice => choice.id === choiceId).label;
    },
    onAddClick(item) {
      this.$emit('addItem', item.plateId, item.variationId, item.choiceId);
    },
    onRemoveClick(item) {
      this.$emit('removeItem', item.plateId, item.variationId, item.choiceId);
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

  .plate-label {
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
