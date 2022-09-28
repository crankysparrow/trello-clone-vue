import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'
import {
  presetIcons,
  presetMini,
  presetAttributify,
  transformerDirectives,
  presetUno,
} from 'unocss'
import { resolve } from 'path'
import { presetReasonable } from './unoReasonableColors/index'
import postcssNesting from 'postcss-nesting'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    vue(),

    Unocss({
      shortcuts: {
        btn: 'bg-cerulean-5 text-slate-1 px-4 py-2 leading-none font-semibold outline-transparent rounded-none transition-all hover:bg-cerulean-6 text-gray-1 cursor-pointer focus:outline-2 focus:outline-cerulean-3 outline-solid',
        btnReset: 'bg-transparent p-0 text-dark hover:bg-transparent ',
      },
      rules: [],
      presets: [
        presetUno(),
        presetIcons({
          warn: true,
        }),
        presetAttributify(),
        presetReasonable(),
      ],

      transformers: [transformerDirectives()],

      theme: {
        fontSize: {
          // base: ['1rem', '1.125rem'],
          base: ['1.125rem', '1.6'],
          // sm: ['0.85rem', '1rem'],
          sm: ['1rem', '1.4'],
          // lg: ['1.2rem', '1.375rem'],
          lg: ['1.275rem', '1.3'],
          // xl: ['1.3rem', '1.5rem'],
          xl: ['1.5rem', '1.3'],
          '2xl': ['1.75rem', '1.3'],
        },
        breakpoints: {
          xs: '630px',
          sm: '768px',
          md: '990px',
          lg: '1200px',
          xl: '1440px',
        },
      },
    }),
  ],
})
