<script setup>
import { ref, onMounted } from 'vue';
import { useRootStore } from '@/stores/root';
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import axios from 'axios';
import {  POSTS_URL } from '../constants'

const rootStore = useRootStore();
const { posts } = storeToRefs(rootStore);


const isPostsLoaded = ref(false);

const loadPosts = async () => {
  if (!isPostsLoaded.value) {
    await rootStore.getPosts();
    isPostsLoaded.value = true;
  }
};

const deletePost = async (postId) => {
  try {
    await axios.delete(`${POSTS_URL}/${postId}`)
    // .then(response => {
    //     console.log(`Deleted post with ID ${postId}`);

    // })
    rootStore.removePost(postId); 
    //await rootStore.getPosts(); 
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
            <el-button class="add_news"><el-icon :size="25"><Plus /></el-icon>Добавить новость</el-button>
        </div>
        <div class="news_cards">
            
            <el-card v-for="post in posts" :key="post.id" class="news_card">
                <template #header>
                    
                  <div class="news_title">
                    <RouterLink :to="`/news/${post.id}`">
                        <span>{{ post.title }}</span>
                    </RouterLink>
                    <div class="news_buttons">
                        <el-button class="change_button" text><el-icon :size="25"><Edit /></el-icon></el-button>
                        <el-button class="delete_button" text @click="deletePost(post.id)"><el-icon :size="25"><Delete /></el-icon></el-button>
                    </div>
                    
                  </div>
                </template>
                <p class="news_body">{{ post.body }}</p>
              </el-card>
        </div>
    </div>
</template>

<style lang="sass" scoped>

</style>