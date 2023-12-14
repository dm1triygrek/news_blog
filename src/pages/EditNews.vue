<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRootStore } from '@/stores/root';
import { useSharedStore } from '@/stores/root';
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();

const sharedStore = useSharedStore();
const rootStore = useRootStore();
const { posts } = storeToRefs(rootStore);

const postId = Number(route.params.rid);
const post = posts.value.find(p => p.id === postId);

const textarea1 = ref(post ? post.title : '')
const textarea2 = ref(post ? post.body : '');

const updateNews = async () => {
  try {
    const updatedPost = await rootStore.updatePost(postId, {
      title: textarea1.value,
      body: textarea2.value,
    });

    const index = posts.value.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts.value.splice(index, 1, updatedPost);
    }

    sharedStore.setPostsLoaded(true);
    router.push('/');
  } catch (error) {
    console.error('Error updating post:', error);
  }
};

onMounted(() => {
  if (!post) {
    rootStore.getPostById(postId);
  }
});
</script>

<template>
  <div class="root">
    <div class="header">
      <RouterLink :to="`/`">
        <el-button class="back">
          <el-icon :size="25"><Back /></el-icon>
        </el-button>
      </RouterLink>
      <h2 class="news_header">Изменить новость</h2>
    </div>
    <div class="edit-news">
      
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
    <el-button class="update-button" @click="updateNews">Изменить новость</el-button>
    </div>
  </div>
</template>
  

  
<style lang="sass" scoped>
@import ../assets/styles/main
.header
  display: flex
  align-items: center
  margin-bottom: 20px
.back
  font-size: 16px
  padding: 10px 20px
  margin-right: 20px
.edit-news
  max-width: 600px
  margin: 0 auto
.update-button
  font-size: 16px
  padding: 10px 20px

</style>