<template>
  <form class="" @submit.prevent="addToCommand">
    <h3 class="title">{{item.label}}</h3>
    <div class="complex-editor-buttons" v-if="hasVariations" :class="{empty: selectedVariation === ''}">
      <button
        type="button"
        class="variation btn"
        :class="{ selected: variation.id === selectedVariation }"
        v-for="variation in item.variations"
        :key="variation.id"
        @click="selectedVariation = variation.id">
        <p class="label">{{variation.label}}</p>
        <p class="price">{{(variation.price ? variation.price : item.price) | price}}</p>
      </button>
    </div>
    <div class="separator" v-if="hasChoices && hasVariations"></div>
    <div class="complex-editor-buttons" v-if="hasChoices" :class="{empty: selectedChoice === ''}">
      <button
        type="button"
        class="choice btn"
        :class="{ selected: choice.id === selectedChoice }"
        v-for="choice in item.choices"
        :key="choice.id"
        @click="selectedChoice = choice.id">
        <p class="label">{{choice.label}}</p>
      </button>
    </div>

    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
      <button class="btn btn-small" type="submit">Ajouter à la commande</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
    },
    commandId: {
      type: String,
    },
  },
  data() {
    return {
      selectedVariation: '',
      selectedChoice: '',
    };
  },
  computed: {
    hasChoices() {
      return this.item.choices && this.item.choices.length > 0;
    },
    hasVariations() {
      return this.item.variations && this.item.variations.length > 0;
    },
  },
  methods: {
    ...mapActions('commands', ['addItemToCommand']),
    addToCommand() {
      this.addItemToCommand({
        commandId: this.commandId,
        itemId: this.item.id,
        variationId: this.selectedVariation,
        choiceId: this.selectedChoice,
      });
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.complex-editor-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  grid-gap: $spacing-small;
  justify-content: center;

  &:not(.empty) {
    .btn {
      &:not(.selected) {
        opacity: 0.4;
      }

      &.selected {
        background-color: $black;
        color: $white;
      }
    }
  }

  .btn {
    border-radius: $box-radius;
  }
}

.separator {
  margin: $spacing 0;
  border-top: 2px solid $black;
}

.inputs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: $spacing;
  width: 100%;
  margin-bottom: $spacing-small;

  .input-wrapper,
  .checkbox-wrapper {
    align-self: center;
    justify-self: center;

    input[type=text],
    input[type=number], {
      width: 100%;
    }
  }

  .fullwidth {
    grid-column: span 2;
    width: 100%;
  }
}

.actions {
  margin-top: $spacing;

  > * + * {
    margin-left: $spacing-small;
  }
}
</style>
