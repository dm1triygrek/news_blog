<script setup lang="ts">
    import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="header">
      <RouterLink to="/" class="back">
        <el-button>
          <el-icon :size="25"><Back /></el-icon>
        </el-button>
      </RouterLink>
      <h1 class="news-header">Новости</h1>
    </div>
  </template>
  
  <style scoped>
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .back {
    font-size: 16px;
    padding: 10px 20px;
    margin-right: 20px;
  }
  </style>
  