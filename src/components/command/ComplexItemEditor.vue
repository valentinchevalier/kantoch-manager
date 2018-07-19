<template>
  <form class="" @submit.prevent="addToCommand">
    <h3 class="title" v-html="item.label"></h3>
    <div class="complex-editor-buttons" v-if="hasChoices">
      <button
        type="button"
        class="choice btn"
        v-for="choice in item.choices"
        :key="choice.id"
        @click="selectChoice(choice.id)"
        :disabled="!choice.available">
        <p class="label">{{choice.label}}</p>
      </button>
    </div>

    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
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
  computed: {
    hasChoices() {
      return this.item.choices && this.item.choices.length > 0;
    },
  },
  methods: {
    ...mapActions('commands', ['addItemToCommand']),
    selectChoice(choiceId) {
      this.addItemToCommand({
        commandId: this.commandId,
        item: {
          plateId: this.item.id,
          choiceId,
        },
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
</style>
