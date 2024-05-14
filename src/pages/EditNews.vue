<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useRootStore } from "../stores/root";
import { storeToRefs } from "pinia";
import AppHeader from "../components/common/AppHeader.vue";
import NewsForm from "../components/common/NewsForm.vue";

const route = useRoute();
const router = useRouter();
const rootStore = useRootStore();
const { posts } = storeToRefs(rootStore);

const postId = Number(route.params.rid);
const post = posts.value.find(p => p.id === postId);

const title = ref<string>(post ? post.title : "");
const text = ref<string>(post ? post.body : "");

const updateNews = async () => {
  const currentPost = post;
  if (!currentPost) {
    return;
  }

  try {
    const updatedPost = await rootStore.updatePost(postId, {
      title: title.value,
      body: text.value,
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
  <div class="edit-news">
    <AppHeader headerText="Изменить новость" :show-add-button="false" :show-back-button="true" />
    <div class="edit-news__textarea">
      <el-input class="edit-news__textarea-title" v-model="title" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="Введите заголовок" />
      <NewsForm v-model:modelValue="text" placeholder="Введите текст новости" />
      <el-button @click="updateNews">Изменить новость</el-button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.edit-news__textarea
  max-width: 600px
  margin: 0 auto

.edit-news__textarea-title
  margin-bottom: 20px
</style>