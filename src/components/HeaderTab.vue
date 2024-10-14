<script lang="ts" setup>
import { ref } from 'vue'
const useMenus = ref([
  { name: '首页', url: '/index' },
  { name: '热帖', url: '/index' },
  { name: '发现', url: '/index' },
  { name: 'other', url: '/index' },
])
</script>
<template>
  <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="0">
      <img src="../assets/logo.png" />
    </el-menu-item>
    <el-menu-item index="1">Processing Center</el-menu-item>

    <el-menu-item :index="v.url" v-for="v in useMenus" :key="v.url">
      {{ v.name }}
    </el-menu-item>
  </el-menu>
</template>
