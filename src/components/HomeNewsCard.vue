<script setup lang="ts">
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { POSTS_URL } from '../constants';
import { useRootStore } from '../stores/root';
import { Post } from '../stores/root';

const rootStore = useRootStore();

const props = defineProps<{
  post: Post;
}>();

const deletePost = async (postId: number) => {
  try {
    await axios.delete(`${POSTS_URL}/${postId}`);
    rootStore.removePost(postId);
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};
</script>

<template>
  <el-card v-if="post" :key="post.id" class="news_card">
    <template #header>
      <div class="news_title">
        <RouterLink :to="`/news/${post.id}`">
          <span>{{ post.title }}</span>
        </RouterLink>
        <div class="news_buttons">
          <RouterLink :to="`/edit-news/${post.id}`">
            <el-button class="change_button" text>
              <el-icon :size="25"><Edit /></el-icon>
            </el-button>
          </RouterLink>
          <el-button class="delete_button" text @click="deletePost(post.id)">
            <el-icon :size="25"><Delete /></el-icon>
          </el-button>
        </div>
      </div>
    </template>
    <p class="news_body">{{ post.body }}</p>
  </el-card>
</template>

<style lang="sass" scoped>
.news_card
  border: 1px solid #ccc
  border-radius: 8px
  overflow: hidden

.news_title
  padding: 10px
  display: flex
  justify-content: space-between
  align-items: center
  background-color: #f0f0f0

.news_buttons
  display: flex
  gap: 10px

.change_button, .delete_button
  font-size: 16px
  padding: 5px 10px
  cursor: pointer

.news_body
  padding: 10px
  font-size: 14px
</style>
