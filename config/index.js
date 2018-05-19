// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var version = require('../package').version

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../www/index.html'),
    assetsRoot: path.resolve(__dirname, '../www'),
    assetsSubDirectory: 'static',
    // assetsSubDirectory: '',
    // assetsPublicPath: 'https://assets-cdn.cheanjia.com/dos/weixin/' + version + '/',
    assetsPublicPath: 'https://assets-cdn.cheanjia.com/dos/weixin/common/',
    // assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    replaceList: [{
      pattern: 'replacing_api',
      replaceWith: '/api/v1'
    }, {
      pattern: 'replacing_auth',
      replaceWith: '/auth/weixin'
    }, {
      pattern: 'replacing_env',
      replaceWith: 'production'
    }, {
      pattern: 'replacing_version',
      replaceWith: version
    }]
  },
  test: {
    env: require('./test.env'),
    index: path.resolve(__dirname, '../www/index.html'),
    assetsRoot: path.resolve(__dirname, '../www'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: 'https://assets-cdn.cheanjia.com/zsqy/2.0.4/',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    replaceList: [{
      pattern: 'replacing_api',
      replaceWith: '/api/v1'
    }, {
      pattern: 'replacing_auth',
      replaceWith: '/auth/weixin'
    }]
  },
  dev: {
    env: require('./dev.env'),
    port: 8000,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        path: '/api',
        target: 'https://testzswx.cheanjia.com/',
        // target:'https://test.30ghost.com/',
        changeorigin: true,
        ssl: false,
        headers: {
          cookie: 'csrf-token=1490788127##4f70345ed609ae75367f5068b1aba411c6313277; session=c5348bf9-28ec-46fc-a067-e0c14914f84b',
          host: 'testzswx.cheanjia.com',
          // host: 'test.30ghost.com',
          // referer: 'https://test.30ghost.com',
          // origin: 'https://test.30ghost.com'
          referer: 'https://testzswx.cheanjia.com/',
          origin: 'https://testzswx.cheanjia.com/'
        }
      },
      '/auth': {
        path: '/auth',
        target: 'https://testzswx.cheanjia.com/',
        // target: 'https://test.30ghost.com/',
        changeorigin: true,
        ssl: false,
        headers: {
          cookie: 'csrf-token=1490788127##4f70345ed609ae75367f5068b1aba411c6313277; session=c5348bf9-28ec-46fc-a067-e0c14914f84b',
          host: 'testzswx.cheanjia.com',
          // host: 'test.30ghost.com',
          // referer: 'https://test.30ghost.com',
          // origin: 'https://test.30ghost.com'
          referer: 'https://testzswx.cheanjia.com/',
          origin: 'https://testzswx.cheanjia.com/'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true,
    replaceList: [{
      pattern: 'replacing_api',
      replaceWith: '/api/v1'
    }, {
      pattern: 'replacing_auth',
      replaceWith: '/auth/weixin'
    }, {
      pattern: '\\/\\*\\s*replacing_mock\\s*\\*\\/',
      replaceWith: 'import \'./mock/mock_config\''
    }, {
      pattern: '\\/\\/\\s*replacing_debug',
      replaceWith: 'import \'./debug\''
    }, {
      pattern: 'replacing_env',
      replaceWith: 'develop'
    }]
  }
}
