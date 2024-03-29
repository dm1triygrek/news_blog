<script setup lang="ts">
import { useRootStore, Post } from "../stores/root";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import NewsHeader from "../components/NewsHeader.vue";
import NewsItem from "../components/NewsItem.vue";
import NewsCommentItem from "../components/NewsCommentItem.vue";

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
    <NewsCommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<style lang="sass" scoped>
.news-card-header
  padding: 10px
  background-color: #f0f0f0
</style>
