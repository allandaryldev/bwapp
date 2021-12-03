<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn dark @click="$auth.logout()">Logout</v-btn>
    </v-app-bar>
    <v-main  class="black">
      <v-sheet class="text-capitalize black">
        <Nuxt />
      </v-sheet>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware:'auth',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      title: 'BWAp Final Project'
    }
  }
}
</script>
