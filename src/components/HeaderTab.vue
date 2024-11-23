<script lang="ts" setup>
import { ref } from 'vue'
const useMenus = ref([
  { name: 'HotArticle', url: '/index/hotarticle' },
  { name: 'Novels', url: '/index/novels' },
  { name: 'TranslateCorrection', url: '/index/follow' },
  // { name: 'Videos', url: '/index/video' },
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
    <el-menu-item >
      <img src="../assets/logo.png" style="width: 60px" />
    </el-menu-item>
    <el-menu-item :index="v.url" v-for="v in useMenus" :key="v.url">{{
      v.name
    }}</el-menu-item>
  </el-menu>
</template>
