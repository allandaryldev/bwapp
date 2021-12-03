<template>
  <v-app dark>
    <v-main class="black" style="overflow-y: hidden" >
      <v-sheet class="black">
        <transition name="scroll-x-transition">
          <nuxt />
        </transition>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {},
}
</script>

<style></style>
