<template>
  <div class="novel-list-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="card">
          <div class="card-header">
            <h3>我的小说列表</h3>
          </div>
          <!-- 小说列表表格 -->
          <el-table :data="novels" style="width: 100%" border>
            <el-table-column prop="name" label="小说名称" width="200"></el-table-column>
            <el-table-column prop="description" label="描述" width="300"></el-table-column>
            <el-table-column prop="author" label="作者" width="150"></el-table-column>
            <el-table-column prop="style" label="风格" width="150"></el-table-column>
            <el-table-column label="操作" width="150">
              <template #default="{ row }">
                <el-button @click="viewNovel(row.id)" type="text" size="small" circle>查看</el-button>
                <el-button @click="editNovel(row.id)" type="text" size="small" circle>编辑</el-button>
                <el-button @click="handleDelete(row.id)" type="text" size="small" circle>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-pagination
            v-if="totalPages > 1"
            :current-page="page"
            :page-size="pageSize"
            :total="totalCount"
            @current-change="handlePageChange"
            layout="prev, pager, next, jumper"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchNovels, deleteNovel } from '@/services/novel'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// 获取当前用户的ID，假设已从store或cookie中获取
const userId = ref(1);  // 假设这里是当前登录用户的ID
const page = ref(1) // 当前页码
const pageSize = ref(10) // 每页显示的小说数量
const novels = ref([]) // 小说列表数据
const totalCount = ref(0) // 小说总数
const totalPages = ref(0) // 总页数

// 获取小说列表
const getNovels = async () => {
  try {
    const response = await fetchNovels({ userId: userId.value, page: page.value, size: pageSize.value })
    novels.value = response.data.novels
    totalCount.value = response.data.total
    totalPages.value = Math.ceil(totalCount.value / pageSize.value)
  } catch (error) {
    console.error("Failed to fetch novels:", error)
  }
}

// 查看小说详情
const viewNovel = (id) => {
  // 跳转到小说详情页面
  useRouter().push(`/novels/${id}`)
}

// 编辑小说
const editNovel = (id) => {
  // 跳转到编辑小说页面
  useRouter().push(`/novels/edit/${id}`)
}

// 删除小说
const handleDelete = async (novelId) => {
  try {
    await deleteNovel(novelId)
    ElMessage.success('小说删除成功')
    getNovels() // 刷新小说列表
  } catch (error) {
    ElMessage.error('删除小说失败')
  }
}

// 处理页码变化
const handlePageChange = (newPage) => {
  page.value = newPage
  getNovels()
}

// 页面加载时获取小说列表
onMounted(() => {
  getNovels()
})
</script>

<style scoped>
.novel-list-container {
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
