<template>
  <div class="loader-container" :class="{loading, inline}">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div class="loading">Chargement...</div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    inline: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.loader-container {
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:not(.inline) {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba($white, 0.7);
    opacity: 0;
    pointer-events: none;
    // transition: opacity $transition-duration ease 0.5s;
    z-index: 1000;

    &.loading {
      opacity: 1;
      pointer-events: all;
    }
  }

  &.loading {
    display: flex;
  }

}

.spinner {
  width: 40px;
  height: 40px;

  position: relative;
  margin-bottom: $spacing;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>
