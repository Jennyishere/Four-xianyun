import Vue from 'vue'
import RichEditor from '@/components/RichEditor'

// register component from plugin to bypass SSR
Vue.component('vue-editor', RichEditor)