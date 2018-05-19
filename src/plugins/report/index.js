/**
 * 前端上报接口
 */
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

export default class Report {
  static install () {}
  constructor(Vue, options = {}) {
    // 本地开发环境和测试环境不上报
    if (options.config.environment === 'production') {
      return Raven
        .config(options.DNS, options.config)
        .addPlugin(RavenVue, Vue)
        .install()
    } else {
      return null
    }
  }
}

function install(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.mixin({
    beforeCreate() {
      const options = this.$options
      if (options.report) {
        this.$report = options.report
      } else if (options.parent && options.parent.$report) {
        this.$report = options.parent.$report
      }
    }
  })
}

Report.install = install
Report.version = '__VERSION__'
