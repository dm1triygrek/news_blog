<script setup lang="ts">
import NewsCard from "./HomeNewsCard.vue";
import { useRootStore } from "../stores/root";
import { storeToRefs } from "pinia";

const rootStore = useRootStore();
const { posts } = storeToRefs(rootStore);
</script>

<template>
  <div class="news_cards">
    <NewsCard v-for="post in posts" :post="post" :key="post.id" />
  </div>
</template>
