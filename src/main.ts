import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/packages/theme-chalk/src/base.scss'
import './assets/global.css'
import { ElIcon, ElContainer, ElMain, ElUpload, ElHeader, ElSelect, ElOption, ElRadio } from 'element-plus'

const components = [
    ElIcon, ElContainer, ElMain, ElHeader, 
    ElUpload, ElSelect, ElOption, ElRadio 
]
// const plugins = []

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

// plugins.forEach(plugin => {
//     app.use(plugin)
// })

app.mount('#app')
