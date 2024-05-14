<script setup lang="ts">
import { Comment } from "../stores/root";
const props = defineProps<{ // eslint-disable-line @typescript-eslint/no-unused-vars
  comment: Comment;
}>();
</script>

<template>
  <div class="comment-item">
    <el-card class="comment-item__card">
        <span class="comment-item__card-name">{{ comment.name }}</span>
        <span class="comment-item__card-email">{{ comment.email }}</span>
      <p class="comment-item__card-text">{{ comment.body }}</p>
    </el-card>
  </div>
</template>

<style lang="sass" scoped>
.comment-item 
  margin-bottom: 20px

.comment-item__card 
  border: 1px solid #ccc
  border-radius: 8px
  overflow: hidden

.comment-item__card-name 
  font-weight: bold
  margin-right: 10px

.comment-item__card-email 
  color: #777

.comment-item__card-text 
  padding: 10px
  font-size: 14px
</style>