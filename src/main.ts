import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'; //这一句必须要加上
import SvgIcon from './components/icons/SvgIcon.vue';
const app = createApp(App)

app.component('SvgIcon', SvgIcon)
app.use(createPinia())
app.use(ElementPlus, {
    size: 'small',
    locale: zhCn
})
app.use(router)

app.mount('#app')
