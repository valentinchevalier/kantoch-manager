<template>
  <div class="order-editor">
    <div class="order-type-container">
      <input type="radio" id="type-on-site" v-model="value.type" :value="ON_SITE">
      <input type="radio" id="type-take-away" v-model="value.type" :value="TAKE_AWAY">
      <label
        for="type-on-site"
        class="order-type btn"
        :class="{ selected: value.type === ON_SITE }">Sur place</label>
      <label
        for="type-take-away"
        class="order-type btn"
        :class="{ selected: value.type === TAKE_AWAY }">à emporter</label>
    </div>
    <div class="input-wrapper">
      <label for="name">Nom</label>
      <input type="text" ref="name" id="name" name="name" v-model="value.name" placeholder="Comptoir, terrasse, devant le mur, prénom...">
    </div>
    <div class="input-wrapper" v-if="value.numberOfGuest">
      <label for="numberOfGuest">Nombre de personnes</label>
      <number-input v-model="value.numberOfGuest" :min="1"/>
    </div>
  </div>
</template>

<script>
import NumberInput from '@/components/NumberInput';
import { TAKE_AWAY, ON_SITE } from '@/utils/order-utils';

export default {
  components: {
    NumberInput,
  },
  props: ['value'],
  data() {
    return {
      TAKE_AWAY,
      ON_SITE,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixins';


.order-editor {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;

  > * {
    &:not(:last-child) {
      margin-bottom: $spacing;
    }
  }

  .order-type-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: $spacing-small;
    justify-content: center;

    input[type='radio'] {
      display: none;
    }

    .btn {
      border-radius: $box-radius;
      padding: 1rem;

      &:not(.selected) {
        opacity: 0.4;
      }

      &.selected {
        background-color: $black;
        color: $white;
      }
    }
  }
}
</style>
