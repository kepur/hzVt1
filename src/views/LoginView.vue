<script lang="ts" setup>
import { ref,reactive } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus';  // 引入 ElMessage 组件

const authStore = useAuthStore();
const router = useRouter();
const errorMessage = ref('');
const activeName = ref('first')
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',  // 注册时使用
});

// 登录逻辑
const submitLogin = async () => {
  try {
    if (!form.username || !form.password) {
      errorMessage.value = '请填写用户名和密码';
      return;
    }
    await authStore.login(form.username, form.password);
    // 登录成功后显示成功提示，并重定向到受保护页面
    ElMessage.success('登录成功');  // 添加登录成功提示
    if (authStore.isAuthenticated()) {
      router.push('/index'); // 登录成功后重定向到受保护的页面
    }
  } catch (error) {
    errorMessage.value = '登录失败，请重试'+error;
    ElMessage.error(errorMessage.value);  // 使用 ElMessage 弹出提示

  }
};

// 注册逻辑
const submitRegister = async () => {
  try {
    if (!form.username || !form.password || !form.confirmPassword) {
      errorMessage.value = '请完整填写表单';
      ElMessage.error(errorMessage.value);  // 使用 ElMessage 弹出提示
      return;
    }
    if (form.password !== form.confirmPassword) {
      errorMessage.value = '两次密码输入不一致';
      ElMessage.error(errorMessage.value);  // 使用 ElMessage 弹出提示
      return;
    }
    await authStore.register(form.username, form.password);
    errorMessage.value = '注册成功，请登录';
    activeName.value = 'first'; // 注册成功后切换到登录 tab
  } catch (error) {
    errorMessage.value = '注册失败，请重试'+error;
  }
};

// 根据 Tab 区分登录和注册
const onSubmit = () => {
  if (activeName.value === 'first') {
    submitLogin();
  } else {
    submitRegister();
  }
};

// Tab 点击事件
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};


// import IconIndex from '@/components/icons/IconIndex.vue'
</script>
<template>
  <div class="login">
    <div class="login-img">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <div class="login-item">
      <div class="loginleft">
        <p class="loginleft-title">打开分享网站</p>
        <div class="loginleft-erm">
          <img src="@/assets/apple.png" />
        </div>
        <p class="loginleft-message">其他登录方式:APPLE</p>
        <ul>
          <li><el-button round>下载知乎</el-button></li>
          <li><el-button round>开通机构</el-button></li>
          <li><el-button round>无障碍模式</el-button></li>
        </ul>
      </div>

      <div class="loginright">
        <el-form :model="form">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="账户登录" name="first">
              <el-input v-model="form.username" placeholder="请输入用户名" />
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
              />
              <el-button type="primary" @click="onSubmit">登录</el-button>
              <div class="otherwise">
                <div class="otherwise-title">其他登录方式</div>
                <ul>
                  <li>
                    <IconIndex
                      class="icon-font"
                      name="facebook"
                      color="#b9abab"
                      width="30px"
                      height="30px"
                    ></IconIndex>
                  </li>
                  <li>
                    <IconIndex
                      class="icon-font"
                      name="google"
                      color="#b9abab"
                      width="30px"
                      height="30px"
                    ></IconIndex>
                  </li>
                  <li>
                    <IconIndex
                      class="icon-font"
                      name="telegram"
                      color="#b9abab"
                      width="30px"
                      height="30px"
                    ></IconIndex>
                  </li>
                </ul>
                <!-- <svg style="width: 30px; height: 30px">
                  <use xlink:href="#icon-facebook" fill="red"></use>
                </svg> -->
              </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">
              <el-input v-model="form.username" placeholder="请输入用户名" />
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
              />
              <el-input
                v-model="form.confirmPassword"
                type="password"
                placeholder="确认密码"
              />
              <el-button type="primary" @click="onSubmit">注册</el-button>
              <p class="agreement">注册既代表同意用户协议</p>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
