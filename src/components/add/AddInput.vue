<script setup lang="ts">
const props = defineProps({ // eslint-disable-line @typescript-eslint/no-unused-vars
  modelValue: String,
  placeholder: String
});

const emit = defineEmits(); // eslint-disable-line vue/valid-define-emits
const updateValue = (newValue) => {
  emit("update:modelValue", newValue);
};
</script>

<template>
    <div class="text-input">
      <el-input
        :modelValue="modelValue"
        @input="updateValue"
        :autosize="{ minRows: 2, maxRows: 4 }"
        type="textarea"
        :placeholder="placeholder"
      />
    </div>
  </template>
  
  <style lang="sass" scoped>
  .text-input
    margin-bottom: 20px
  </style>
  