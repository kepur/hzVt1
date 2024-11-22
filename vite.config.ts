import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { customPort } from './src/services/config' 

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: customPort, 
    open: true, 
  },
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      // 图标文件夹为src/assets/icons
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  define:{
    __API_BASE_URL__: JSON.stringify('http://127.0.0.1:7788/api/v1/'),  // 定义全局 API 地址

  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
