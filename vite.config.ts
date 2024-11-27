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
      '/m2m/fanyi': {
        target: 'http://192.168.21.178:6001',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/m2m/, '')
      },
      '/gpt/fanyi': {
        target: 'http://192.168.21.178:5003',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/gpt/, '')
      },
      '/api/translate': {
        target: 'http://192.168.21.178:5001',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, '')
      },
      // '/api/my/fanyi': {
      //   target: 'http://192.168.21.178:6000',
      //   changeOrigin: true,
      //   rewrite: (p) => p.replace(/^\/api\/my/, '')
      // },
      '/api/video': {
        target: 'http://192.168.21.178:5000',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/video/, '')
      },
      '/api/ocr': {
        target: 'http://192.168.21.178:5002',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/ocr/, '')
      }
    }
  },
  base: './',
})
