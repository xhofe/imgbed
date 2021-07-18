import { createApp } from 'vue'
import App from './AppXHR.vue'
// import App from './AppFetch.vue'
import 'element-plus/packages/theme-chalk/src/base.scss'
import './assets/global.css'
import { ElIcon, ElContainer, ElMain, ElUpload, ElHeader, ElSelect, ElOption, ElRadio, ElTabs, ElTabPane, ElInput, ElTag, ElFooter, ElLink } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const components = [
  ElIcon, ElContainer, ElMain, ElHeader,
  ElUpload, ElRadio,
  ElTabs, ElTabPane,
  ElInput, ElTag, ElLink,
]
// const plugins = []

NProgress.configure({ trickle: false });

const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

// plugins.forEach(plugin => {
//     app.use(plugin)
// })

app.mount('#app')
