<script setup lang="ts">
import NovelsList from '@/components/NovelsList.vue';
import ContentRight from './ContentRight.vue'
</script>
<template>
  <div class="content">
      <div class="content-left">
      <NovelsList />
      </div>
    <ContentRight />
  </div>
</template>
<style scoped></style>
