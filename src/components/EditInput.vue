<script setup lang="ts">

const props = defineProps({
  modelValue: String,
  placeholder: String
});

const emit = defineEmits();

const updateValue = (newValue) => {
  emit("update:modelValue", newValue);
};
</script>

<template>
    <div class="field">
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
  .field
    margin-bottom: 20px
  </style>
  