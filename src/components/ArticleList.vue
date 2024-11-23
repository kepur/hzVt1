<script lang="ts" setup>
import IconIndex from './icons/IconIndex.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// import { fetchNovelChapters, createLike } from '@/services/novel'; // Uncomment when API is ready

// Mock data for testing
const chapters = ref([
  {
    id: 1,
    title: 'A Scenic Novel Chapter',
    chapter_number: 1,
    created_at: '2024-01-01',
    uri: 'http://localhost:3000/chapters/1',
    isLiked: false,
    comments: [
      { id: 1, user: 'User1', content: 'Amazing chapter!' },
      { id: 2, user: 'User2', content: 'Loved it!' },
    ],
  },
  {
    id: 2,
    title: 'Another Great Chapter',
    chapter_number: 2,
    created_at: '2024-01-02',
    uri: 'http://localhost:3000/chapters/2',
    isLiked: false,
    comments: [],
  },
]);

const router = useRouter();

// Load chapters dynamically (mocked or API-driven)
const loadChapters = async () => {
  try {
    // Uncomment below when the API is ready
    // const response = await fetchNovelChapters();
    // chapters.value = response.data;

    console.log('Using mock data for testing.');
  } catch (error) {
    console.error('Failed to fetch chapters:', error);
  }
};

// Navigate to chapter detail page
const goToChapterDetail = (id: number) => {
  router.push({ name: 'chapterdetail', params: { id } });
};

// Function to toggle like
const toggleLike = async (chapter: any) => {
  try {
    chapter.isLiked = !chapter.isLiked;

    // Uncomment below when the API is ready
    // await createLike({ chapter_id: chapter.id, action: chapter.isLiked ? 'like' : 'unlike' });

    console.log(chapter.isLiked ? 'Liked chapter' : 'Unliked chapter');
  } catch (error) {
    console.error('Failed to toggle like:', error);
  }
};

// Function to share chapters
const shareChapter = (platform: string, uri: string) => {
  const encodedUri = encodeURIComponent(uri);
  let shareUrl = '';

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUri}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${encodedUri}`;
      break;
    default:
      console.error('Unknown sharing platform:', platform);
      return;
  }

  window.open(shareUrl, '_blank');
};

// Function to toggle comment visibility
const toggleComments = (chapter: any) => {
  chapter.showComments = !chapter.showComments;
};

onMounted(() => {
  loadChapters();
});
</script>

<template>
  <div class="Topstory-content">
    <ul>
      <li v-for="chapter in chapters" :key="chapter.id">
        <div>
          <!-- Chapter Header -->
          <div class="topstory-hd">
            <img src="../assets/user.jpg" />
            <span>Author</span>
          </div>
          <!-- Chapter Title -->
          <h3 class="topstory-title" @click="goToChapterDetail(chapter.id)">
            {{ chapter.title }}
          </h3>
          <!-- Chapter Metadata -->
          <p>Chapter Number: {{ chapter.chapter_number }}</p>
          <p>Created At: {{ chapter.created_at }}</p>
        </div>

        <!-- Actions -->
        <div class="topstory-actions">
          <ul>
            <li>
              <div
                class="icon-text"
                @click="toggleLike(chapter)"
                :style="{ color: chapter.isLiked ? 'red' : 'black' }"
              >                <IconIndex name="like" width="30px" height="30px" :color="{ color: chapter.isLiked ? '#red' : '#black' }"></IconIndex>

                <span>Like</span>
              </div>
            </li>
            <li>
              <div class="icon-text" @click="toggleComments(chapter)">
                <IconIndex name="comments" width="30px" height="30px"></IconIndex>
                <span>Comments</span>
              </div>
            </li>
            <li>
              <div class="icon-text" @click="shareChapter('facebook', chapter.uri)">
                <IconIndex name="share" width="30px" height="30px"></IconIndex>
                <span>Facebook</span>
              </div>
            </li>
            <li>
              <div class="icon-text" @click="shareChapter('telegram', chapter.uri)">
                <IconIndex name="share" width="30px" height="30px"></IconIndex>
                <span>Telegram</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Comments Section -->
        <div v-if="chapter.showComments" class="comments-list">
          <div v-for="comment in chapter.comments" :key="comment.id" class="comment-item">
            <strong>{{ comment.user }}</strong>: {{ comment.content }}
          </div>
          <p v-if="!chapter.comments.length">No comments yet.</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.Topstory-content {
  padding: 20px;
}

.topstory-hd {
  display: flex;
  align-items: center;
}

.topstory-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  cursor: pointer;
}

.topstory-actions {
  margin-top: 10px;
}

.icon-text {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.icon-text span {
  margin-left: 5px;
}

.comments-list {
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.comment-item {
  margin-bottom: 5px;
}
</style>
