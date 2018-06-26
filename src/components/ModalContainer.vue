<template>
  <div class="modal-container" :class="{visible: isVisible}">
    <div class="backdrop" @click="hide"></div>
    <component class="modal" v-if="isVisible && componentData && component" :is="component" v-bind="componentData" @close="hide"></component>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CommandCreator from '@/components/command/CommandCreator';
import ComplexItemEditor from '@/components/command/ComplexItemEditor';
import PlateChoicesEditor from '@/components/PlateChoicesEditor';

export default {
  components: {
    CommandCreator,
    ComplexItemEditor,
    PlateChoicesEditor,
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

  .backdrop {
    background-color: rgba($black, 0.5);
    position: absolute;
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

  > * + * {
    margin-top: $spacing-small;
  }
}

</style>
