<template>
  <div class="user-profile-container">
    <h2>User Profile</h2>

    <!-- 表单: 用户资料 -->
    <el-form ref="form" :model="userProfile" label-width="120px" class="user-profile-form">
      <!-- 头像上传 -->
      <el-form-item label="Avatar" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="/upload-avatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="userProfile.avatar" :src="userProfile.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 用户名输入框 -->
      <el-form-item label="Username">
        <el-input
          v-model="userProfile.username"
          placeholder="Enter your username"
          size="large"
          :disabled="!isEditing"
        ></el-input>
      </el-form-item>

      <!-- 邮箱输入框 -->
      <el-form-item label="Email">
        <el-input
          v-model="userProfile.email"
          placeholder="Enter your email"
          size="large"
          :disabled="!isEditing"
        ></el-input>
      </el-form-item>

      <!-- 密码输入框 -->
      <el-form-item label="Password">
        <el-input
          v-model="userProfile.password"
          type="password"
          placeholder="Enter your password"
          size="large"
          :disabled="!isEditing"
        ></el-input>
      </el-form-item>

      <!-- 语言选择框 -->
      <el-form-item label="Language">
        <el-select v-model="userProfile.language" placeholder="Select your language" size="large" :disabled="!isEditing">
          <el-option v-for="language in languages" :key="language.id" :label="language.name" :value="language.code"></el-option>
        </el-select>
      </el-form-item>

      <div class="form-actions">
        <!-- 编辑按钮 -->
        <el-button v-if="!isEditing" @click="editProfile" size="large">Edit</el-button>
        
        <!-- 保存按钮 -->
        <el-button v-if="isEditing" type="primary" @click="saveProfile" size="large">Save</el-button>
        
        <!-- 取消按钮 -->
        <el-button v-if="isEditing" @click="cancelEdit" size="large">Cancel</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchUsers, updateUser } from '@/services/user'  // 导入 API 方法
import { fetchSupportedLanguages } from '@/services/lang'  // 获取语言选项的 API 方法
import { ElUpload } from 'element-plus'

// 定义用户资料和语言选项
const userProfile = ref({
  username: '',
  email: '',
  password: '',
  avatar: '',  // 头像字段
  language: ''
})

const languages = ref([])

// 当前用户ID
const route = useRoute()
const userId = route.params.id

// 编辑模式开关
const isEditing = ref(false)

// 获取用户资料和语言选项
onMounted(async () => {
  // 获取当前用户信息
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
    isEditing.value = false  // 保存后退出编辑模式
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Failed to update profile')
  }
}

// 编辑模式：启用表单编辑
const editProfile = () => {
  isEditing.value = true
}

// 取消编辑：恢复为查看模式
const cancelEdit = () => {
  isEditing.value = false
  // 恢复原始的用户信息
  onMounted(async () => {
    const userRes = await fetchUsers(userId)
    userProfile.value = userRes.data
  })
}

// 头像上传成功回调
const handleAvatarSuccess = (response, file) => {
  userProfile.value.avatar = URL.createObjectURL(file.raw)
}

// 头像上传前的检查
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  if (!isJPG && !isPNG) {
    alert('Only JPG/PNG files are allowed!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    alert('Image must smaller than 2MB!')
  }
  return isJPG || isPNG && isLt2M
}
</script>

<style scoped>
.user-profile-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  text-align: center;
  color: #333;
}

.user-profile-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
}

.el-input, .el-select {
  font-size: 16px;
  height: 40px;  /* 增加输入框和选择框的高度 */
}

.avatar-uploader {
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ddd;
  background-color: #f2f2f2;
  position: relative;
}

.avatar-uploader .avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-uploader .avatar-icon {
  font-size: 24px;
  color: #bbb;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.el-upload {
  display: inline-block;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}
</style>
