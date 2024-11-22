import api from './api'

// support languages API
export const fetchSupportedLanguages = () => api.get('/support_convert_languages')
export const createSupportedLanguage = (data: { language_code: string; language_name: string }) =>
  api.post('/support_convert_languages', data)

// audio styles API
export const fetchAudioStyles = () => api.get('/audio_styles')
export const createAudioStyle = (data: {
  language_code_id: number
  style_name: string
  voice_type: string
}) => api.post('/audio_styles', data)