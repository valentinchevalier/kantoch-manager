<template>
  <div class="command-title">
    <div class="table-number">Table <span class="number">{{command.tableNumber}}</span></div>
    <div class="infos">
      <div class="number-of-guests">{{command.numberOfGuest}} personnes</div>
      <div class="name" v-if="command.name">{{command.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    command: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.command-title {
  .table-number {
    font-size: 2rem;
    margin-bottom: $spacing-xsmall;

    .number {
      font-weight: $bold-weight;
    }
  }

  .infos {
    display: flex;
    justify-content: center;
    line-height: 1;

    > * {
      &:not(:last-child) {
        margin-right: $spacing;
        padding-right: $spacing;
        border-right: 1px solid $black;
      }
    }
  }
}
</style>
