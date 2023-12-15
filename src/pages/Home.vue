<script setup>
import { ref, onMounted } from 'vue';
import { useRootStore } from '@/stores/root';
import { useSharedStore } from '@/stores/root';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { POSTS_URL } from '../constants';

const sharedStore = useSharedStore();
const rootStore = useRootStore();
const { posts } = storeToRefs(rootStore);

const isPostsLoaded = ref(sharedStore.isPostsLoaded);

const loadPosts = async () => {
  if (!isPostsLoaded.value) {
    await rootStore.getPosts();
    sharedStore.setPostsLoaded(true);
  }
};

const deletePost = async (postId) => {
  try {
    await axios.delete(`${POSTS_URL}/${postId}`);
    rootStore.removePost(postId);
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

onMounted(loadPosts);
</script>

<template>
  <div class="root">
    <div class="header">
      <h1 class="news_header">Новости</h1>
      <RouterLink :to="`/add-news`">
        <el-button class="add_news">
          <el-icon :size="25"><Plus /></el-icon>Добавить новость
        </el-button>
      </RouterLink>
    </div>
    <div class="news_cards">
      <el-card v-for="post in posts" :key="post.id" class="news_card">
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
    </div>
  </div>
</template>

<style lang="sass" scoped>
.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 20px
.add_news
  font-size: 16px
  padding: 10px 20px

.news_cards
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
  gap: 20px

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
