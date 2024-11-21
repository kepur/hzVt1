<script lang="ts" setup>
import { useRouter } from 'vue-router'
import HeaderTab from './HeaderTab.vue'
import IconIndex from './icons/IconIndex.vue'
import { useAuthStore } from '../stores/auth';
import { ElMessage } from 'element-plus';

const authStore = useAuthStore();
const router = useRouter();

// 注销功能
const logoutUser = async () => {
  try {
    await authStore.logout();
    ElMessage.success('注销成功'); // 注销成功提示
    router.push('/login'); // 注销成功后重定向到登录页面
  } catch (error) {
    ElMessage.error('注销失败，请重试:'+error); // 注销失败提示
  }
};

</script>
<template>
  <div class="header">
    <div class="appheader">
      <HeaderTab />
      <div class="header-item">
        <div class="header-search">
          <input type="text" placeholder="Please input ur search" />
          <IconIndex
            class="iconfont icon-sousou"
            name="search"
            color="#9198a4"
            width="30px"
            height="30px"
          ></IconIndex>
        </div>
      </div>
      <div class="header-userinfo">
        <!-- <div class="popover">
          <div class="popover-num">10</div>
          <IconIndex name="alert" color="#9198a4" width="25px" height="25px">
          </IconIndex>
          <p>消息</p>
        </div> -->
        <div class="popover">
          <div class="popover-num">10</div>
          <IconIndex name="user_collect" color="#FF69B4" width="30px" height="30px">
          </IconIndex>
          <p>My Collect</p>
        </div>
        <div class="popover">
          <IconIndex name="create" color="#FF69B4" width="30px" height="30px">
          </IconIndex>
          <p>Create Center</p>
        </div>
        <div class="header-profile">
          <el-dropdown>
            <img src="../assets/user.jpg" class="el-dropdown-link" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="el-dropdown-item"
                  ><IconIndex
                    name="profile"
                    width="25px"
                    height="25px"
                  ></IconIndex
                  >Profile</el-dropdown-item
                >
                <el-dropdown-item class="el-dropdown-item"
                  ><IconIndex
                    name="alert"
                    width="25px"
                    height="25px"
                  ></IconIndex
                  >Message</el-dropdown-item
                >
                <el-dropdown-item class="el-dropdown-item"
                  ><IconIndex
                    name="message"
                    width="25px"
                    height="25px"
                  ></IconIndex
                  >Chat</el-dropdown-item
                >
                <el-dropdown-item
                  class="el-dropdown-item"
                   @click="logoutUser"
                  ><IconIndex name="exit" width="25px" height="25px"></IconIndex
                  >LoginOut</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
