<template>
  <div class="container">
    <div class="page-header my-5">
      <h1>Forum</h1>
      <hr />
    </div>
    <div class="mb-4">
      <span class="h2">Categories</span>
    </div>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Forum',
  computed: {
    ...mapState(['categories']),
  },
};
</script>
