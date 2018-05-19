/**
 * ajax request help
 */

import Vue from 'vue'
import vueResource from 'vue-resource'
import cookie from './cookie'
// import cache from './cache'
// import url from './url'

class Ajax {

  constructor(Vue, options) {
    Vue.use(vueResource)
    this.$http = Vue.http
    this.baseUrl = options && options.baseUrl ? options.baseUrl : 'replacing_api'
    this.authUrl = options && options.authUrl ? options.authUrl : 'replacing_auth'
    this.options = options
    // this.queryMap = {}
    // this.createMap = {}
    // this.putWayMap = {}
    // this.patchMap = {}
    // this.deleteMap = {}
    // vue-resource global configure
    Vue.http.headers.common['channelType'] = 'wx'
    // vue-resource 拦截器，一些跨域的请求添加csrftoken
    Vue.http.interceptors.push((req, next) => {
      // 保证 url 中携带 store_id
      // let storeId = url.getSearch().store_id || cache.getLocalStorageData(cache.keyMap.CACHE_STORE_ID)
      // let reqUrl = req.url
      // let hasSearch = reqUrl.indexOf('?') > 0
      // if (hasSearch) {
      //   let searchs = url.getSearch()
      //   if (storeId && !searchs.store_id) {
      //     reqUrl += '&store_id=' + storeId
      //   }
      // } else {
      //   reqUrl += '?store_id=' + storeId
      // }
      // req.url = reqUrl

      let csrftoken = cookie.getCookie('csrf-token')
      if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(req.method) && !Vue.http.credentials) {
        Vue.http.headers.common['X-CSRF-Token'] = csrftoken
      }
      next()
    })
    // 后端请求不支持json格式的数据
    Vue.http.options.emulateJSON = true
    // ajax 全局错误处理(vue-resource 拦截器)
    Vue.http.interceptors.push((req, next) => {
      // continue to next interceptor
      next((res) => {
        if (!res.ok) {
          // 处理状态码错误
          if (res.status === 404) {
            console.log('请求发生404错误!')
          } else if (res.status === 500) {
            console.log('请求发生500错误!')
          } else if (res.status === 504) {
            console.log('请求超时')
          } else if (res.status === 401) {
            let next = ''
            if (window.location.hash === '') {
              next = encodeURIComponent(`?_=1#/store/index`)
            } else {
              next = encodeURIComponent(`?_=1${window.location.hash}`)
            }
            if (!this.options.noAuthInFilte) { // 具体接口逻辑
              if (this.options.noNeedMobileLogin) { // 不需要手机登录
                // window.location.href = 'replacing_auth/' + storeId + '/openid?next=' + next
                window.location.href = `auth/weixin/login?next=${next}&binding_mobile=${next}`
              } else { // 需要手机登录
                // window.location.href = 'replacing_auth?next=' + next
                window.location.href = `auth/weixin/login?next=${next}&binding_mobile=` + encodeURIComponent(`?_=1#/login?backUrl=${next}`)
              }
            }
          }
        }
      })
    })
  }
  parse(path, id) {
    if (typeof id === 'string') {
      return path + '/' + 'id'
    }
    if (typeof id === 'object') {
      let search = '?'
      let counter = 0
      for (let key in id) {
        if (counter) search += '&'
        search += key + '=' + id[key]
        counter++
      }
      return path + search
    }
    return path
  }
  query(path, options) {
    let url = ''
    let pathUrl = ''
    return (id, expand) => {
      if (expand) {
        url = path + '/' + expand
      } else {
        url = path
      }
      let newPath = url
      if (id) {
        newPath = this.parse(url, id)
      }
      options = Object.assign({}, this.options, options)
      if (options && options.customUrl) {
        pathUrl = options.customUrl + newPath
      } else {
        pathUrl = this.baseUrl + newPath
      }
      return this.$http.get(pathUrl).then((res) => {
        return res.json()
      }, (res) => {
        return res.json()
      })
    }
  }
  // 增
  create(path, options) {
    let url = ''
    let pathUrl = ''
    return (data, expand) => {
      if (expand) {
        url = path + '/' + expand
      } else {
        url = path
      }
      let newPath = url
      options = Object.assign({}, this.options, options)
      if (options && options.customUrl) {
        pathUrl = options.customUrl + newPath
      } else {
        pathUrl = this.baseUrl + newPath
      }
      return this.$http.post(pathUrl, data).then((res) => {
        return res.json()
      }, (res) => {
        return res.json()
      })
    }
  }
  // put 方法~
  putWay(path, options) {
    let url = ''
    let pathUrl = ''
    return (data, expand) => {
      if (expand) {
        url = path + '/' + expand
      } else {
        url = path
      }
      let newPath = url
      options = Object.assign({}, this.options, options)
      if (options && options.customUrl) {
        pathUrl = options.customUrl + newPath
      } else {
        pathUrl = this.baseUrl + newPath
      }
      return this.$http.put(pathUrl, data).then((res) => {
        return res.json()
      }, (res) => {
        return res.json()
      })
    }
  }
  // patch 方法~
  patch(path, options) {
    let url = ''
    let pathUrl = ''
    return (data, expand) => {
      if (expand) {
        url = path + '/' + expand
      } else {
        url = path
      }
      let newPath = url
      options = Object.assign({}, this.options, options)
      if (options && options.customUrl) {
        pathUrl = options.customUrl + newPath
      } else {
        pathUrl = this.baseUrl + newPath
      }
      return this.$http.patch(pathUrl, data).then((res) => {
        return res.json()
      }, (res) => {
        return res.json()
      })
    }
  }
  // delete 方法~
  delete(path, options) {
    let url = ''
    let pathUrl = ''
    return (data, expand) => {
      if (expand) {
        url = path + '/' + expand
      } else {
        url = path
      }
      let newPath = url
      options = Object.assign({}, this.options, options)
      if (options && options.customUrl) {
        pathUrl = options.customUrl + newPath
      } else {
        pathUrl = this.baseUrl + newPath
      }
      return this.$http.delete(pathUrl, data).then((res) => {
        return res.json()
      }, (res) => {
        return res.json()
      })
    }
  }
}
export default new Ajax(Vue, {})
