<template>
  <div>
    <button @click="init">Initialize app base state</button>
    <button @click="get">Get</button>
  </div>
</template>
<script>
export default {
  methods: {
    init() {
      this.$store.dispatch('menu/seed');
      // this.$store.dispatch('conversations/seed');
    },
    get() {
      // todo
    },
  },
};
</script>
<style scoped>
button {
  margin: 30px;
  padding: 5px;
  cursor: pointer;
}
</style>
