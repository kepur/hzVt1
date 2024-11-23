<template>
  <el-form :model="chapterForm" label-width="120px">
    <!-- 章节信息 -->
    <el-form-item label="章节标题">
      <el-input v-model="chapter.title" disabled></el-input>
    </el-form-item>

    <el-form-item label="章节内容">
      <el-input type="textarea" v-model="chapter.content" disabled></el-input>
    </el-form-item>

    <!-- 操作按钮 -->
    <el-form-item>
      <el-button type="primary" @click="generateAudio">生成语音</el-button>
      <el-button :disabled="!canGenerateImage" type="success" @click="generateImage">生成图片</el-button>
      <el-button :disabled="!canGenerateVideo" type="warning" @click="generateVideo">生成视频</el-button>
      <el-button type="info" @click="translateContent">翻译</el-button>
    </el-form-item>

    <!-- 翻译语言选择 -->
    <el-form-item label="翻译语言">
      <el-select v-model="chapterForm.target_language" placeholder="请选择语言" clearable>
        <el-option
          v-for="language in languages"
          :key="language.id"
          :label="language.language_name"
          :value="language.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  fetchChapterDetails,
  fetchGeneratedAudios,
  fetchGeneratedImages,
  fetchGeneratedVideos,
  createGeneratedAudio,
  createGeneratedImage,
  createGeneratedVideo,
} from '@/services/novel';
import { fetchSupportedLanguages } from '@/services/lang';

const chapterId = 1; // 你可以通过路由或页面参数动态获取
const chapter = ref({
  title: '',
  content: '',
});
const languages = ref([]);
const canGenerateImage = ref(false);
const canGenerateVideo = ref(false);

// 加载章节详情
const loadChapterDetails = async () => {
  try {
    const response = await fetchChapterDetails(chapterId);
    chapter.value = response.data;

    // 检查生成状态
    const audioResponse = await fetchGeneratedAudios({ chapter_id: chapterId });
    const imageResponse = await fetchGeneratedImages({ chapter_id: chapterId });
    const videoResponse = await fetchGeneratedVideos({ chapter_id: chapterId });

    canGenerateImage.value = audioResponse.data.length > 0;
    canGenerateVideo.value = canGenerateImage.value && imageResponse.data.length > 0;
  } catch (error) {
    console.error('Failed to load chapter details:', error);
  }
};

// 加载支持的翻译语言
const loadLanguages = async () => {
  try {
    const response = await fetchSupportedLanguages();
    languages.value = response.data;
  } catch (error) {
    console.error('Failed to load languages:', error);
  }
};

// 生成语音
const generateAudio = async () => {
  try {
    await createGeneratedAudio({ chapter_id: chapterId, audio_style_id: 1 });
    loadChapterDetails(); // 更新生成状态
    console.log('Audio generated successfully');
  } catch (error) {
    console.error('Failed to generate audio:', error);
  }
};

// 生成图片
const generateImage = async () => {
  try {
    await createGeneratedImage({ chapter_id: chapterId });
    loadChapterDetails(); // 更新生成状态
    console.log('Image generated successfully');
  } catch (error) {
    console.error('Failed to generate image:', error);
  }
};

// 生成视频
const generateVideo = async () => {
  try {
    await createGeneratedVideo({ chapter_id: chapterId, language_code: 'en' });
    loadChapterDetails(); // 更新生成状态
    console.log('Video generated successfully');
  } catch (error) {
    console.error('Failed to generate video:', error);
  }
};

// 翻译
const translateContent = async () => {
  console.log('Translation functionality is not yet implemented');
};

// 页面加载时获取数据
onMounted(() => {
  loadChapterDetails();
  loadLanguages();
});
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>
