/**
 * 获取个人信息
 * mock 数据 详情(http://mockjs.com/)
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

Mock.mock(/my\/profile/, 'get' + mockSwitch, {
  code: 0,
  message: '',
  data: {
    id: 1,
    // avatar: Mock.Random.dataImage('54x54'),
    avatar: 'http://img4.imgtn.bdimg.com/it/u=3777983027,912569445&fm=23&gp=0.jpg',
    nick_name: '微信昵称',
    name: '@ctitle',
    mobile_number: '13811111111',
    province: '@province',
    province_code: '430000',
    city: '@city',
    city_code: '430400',
    district: '@county',
    district_code: '430407',
    address: '@ctitle',
    service_consultant: {
      id: 1,
      name: '杨永康',
      avatar: 'http://img4.imgtn.bdimg.com/it/u=3777983027,912569445&fm=23&gp=0.jpg',
      mobile_number: '13811111111'
    },
    insurance_consultant: {
      id: 1,
      name: '微微',
      avatar: 'http://img4.imgtn.bdimg.com/it/u=3777983027,912569445&fm=23&gp=0.jpg',
      mobile_number: '13811111111'
    }
  }
})

