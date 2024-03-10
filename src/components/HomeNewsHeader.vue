<script setup lang="ts">
    import { RouterLink } from "vue-router";
</script>

<template>
    <div class="header">
      <h1 class="news_header">Новости</h1>
      <RouterLink :to="`/add-news`">
        <el-button class="add_news">
          <el-icon :size="25"><Plus /></el-icon>Добавить новость
        </el-button>
      </RouterLink>
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
  </style>
  