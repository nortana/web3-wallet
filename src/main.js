import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



//App.provide('$wssGoerliTest', '') // 将getAction方法挂载到全局



//Vue.prototype.$wssGoerliTest = ''

const app = createApp(App)

app.use(router).mount('#app')

app.config.globalProperties.$wssGoerliTest = 'wss://goerli.infura.io/ws/v3/dc92288a859d445890ede39d9dba58615test'

