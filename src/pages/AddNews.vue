<script setup lang="ts">
import { ref } from "vue";
import { useRootStore } from "../stores/root";
import { useRouter } from "vue-router";
import Header from "../components/AddHeader.vue";
import TextInput from "../components/AddInput.vue";

const router = useRouter();
const rootStore = useRootStore();

const textarea1 = ref<string>("");
const textarea2 = ref<string>("");

const addNews = async () => {
  try {
    const newPost = await rootStore.addPost({
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
    <Header :title="'Добавить новость'" />
    <div class="add-news">
      <TextInput v-model:modelValue="textarea1" placeholder="Введите заголовок" />
      <TextInput v-model:modelValue="textarea2" placeholder="Введите текст новости" />
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