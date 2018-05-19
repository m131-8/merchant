/**
 * 数据上报
 */
import Vue from 'vue'
// api 插件
import Report from '../plugins/report'
// api 配置
import config from './config'
Vue.use(Report)
// rest
let report = new Report(Vue, config)
// 测试sentry是否正常配置
// if (report.captureMessage && !report.isProduction) {
//   report.captureMessage('test~')
// }
export default report
