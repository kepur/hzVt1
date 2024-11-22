import api from './api'

// convert histories API
export const fetchConvertHistories = () => api.get('/convert_histories')
export const createConvertHistory = (data: {
  chapter_id: number
  target_language: number
  is_translated: boolean
}) => api.post('/convert_histories', data)

// gen audios API
export const fetchGeneratedAudios = () => api.get('/gen_audios')
export const createGeneratedAudio = (data: {
  chapter_id: number
  audio_url: string
  audio_file_name: string
  audio_style_id: number
}) => api.post('/gen_audios', data)

// gen videos API
export const fetchGeneratedVideos = () => api.get('/gen_videos')
export const createGeneratedVideo = (data: {
  chapter_id: number
  video_url: string
  language_code: string
}) => api.post('/gen_videos', data)

// gen images API
export const fetchGeneratedImages = () => api.get('/gen_images')
export const createGeneratedImage = (data: {
  chapter_id: number
  image_url: string
  image_file_name: string
}) => api.post('/gen_images', data)