<script setup lang="ts">
import AppHeader from "../components/common/AppHeader.vue";
import { ref, onMounted } from "vue";
import { useRootStore } from "../stores/root";
import { useSharedStore } from "../stores/root";
import { storeToRefs } from "pinia";
import axios from "axios";
import { POSTS_URL } from "../constants";

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

const deletePost = async (postId: number) => {
  try {
    await axios.delete(`${POSTS_URL}/${postId}`);
    rootStore.removePost(postId);
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

onMounted(loadPosts);
</script>

<template>
  <div class="root">
    <AppHeader headerText="Новости" :show-add-button="true" :show-back-button="false" />
    <div class="news-cards">
      <RouterLink v-for="post in posts" :key="post.id" :to="`/news/${post.id}`" class="news-card">
        <el-card>
          <template #header>
            <div class="news-card__title">
              <span>{{ post.title }}</span>
              <div class="news-card__buttons">
                <RouterLink :to="`/edit-news/${post.id}`">
                  <el-button class="news-card__button change-button" text>
                    <el-icon :size="25">
                      <Edit />
                    </el-icon>
                  </el-button>
                </RouterLink>
                <el-button class="news-card__button delete-button" text @click.prevent="deletePost(post.id)">
                  <el-icon :size="25">
                    <Delete />
                  </el-icon>
                </el-button>
              </div>
            </div>
          </template>
          <p class="news-card__body">{{ post.body }}</p>
        </el-card>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.news-cards
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
  gap: 20px

  .news-card
    border: 1px solid #ccc
    border-radius: 8px
    overflow: hidden
    cursor: pointer
    transition: box-shadow 0.3s

    &:hover
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3)

  .news-card__title
    padding: 10px
    display: flex
    justify-content: space-between
    align-items: center
    background-color: #f0f0f0

  .news-card__buttons
    display: flex
    gap: 10px

  .news-card__button
    font-size: 16px
    padding: 5px 10px
</style>
