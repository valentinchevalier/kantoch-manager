<template>
  <form class="command-creator" @submit.prevent="onSubmit">
    <h3 class="title">Nouvelle commande</h3>
    <div class="command-type-container">
      <button
        type="button"
        class="command-type btn"
        :class="{ selected: command.type === ON_SITE }"
        @click="command.type = ON_SITE">Sur place</button>
      <button
        type="button"
        class="command-type btn"
        :class="{ selected: command.type === TAKE_AWAY }"
        @click="command.type = TAKE_AWAY">à emporter</button>
    </div>
    <div class="inputs" v-if="command.type === ON_SITE">
      <div class="input-wrapper">
        <label for="tableNumber">Numéro de la table</label>
        <input type="number" id="tableNumber" name="tableNumber" v-model.lazy.number="command.tableNumber">
      </div>
      <div class="input-wrapper">
        <label for="numberOfGuest">Nombre de personnes</label>
        <input type="number" id="numberOfGuest" name="numberOfGuest" v-model.lazy.number="command.numberOfGuest">
      </div>
      <div class="input-wrapper fullwidth">
        <label for="name">Détails</label>
        <input type="text" id="name" name="name" v-model.lazy="command.name">
      </div>
    </div>
    <div class="inputs" v-if="command.type === TAKE_AWAY">
      <div class="input-wrapper">
        <label for="name">Nom</label>
        <input type="text" id="name" name="name" v-model.lazy="command.name" required>
      </div>
      <div class="input-wrapper">
        <label for="numberOfGuest">Nombre de personnes</label>
        <input type="number" id="numberOfGuest" name="numberOfGuest" v-model.lazy.number="command.numberOfGuest">
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-small" type="button" @click="cancel">Annuler</button>
      <button class="btn btn-small" type="submit">Commencer la commande</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { TAKE_AWAY, ON_SITE } from '@/utils/command-utils';

export default {
  data() {
    return {
      command: {
        tableNumber: '',
        numberOfGuest: 2,
        name: '',
        type: ON_SITE,
      },
      TAKE_AWAY,
      ON_SITE,
    };
  },
  methods: {
    ...mapActions('commands', ['addCommand']),
    onSubmit() {
      this.addCommand(this.command);
      this.$emit('close');
    },
    cancel() {
      this.$emit('close');
    },
    setTakeAway() {
      this.command.type = TAKE_AWAY;
    },
    setOnSite() {
      this.command.type = ON_SITE;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.command-type-container {
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
