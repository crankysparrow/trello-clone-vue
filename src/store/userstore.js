import { v4 as uuidv4 } from 'uuid'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { uid } from 'uid'

export const useUserStore = defineStore('user', () => {
  // state: () => ({ name: '', id: 1 }),
  const name = ref(useStorage('user', ''))
  const id = ref(useStorage('userId', uid()))

  function setName(newName) {
    name.value = newName
  }

  return { name, id, setName }
})
