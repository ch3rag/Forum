<template>
  <div class="list-group">
    <a
      class="list-group-item list-group-item-action flex-column align-items-start"
      v-for="category in categories"
      :key="category.id"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ category.title }}</h5>
      </div>
      <p class="mb-1">
        {{ category.description }}
      </p>
    </a>
  </div>
</template>
<script>
export default {
  name: 'CategoryList',
  props: [
    'categories',
  ],
};
</script>
