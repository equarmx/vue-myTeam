<template>
  <v-app>
    <v-main class="main">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch('set_People_list')
  }
};
</script>

<style lang="scss" scoped>
.main {
  background: #F8F8F8;
}
</style>
