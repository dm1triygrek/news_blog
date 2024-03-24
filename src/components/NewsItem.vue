<script setup lang="ts">
  import { Post } from "../stores/root";

  const props = defineProps<{
    post: Post;
  }>();
</script>

<template>
    <div class="addit_news">
      <el-card class="news-card">
          <div class="news-card-header">
            <span>{{ post.title }}</span>
          </div>
        <p>{{ post.body }}</p>
      </el-card>
    </div>
  </template>
  
  <style scoped>
  .addit_news {
    margin-top: 20px;
  }
  
  .news-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .news-card-header {
    padding: 10px;
    background-color: #f0f0f0;
  }
  </style>
  