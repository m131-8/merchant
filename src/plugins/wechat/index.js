/**
 * a plugin for wx jssdk
 * https://mp.weixin.qq.com/wiki/11/74ad127cc054f6b80759c40f77ec03db.html
 */
import Vue from 'vue'
import './jweixin-1.0.0'
export default class Wechat {
  static install() {}
    // 校验微信接口
  constructor(options) {
    this.wx = window.wx
    this.flag = window.DEBUG // DEBUG 状态下设为true
    this.res = null // 微信返回的校验成功的结果
    this.location = {
      latitude: 0,
      longitude: 0
    }

    // 需要检测的JS接口列表，所有JS接口列表见附录2
    this.jsApiList = []

    // merge 方法
    Object.assign(this, options)
    if (this.beforeCreate) {
      this.beforeCreate()
    }
    this.checkWXConfig()

    // 构造函数执行完之后的hook
    if (this.created) {
      this.created()
    }
  }

  checkWXConfig() {
    this.promise = new Promise((resolve, reject) => {
      if (this.flag) {
        this.ready(resolve)
      } else {
        if (!this.getWechatConfigResource) {
          reject(this)
          throw new Error('no defined getWechatConfigResource function')
        }
        this.getWechatConfigResource().then((res) => {
          let data = res.config || res.data
          this.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: this.jsApiList
          })
          this.wx.ready(() => {
            // 判断当前客户端版本是否支持指定JS接口
            this.wx.checkJsApi({
              jsApiList: this.jsApiList,
              success: (res) => {
                this.flag = true
                this.res = res
                  // resolve(this)
                this.ready(resolve)
              },
              error: (res) => {
                this.flag = false
                this.res = res
                reject(this)
                throw new Error(`checkJsApi 失败:${JSON.stringify(res)}`)
              }
            })
          })
          this.wx.error((res) => {
            this.flag = false
            this.res = res
            reject(this)
            throw new Error(`wxjssdk 注册失败:${JSON.stringify(res)}`)
          })
        }, (res) => {
          this.res = res
          reject(this)
        })
      }
    })
  }

  setFlag(val) {
    this.flag = val
  }

  // sentry issues#30
  ready(resolve) {
    let onBridgeReady = () => {
      resolve(this)
    }
    if (typeof window.WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      onBridgeReady()
    }
  }
}

/**
 * vue 组件安装方法
 * @return {[type]}
 */
function install() {
  if (install.installed) return
  install.installed = true
  Vue.mixin({
    beforeCreate() {
      const options = this.$options
      if (options.wechat) {
        this.$wechat = options.wechat
      } else if (options.parent && options.parent.$wechat) {
        this.$wechat = options.parent.$wechat
      }
    }
  })
}
Wechat.install = install
Wechat.version = '__VERSION__'
