import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vClickOutside from 'click-outside-vue3'
import { createRouter, createWebHistory } from 'vue-router'
import { IDPlugin } from './plugins/html-ids'
// import routes from '~pages'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './style.css'

import home from './pages/index.vue'
import boardPage from './pages/board/[id].vue'
import cardPage from './pages/board/[id]/card/[cardId].vue'

const routes = [
  { path: '/', component: home },
  {
    path: '/board/:id',
    component: boardPage,
    children: [{ path: '/board/:id/card/:cardId', name: 'card', component: cardPage, props: true }],
  },
]

const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(vClickOutside)
app.use(IDPlugin)
app.mount('#app')
