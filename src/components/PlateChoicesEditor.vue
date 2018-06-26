<template>
  <div class="">
    <h3 class="title">{{plate.label}}</h3>

    <form class="simple-form" @submit.prevent="saveChoice">
      <div class="input-wrapper">
        <input type="text" id="choiceLabel" name="choiceLabel" v-model="choiceLabel" placeholder="Nom du choix">
      </div>
      <button class="btn-plus" type="submit"><i class="icon icon-plus"></i></button>
    </form>

    <div class="choices">
      <div
        type="button"
        class="choice"
        v-for="(choice, index) in plate.choices"
        :key="choice.id" >
        <p class="label">{{choice.label}}</p>
        <div class="delete" @click="deleteChoice(index)"><i class="icon icon-cross"></i></div>
      </div>
      <p class="no-choices" v-if="!plate.choices || plate.choices.length === 0">Il n'y a aucun choix possibles</p>
    </div>

    <div class="actions">
      <button class="btn btn-small" type="button" @click="close">Terminer</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
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
      return this.plates.find(plate => plate.id === this.plateId);
    },
  },
  methods: {
    ...mapActions('menu', ['addPlateChoice', 'removePlateChoice']),
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

    .label {
      flex: 1;
      text-align: left;
    }

    .edit,
    .delete {
      padding: $spacing-xsmall;

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

.actions {
  > * + * {
    margin-left: $spacing-small;
  }
}
</style>
