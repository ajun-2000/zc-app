/*
 * @Author: 李俊 958269209@qq.com
 * @Date: 2022-11-03 09:38:38
 * @LastEditors: 李俊 958269209@qq.com
 * @LastEditTime: 2022-11-03 09:45:38
 * @FilePath: \vue-lcapp\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue' 
import App from './App.vue' 
import './registerServiceWorker' 
import router from './router' 
 
// 引入全局样式 
import './assets/css/base.css' 
// 引入全局vant修改样式 
import './assets/css/vant.css' 
// 引入字体图标样式 
import './assets/fonts/iconfont.css' 
 
// 引入vant模块 
import Vant from './vant' 
 
//引入vant 轻提示样式 
import 'vant/es/toast/style' 
 
// 引入api模块 
import API from './api' 
 
let app = createApp(App) 
 
 
// 把API挂载 
app.config.globalProperties.api = API 
 
// 使用路由 
app.use(router) 
 
// 使用vant 
app.use(Vant) 
 
app.mount('#app') 
