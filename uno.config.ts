import { defineConfig, presetIcons, transformerDirectives, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'text-error': 'text-red-5 text-xs',
      btn: 'inline-flex align-center',
      'btn-reset': 'text-inherit p-0 bg-transparent hover:bg-transparent focus:bg-transparent',
      wrapper: 'container mx-auto ',
    },
  ],
  rules: [],
  presets: [
    presetUno(),
    presetIcons({
      warn: true,
      cdn: 'https://esm.sh/',
    }),
    // presetAttributify(),
  ],
  safelist: ['i-carbon:trash-can', 'i-carbon:close'],

  transformers: [transformerDirectives()],

  theme: {
    fontSize: {
      base: ['1.125rem', '1.6'],
      sm: ['1rem', '1.4'],
      lg: ['1.275rem', '1.3'],
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
})
