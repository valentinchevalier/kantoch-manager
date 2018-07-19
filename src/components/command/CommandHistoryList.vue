<template>
  <div class="command-history-list" v-if="commands.length > 0">
    <div class="command-history-item" v-for="command in commands" :key="command.id" @click="onCommandClick(command)" v-long-press="700" @long-press="onCommandLongClick(command)">
      <div class="command-type">{{ command.type | commandType }}</div>
      <div class="number-of-guests">{{command.numberOfGuest}} personnes</div>
      <div class="total-price">{{command.bill ? command.bill.totalPrice : 0 | price}}</div>
    </div>
    <div class="command-history-item total">
      <div></div>
      <div class="total-label">Total :</div>
      <div class="total-price">{{commandsTotalPrice | price}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commands: {
      type: Array,
      required: true,
    },
  },
  computed: {
    commandsTotalPrice() {
      return this.commands.reduce((acc, command) => acc + (command.bill ? command.bill.totalPrice : 0), 0);
    },
  },
  methods: {
    onCommandClick(command) {
      this.$emit('command-click', command);
    },
    onCommandLongClick(command) {
      this.$emit('command-long-click', command);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.command-history-list {
  width: 100%;
  margin: auto;
  display: table;

  .command-history-item {
    text-decoration: none;
    padding: $spacing-small 0;
    color: $black;
    display: table-row;
    cursor: pointer;

    > * {
      display: table-cell;
      text-align: left;
      padding: $spacing-small 0;
      border-bottom: 1px solid $black;
    }

    .total-price {
      text-align: right;
      font-weight: $bold-weight;
    }

    &.total {
      > * {
        border-bottom: 0;
      }

      .total-label {
        font-weight: $bold-weight;
        text-align: right;
      }
    }
  }
}
</style>
