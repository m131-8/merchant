/**
 * 获取预约详情
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'
Mock.mock(/my\/service_bookings\/\d+/, 'get' + mockSwitch, {
  code: 0,
  message: '',
  data: {
    id: 5,
    status: 'pending_fulfillment',
    service: {
      id: 34534534,
      name: '保养维修',
      logo_url: 'https://logo_url',
      code: 'code'
    },
    plate_number: '粤B12345',
    mileage: 500,
    contact_name: '陈一陈',
    contact_number: '13811111111',
    remark: 'dafafaaaaaaaaaaaaageggergerregergergergergergergergergerge',
    service_consultant: {
      id: 1,
      name: '黄某某',
      mobile_number: '13811111111',
      avatar: 'http://img4.imgtn.bdimg.com/it/u=3777983027,912569445&fm=23&gp=0.jpg'
    },
    appointed_time: '2016-12-01 13:00:22', // 预约时间
    canceled_at: '2016-12-04 13:00:22', // 取消时间
    fulfilled_at: '2016-12-03 13:00:22', // 到达时间
    created_at: '2016-12-02 13:00:22' // 提交时间
  }
})
