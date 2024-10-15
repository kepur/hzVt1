<script lang="ts" setup>
import { ref } from 'vue'
const useMenus = ref([
  { name: '热帖', url: '/index/hotarticle' },
  { name: '关注', url: '/index/follow' },
  { name: '视频', url: '/index/video' },
  { name: '搜索', url: '/search' },
])
</script>
<template>
  <!-- <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="0">
      <img src="../assets/logo.png" />
    </el-menu-item>
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-menu-item :index="v.url" v-for="v in useMenus" :key="v.url">
      {{ v.name }}
    </el-menu-item>
  </el-menu> -->
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
    <el-menu-item index="0">
      <img src="../assets/logo.png" style="width: 60px" />
    </el-menu-item>
    <el-menu-item :index="v.url" v-for="v in useMenus" :key="v.url">{{
      v.name
    }}</el-menu-item>
  </el-menu>
</template>
