import {
  fileURLToPath,
  URL
} from 'node:url'

import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import compressionPlugin from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // 启用压缩插件
    compressionPlugin({
      // 只压缩 .js 和 .css 文件
      ext: ['.js', '.css'],
      // 使用 gzip 压缩
      algorithm: 'gzip',
      // 是否删除原始文件
      deleteOriginFile: false,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src',
        import.meta.url))
    }
  }
})