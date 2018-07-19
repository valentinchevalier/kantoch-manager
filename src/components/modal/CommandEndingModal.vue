<template>
  <div class="command-billing" v-if="plates && bill.totalPrice">
    <CommandTitle :command="command"/>
    <CommandBill :bill="bill" :numberOfGuest="command.numberOfGuest" />
    <div class="actions">
      <button type="button" class="btn btn-small" @click="close">Retour</button>
      <button type="button" class="btn btn-small" @click="onCloseCommand">Terminer la commande</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CommandUtils from '@/utils/command-utils';
import AppIcon from '@/components/AppIcon';
import CommandTitle from '@/components/command/CommandTitle';
import CommandBill from '@/components/command/CommandBill';

export default {
  components: {
    AppIcon,
    CommandTitle,
    CommandBill,
  },
  data() {
    return {
      bill: {},
    };
  },
  props: {
    commandId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('commands', ['commands']),
    ...mapState('menu', ['plates']),
    command() {
      return this.commands.find(command => command.id === this.commandId);
    },
  },
  mounted() {
    this.bill = CommandUtils.generateBill(this.command.items, this.plates);
  },
  methods: {
    ...mapActions('commands', ['closeCommand']),
    onCloseCommand() {
      this.closeCommand({
        commandId: this.command.id,
        bill: this.bill,
      });
      this.close();
      this.$router.push({ name: 'commands-of-the-day' });
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.has-items {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.formule-label {
  .extra-label {
    font-size: 1.3rem;
    line-height: 1.2;
  }
}

.bill-item {
  display: flex;
  padding: $spacing-small 0;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid $dark-gray;
  }

  .formule-label,
  .plate-label {
    text-align: left;
    margin-right: auto;
  }

  .unit-price,
  .total-price {
    margin-left: $spacing-small;
    flex: 0 0 10rem;
    text-align: right;

    @include responsive($small-breakpoint) {
      flex: 0 0 auto;
    }
  }

  .total-price {
    font-weight: $bold-weight;
  }
}

.total {
  display: flex;
  padding: $spacing-small 0;
  justify-content: flex-end;
  align-items: center;
  text-align: right;

  .total-price {
    font-weight: bold;
    margin-left: auto;
  }
}
</style>

