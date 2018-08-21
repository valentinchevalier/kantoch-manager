<template>
  <i class="icon" :class="`icon-${icon}`"></i>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.icon {
  display: inline-block;
  vertical-align: baseline;
}
</style>
