/**
 * 优惠券
 * mock 数据 详情(http://mockjs.com/)
 */
import Mock from 'mockjs'
import cache from '../../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

  // 我的优惠卷 接口地址 /api/v1/store_id/my-coupons
Mock.mock(/\d+\/my-coupons/, 'get' + mockSwitch, {
  code: 0,
  message: 'ok',
  data: {
    coupons: [{
      id: '11111',
      type_code: 1,
      shop_name: '店名',
      title: '优惠券显示名称',
      description: '价值100元/免费洗车一次',
      valid_from: '2014-03-02',
      valid_to: '2015-03-02',
      plate_number: '车牌号',
      value: null,
      status_code: 1 // 1: '已发放', # not consumed yet,2: '已使用',3: '已过期',
    }, {
      id: '22222',
      type_code: 2,
      shop_name: '店名',
      title: '优惠券显示名称',
      description: '价值100元/免费洗车一次',
      valid_from: '2014-03-02',
      valid_to: '2015-03-02',
      plate_number: '车牌号',
      value: 2000,
      status_code: 3
    }, {
      id: '33333',
      type_code: 3,
      shop_name: '店名',
      title: '优惠券显示名称',
      description: '价值100元/免费洗车一次',
      valid_from: '2014-03-02',
      valid_to: '2015-03-02',
      plate_number: '车牌号',
      value: 2000,
      status_code: 2
    }, {
      id: '4444',
      type_code: 4,
      shop_name: '店名',
      title: '优惠券显示名称',
      description: '价值100元/免费洗车一次',
      valid_from: '2014-03-02',
      valid_to: '2015-03-02',
      plate_number: '车牌号',
      value: null,
      status_code: 1
    }]
  }
})

// 优惠卷详情 接口地址 接口地址 /api/v1/coupon-detail/{coupon_type_id}/{id (优惠券id)}
Mock.mock(/coupon-detail\/\d+\/\d+/, 'get' + mockSwitch, {
  code: 0,
  message: 'ok',
  data: {
    logo_url: 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
    title: '保养抵用券/免费券',
    description: '热热个人个人各↵二个人个人个人股↵二个人个人个',
    valid_from: '2014-03-02', // 开始时间
    valid_to: '2015-03-02', // 结束时间
    plate_number: '4454545',
    code: '151515151',
    qrcode_url: 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
    shop_name: '店名',
    shop_address: '店地址',
    shop_image_url: 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
    note: '使用说明',
    type_code: 3,       // 意义同我的优惠券
    status_code: 1,   // 意义同我的优惠券
    value: 2225,
    write_off_at: '2014-03-02' // 核销时间
  }
})

