import { App, Plugin, ref } from 'vue'

export const IDPlugin: Plugin = {
  install: (app: App) => {
    const count = ref(0)

    app.provide('htmlId', () => {
      count.value += 1
      return `uid-${count.value}`
    })
  },
}
