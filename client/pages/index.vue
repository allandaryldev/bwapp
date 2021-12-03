<template>
  <v-container>
    <h1>Initializing....</h1>
  </v-container>
</template>

<script>
export default {
  layout: 'auth',
  middleware({ store, redirect }) {
    if (!store.state.auth.loggedIn) {
      redirect('/auth')
    } else {
      redirect('/app/dashboard')
    }
  },
  computed: {
    isAuth() {
      return this.$auth.strategy.token.get()
    },
  },
}
</script>

<style></style>
