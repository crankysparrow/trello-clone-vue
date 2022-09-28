import {
  defineConfig,
  presetIcons,
  presetUno,
  presetAttributify,
  transformerDirectives,
} from 'unocss'
import { presetReasonable } from './unoReasonableColors/index'

export default defineConfig({
  shortcuts: {
    btn: 'bg-indigo-5 text-amber-1',
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
    breakpoints: {
      xs: '630px',
      sm: '768px',
      md: '990px',
      lg: '1200px',
      xl: '1440px',
    },
  },
})
