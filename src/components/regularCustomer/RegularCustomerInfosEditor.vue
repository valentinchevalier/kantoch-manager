<template>
  <div class="order-editor">
    <div class="input-wrapper">
      <label for="name">Nom</label>
      <input type="text" ref="name" id="name" name="name" v-model="value.name" placeholder="Nom et prénom de l'habitué">
    </div>
    <div class="input-wrapper">
      <label for="numberOfGuest">Montant de base</label>
      <AmountKeyboard v-model="value.startAmount"/>
    </div>
  </div>
</template>

<script>
import AmountKeyboard from '@/components/utils/AmountKeyboard';
import { TAKE_AWAY, ON_SITE } from '@/utils/order-utils';

export default {
  components: {
    AmountKeyboard,
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
        background-color: $secondary-color;
        color: $primary-color;
      }
    }
  }
}
</style>
