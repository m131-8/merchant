import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
// mock 开关
let mockSwitch = mock ? '' : '_'

// 预存支付 接口地址 /api/v1/{store_id}/prepay-order-by-staff
Mock.mock(/prepay-order-by-staff\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'data': {
    'amount': 100000,
    'coupons': [{
      'title': '为什么只有抵用券了',
      'type_code': 1,
      'value': 12200
    }],
    'status_code': 3
  },
  'message': 'ok'
})
