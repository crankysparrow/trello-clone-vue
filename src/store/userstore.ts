import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
// import { uid } from 'uid'
import { userIdDefault } from './storedefaults'

export const useUserStore = defineStore('user', () => {
  // state: () => ({ name: '', id: 1 }),
  const name = useStorage('user', 'you')
  const id = useStorage('userId', userIdDefault)

  function setName(newName: string) {
    name.value = newName
  }

  return { name, id, setName }
})
