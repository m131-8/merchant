/**
 * 摇一摇游戏
 * http://mockjs.com/
    接口： https://testzswx.cheanjia.com/?store_id=9&shake_game_activity_id=1#game_login
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

// 活动详情 01
/* Mock.mock(/activity\/shake_game\/1$/,{
  code: 0,
  message: '',
  data: {
      activity: {
          id: 1,
          status: 'waiting',
          game: 1
      },
      enrollment: {
          is_enrolled: false,
          id: 1,
          contact_name: '黄少华',
          contact_number: '13811111111',
          finished_at: '2016-11-08 12:00:00',
          shake_count: 1000,
          ranking: 1
      },
      rankings: [
          {
              ranking: 1,
              contact_name: '郑先生',
              contact_mobile: '138****1111'
          }
      ]
  }
}); */

// 活动详情 02
Mock.mock(/activity\/shake_game\/\d+/, 'get' + mockSwitch, {
  code: 0,
  message: '',
  data: {
    activity: {
      id: 1,
      status: 'begin',
      // status: 'ongoing',
      // status: 'waiting',
      // status: 'finished',
      game: 1
    },
    enrollment: {
      is_enrolled: true,
      id: 1,
      contact_name: '黄少华',
      contact_number: '13811111111',
      finished_at: '2016-11-08 12:00:00',
      shake_count: 1000,
      ranking: 1
    },
    rankings: [{
      ranking: 1,
      contact_name: '郑先生01',
      contact_number: '138****1111'
    }, {
      ranking: 2,
      contact_name: '郑先生02',
      contact_number: '138****1111'
    }, {
      ranking: 3,
      contact_name: '郑先生03',
      contact_number: '138****1111'
    }]
  }
})

// 登录
Mock.mock(/activity\/shake_game\/\d+/, 'post' + mockSwitch, {
  code: 0,
  message: 'gerre',
  data: {}
})

// 发送次数
Mock.mock(/activity\/shake_game\/\d+\/record/, 'post' + mockSwitch, {
  code: 0,
  message: 'eeeee',
  data: {}
})

