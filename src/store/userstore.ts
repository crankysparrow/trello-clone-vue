import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { uid } from 'uid'

export const useUserStore = defineStore('user', () => {
  // state: () => ({ name: '', id: 1 }),
  const name = useStorage('user', '')
  const id = useStorage('userId', uid())

  function setName(newName: string) {
    name.value = newName
  }

  return { name, id, setName }
})
