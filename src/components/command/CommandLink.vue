<template>
  <div class="command-link" @click="onClick" v-long-press="700" @long-press="onLongClick">
    <div class="name" v-if="command.name">{{command.name}}</div>
    <div class="number-of-guests">{{command.numberOfGuest}} personnes</div>
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
  methods: {
    onClick() {
      this.$router.push({
        name: 'command',
        params: {
          id: this.command.id,
        },
      });
    },
    onLongClick() {
      this.$emit('long-click');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';
@import '~@/styles/mixins';

.command-link {
  border-radius: $radius;
  text-decoration: none;
  border: 2px solid $black;
  padding: $spacing $spacing-small;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  cursor: pointer;
  color: $black;
  transition: background-color $transition-duration ease, color $transition-duration ease;

  .name {
    font-size: 1.9rem;
    line-height: 1;
  }

  .number-of-guests {
    font-style: italic;
    font-size: 1.4rem;
  }

  &:hover,
  &:focus {
    background-color: $black;
    color: $white;
  }
}
</style>
