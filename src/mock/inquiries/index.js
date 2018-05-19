import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

// 车险特惠 接口地址 /api/v1/{store_id}/is_login
Mock.mock(/\d+\/is-login/, 'get' + mockSwitch, {
  'code': 0,
  'data': {
    'is_login': true
  },
  'message': ''
})

// 续保首页banner
// 接口地址 /v1/store/{store_id}/insures/banners
Mock.mock(/store\/\d+\/insurance\/banners/, 'get' + mockSwitch, {
  'code': 0,
  'message': '消息错误',
  'data': {
    'marketing_banners': [{
      'image_url': 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3695068129,2581467432&fm=26&gp=0.jpg',
      'target_url': 'https://testzsb.cheanjia.com/#/operate/operatesite/edit/:id',
      'title': '标题一'
    }, {
      'image_url': 'https://test-images-cdn.cheanjia.com/image/v1/nmfqiurqlppvszzpolfzckjmunha.jpg',
      'target_url': 'https://testzsb.cheanjia.com/#/operate/operatesite/edit',
      'title': '标题二'
    }]
  }
})
