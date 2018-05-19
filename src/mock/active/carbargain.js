// 车主福利接口
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

// 获取砍价活动 首页   get
// 接口地址 /api/v1/activity/car-bargain-activity/{int:activity_id}
Mock.mock(/activity\/car-bargain-activity\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'id': 1,
    'status': 2, // 活动状态,1：未开始，2：进行中，3：已结束，4：已删除
    'already_initiate': 0, // 1:已经发起过，0：还没有发起过
    'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
    'openid': '1112',
    'store_id': 123,
    'wechat_name': '莫雨01' // 微信名称
  }
})

// 获取砍价信息 转发成功后结果页面 get
// 接口地址 /api/v1/activity/car-bargain/{openid}/{int:activity_id}
Mock.mock(/activity\/car-bargain\/\d+\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'bargain': {
      'id': 1, // 发起活动 car_style_id
      'status': 2, // 活动状态,1：未开始，2：进行中，3：已结束，4：已删除
      'have_convert_coupon': 0, // 1:已经兑换，0：未兑换
      'car_image_url': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg', // 商品图片
      'expires_at': '2017-12-12 22:30:00', // 活动截止时间
      'car_name': '雷克萨斯XS',
      'amount': 565650 // 总金额

    },
    'initiator': { // 发起人的信息
      'id': 1,
      'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
      'wechat_name': '莫雨' // 发起人的微信名字
    },
    'bargain_details': [ // 排行榜信息
      {
        'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
        'wechat_name': '莫雨01', // 好友微信名称
        'amount': 540 // 好友砍价金额
      }, {
        'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
        'wechat_name': '莫雨01', // 好友微信名称
        'amount': 540 // 好友砍价金额
      }, {
        'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
        'wechat_name': '莫雨01', // 好友微信名称
        'amount': 540 // 好友砍价金额
      }, {
        'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
        'wechat_name': '莫雨01', // 好友微信名称
        'amount': 540 // 好友砍价金额
      }
    ],
    'current_user_bargain_amount': 0, // 当前用户砍的金额
    'openid': '1111', // 好友用户openid
    'store_name': '观澜中升雷克萨斯' // 可能不用了
  }
})
// 获取车系  get
// 接口地址 /api/v1/activity/car-bargain-car-series/{int:activity_id}
Mock.mock(/activity\/car-bargain-car-series\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'brand': '雷克萨斯',
    'car_series': {
      1: '雷克萨斯E1', // key为id，value为车系名字
      2: '雷克萨斯E2',
      3: '雷克萨斯E3',
      4: '雷克萨斯E4',
      5: '雷克萨斯E5',
      6: '雷克萨斯E6'
    }
  }
})
// 获取车型  get
// 接口地址 /api/v1/activity/car-bargain-car-models/{int:activity_id}/{int:car_series_id}
Mock.mock(/activity\/car-bargain-car-models\/\d+\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'car_series_name': '雷克萨斯ES',
    'car_models': [{
      'id': 1,
      'name': '雷克萨斯XS1',
      'image_url': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg'
    }, {
      'id': 2,
      'name': '雷克萨斯XS2',
      'image_url': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg'
    }, {
      'id': 3,
      'name': '雷克萨斯XS3',
      'image_url': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg'
    }, {
      'id': 4,
      'name': '雷克萨斯XS4',
      'image_url': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg'
    }, {
      'id': 5,
      'name': '雷克萨斯XS5',
      'image_url': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg'
    }, {
      'id': 6,
      'name': '雷克萨斯XS6',
      'image_url': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg'
    }]
  }
})
// 兑换优惠卷  post
// 接口地址 /api/v1/activity/convert-car-bargain-coupon/{int:bargain_id}
Mock.mock(/activity\/convert-car-bargain-coupon\/\d+/, 'post' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': null
})

// 温柔一刀砍价  post
// 接口地址 /api/v1/activity/car-bargaining/{int:bargain_id}
Mock.mock(/activity\/car-bargaining\/\d+/, 'post' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'amount': 1230,
    'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
    'wechat_name': '莫雨77'
  }
})

// 发起砍价活动（转发成功后的请求）  post
// 接口地址    /api/v1/activity/initiate-car-bargain/{int:activity_id}/{int:car_id}
Mock.mock(/activity\/initiate-car-bargain\/\d+\/\d+/, 'post' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': null
})

// 查看优惠券详情   get
// 接口地址 /api/v1/activity/car-bargain-coupon/{int:bargain_id}
Mock.mock(/activity\/car-bargain-coupon\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'status': 1, // 优惠券状态,1：已兑换，2：已使用，3：已过期
    'face_value': 250, // 面值
    'coupon_code': '223322456', // 券码
    'expires_at': '2017-06-27 17:14:00', // 优惠券过期时间
    'note': '热热个人个人各↵二个人个人个人股↵二个人个人个', // 使用规则
    'activity_name': 'gerger个如果个人'
  }
})

// 获取二维码   get
// 接口地址 /api/v1/activity/store_info/{int:store_id}
Mock.mock(/activity\/store_info\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'store_name': '深圳观澜中升雷克萨斯', // 店名
    'wechat_number': 'ssggxx22', // 微信号
    'qrcode': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg' // 二维码
  }
})
