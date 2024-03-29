<script setup lang="ts">
import { ref } from "vue";
import { useRootStore } from "../stores/root";
import { useRouter } from "vue-router";
import AddHeader from "../components/AddHeader.vue";
import TextInput from "../components/AddInput.vue";

const router = useRouter();
const rootStore = useRootStore();

const textarea1 = ref<string>("");
const textarea2 = ref<string>("");
const addNews = async () => {
  try {
    const newPost = await rootStore.addPost({ // eslint-disable-line @typescript-eslint/no-unused-vars
      title: textarea1.value,
      body: textarea2.value,
    });
    router.push("/");
  } catch (error) {
    console.error("Error adding post:", error);
  }
};
</script>

<template>
  <div class="root">
    <AddHeader :title="'Добавить новость'" />
    <div class="add-news">
      <TextInput v-model:modelValue="textarea1" placeholder="Введите заголовок" />
      <TextInput v-model:modelValue="textarea2" placeholder="Введите текст новости" />
      <el-button @click="addNews">Добавить новость</el-button>
    </div>
  </div>
</template>


<style lang="sass" scoped>
.add-news
  max-width: 600px
  margin: 0 auto
</style>