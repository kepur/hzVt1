import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'md-editor-v3/lib/style.css';
import 'video.js/dist/video-js.css'; // 引入全局样式
import videojs from 'video.js';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
const app = createApp(App)

//引入自定义插件对象
import globalComponent from './components/RegistComponents'
console.log(globalComponent)
// 将 videojs 注入全局，方便组件直接调用
app.provide('videojs', videojs);
app.use(globalComponent)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
