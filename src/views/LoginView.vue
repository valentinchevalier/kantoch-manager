<template>
  <div class="login">
    <img src="@/assets/logo-lakantoch.png" alt="La kantoch" class="logo" >
    <h3 class="main-title">Connexion</h3>
    <form @submit.prevent="signIn">
      <div class="input-wrapper">
        <input type="email" v-model="email" placeholder="Email">
      </div>
      <div class="input-wrapper">
        <input type="password" v-model="password" placeholder="Mot de passe">
      </div>
      <button type="submit" class="btn btn-small">Se connecter</button>
      <p class="message" v-if="error">{{error}}</p>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Authentication from '@/utils/authentication';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    ...mapActions('menu', { initMenuFromFirebase: 'initFromFirebase' }),
    ...mapActions('orders', { initOrdersFromFirebase: 'initFromFirebase' }),
    ...mapActions('regularCustomers', { initRegularCustomersFromFirebase: 'initFromFirebase' }),
    signIn() {
      Authentication.signIn(this.email, this.password)
        .then(() => {
          this.initMenuFromFirebase();
          this.initOrdersFromFirebase();
          this.initRegularCustomersFromFirebase();
          this.$router.replace({ name: 'home' });
        })
        .catch((err) => {
          this.error = `Oops. ${err.message}`;
        });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/styles/variables';

.logo {
  max-width: 17rem;
  margin: $spacing-medium 0;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  margin: auto;

  > *:not(:last-child) {
    margin-bottom: $spacing;
  }
}

p {
  a {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
