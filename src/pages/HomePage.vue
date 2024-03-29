<script setup lang="ts">
import HomeNewsHeader from "../components/HomeNewsHeader.vue";
import HomeNewsCard from "../components/HomeNewsCard.vue";
import { ref, onMounted } from "vue";
import { useRootStore } from "../stores/root";
import { useSharedStore } from "../stores/root";
import { storeToRefs } from "pinia";

const sharedStore = useSharedStore();
const rootStore = useRootStore();
const { posts } = storeToRefs(rootStore); // eslint-disable-line @typescript-eslint/no-unused-vars

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
    <HomeNewsHeader />
    <HomeNewsCard />
  </div>
</template>
