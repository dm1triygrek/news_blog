<script setup lang="ts">
import NewsHeader from '../components/HomeNewsHeader.vue';
import NewsList from '../components/HomeNewsList.vue';
import { ref, onMounted } from 'vue';
import { useRootStore } from '../stores/root';
import { useSharedStore } from '../stores/root';
import { storeToRefs } from 'pinia';

const sharedStore = useSharedStore();
const rootStore = useRootStore();
const { posts } = storeToRefs(rootStore);

const isPostsLoaded = ref<boolean>(sharedStore.isPostsLoaded);

const loadPosts = async () => {
  if (!isPostsLoaded.value) {
    await rootStore.getPosts();
    sharedStore.setPostsLoaded(true);
  }
};

onMounted(loadPosts);
</script>

<template>
  <div class="root">
    <NewsHeader />
    <NewsList />
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
