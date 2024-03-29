<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useRootStore } from "../stores/root";
import { storeToRefs } from "pinia";
import EditHeader from "../components/EditHeader.vue";
import TextareaInput from "../components/EditInput.vue";

const route = useRoute();
const router = useRouter();
const rootStore = useRootStore();
const { posts } = storeToRefs(rootStore);

const postId = Number(route.params.rid);
const post = posts.value.find(p => p.id === postId);

const textarea1 = ref<string>(post ? post.title : "");
const textarea2 = ref<string>(post ? post.body : "");

const updateNews = async () => {
  const currentPost = post;
  if (!currentPost) {
    return;
  }

  try {
    const updatedPost = await rootStore.updatePost(postId, {
      title: textarea1.value,
      body: textarea2.value,
    });

    const index = posts.value.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts.value.splice(index, 1, updatedPost);
    }

    router.push("/");
  } catch (error) {
    console.error("Error updating post:", error);
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
    <EditHeader :title="post ? 'Изменить новость' : 'Загрузка...'" />
    <div class="edit-news">
      <TextareaInput v-model:modelValue="textarea1" placeholder="Введите заголовок" />
      <TextareaInput v-model:modelValue="textarea2" placeholder="Введите текст новости" />
      <el-button class="update-button" @click="updateNews">Изменить новость</el-button>
    </div>
  </div>
</template>
  
<style lang="sass" scoped>
.edit-news
  max-width: 600px
  margin: 0 auto
.update-button
  font-size: 16px
  padding: 10px 20px

</style>