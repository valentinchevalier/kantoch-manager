<template>
  <div class="menu-item-editor">
    <h3 class="title">{{plate.label}}</h3>
    <h4 class="subtitle" v-if="plate.labelExtra">{{plate.labelExtra}}</h4>

    <button type="button" class="btn-link btn-small" @click="onTogglePlateAvailability()"><AppIcon :icon="plate.available ? 'eye' : 'eye-slash'"/>{{plate.available ? 'Désactiver' : 'Activer'}}</button>

    <form class="simple-form" @submit.prevent="saveChoice">
      <div class="input-wrapper">
        <input type="text" id="choiceLabel" name="choiceLabel" v-model="choiceLabel" placeholder="Nom du choix">
      </div>
      <button class="btn-plus" type="submit"><AppIcon icon="plus"/></button>
    </form>

    <div class="choices">
      <div
        type="button"
        class="choice"
        v-for="(choice, index) in plate.choices"
        :key="choice.id"
        :class="{ disable : !choice.available }" >
        <button type="button" class="availability" @click="toggleChoiceAvailability(index, choice.available)"><AppIcon :icon="choice.available ? 'eye' : 'eye-slash'"/></button>
        <p class="label">{{choice.label}}</p>
        <button type="button" class="delete" @click="deleteChoice(index)"><AppIcon icon="cross" /></button>
      </div>
      <p class="no-choices" v-if="!plate.choices || plate.choices.length === 0">Il n'y a aucun choix possibles</p>
    </div>

    <div class="actions">
      <button type="button" class="btn btn-small" @click="close">Terminer</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import AppIcon from '@/components/utils/AppIcon';

export default {
  components: {
    AppIcon,
  },
  props: {
    plateId: {
      type: String,
    },
  },
  data() {
    return {
      choiceLabel: '',
    };
  },
  computed: {
    ...mapState('menu', ['plates']),
    plate() {
      return this.plates[this.plateId];
    },
  },
  methods: {
    ...mapActions('menu', ['addPlateChoice', 'removePlateChoice', 'togglePlateChoiceAvailability', 'togglePlateAvailability']),
    onTogglePlateAvailability() {
      this.togglePlateAvailability({
        plateId: this.plate.id,
        available: !this.plate.available,
      });
    },
    saveChoice() {
      if (this.choiceLabel === '') {
        return;
      }

      this.addPlateChoice({
        plateId: this.plate.id,
        choiceLabel: this.choiceLabel,
      });

      this.choiceLabel = '';
    },
    deleteChoice(index) {
      this.removePlateChoice({
        plateId: this.plate.id,
        choiceIndex: index,
      });
    },
    toggleChoiceAvailability(index, previousAvailability) {
      this.togglePlateChoiceAvailability({
        plateId: this.plate.id,
        choiceIndex: index,
        available: !previousAvailability,
      });
    },
    close() {
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
    &:not(.selected) {
      opacity: 0.6;
    }
  }
}

.choices {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: $spacing-xsmall;
  width: 100%;
  margin-bottom: $spacing;

  .choice {
    display: flex;
    align-items: center;

    &.disable {
      .label,
      .availability {
        opacity: 0.5;
      }
    }

    .label {
      flex: 1;
      text-align: left;
    }

    .availability,
    .delete {
      padding: $spacing-xsmall;
      background-color: transparent;

      .icon {
        font-size: 1.8rem;
      }
    }
  }
}

.simple-form {
  display: flex;
  align-items: center;

  .input-wrapper {
    margin-right: $spacing-small;
    flex: 1;

    input {
      text-align: left;
    }
  }

  .btn-plus {
    padding: $spacing-small;
    background-color: transparent;

    .icon {
      font-size: 1.8rem;
    }
  }
}
</style>
