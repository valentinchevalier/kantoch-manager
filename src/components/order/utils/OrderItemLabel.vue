<template>
  <div class="order-item-label" v-if="plates">
    <div class="main-label">{{label}}</div>
    <div class="extra-label" v-if="labelExtra">{{labelExtra}}</div>
    <div v-if="choiceId" class="choice">{{choiceLabel}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    plateId: {
      type: String,
      required: true,
    },
    choiceId: {
      type: String,
    },
  },
  computed: {
    ...mapState('menu', ['plates']),
    label() {
      const plate = this.plates[this.plateId];
      return plate ? plate.label : '';
    },
    labelExtra() {
      const plate = this.plates[this.plateId];
      return plate ? plate.labelExtra : '';
    },
    choiceLabel() {
      if (!this.choiceId) {
        return false;
      }
      const plate = this.plates[this.plateId];
      if (!plate) {
        return false;
      }
      return plate.choices.find(choice => choice.id === this.choiceId).label;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.order-item-label {
  .choice,
  .extra-label {
    font-size: 1.3rem;
    line-height: 1.2;
  }

  .main-label {
    font-weight: $bold-weight;
  }
}

</style>
