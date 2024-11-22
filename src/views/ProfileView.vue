<template>
  <div class="user-profile-container">
    <h2>User Profile</h2>

    <!-- 表单: 用户资料 -->
    <el-form ref="form" :model="userProfile" label-width="120px" class="user-profile-form">
      <el-form-item label="Username">
        <el-input v-model="userProfile.username" placeholder="Enter your username"></el-input>
      </el-form-item>

      <el-form-item label="Email">
        <el-input v-model="userProfile.email" placeholder="Enter your email"></el-input>
      </el-form-item>

      <el-form-item label="Password">
        <el-input
          v-model="userProfile.password"
          type="password"
          placeholder="Enter your password"
        ></el-input>
      </el-form-item>

      <el-form-item label="Language">
        <el-select v-model="userProfile.language" placeholder="Select your language">
          <el-option v-for="language in languages" :key="language.id" :label="language.name" :value="language.code"></el-option>
        </el-select>
      </el-form-item>

      <el-button type="primary" @click="saveProfile">Save</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption } from 'element-plus'
import { fetchUsers, updateUser } from '@/services/user'  // 导入 API 方法
import { fetchSupportedLanguages } from '@/services/lang'  // 假设你有一个获取语言选项的 API 方法

// 定义用户资料和语言选项
const userProfile = ref({
  username: '',
  email: '',
  password: '',
  language: ''
})

const languages = ref([])

// 获取当前用户ID
const route = useRoute()
const userId = route.params.id

// 获取用户资料和语言选项
onMounted(async () => {
  // 假设你已经通过用户ID获取到当前用户信息
  const userRes = await fetchUsers(userId)
  userProfile.value = userRes.data
  
  // 获取语言选项
  const languagesRes = await fetchSupportedLanguages()
  languages.value = languagesRes.data
})

// 保存用户资料
const saveProfile = async () => {
  try {
    await updateUser(userId, userProfile.value)
    alert('Profile updated successfully!')
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile')
  }
}
</script>

<style scoped>
.user-profile-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}

h2 {
  text-align: center;
  color: #333;
}

.user-profile-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
}
</style>
