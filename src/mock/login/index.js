// 登录页接口

import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

// 获取验证码 接口地址 /api/v1/{store_id}/vefiry_code/mobile_number
Mock.mock(/\d+\/verify_code\/\d+/, 'post' + mockSwitch, {
  'code': 0,
  'message': 'ok'
})

// 登录接口 接口地址 /api/v1/{store_id}/mobile-login
Mock.mock(/\d+\/mobile-login/, 'post' + mockSwitch, {
  'code': 0,
  'message': 'ok'
})
