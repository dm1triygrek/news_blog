<script setup lang="ts">
import { useRootStore, Post } from "../stores/root";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import AppHeader from "../components/common/AppHeader.vue";
import NewsCommentItem from "../components/news/NewsCommentItem.vue";

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
    <AppHeader :headerText="post.title" :show-add-button="false" :show-back-button="true" />
    <el-card class="news-card">
      <p>{{ post.body }}</p>
    </el-card>
    <h1 class="news-header">Комментарии</h1>
    <NewsCommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

