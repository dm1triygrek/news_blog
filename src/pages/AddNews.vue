<script setup>
import { ref } from 'vue';
import { useRootStore } from '@/stores/root';
import { useRouter } from 'vue-router';

const router = useRouter();
const rootStore = useRootStore();

const textarea1 = ref('');
const textarea2 = ref('');

const addNews = async () => {
  try {
    const newPost = await rootStore.addPost({
      title: textarea1.value,
      body: textarea2.value,
    });

    router.push('/');
  } catch (error) {
    console.error('Error adding post:', error);
  }
};
</script>

<template>
    <div class="root">
        <div class="header">
            <RouterLink :to="`/`">
              <el-button class="back">
                <el-icon :size="25"><Back /></el-icon>
              </el-button>
            </RouterLink>
            <h2 class="news_header">Добавить новость</h2>
          </div>
        <div class="add-news">
            
            <div class="field-name">
                <el-input
                v-model="textarea1"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="Введите заголовок"
              />
            </div>
            <div class="field-body">
                <el-input
              v-model="textarea2"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="Введите текст новости"
            />
            </div>
            <el-button @click="addNews">Добавить новость</el-button>
          </div>
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
.add-news
  max-width: 600px
  margin: 0 auto
</style>