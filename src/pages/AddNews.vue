<script setup lang="ts">
import { ref } from "vue";
import { useRootStore } from "../stores/root";
import { useRouter } from "vue-router";
import AppHeader from "../components/common/AppHeader.vue";
import NewsForm from "../components/common/NewsForm.vue";

const router = useRouter();
const rootStore = useRootStore();

const title = ref<string>("");
const text = ref<string>("");

const addNews = async () => {
  try {
    if (!title.value.trim() || !text.value.trim()) {
      throw new Error("Заголовок и текст новости не могут быть пустыми");
    }
    const newPost = await rootStore.addPost({ // eslint-disable-line @typescript-eslint/no-unused-vars
      title: title.value,
      body: text.value,
    });
    router.push("/");
  } catch (error) {
    console.error("Ошибка добавления новости:", error.message);
  }
};
</script>

<template>
  <div class="add-news">
    <AppHeader headerText="Добавить новость" :show-add-button="false" :show-back-button="true" />
    <div class="add-news__textarea">
      <el-input class="add-news__textarea-title" v-model="title" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="Введите заголовок" />
      <NewsForm v-model:modelValue="text" placeholder="Введите текст новости" />
      <el-button @click="addNews">Добавить новость</el-button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.add-news__textarea
  max-width: 600px
  margin: 0 auto

.add-news__textarea-title
  margin-bottom: 20px
</style>
