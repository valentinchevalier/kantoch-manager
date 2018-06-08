<template>
  <form class="command-creator" @submit.prevent="addCommand">
    <h3 class="title">Nouvelle commande</h3>
    <div class="inputs">
      <div class="input-wrapper">
        <label for="tableNumber">Numéro de la table</label>
        <input type="number" id="tableNumber" name="tableNumber" v-model.lazy.number="command.tableNumber">
      </div>
      <div class="input-wrapper">
        <label for="numberOfGuest">Nombre de personnes</label>
        <input type="number" id="numberOfGuest" name="numberOfGuest" v-model.lazy.number="command.numberOfGuest">
      </div>
      <div class="input-wrapper fullwidth">
        <label for="name">Nom de la table</label>
        <input type="text" id="name" name="name" v-model.lazy="command.name">
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
      <button class="btn btn-small" type="submit">Commencer la commande</button>
    </div>
  </form>
</template>

<script>
import { mapMutations } from 'vuex';
import { ADD_COMMAND } from '@/stores/kantochMutation.types';

export default {
  data() {
    return {
      command: {
        tableNumber: '',
        numberOfGuest: 2,
        name: '',
      },
    };
  },
  methods: {
    ...mapMutations('kantoch', [ADD_COMMAND]),
    addCommand() {
      this[ADD_COMMAND](this.command);
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

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
  > * + * {
    margin-left: $spacing-small;
  }
}
</style>
