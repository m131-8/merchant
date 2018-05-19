/**
 * 养修预约页面
 * mock 数据 详情(http://mockjs.com/)
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

// 养修预约--获取最后一次预约信息
// is_default表示是否默认选中此服务顾问
Mock.mock(/my\/service_bookings\/last_booking/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    // 'default_service_consultant': null,
    'default_service_consultant': {
      'avatar': 'http://shp.qpic.cn/bizmp/PgZohMnicpGwZ0bdyicnovfwMLQgIibib1dFCaK0X3JeVwbPvPbict5R2RA/',
      'id': 10011,
      'mobile_number': '18510247712',
      'name': '莫雨222'
    },
    'last_booking': {
      'id': 1,
      'status': 'status_code',
      'service': {
        'id': 1,
        'name': '服务项目',
        'logo_url': Mock.Random.dataImage('88x88'),
        'code': 'code'
      },
      'plate_number': '粤B12345',
      'mileage': 500,
      'contact_name': '陈一陈',
      'contact_number': '13811111111',
      'service_consultant': {
        'avatar': 'http://shp.qpic.cn/bizmp/PgZohMnicpGwZ0bdyicnovfwMLQgIibib1dFCaK0X3JeVwbPvPbict5R2RA/',
        'id': 10011,
        'mobile_number': '18510247712',
        'name': '莫雨33'
      },
      // 'service_consultant': null,
      'appointed_time': '2017-04-03 02:51' || Mock.Random.datetime('2017-04-03 HH:mm'),
      'canceled_at': Mock.Random.datetime('2017-04-03 HH:mm:ss'),
      'fulfilled_at': Mock.Random.datetime('2017-04-03 HH:mm:ss'),
      'created_at': Mock.Random.datetime('2017-04-03 HH:mm:ss')
    }
  }
})

// 养修预约--获取服务列表
Mock.mock(/store\/services/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'services|4': [{
      'id|+1': 1,
      'name': '保养维修@Integer(1,10)',
      'logo_url': Mock.Random.dataImage('88x88'),
      'code': 'code'
    }]
  }
})

// 养修预约--获取顾问列表
Mock.mock(/store\/service_consultants/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'service_consultants': [{
      'id': 1,
      'name': '黄某某',
      'avatar': Mock.Random.dataImage('88x88'),
      'is_default': true
    }, {
      'id': 2,
      'name': '朱某某',
      'avatar': Mock.Random.dataImage('88x88'),
      'is_default': false
    }, {
      'id': 3,
      'name': '朱某某',
      'avatar': Mock.Random.dataImage('88x88'),
      'is_default': false
    }]
  }
})

// 养修预约--获取顾问列表
Mock.mock(/store\/service_booking/, 'post' + mockSwitch, {
  'code': 0,
  'message': '预约成功',
  'data': {
    'booking': {
      'id': 1,
      'status': 'pending_fulfillment'
    }
  }
})

