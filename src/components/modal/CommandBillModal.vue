<template>
  <div class="command-billing" v-if="command.bill.totalPrice">
    <CommandTitle :command="command"/>
    <CommandBill :bill="command.bill" :numberOfGuest="command.numberOfGuest" />
    <div class="actions">
      <button type="button" class="btn btn-small" @click="close">Retour</button>
    </div>
  </div>
</template>

<script>
import CommandTitle from '@/components/command/CommandTitle';
import CommandBill from '@/components/command/CommandBill';

export default {
  components: {
    CommandTitle,
    CommandBill,
  },
  props: {
    command: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

</style>

