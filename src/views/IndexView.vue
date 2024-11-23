<script setup lang="ts">
import HomeHeader from '@/components/HomeHeader.vue'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header><HomeHeader /></el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>
<style scoped></style>