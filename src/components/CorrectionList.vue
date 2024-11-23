<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import { fetchTranslatedChapters } from '@/services/novel'; // Uncomment when API is ready

// Mock data for testing
const translatedChapters = ref([
  {
    id: 1,
    chapter_id: 1,
    original_language: 'English',
    target_language: 'French',
    translated_content: 'Ceci est un chapitre traduit, avec un contenu exceptionnel...',
    translation_engine: 'MarianMT',
    created_at: '2024-01-01',
  },
  {
    id: 2,
    chapter_id: 2,
    original_language: 'English',
    target_language: 'Spanish',
    translated_content: 'Este es un capítulo traducido, con un contenido excelente...',
    translation_engine: 'GoogleTranslate',
    created_at: '2024-01-02',
  },
]);

const router = useRouter();

// Load translated chapters dynamically (mocked or API-driven)
const loadTranslatedChapters = async () => {
  try {
    // Uncomment below when the API is ready
    // const response = await fetchTranslatedChapters();
    // translatedChapters.value = response.data;

    console.log('Using mock data for testing.');
  } catch (error) {
    console.error('Failed to fetch translated chapters:', error);
  }
};

// Navigate to the CorrectionDetail page
const goToCorrectionDetail = (chapterId: number) => {
  router.push({ path: `/index/correctiondetail`, query: { id: chapterId } });
};

// Lifecycle hook
onMounted(() => {
  loadTranslatedChapters();
});
</script>

<template>
  <div class="correction-list">
    <ul>
      <li
        v-for="chapter in translatedChapters"
        :key="chapter.id"
        class="chapter-item"
        @click="goToCorrectionDetail(chapter.chapter_id)"
      >
        <div class="chapter-header">
          <span class="language-pair">
            {{ chapter.original_language }} → {{ chapter.target_language }}
          </span>
          <span class="engine">
            ({{ chapter.translation_engine }})
          </span>
        </div>
        <h3 class="chapter-title">
          Chapter ID: {{ chapter.chapter_id }}
        </h3>
        <div class="translated-preview">
          {{ chapter.translated_content }}
        </div>
        <div class="chapter-meta">
          <span>Translated At: {{ chapter.created_at }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.correction-list {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chapter-item {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.chapter-item:hover {
  background-color: #f5f5f5;
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
}

.language-pair {
  font-weight: bold;
  color: #555;
}

.engine {
  font-style: italic;
}

.chapter-title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 5px;
  color: #333;
}

.translated-preview {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.chapter-meta {
  font-size: 12px;
  color: #888;
}
</style>
