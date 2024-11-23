<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// import { fetchTranslatedChapterDetail, saveCorrection } from '@/services/novel'; // Uncomment when API is ready
import { MdEditor } from 'md-editor-v3';

const route = useRoute();
const chapterId = Number(route.query.id);

const chapter = ref({
  id: 0,
  chapter_id: 0,
  translated_content: '',
  correction_notes: '',
});

const loadChapterDetail = async () => {
  try {
    // Uncomment below when API is ready
    // const response = await fetchTranslatedChapterDetail(chapterId);
    // chapter.value = response.data;

    console.log('Using mock data for testing.');
    chapter.value = {
      id: 1,
      chapter_id: chapterId,
      translated_content: '# Sample Translated Content\nThis is a sample translated content in **Markdown** format.',
      correction_notes: '',
    };
  } catch (error) {
    console.error('Failed to load chapter detail:', error);
  }
};

const saveCorrectionHandler = async () => {
  try {
    // Uncomment below when API is ready
    // await saveCorrection({
    //   chapter_id: chapter.value.chapter_id,
    //   user_id: 1, // Replace with actual user ID
    //   corrected_content: chapter.value.translated_content,
    //   correction_notes: chapter.value.correction_notes,
    // });
    console.log('Correction saved:', chapter.value);
    alert('Correction saved successfully!');
  } catch (error) {
    console.error('Failed to save correction:', error);
    alert('Failed to save correction.');
  }
};

onMounted(() => {
  loadChapterDetail();
});
</script>

<template>
  <div class="correction-detail">
    <h1>Correction Detail</h1>
    <el-form>
      <!-- 富文本编辑框 -->
      <el-form-item label="Corrected Content">
        <MdEditor v-model="chapter.translated_content" />
      </el-form-item>
      <!-- 修正备注 -->
      <el-form-item label="Correction Notes">
        <el-input
          type="textarea"
          v-model="chapter.correction_notes"
          placeholder="Enter notes for this correction (optional)"
        />
      </el-form-item>
      <!-- 保存按钮 -->
      <el-form-item>
        <el-button type="primary" @click="saveCorrectionHandler">Save Correction</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.correction-detail {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
