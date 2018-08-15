<template>
  <div id="app">
    <router-view class="main-view"/>
    <AppModalContainer />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Authentication from '@/utils/authentication';
import AppModalContainer from '@/components/ModalContainer';

export default {
  components: {
    AppModalContainer,
  },
  created() {
    Authentication.isLoggedIn()
      .then((res) => {
        if (res) {
          this.initMenuFromFirebase();
          this.initKantochFromFirebase();
        }
      });
  },
  methods: {
    ...mapActions('menu', { initMenuFromFirebase: 'initFromFirebase' }),
    ...mapActions('orders', { initKantochFromFirebase: 'initFromFirebase' }),
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito:300,400,700');

@import './styles/variables';
@import './styles/mixins';
@import './styles/forms';
@import './styles/button';

* {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  box-sizing: border-box;
  font-family: inherit;
}

html {
  font-size: 10px;
}
body {
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
}

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.vdp-datepicker__calendar.vdp-datepicker__calendar {
  width: 100%;
  max-width: 30rem;
}

.main-view {
  padding: $spacing;

  @include responsive($small-breakpoint) {
    padding: $spacing-small;
  }
}

.main-title {
  font-size: 2.5rem;
  margin-bottom: $spacing;

  @include responsive($small-breakpoint) {
    font-size: 2rem;
    margin-bottom: $spacing-small;
  }

  .icon {
    margin: 0 $spacing-small;
  }
}

.medium-title {
  font-size: 2.1rem;
  margin-bottom: $spacing;

  @include responsive($small-breakpoint) {
    font-size: 1.7rem;
    margin-bottom: $spacing-small;
  }
}

.small-title {
  font-size: 1.7rem;
  font-weight: $bold-weight;
  margin-bottom: $spacing-xsmall;

  @include responsive($small-breakpoint) {
    font-size: 1.5rem;
  }
}

.mt {
  margin-top: $spacing;
}

.mt-small {
  margin-top: $spacing-small;
}

.back-button {
  padding: $spacing-small + .5rem;
  position: fixed;
  top: 0;
  left: 0;
  text-decoration: none;
  color: $black;
  z-index: 1000;
  background-color: rgba($white, .9);

  @include responsive($small-breakpoint) {
    right: 0;

    & + * {
      margin-top: 5rem;
    }
  }

  .icon {
    margin-right: 0.5rem;
    transition: transform $transition-duration ease;
  }

  &:hover,
  &:focus {
    .icon {
      transform: translateX(-.5rem);
    }
  }
}
</style>
