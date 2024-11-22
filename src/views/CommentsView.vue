<template>
  <div class="comment-list-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="card">
          <div class="card-header">
            <h3>我的文章留言列表</h3>
          </div>
          <el-table :data="comments" style="width: 100%" border>
            <el-table-column prop="username" label="用户名" width="150"></el-table-column>
            <el-table-column prop="content" label="评论内容"></el-table-column>
            <el-table-column prop="created_at" label="评论时间" width="180">
              <template #default="{ row }">
                {{ formatDate(row.created_at) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template #default="{ row }">
                <el-button @click="deleteComment(row.id)" type="text" size="small" circle>
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchComments, deleteComment } from '@/services/common'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

// 获取当前路由中的小说 ID
const route = useRoute()
const novelId = route.params.id // Assuming `id` is passed in the URL

// 评论数据
const comments = ref([])

// 获取评论列表
const getComments = async () => {
  try {
    const response = await fetchComments(novelId)
    comments.value = response.data
  } catch (error) {
    console.error("Failed to fetch comments:", error)
  }
}

// 删除评论
const handleDelete = async (commentId) => {
  try {
    await deleteComment(commentId)
    ElMessage.success('评论删除成功')
    getComments() // Refresh comment list
  } catch (error) {
    ElMessage.error('删除评论失败')
  }
}

// 格式化评论时间
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

// 页面加载时获取评论
onMounted(() => {
  getComments()
})
</script>

<style scoped>
.comment-list-container {
  padding: 20px;
}

.card {
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f4f5f7;
  padding: 10px 20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.el-table th {
  background-color: #f4f5f7;
}

.el-table td {
  white-space: normal;
  word-wrap: break-word;
}

.el-button {
  margin-left: 10px;
}

.el-table-column .cell {
  padding: 10px;
}
</style>
