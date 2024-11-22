<template>
  <el-form :model="chapterForm" ref="chapterForm" label-width="120px" @submit.native.prevent="handleSubmit">
    <!-- 小说选择 -->
    <el-form-item label="选择小说" prop="novel_id" :rules="[{ required: true, message: '请选择小说', trigger: 'blur' }]">
      <el-select v-model="chapterForm.novel_id" placeholder="请选择小说" clearable>
        <el-option
          v-for="novel in novels"
          :key="novel.id"
          :label="novel.name"
          :value="novel.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- 章节标题 -->
    <el-form-item label="章节标题" prop="title" :rules="[{ required: true, message: '请输入章节标题', trigger: 'blur' }]">
      <el-input v-model="chapterForm.title" placeholder="请输入章节标题" clearable></el-input>
    </el-form-item>

    <!-- 章节内容 -->
    <el-form-item label="章节内容" prop="content" :rules="[{ required: true, message: '请输入章节内容', trigger: 'blur' }]">
      <md-editor v-model="chapterForm.content" />
    </el-form-item>

    <!-- 小说类型 -->
    <el-form-item label="选择小说类型" prop="novel_styles">
      <el-select v-model="chapterForm.novel_styles" placeholder="请选择小说类型" multiple clearable>
        <el-option
          v-for="style in novelStyles"
          :key="style.id"
          :label="style.name"
          :value="style.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- 语言 -->
    <el-form-item label="语言" prop="language">
      <el-select v-model="chapterForm.language" placeholder="请选择语言" clearable>
        <el-option
          v-for="language in languages"
          :key="language.id"
          :label="language.language_name"
          :value="language.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- 提交按钮 -->
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchNovels, fetchNovelStyles, fetchNovelLanguages, createNovelChapter } from '@/api'; // 修改 API 引用
import MdEditor from 'md-editor-v3'; // 使用 md-editor-v3

export default {
  components: {
    MdEditor,
  },
  setup() {
    const chapterForm = ref({
      novel_id: null,
      title: '',
      content: '',
      novel_styles: [],
      language: null,
    });

    const novels = ref([]);
    const novelStyles = ref([]);
    const languages = ref([]);

    // 获取小说数据
    const loadNovels = async () => {
      const response = await fetchNovels();
      novels.value = response.data;
    };

    // 获取小说类型
    const loadNovelStyles = async () => {
      const response = await fetchNovelStyles();
      novelStyles.value = response.data;
    };

    // 获取语言列表
    const loadLanguages = async () => {
      const response = await fetchNovelLanguages(); // 添加此 API 方法
      languages.value = response.data;
    };

    // 页面加载时获取数据
    onMounted(() => {
      loadNovels();
      loadNovelStyles();
      loadLanguages();
    });

    // 提交表单
    const handleSubmit = async () => {
      try {
        await createNovelChapter(chapterForm.value);  // 创建小说章节
        this.$message.success('提交成功');
        // 清空表单或其他操作
      } catch (error) {
        this.$message.error('提交失败');
      }
    };

    // 取消提交
    const handleCancel = () => {
      chapterForm.value = {
        novel_id: null,
        title: '',
        content: '',
        novel_styles: [],
        language: null,
      };
    };

    return {
      chapterForm,
      novels,
      novelStyles,
      languages,
      handleSubmit,
      handleCancel,
    };
  },
};
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>