/**
 * 获取个人信息
 * mock 数据 详情(http://mockjs.com/)
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

// 预存保费 接口地址 /api/v1/{store_id}/prestore_coupon_rule
Mock.mock(/\d+\/prestore_coupon_rule/, 'get' + mockSwitch, {
  'code': 0,
  'message': 'ok',
  'data': {
    'amount': 10000,
    'mobile': '15914039385',
    'offer_number': 2,
    'coupons': [{
      'description': '<p>的萨达撒地方<br/></p><p>223</p><p>343</p><p>的说法是</p><p>萨芬的</p>',
      'title': '很好很强大大声',
      'type_code': 1,
      'value': 13200
    }, {
      'description': '<p>的萨达撒地方<br/></p><p>223</p><p>343</p><p>的说法是</p><p>萨芬的</p>',
      'title': '更热狗让哥哥声',
      'type_code': 1,
      'value': null
    }, {
      'description': '<p>的萨达撒地方<br/></p><p>223</p><p>343</p><p>的说法是</p><p>萨芬的</p>',
      'title': '更二哥二哥',
      'type_code': 2,
      'value': 14400
    }]
  }
})
