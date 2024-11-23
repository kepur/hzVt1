import api from './api'

// Novels API
export const fetchNovels = () => api.get('/novels')
// Add the new `getAllNovels` method
export const getAllNovels = () => api.get('/novels');

export const createNovel = (data: { name: string; description: string; author_id: number }) =>
  api.post('/novels', data)
export const updateNovel = (id: number, data: { name: string; description: string }) =>
  api.put(`/novels/${id}`, data)
export const deleteNovel = (id: number) => api.delete(`/novels/${id}`)

// chapters API
export const fetchNovelChapters = () => api.get('/novel_chapters');
export const fetchChapterDetail = (id: number) => api.get(`/novel_chapters/${id}`);
export const createNovelChapter = (data: { novel_id: number; title: string; content: string }) =>
  api.post('/novel_chapters', data)
export const updateNovelChapter = (id: number, data: { title: string; content: string }) =>
  api.put(`/novel_chapters/${id}`, data)
export const deleteNovelChapter = (id: number) => api.delete(`/novel_chapters/${id}`)

// Novel styles API
export const fetchNovelStyles = () => api.get('/novel_styles')
export const createNovelStyle = (data: { name: string }) => api.post('/novel_styles', data)
export const deleteNovelStyle = (id: number) => api.delete(`/novel_styles/${id}`)




export const fetchChapterBasicDetails = (chapterId: number) =>
  api.get(`/chapter/${chapterId}/details`);

export const fetchChapterGenerationStatus = (chapterId: number) =>
  api.get(`/chapter/${chapterId}/generation_status`);

export const fetchAudioStyles = () =>
  api.get('/audio_styles');

export const fetchSupportedLanguages = () =>
  api.get('/supported_languages');

export const fetchStableDiffusionParams = () =>
  api.get('/stable_diffusion_params');
