import { createApp } from 'vue'
import './style.css'
import router from './router/router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { VueMasonryPlugin } from 'vue-masonry'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(ElementPlus).use(VueMasonryPlugin).mount('#app')
