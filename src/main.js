import { createApp } from 'vue'
import App from './App.vue'

import '@/assets/styles/style.scss'
import { languages } from '@/i18n/index'
import { createI18n } from 'vue-i18n'

const localStorageLang = localStorage.lang


const i18 = createI18n({

    legacy: true,

    locale: localStorageLang || 'ru',

    messages: languages
})



createApp(App).use(i18).mount('#app')
