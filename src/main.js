// 支持es6 javascript 库
import 'babel-polyfill'
require('es5-shim')

// 调试模式
// replacing_debug
import Vue from 'vue'

// 数据上报
import report from './report'

// vuex 仓库
import store from './vuex/store'

// 微信SDK调用
import wechat from './wechat'

// 初始化全局toast
import './common/mixins'
import App from './App.vue'

// 微信SDK调用
// import wxHelp from './common/wxhelp'

// api配置
import rest from './rest'
// 路由配置
import router from './router'
/* replacing__mock */ // 保留用来dev模式加载mock数据
import './stylesheets/app.less' // 使用require导入样式文件

const FastClick = require('fastclick')
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  rest,
  wechat, // wx
  report, // sentry 数据上报
  template: '<App/>',
  components: {
    App
  }
})
