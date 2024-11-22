<template>
  <div class="create-view">
    <el-card class="content-card">
      <div slot="header" class="clearfix">
        <span>Create New Chapter</span>
      </div>

      <!-- Markdown Editor for creating the chapter -->
      <div class="editor-container">
        <MdEditor v-model="content" />
      </div>

      <el-form :model="form" ref="formRef" label-width="120px" class="chapter-form">
        <el-form-item label="Chapter Title">
          <el-input v-model="form.title" placeholder="Enter Chapter Title"></el-input>
        </el-form-item>

        <el-form-item label="Summary">
          <el-input type="textarea" v-model="form.summary" placeholder="Enter Chapter Summary"></el-input>
        </el-form-item>

        <!-- Language selection (optional) -->
        <el-form-item label="Language">
          <el-select v-model="form.language" placeholder="Select Language">
            <el-option v-for="language in languages" :key="language.id" :label="language.name" :value="language.id" />
            <el-option label="None" value="null" />
          </el-select>
        </el-form-item>

        <!-- Genre selection (optional) -->
        <el-form-item label="Genre">
          <el-select v-model="form.genre" placeholder="Select Genre">
            <el-option v-for="genre in genres" :key="genre.id" :label="genre.name" :value="genre.id" />
            <el-option label="None" value="null" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MdEditor } from 'md-editor-v3'; // Correct import for md-editor-v3
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, ElSelect, ElOption } from 'element-plus'; // Element Plus components
import {  createNovelChapter,fetchNovelStyles } from '@/services/novel'; // Import API functions
import {  fetchSupportedLanguages } from '@/services/lang'; // Import API functions

// Form model
const form = ref({
  title: '',
  summary: '',
  language: null, // Language is optional, default is null
  genre: null,    // Genre is optional, default is null
});

// Markdown content
const content = ref('');

// API data
const languages = ref([]);
const genres = ref([]);

// Fetch data on mounted
onMounted(async () => {
  try {
    // Fetch languages and genres from API
    const [languageResponse, genreResponse] = await Promise.all([
    fetchSupportedLanguages(),  // Assuming this fetches language options
    fetchNovelStyles(),     // Assuming this fetches genre options
    ]);

    languages.value = languageResponse.data || [];
    genres.value = genreResponse.data || [];
  } catch (error) {
    console.error('Failed to fetch languages or genres', error);
  }
});

// Form reference
const formRef = ref(null);

// Submit handler
const submitForm = async () => {
  if (!form.value.title || !form.value.summary || !content.value) {
    alert('Please fill out all fields.');
    return;
  }

  try {
    // Here, you can call the API to create a new chapter
    await createNovelChapter(form.value, content.value);
    alert('Chapter created successfully!');
    // Clear the form after submission
    form.value.title = '';
    form.value.summary = '';
    form.value.language = null;
    form.value.genre = null;
    content.value = '';
  } catch (error) {
    console.error('Error creating chapter:', error);
    alert('Failed to create chapter.');
  }
};
</script>

<style scoped>
.editor-container {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
  max-width: 800px;
  margin: 0 auto;  /* Center the editor */
}

.editor-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.md-editor-wrapper {
  border-radius: 8px;
  background-color: white;
  border: 1px solid #ddd;
}

.md-editor-wrapper .md-editor-toolbar {
  border-bottom: 1px solid #ddd;
}

.md-editor-wrapper .md-editor-textarea {
  min-height: 300px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  color: #333;
}

.md-editor-wrapper .md-editor-preview {
  padding: 16px;
  border-top: 1px solid #ddd;
}
.create-view {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.content-card {
  background-color: white;
}

.editor-container {
  margin: 20px 0;
  min-height: 300px;
}

.chapter-form {
  margin-top: 20px;
}

.chapter-form .el-form-item {
  margin-bottom: 15px;
}

.el-input, .el-button {
  width: 100%;
}
</style>
