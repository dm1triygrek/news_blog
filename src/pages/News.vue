<script setup>
import { useRootStore } from '@/stores/root';
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";


const rootStore = useRootStore();


const { posts, comments } = storeToRefs(rootStore);

rootStore.getComments();

  
</script>

<template>
    <div class="header">
        <h1 class="news_header">Новости</h1>
        <RouterLink :to="`/`">
          <el-button class="back"><img class="back_img" src="../assets/img/image 10.png" alt="Назад"></el-button>
        </RouterLink>
    </div>

    <div v-for="post in posts" :key="post.id" class="addit_news">
      <el-card v-show="$route.path==`/news/${post.id}`" class="box-card">
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
      <el-card v-if="$route.params.rid==comment.postId" class="box-card">
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