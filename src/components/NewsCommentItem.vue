<script setup lang="ts">
import { Comment } from "../stores/root";
/* stylelint-disable */
const props = defineProps<{
comment: Comment;
}>();
/* stylelint-enable */
</script>


<template>
    <el-card class="comment-card">
        <div class="comment-card-header">
          <span class="comment-name">{{ comment.name }}</span>
          <span class="comment-email">{{ comment.email }}</span>
        </div>
      <p class="comment-text">{{ comment.body }}</p>
    </el-card>
  </template>
  
  <style scoped>
  .comment-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  .comment-card-header {
    padding: 10px;
    background-color: #f0f0f0;
  }
  
  .comment-name {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .comment-email {
    color: #777;
  }
  
  .comment-text {
    padding: 10px;
    font-size: 14px;
  }
  </style>
  