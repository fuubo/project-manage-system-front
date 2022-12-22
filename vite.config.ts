import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// @ts-ignore
import pxtovw from 'postcss-px-to-viewport'

import Components from 'unplugin-vue-components/vite'
import {VantResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [pxtovw({
          //这里是设计稿宽度 自己修改
          viewportWidth: 750,
          viewportUnit: 'vw',
          exclude: /(\/|\\)(node_modules)(\/|\\)/
        })]
    }
  }
})