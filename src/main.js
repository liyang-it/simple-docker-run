import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入 element-plus组件库， https://element-plus.org/zh-CN/guide/installation.html#%E4%BD%BF%E7%94%A8%E5%8C%85%E7%AE%A1%E7%90%86%E5%99%A8
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
