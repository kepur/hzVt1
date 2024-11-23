<script lang="ts" setup>
import { useRoute } from 'vue-router'; // 修复：导入 useRoute
import { ref, onMounted } from 'vue';

const route = useRoute();
const chapterId = Number(route.query.id);

// Mock data for testing
const chapter = ref({
  id: chapterId,
  title: 'Sample Chapter Title',
  has_audio: false,
  has_image: false,
});

const audioStyles = ref([
  { id: 1, name: 'Soft' },
  { id: 2, name: 'Bold' },
]);

const supportedLanguages = ref([
  { id: 1, name: 'French' },
  { id: 2, name: 'Spanish' },
]);

const stableDiffusionParams = ref([
  { id: 1, name: 'High Resolution' },
  { id: 2, name: 'Artistic Style' },
]);

// Mock function to load chapter details (API will replace this)
const loadChapterDetails = async () => {
  try {
    // Uncomment when API is ready
    // const response = await fetchChapterDetails(chapterId);
    // chapter.value = response.data;

    console.log('Using mock data for testing.');
  } catch (error) {
    console.error('Failed to load chapter details:', error);
  }
};

const generateVideo = () => {
  alert('Generating Video...');
};

onMounted(() => {
  loadChapterDetails();
});
</script>

<template>
  <div class="convert-view">
    <h1>Advanced Generate for: {{ chapter.title }}</h1>

    <!-- Image Generation -->
    <div>
      <h3>Generate Image</h3>
      <el-select v-model="chapter.image_param" placeholder="Select Image Parameter">
        <el-option
          v-for="param in stableDiffusionParams"
          :key="param.id"
          :label="param.name"
          :value="param.id"
        />
      </el-select>
      <el-button type="success">Generate Image</el-button>
    </div>

    <!-- Audio Generation -->
    <div>
      <h3>Generate Audio</h3>
      <el-select v-model="chapter.audio_style" placeholder="Select Audio Style">
        <el-option
          v-for="style in audioStyles"
          :key="style.id"
          :label="style.name"
          :value="style.id"
        />
      </el-select>
      <el-button type="primary">Generate Audio</el-button>
    </div>

    <!-- Video Generation -->
    <div>
      <h3>Generate Video</h3>
      <el-button
        type="warning"
        :disabled="!chapter.has_audio || !chapter.has_image"
        @click="generateVideo"
      >
        Generate Video
      </el-button>
    </div>

    <!-- Machine Translation -->
    <div>
      <h3>Machine Translation</h3>
      <el-select v-model="chapter.translation_language" placeholder="Select Language">
        <el-option
          v-for="language in supportedLanguages"
          :key="language.id"
          :label="language.name"
          :value="language.id"
        />
      </el-select>
      <el-button type="info">Translate</el-button>
    </div>
  </div>
</template>

<style scoped>
.convert-view {
  padding: 20px;
}

h3 {
  margin-top: 20px;
}

.el-button {
  margin-top: 10px;
}
</style>
