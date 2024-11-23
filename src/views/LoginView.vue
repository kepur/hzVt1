<script lang="ts" setup>
import { ref,reactive } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus';  

const authStore = useAuthStore();
const router = useRouter();
const errorMessage = ref('');
const activeName = ref('first')
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '', 
});

// Login 
const submitLogin = async () => {
  try {
    if (!form.username || !form.password) {
      errorMessage.value = 'Plase input your password';
      return;
    }
    await authStore.login(form.username, form.password)
    ElMessage.success('Login successful');  
    if (authStore.isAuthenticated()) {
      router.push('/index/hotarticle'); //
    }
  } catch (error) {
    errorMessage.value = 'login faild，pls retry'+error;
    ElMessage.error(errorMessage.value);  

  }
};

// regist
const submitRegister = async () => {
  try {
    if (!form.username || !form.password || !form.confirmPassword) {
      errorMessage.value = 'please complated ur form';
      ElMessage.error(errorMessage.value);  
      return;
    }
    if (form.password !== form.confirmPassword) {
      errorMessage.value = 'plz input same passwd';
      ElMessage.error(errorMessage.value);  
      return;
    }
    await authStore.register(form.username, form.password);
    errorMessage.value = 'regist sussful';
    activeName.value = 'first'; 
  } catch (error) {
    errorMessage.value = 'regist faild please retry'+error;
  }
};

const onSubmit = () => {
  if (activeName.value === 'first') {
    submitLogin();
  } else {
    submitRegister();
  }
};

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
        <p class="loginleft-title">Share this website</p>
        <div class="loginleft-erm">
          <img src="@/assets/weblogo.webp" />
        </div>
        <p class="loginleft-message">Another Login :facebook</p>
        <ul>
          <li><el-button round>Writte</el-button></li>
          <li><el-button round>Your</el-button></li>
          <li><el-button round>Stories</el-button></li>
        </ul>
      </div>

      <div class="loginright">
        <el-form :model="form">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="Account Login" name="first">
              <el-input v-model="form.username" placeholder="Please input ur name" />
              <el-input
                v-model="form.password"
                type="password"
                placeholder="Please input ur password"
              />
              <el-button type="primary" @click="onSubmit">Login</el-button>
              <div class="otherwise">
                <div class="otherwise-title">Other Login Methods</div>
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
            <el-tab-pane label="Register" name="second">
              <el-input v-model="form.username" placeholder="Plz input ur name" />
              <el-input
                v-model="form.password"
                type="password"
                placeholder="Please input ur password"
              />
              <el-input
                v-model="form.confirmPassword"
                type="password"
                placeholder="Confirm ur password"
              />
              <el-button type="primary" @click="onSubmit">Register</el-button>
              <p class="agreement">agreement policy</p>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
