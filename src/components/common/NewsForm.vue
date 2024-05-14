<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({ // eslint-disable-line @typescript-eslint/no-unused-vars
  modelValue: String,
  placeholder: String
});

const emit = defineEmits(); // eslint-disable-line vue/valid-define-emits

const handleInput = (newValue) => {
  emit("update:modelValue", newValue);
};
</script>

<template>
  <div class="field">
    <el-input :modelValue="modelValue" @input="handleInput" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
      :placeholder="placeholder" />
  </div>
</template>

<style lang="sass" scoped>
.field 
  margin-bottom: 20px
</style>