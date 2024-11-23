<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// import { useRoute } from 'vue-router';
// import { fetchChapterDetail } from '@/services/novel'; // Uncomment when API is ready

// Mock data for testing
const chapter = ref({
  id: 1,
  title: 'Sample Chapter Title',
  content: '<p>This is a sample content for the chapter. It supports HTML content.</p>',
  audios: [
    { id: 1, audio_url: 'https://www.w3schools.com/html/horse.mp3', created_at: '2024-01-01' },
    { id: 2, audio_url: 'https://www.w3schools.com/html/horse.ogg', created_at: '2024-01-02' },
  ],
  videos: [
    { id: 1, video_url: 'https://www.w3schools.com/html/mov_bbb.mp4', created_at: '2024-01-03' },
    { id: 2, video_url: 'https://www.w3schools.com/html/movie.mp4', created_at: '2024-01-04' },
  ],
});

// Mock route parameter
// const route = useRoute();
// const chapterId = route.params.id;

// Load chapter details
const loadChapter = async () => {
  try {
    // Uncomment below when API is ready
    // const response = await fetchChapterDetail(Number(chapterId));
    // chapter.value = response.data;

    console.log('Using mock data for testing.');
  } catch (error) {
    console.error('Failed to fetch chapter details:', error);
  }
};

onMounted(() => {
  loadChapter();
});
</script>

<template>
  <div class="chapter-detail" v-if="chapter">
    <!-- 章节标题 -->
    <h1 class="chapter-title">{{ chapter.title }}</h1>

    <!-- 音频播放器 -->
    <div v-if="chapter.audios && chapter.audios.length" class="audio-section">
      <h3>Audio Resources</h3>
      <div v-for="audio in chapter.audios" :key="audio.id" class="audio-player">
        <audio controls style="width: 100%;">
          <source :src="audio.audio_url" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>

    <!-- 视频播放器 -->
    <div v-if="chapter.videos && chapter.videos.length" class="video-section">
      <h3>Video Resources</h3>
      <div v-for="video in chapter.videos" :key="video.id" class="video-player">
        <video controls style="width: 100%;">
          <source :src="video.video_url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <!-- 章节内容 -->
    <div class="chapter-content" v-html="chapter.content"></div>
  </div>
  <div v-else>
    <p>Loading chapter details...</p>
  </div>
</template>

<style scoped>
.chapter-detail {
  padding: 20px;
}

.chapter-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.audio-section, .video-section {
  margin-top: 20px;
}

.audio-player, .video-player {
  margin-bottom: 15px;
}

.chapter-content {
  font-size: 16px;
  line-height: 1.6;
  margin-top: 20px;
}
</style>
