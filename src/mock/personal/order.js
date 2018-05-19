/**
 * 获取个人信息
 * mock 数据 详情(http://mockjs.com/)
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

// 预存保费单 接口地址 /api/v1/{store_id}/my-prepays
Mock.mock(/\d+\/my-prepays/, 'get' + mockSwitch, {
  'code': 0,
  'message': 'ok',
  'data': {
    'prepays': [{
      'plate_number': 15151551,
      'contact_name': '莫雨',
      'mobile': 15914039385,
      'amount': 15500,
      'time': '2017-01-02'
    }, {
      'plate_number': 15151551,
      'contact_name': '莫雨02',
      'mobile': 15914039385,
      'amount': 15500,
      'time': '2017-01-02'
    }]
  }
})
