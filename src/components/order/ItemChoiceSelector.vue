<template>
  <form class="" @submit.prevent="addToOrder">
    <h3 class="title" v-html="item.label"></h3>
    <div class="complex-editor-buttons" :class="{ noSelected: !currentChoice }" v-if="hasChoices">
      <button
        type="button"
        class="choice btn"
        :class="{selected: choice.id === currentChoice}"
        v-for="choice in sortedChoices"
        :key="choice.id"
        @click="selectChoice(choice.id)"
        :disabled="!choice.available">
        {{choice.label}}
      </button>
    </div>

    <NumberInput v-model="quantity" :min="1"/>

    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel"><AppIcon icon="cross" /> Annuler</button>
      <button class="btn btn-small" type="button" @click="submit"><AppIcon icon="plus" /> Ajouter</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import NumberInput from '@/components/utils/NumberInput';
import AppIcon from '@/components/utils/AppIcon';

export default {
  components: {
    NumberInput,
    AppIcon,
  },
  props: {
    item: {
      type: Object,
    },
    orderId: {
      type: String,
    },
  },
  data() {
    return {
      quantity: 1,
      currentChoice: undefined,
    };
  },
  computed: {
    hasChoices() {
      return this.item.choices && this.item.choices.length > 0;
    },
    sortedChoices() {
      return this.item.choices.concat().sort((choiceA, choiceB) => {
        if (choiceA.available) {
          if (!choiceB.available) {
            return -1;
          }
        }
        if (choiceB.available) {
          if (!choiceA.available) {
            return 1;
          }
        }
        return 0;
      });
    },
  },
  methods: {
    ...mapActions('temporaryOrder', ['addOneItem']),
    submit() {
      this.addOneItem({
        item: {
          plateId: this.item.id,
          choiceId: this.currentChoice,
        },
        quantity: this.quantity,
      });
      this.$emit('close');
    },
    selectChoice(choiceId) {
      this.currentChoice = choiceId;
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

  .btn {
    border-radius: $box-radius;
  }

  &:not(.noSelected) {
    .btn {
      &:not(.selected) {
        opacity: 0.4;
      }

      &.selected {
        background-color: $secondary-color;
        color: $primary-color;
      }
    }
  }
}

.separator {
  margin: $spacing 0;
  border-top: 2px solid $secondary-color;
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
</style>
