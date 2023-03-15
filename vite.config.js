import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetIcons, presetAttributify, transformerDirectives, presetUno } from 'unocss'
import { resolve } from 'path'
// import { presetReasonable } from './unoReasonableColors/index'

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
      shortcuts: [
        {
          'text-error': 'text-red text-xs',
          'btn-reset': 'text-inherit p-0 bg-transparent hover:bg-transparent focus:bg-transparent',
          // btn: 'text-slate-1 bg-cyan-7 hover:bg-cyan-6 focus:bg-cyan-6 px-3 py-2 lh-none font-500 text-sm rounded-none transition-all cursor-pointer',
          // btn: 'bg-cyan-7 text-slate-1 text-sm px-3 py-2 lh-none font-500 rounded-none transition-all cursor-pointer hover:bg-cyan-6',
          // 'btn-cancel':
          //   'text-dark-1 bg-transparent hover:bg-opacity-40 hover:bg-slate-5 focus:bg-slate-5 focus:bg-opacity-40',
          // 'btn-reset': 'bg-transparent p0 text-inherit hover:bg-transparent focus:bg-transparent',
          wrapper: 'container mx-auto ',
        },
        // [
        // /^(btn)-(cancel|reset)/,
        // ([_, __, style]) => {
        //   let text = 'slate-1'
        //   let bg = 'cyan-7'
        //   let bgInteract = ['cyan-6']
        //   let other = ''

        //   if (style === 'cancel') {
        //     text = 'dark-1'
        //     bg = 'transparent'
        //     bgInteract = ['slate-5', 'opacity-40']
        //   } else if (style === 'reset') {
        //     text = 'inherit'
        //     bg = 'transparent'
        //     bgInteract = ['transparent']
        //     other = 'p-0'
        //   }
        //   bgInteract = bgInteract.map((opt) => `hover:bg-${opt} focus:bg-${opt}`).join(' ')
        //   return `text-${text} bg-${bg} ${bgInteract} ${other}`
        // },
        // ],
      ],
      rules: [],
      presets: [
        presetUno(),
        presetIcons({
          warn: true,
          // extraProperties: {
          //   width: '2em',
          //   height: '2em',
          // },
        }),
        presetAttributify(),
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
