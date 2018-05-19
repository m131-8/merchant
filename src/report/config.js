/**
 * rest 请求配置
 * replacing_version 需要在构造文件config/index.js中配置
 * replacing_env 需要在构建配置中配置config/index.js中配置
 */
export default {
  // DNS: 'https://43c49a041b1b411fa8280a9cb3bd6c22@sentry.cheanjiait.com/20',
  DNS: 'https://3069747c004f469db0270f6b490976d4@sentry.lixinio.com/14',
  config: {
    release: 'replacing_version',
    logger: 'javascript',
    ignoreUrls: [/sentry\.lixinio\.com/, /hm\.baidu\.com/, /map\.qq\.com/],
    environment: 'replacing_env'
  }
}
