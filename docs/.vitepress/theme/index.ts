// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue' // <-- 1. Import Layout เข้ามา
import ActionButtons from './components/ActionButtons.vue'
import Button_onpage from './components/Button_onpage.vue'
import CopyCredentials from './components/CopyCredentials.vue'
import CopyConfig from './components/CopyConfig.vue'

export default {
  ...DefaultTheme,
  Layout: Layout, // <-- 2. ระบุให้ใช้ Layout ของเราอย่างชัดเจน
  enhanceApp({ app }) {
    // Register global components
    app.component('ActionButtons', ActionButtons), // <-- 3. Register ActionButtons component
    app.component('bp', Button_onpage),
    app.component('cp', CopyCredentials),
    app.component('cc', CopyConfig)
  }
} satisfies Theme