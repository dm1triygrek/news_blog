<script setup lang="ts">
import { Post } from "../stores/root";
  const props = defineProps<{ // eslint-disable-line @typescript-eslint/no-unused-vars
    post: Post;
  }>();
</script>

<template>
      <el-card class="news-card">
          <div class="news-card__header">
            <h5 class="news-card__title">{{ post.title }}</h5>
          </div>
        <p>{{ post.body }}</p>
      </el-card>
  </template>
  
  <style scoped>
  .news-card__title {
    font-size: 16px
  }

  .news-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .news-card__header {
    padding: 10px;
    background-color: #f0f0f0;
  }
  </style>
  