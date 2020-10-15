<template>
  <div class="container">
    <div class="page-header my-5">
      <h1>Forum Settings</h1>
      <hr />
    </div>
    <div class="mb-4">
      <span class="h2">Categories</span>
      <button
        class="btn btn-primary float-right rounded btn-lg"
        @click="showAddCategory = !showAddCategory"
      >
        Add Category
      </button>
    </div>
    <form v-if="showAddCategory" @submit.prevent="addCategory(newCategory)">
      <div class="form-group">
        <label for="title">Category Title</label>
        <input
          id="title"
          type="text"
          class="form-control"
          placeholder="Category Title..."
          required
          v-model="newCategory.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Category Description</label>
        <textarea
          id="description"
          class="form-control"
          rows="3"
          required
          v-model="newCategory.description"
        ></textarea>
      </div>
      <div class="form-group">
        <label id="imageUrl">Image Url</label>
        <input
          v-model="newCategory.image_url"
          id="imageUrl"
          type="text"
          class="form-control"
          placeholder="Category Image..."
        />
      </div>
      <button type="submit" class="btn btn-primary rounded">
        Insert Category
      </button>
    </form>
    <h3 class="my-4">Category List</h3>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'admin',
  methods: {
    ...mapActions(['isAdmin', 'addCategory']),
  },
  computed: {
    ...mapState(['categories']),
  },
  data() {
    return {
      showAddCategory: false,
      newCategory: {
        title: '',
        description: '',
        image_url: '',
      },
    };
  },
  async mounted() {
    const admin = await this.isAdmin();
    if (!admin) {
      this.$router.push('/forum');
    }
  },
};
</script>
