<template>
  <div class="novel-list-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="card">
          <div class="card-header">
            <h3>Pop Novels</h3>
          </div>
          <!-- Novel Table -->
          <el-table :data="novels" style="width: 100%" border>
            <!-- Cover Column -->
            <el-table-column label="Cover" width="120">
              <template #default="{ row }">
                <img :src="row.cover || defaultCover" class="cover-image" />
              </template>
            </el-table-column>
            <!-- Name Column -->
            <el-table-column prop="name" label="Novel Name" width="200"></el-table-column>
            <!-- Description Column -->
            <el-table-column prop="description" label="Description" width="300"></el-table-column>
            <!-- Author Column -->
            <el-table-column prop="author" label="Author" width="150"></el-table-column>
            <!-- Actions Column -->
            <el-table-column label="Actions" width="150">
              <template #default="{ row }">
                <el-button @click="viewNovel(row.id)" type="text" size="small" circle>View</el-button>
                <el-button @click="editNovel(row.id)" type="text" size="small" circle>Edit</el-button>
                <el-button @click="handleDelete(row.id)" type="text" size="small" circle>Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- Pagination -->
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
import { ref, onMounted } from 'vue';
import { fetchNovels, deleteNovel } from '@/services/novel';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

// Constants
const defaultCover = "../assets/default-cover.jpg"; // Default cover image

// State
const userId = ref(1); // Mocked current user ID
const page = ref(1); // Current page
const pageSize = ref(10); // Number of items per page
const novels = ref([]); // Novel data
const totalCount = ref(0); // Total novel count
const totalPages = ref(0); // Total pages

// Fetch novel list
const getNovels = async () => {
  try {
    const response = await fetchNovels({ userId: userId.value, page: page.value, size: pageSize.value });
    novels.value = response.data.novels.map((novel) => ({
      ...novel,
      cover: novel.cover || defaultCover, // Use default cover if none provided
    }));
    totalCount.value = response.data.total;
    totalPages.value = Math.ceil(totalCount.value / pageSize.value);
  } catch (error) {
    console.error('Failed to fetch novels:', error);
  }
};

// Actions
const viewNovel = (id: number) => {
  useRouter().push(`/novels/${id}`);
};
const editNovel = (id: number) => {
  useRouter().push(`/novels/edit/${id}`);
};
const handleDelete = async (id: number) => {
  try {
    await deleteNovel(id);
    ElMessage.success('Novel deleted successfully');
    getNovels();
  } catch (error) {
    ElMessage.error('Failed to delete novel');
  }
};

// Handle pagination
const handlePageChange = (newPage: number) => {
  page.value = newPage;
  getNovels();
};

// On mount
onMounted(() => {
  getNovels();
});
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
  text-align: center;
}

.el-table td {
  vertical-align: middle;
  text-align: center;
  word-wrap: break-word;
  white-space: normal;
}

.cover-image {
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.el-button {
  margin-left: 5px;
}

.el-pagination {
  margin-top: 15px;
  text-align: right;
}
</style>
