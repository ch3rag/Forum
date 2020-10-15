<template>
  <div id="app">
    <app-nav />
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import AppNav from '@/components/AppNav.vue';

export default {
  components: {
    AppNav,
  },
  mounted() {
    this.login(localStorage.token);
    this.getAllCategories();
  },
  methods: {
    ...mapActions(['login', 'getAllCategories']),
  },
};
</script>
<style lang="scss"></style>
