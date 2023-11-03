<script setup>
import { useRootStore } from '@/stores/root';
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const rootStore = useRootStore();
rootStore.getPosts();


const { posts } = storeToRefs(rootStore);

</script>

<template>
    <div class="root">
        <div class="header">
            <h1 class="news_header">Новости</h1>
            <el-button class="add_news"><img class="add_img" src="../assets/img/image 1.png" alt="Добавить">Добавить новость</el-button>
        </div>
        <div class="news_cards">
            
            <el-card v-for="post in posts" :key="post.id" class="news_card">
                <template #header>
                    
                  <div class="news_title">
                    <RouterLink :to="`/news/${post.id}`">
                        <span>{{ post.title }}</span>
                    </RouterLink>
                    <div class="news_buttons">
                        <el-button class="change_button" text><img src="../assets/img/image 2.png" alt="Изменить"></el-button>
                        <el-button class="delete_button" text><img src="../assets/img/image 3.png" alt="Удалить"></el-button>
                    </div>
                    
                  </div>
                </template>
                <p class="news_body">{{ post.body }}</p>
              </el-card>
        </div>
    </div>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'


</style>