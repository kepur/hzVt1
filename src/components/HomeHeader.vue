<script lang="ts" setup>
import HeaderTab from './HeaderTab.vue'
import IconIndex from './icons/IconIndex.vue'
</script>
<template>
  <div class="header">
    <div class="appheader">
      <HeaderTab />
      <div class="header-item">
        <div class="header-search">
          <input type="text" placeholder="请输入搜索内容" />
          <IconIndex
            class="iconfont icon-sousou"
            name="search"
            color="#9198a4"
            width="30px"
            height="30px"
          ></IconIndex>
        </div>
        <el-button type="primary" round>提问</el-button>
      </div>
      <div class="header-userinfo">
        <div class="popover">
          <div class="popover-num">10</div>
          <IconIndex name="alert" color="#9198a4" width="25px" height="25px">
          </IconIndex>
          <p>消息</p>
        </div>
        <div class="popover">
          <div class="popover-num">10</div>
          <IconIndex name="message" color="#9198a4" width="25px" height="25px">
          </IconIndex>
          <p>私信</p>
        </div>
        <div class="popover">
          <IconIndex name="create" color="#9198a4" width="25px" height="25px">
          </IconIndex>
          <p>创作中心</p>
        </div>
      </div>
    </div>
  </div>
</template>
