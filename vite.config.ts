import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteLegacyPlugin from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [viteLegacyPlugin({
    targets: ['defaults', 'not IE 11']
  }), vue()],
  build: {
    target: ['es2015', 'chrome63']
  },
  resolve: {
    alias: {
      // 设置路径
      '~': path.resolve(__dirname, './'),
      // 设置别名
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    port: 5173,
    host: true,
    open: true,
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/api/fanyi': {
        target: 'http://192.168.21.178:5000',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, '')
      }
    }
  },
  base: './',
})
