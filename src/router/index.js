import Vue from 'vue'
import Router from 'vue-router'
// 百度统计插件
import ba from 'vue-ba'
Vue.use(ba, '342d623d2e65d1347db1122316e2e439')
// 同步路由参数
import { sync } from 'vuex-router-sync'
// vuex 仓库
import store from '../vuex/store'
// 缓存处理
import cache from '../common/cache'
// url处理
import url from '../common/url'
// 路由配置
import routeConfig from './config'
import vueResource from 'vue-resource'

import rest from '../rest'
//
Vue.use(Router)
Vue.use(vueResource)
// 缓存store_id
saveStoreId()
// 构造路由
let router = new Router(routeConfig)
// 路由钩子
// S 转场动画
let historyCount = cache.getSessionData('count') * 1 || 0
cache.setSessionData('/', 0)
const commit = store.commit || store.dispatch

const checkIsLogin = async function() {
  let flag = false
  await rest.login.is_login(null, 'is-login').then((res) => {
    if (res.code === 0) {
      flag = res.data.is_login
    } else {
      flag = true // 如果接口报错，beforeEach放行，交由ajax 401错误处理
    }
  })

  return flag
}

router.beforeEach(async (to, from, next) => {
  let meta = to.meta || {}

  // needLogin  0:不需要登录 1:需要微信登录 2:需要手机登录
  if (meta.needLogin > 0 && !(await checkIsLogin())) {
    let next = encodeURIComponent(`?_=1#${to.path}`)
    if (meta.needLogin === 1) { // 不需要手机登录
      window.location.href = `auth/weixin/login?next=${next}&binding_mobile=${next}`
    } else { // 需要手机登录
      window.location.href = `auth/weixin/login?next=${next}&binding_mobile=` + encodeURIComponent(`?_=1#/login?backUrl=${next}`)
    }

    return
  }

  let titleKey = ''
  if (meta.titles && Object.keys(meta.titles).find) {
    titleKey = Object.keys(meta.titles).find(val => {
      return to.path.endsWith(val)
    })
  }
  // 路由变化，修改title
  if (meta && meta.title) {
    // let title = (meta.titles && meta.titles[to.path]) || meta.title
    let title = (meta.titles && meta.titles[titleKey]) || meta.title
    changeTitle(title)
  }
  // 转场动画方向控制
  const toIndex = cache.getSessionData(to.path)
  const fromIndex = cache.getSessionData(from.path)
  if (toIndex) {
    if (toIndex > fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    cache.setSessionData('count', historyCount)
    to.path !== '/' && cache.setSessionData(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  // loading 动画
  if (meta && meta.needLoading) {
    store.commit('UPDATE_LOADING', {
      status: true,
      text: '加载中...'
    })
  }
  next()
})
sync(store, router)
// E 转场动画
// 页面渲染完毕后关闭loading
router.afterEach(function (to) {
  // 百度pv 统计
  let env = 'replacing_env'
  // 百度 pv 统计
  if (env === 'production') {
    ba.trackPageview(to.path)
  }

  // 判断是否需要展示loading界面
  if (to.meta && to.meta.needLoading) {
    window.setTimeout(() => {
      store.commit('UPDATE_LOADING', {
        status: false
      })
    }, 1000)
  }
})
// 修改title
function changeTitle(title) {
  document.title = title
  let iframe = document.createElement('iframe')
  iframe.src = '/static/favicon.ico'
  iframe.style.display = 'none'
  iframe.style.width = '1px'
  iframe.style.height = '1px'
  iframe.onload = function () {
    setTimeout(function () {
      document.body.removeChild(iframe)
    }, 0)
  }
  document.body.appendChild(iframe)
}
// 缓存storeId
function saveStoreId() {
  let storeId = url.getSearch().store_id || ''
  if (storeId) {
    cache.setLocalStorageData(cache.keyMap.CACHE_STORE_ID, storeId)
  }
}
export default router
