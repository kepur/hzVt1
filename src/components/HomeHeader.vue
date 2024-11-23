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
    ElMessage.success('Loginout Success'); 
    router.push('/login');
  } catch (error) {
    ElMessage.error('Loginout Failed:'+error); 
  }
};
const createChapter = async () => {
  try {
    router.push('/index/create'); 
  } catch (error) {
    ElMessage.error('Loginout Failed:'+error);
  }
};
const userProfie = async () => {
  try {
    router.push('/index/profile'); 
  } catch (error) {
    ElMessage.error('Loginout Failed:'+error); 
  }
};
const userComment= async () => {
  try {
    router.push('/index/comment'); 
  } catch (error) {
    ElMessage.error('Loginout Failed:'+error); 
  }
};
const MyArticle= async () => {
  try {
    router.push('/index/myarticle');
  } catch (error) {
    ElMessage.error('Loginout Failed:'+error); 
  }
};
const UserCollection=async () => {
  try {
    router.push('/index/collection'); 
  } catch (error) {
    ElMessage.error('Loginout Failed，Please Retry:'+error); 
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
        <div class="popover" @click="MyArticle">
          <div class="popover-num">10</div>
          <IconIndex name="article" color="#FF69B4" width="30px" height="30px">
          </IconIndex>
          <p>My Article</p>
        </div>
        <div class="popover" @click="createChapter">
          <IconIndex name="create" color="#FF69B4" width="30px" height="30px">
          </IconIndex>
          <p>Create Center</p>
        </div>
        <div class="header-profile">
          <el-dropdown>
            <img src="../assets/user.jpg" class="el-dropdown-link" />
            <template #dropdown>
              <el-dropdown-menu>
                <div @click="userProfie"><el-dropdown-item class="el-dropdown-item" 
                  ><IconIndex
                    name="profile"
                    width="25px"
                    height="25px"
                    color="red"
                  ></IconIndex
                  >Profile</el-dropdown-item
                ></div>
                <div @click="userComment"><el-dropdown-item class="el-dropdown-item"
                  ><IconIndex
                    name="alert"
                    width="25px"
                    height="25px"
                  ></IconIndex
                  >Message</el-dropdown-item></div>
                  <div @click="UserCollection"><el-dropdown-item class="el-dropdown-item"
                  ><IconIndex
                    name="user_collect"
                    width="25px"
                    height="25px"
                  ></IconIndex
                  >MyCollect</el-dropdown-item
                ></div>
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
