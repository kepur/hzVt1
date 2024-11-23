<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import { fetchUserChapters } from '@/services/novel'; // Uncomment when API is ready

const router = useRouter();

// Mock data for testing
const chapters = ref([
  {
    id: 1,
    title: 'Sample Chapter 1',
    summary: 'This is a summary of Chapter 1.',
  },
  {
    id: 2,
    title: 'Sample Chapter 2',
    summary: 'This is a summary of Chapter 2.',
  },
]);

const loadUserChapters = async () => {
  try {
    // Uncomment below when API is ready
    // const response = await fetchUserChapters();
    // chapters.value = response.data;

    console.log('Using mock data for testing.');
  } catch (error) {
    console.error('Failed to fetch chapters:', error);
  }
};

const goToConvertView = (chapterId: number) => {
  router.push({ path: '/index/convert', query: { id: chapterId } });
};

onMounted(() => {
  loadUserChapters();
});
</script>

<template>
  <div class="my-chapter-view">
    <h1>My Chapters</h1>
    <ul>
      <li v-for="chapter in chapters" :key="chapter.id" class="chapter-item">
        <h3>{{ chapter.title }}</h3>
        <p>{{ chapter.summary }}</p>
        <div class="actions">
          <el-button type="primary" size="small">Convert to Audio</el-button>
          <el-button type="success" size="small">Generate Image</el-button>
          <el-button type="warning" size="small" @click="goToConvertView(chapter.id)">
            Advanced Generate
          </el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.my-chapter-view {
  padding: 20px;
}

.chapter-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style>