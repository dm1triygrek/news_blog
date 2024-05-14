<script setup lang="ts">
import { RouterLink } from "vue-router";

const props = defineProps({ // eslint-disable-line @typescript-eslint/no-unused-vars
    headerText: String,
    showBackButton: {
        type: Boolean,
        default: false
    },
    showAddButton: {
        type: Boolean,
        default: false
    },
    backRoute: String
});
</script>

<template>
    <div class="header">
        <RouterLink v-if="showBackButton" :to="`/`" class="header__back">
            <el-button>
                <el-icon :size="25">
                    <Back />
                </el-icon>
            </el-button>
        </RouterLink>
        <h1 class="header__text">{{ headerText }}</h1>
        <slot></slot>
        <RouterLink v-if="showAddButton" :to="`/add-news`">
        <el-button class="header__addNews">
          <el-icon :size="25"><Plus /></el-icon>Добавить новость
        </el-button>
      </RouterLink>
    </div>
</template>

<style lang="sass" scoped>
.header__back
    font-size: 16px
    padding: 10px 20px
    margin-right: 20px

.header
    display: flex
    align-items: center
    margin-bottom: 20px   
  
.header__addNews
    margin-left: 50px
    font-size: 16px
    padding: 10px 20px

</style>