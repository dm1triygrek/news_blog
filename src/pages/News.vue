<script setup>
import { ref, onMounted } from 'vue';
import { useRootStore } from '@/stores/root';
import { storeToRefs } from "pinia";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const rootStore = useRootStore();

const { posts, comments } = storeToRefs(rootStore);

const postId = Number(route.params.rid);
const post = posts.value.find((p) => p.id === postId);
console.log('Post ID:', postId);
if (post) {
  rootStore.getComments(postId);
}

</script>

<template>
    <div class="header">
        <h1 class="news_header">Новости</h1>
        <RouterLink :to="`/`">
          <el-button class="back"><el-icon :size="25"><Back /></el-icon></el-button>
        </RouterLink>
    </div>

    <div v-if="post" class="addit_news">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{ post.title }}</span>
          </div>
        </template>
        <p>{{ post.body }}</p>
      </el-card>
    </div>
    
-----
    <div v-for="comment in comments" :key="comment.id" class="comments">
      <el-card class="box-card">
        <template #header>
          <div  class="card-header">
            <span>{{comment.name}} {{comment.email}}</span>
          </div>
        </template>
        <p>{{ comment.body }}</p>
      </el-card>
    </div>
      
      
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'
</style>