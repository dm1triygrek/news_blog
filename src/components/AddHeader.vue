<script setup lang="ts">
import { RouterLink } from "vue-router";

const props = defineProps({
  title: String
});
</script>

<template>
    <div class="header">
      <RouterLink :to="`/`">
        <el-button class="back">
          <el-icon :size="25"><Back /></el-icon>
        </el-button>
      </RouterLink>
      <h2 class="news_header">{{ title }}</h2>
    </div>
  </template>

  
  <style lang="sass" scoped>
  .header
    display: flex
    align-items: center
    margin-bottom: 20px
  .back
    font-size: 16px
    padding: 10px 20px
    margin-right: 20px
  </style>
  