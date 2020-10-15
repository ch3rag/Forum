<template>
  <div class="jumbotron">
    <div class="container">
      <h1 class="display-3">Welcome To Chirag's Community!</h1>
      <p class="lead">
        A fully open source forum. Make with 💖 by Chirag Singh Rajput.
      </p>
      <hr class="my-4" />
      <p>
        This forum is all about learning new things and helping people. So be
        kind and helpful! Thank You! 😎🙌
      </p>
      <p class="lead">
        <a
          v-if="!user"
          class="btn btn-primary btn-lg"
          :href="loginUrl"
          role="button"
          >Login Using Google</a
        >
        <router-link
          else
          class="btn btn-primary btn-lg rounded"
          to="/forum"
          role="button"
          >Go To Forum</router-link
        >
        <router-link
          v-if="user && user.role_id === 3"
          class="btn btn-primary btn-lg ml-2 rounded"
          to="/admin"
          role="button"
          >Admin</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapState(['user']),
    loginUrl() {
      if (window.location.hostname === 'localhost') {
        return 'http://localhost:3000/auth/google';
      }
      return '#';
    },
  },
};
</script>
