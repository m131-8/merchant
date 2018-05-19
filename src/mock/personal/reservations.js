/**
 * 获取预约列表
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

Mock.mock(/my\/service_bookings$/, 'get' + mockSwitch, {
  code: 0,
  message: '',
  data: {
    total_count: 3,
    'bookings|3': [{
      'id|+1': 1,
      status: /pending_fulfillment|canceled|fulfilled/,
      service: {
        id: 3256656,
        name: '保养维修',
        logo_url: Mock.Random.dataImage('55x55'),
        code: '1'
      },
      plate_number: '粤B12345',
      service_consultant: {
        id: 1,
        name: '黄某某',
        mobile_number: '13811111111',
        avatar: Mock.Random.dataImage('55x55')
      },
      appointed_time: '2016-12-01 13:00:22', // 预约时间
      canceled_at: '2016-12-04 13:00:22', // 取消时间
      fulfilled_at: '2016-12-03 13:00:22', // 到达时间
      created_at: '2016-12-02 13:00:22' // 提交时间
    }]
  }
})

// 取消预约
Mock.mock(/my\/service_bookings\/\d+$/, 'delete' + mockSwitch, {
  code: 0,
  message: '',
  data: {}
})
