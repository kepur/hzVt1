<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const activeName = ref('first')
const form = reactive({
  username: '',
  passowrd: '',
})
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const onSubmit = () => {
  console.log('login')
  router.push('/index')
}
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
                v-model="form.passowrd"
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
                v-model="form.passowrd"
                type="password"
                placeholder="请输入密码"
              />
              <el-input
                v-model="form.passowrd"
                type="password"
                placeholder="确认密码"
              />
              <p class="agreement">注册既代表同意用户协议</p>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
