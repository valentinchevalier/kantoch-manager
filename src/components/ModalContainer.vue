<template>
  <div class="modal-container" :class="{visible: isVisible}">
    <div class="backdrop" @click="hide"></div>
    <component class="modal" v-if="isVisible && componentData && component" :is="component" v-bind="componentData" @close="hide"></component>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import OrderCreatorModal from '@/components/modal/OrderCreatorModal';
import OrderEditorModal from '@/components/modal/OrderEditorModal';
import OrderEndingModal from '@/components/modal/OrderEndingModal';
import OrderBillModal from '@/components/modal/OrderBillModal';
import ItemChoiceSelector from '@/components/order/ItemChoiceSelector';
import MenuItemEditor from '@/components/MenuItemEditor';

export default {
  components: {
    OrderCreatorModal,
    OrderEditorModal,
    ItemChoiceSelector,
    MenuItemEditor,
    OrderEndingModal,
    OrderBillModal,
  },
  computed: {
    ...mapState('modal', ['isVisible', 'component', 'componentData']),
  },
  methods: {
    ...mapActions('modal', ['hide']),
  },
};
</script>

<style lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  padding: $spacing;
  opacity: 0;
  align-items: center;
  justify-content: center;
  display: none;
  overflow: auto;

  @include responsive($small-breakpoint) {
    padding: $spacing-small;
  }

  .backdrop {
    background-color: rgba($black, 0.5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    cursor: pointer;
  }

  &.visible {
    opacity: 1;
    display: flex;
  }
}

.modal {
  padding: $spacing;
  width: 50rem;
  max-width: 100%;
  margin: auto;
  border-radius: $box-radius;

  box-shadow: 0px 0px 75px -17px rgba($black, 0.25);
  background-color: rgba($white, 0.95);

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.8rem;
    margin-top: 0;
  }

  > * + * {
    margin-top: $spacing-small;
  }

  &.modal-large {
    width: 90vw;
  }

  .actions {
    margin-top: $spacing-small;

    .btn {
      @include responsive($small-breakpoint) {
        width: 100%;
      }
    }

    > * + * {
      margin: $spacing-small;

      @include responsive($small-breakpoint) {
        margin-left: 0;
        margin-top: $spacing-small;
      }
    }
  }
}

</style>
