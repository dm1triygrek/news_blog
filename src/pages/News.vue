<script setup lang="ts">
import { useRootStore, Post } from "../stores/root";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import NewsHeader from "../components/NewsHeader.vue";
import NewsItem from "../components/NewsItem.vue";
import CommentItem from "../components/NewsCommentItem.vue";

const route = useRoute();
const rootStore = useRootStore();

const { posts, comments } = storeToRefs(rootStore);

const postId = Number(route.params.rid);
const post = posts.value.find((p: Post) => p.id === postId);

if (post) {
  rootStore.getComments(postId);
}
</script>

<template>
  <div class="root">
    <NewsHeader />
    <NewsItem v-if="post" :post="post" />
    <h1 class="news-header">Комментарии</h1>
    <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
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
