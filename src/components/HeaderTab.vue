<script lang="ts" setup>
import { ref } from 'vue'
const useMenus = ref([
  { name: '首页', url: '/index' },
  { name: '热帖', url: '/index/follow' },
  { name: '发现', url: '/index/hotarticle' },
  { name: '视频', url: '/index/video' },
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
    <el-menu-item :index="v.url" v-for="v in useMenus" :key="v.url"
      >{{ v.name }}{{ v.url }}</el-menu-item
    >
  </el-menu>
</template>
