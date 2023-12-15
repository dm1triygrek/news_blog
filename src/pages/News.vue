<script setup>
import { useRootStore } from '@/stores/root';
import { storeToRefs } from 'pinia';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const rootStore = useRootStore();

const { posts, comments } = storeToRefs(rootStore);

const postId = Number(route.params.rid);
const post = posts.value.find((p) => p.id === postId);

if (post) {
  rootStore.getComments(postId);
}
</script>

<template>
  <div class="root">
    <div class="header">
      <RouterLink :to="`/`">
        <el-button class="back">
          <el-icon :size="25"><Back /></el-icon>
        </el-button>
      </RouterLink>
      <h1 class="news_header">Новости</h1>
    </div>
  
    <div v-if="post" class="addit_news">
      <el-card class="news-card">
        <template #header>
          <div class="news-card-header">
            <span>{{ post.title }}</span>
          </div>
        </template>
        <p>{{ post.body }}</p>
      </el-card>
    </div>
  
    <h1 class="news_header">Комментарии</h1>
  
    <div v-for="comment in comments" :key="comment.id" class="comments">
      <el-card class="comment-card">
        <template #header>
          <div class="comment-card-header">
            <span class="comment-name">{{ comment.name }}</span>
            <span class="comment-email">{{ comment.email }}</span>
          </div>
        </template>
        <p class="comment-text">{{ comment.body }}</p>
      </el-card>
    </div>
  </div>

</template>

<style lang="sass" scoped>
.header
  display: flex
  align-items: center
  margin-bottom: 20px
.back
  font-size: 16px
  padding: 10px 20px
  margin-right: 20px

.addit_news
  margin-top: 20px

.news-card
  border: 1px solid #ccc
  border-radius: 8px
  overflow: hidden
  margin-bottom: 20px

.news-card-header
  padding: 10px
  background-color: #f0f0f0

.comments
  margin-top: 20px

.comment-card
  border: 1px solid #ccc
  border-radius: 8px
  overflow: hidden
  margin-bottom: 20px

.comment-card-header
  padding: 10px
  background-color: #f0f0f0

.comment-name
  font-weight: bold
  margin-right: 10px

.comment-email
  color: #777

.comment-text
  padding: 10px
  font-size: 14px


</style>
