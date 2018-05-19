//  商品砍价
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  //  mock 开关
let mockSwitch = mock ? '' : '_'

// 获取砍价活动 首页   get
//  接口地址  /api/v1/activity/wares-bargain-activity/{int:activity_id}
Mock.mock(/activity\/wares-bargain-activity\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'id': 1,
    'status': 2, // 活动状态,1：未开始，2：进行中，3：已结束，4：已删除
    'value': 25000, // 商品价值
    'wares_image_url': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg', // 商品图片
    'expires_at': '2017-12-29 22:30:00', // 活动截止时间
    'description': '<div class="con">各个人工二个人</div>', // 商品详情
    //  'already_initiate':1,  // 1:已经发起过
    'already_initiate': 0, // 0:还没有发起过
    'openid': '1112', // 用户openid
    'store_id': 123,
    'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg', // 微信头像
    'wechat_name': '莫雨01' // 微信名称
  }
})

// 获取砍价信息 转发成功后结果页面 get
// 接口地址 /api/v1/activity/wares-bargain/{openid}/{int:activity_id}
Mock.mock(/activity\/wares-bargain\/\d+\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'bargain': {
      'id': 12, // 发起活动bargain_id
      'status': 1, // 发起人活动状态,1：进行中，2：已结束
      //  'status': 2,  // 发起人活动状态,1：进行中，2：已结束
      'have_convert_coupon': 0, // 1:已经兑换，0：未兑换
      'value': 2600000, // 商品价值
      'wares_image_url': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg', // 商品图片
      'expires_at': '2017-12-28 10:15:00', // 活动截止时间
      'description': '<div>咯咯咯咯咯fwfwefwefwe</div>', // 商品详情
      'amount': 560000 // 总金额

    },
    'initiator': { // 发起人的信息
      'id': 1,
      'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg', // 微信头像
      'wechat_name': '莫雨' // 发起人的微信名字
    },
    'bargain_details': [ // 排行榜信息
      {
        'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg', // 好友微信头像
        'wechat_name': '莫雨01', // 好友微信名称
        'amount': 545 // 好友砍价金额
      }, {
        'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg', // 好友微信头像
        'wechat_name': '莫雨01', // 好友微信名称
        'amount': 545 // 好友砍价金额
      }, {
        'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg', // 好友微信头像
        'wechat_name': '莫雨01', // 好友微信名称
        'amount': 545 // 好友砍价金额
      }, {
        'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg', // 好友微信头像
        'wechat_name': '莫雨01', // 好友微信名称
        'amount': 545 // 好友砍价金额
      }
    ],
    'store_name': '观澜中升雷克萨斯', // 店名
    'current_user_bargain_amount': 0, // 当前用户砍的金额
    'openid': '1112' // 好友用户openid
  }
})

// 兑换优惠卷  post
//  接口地址 /api/v1/activity/convert-wares-bargain-coupon/{int:bargain_id}
Mock.mock(/activity\/convert-wares-bargain-coupon\/\d+/, 'post' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': null
})

// 温柔一刀砍价  post
//  接口地址 /api/v1/activity/wares-bargaining/{int:bargain_id}
Mock.mock(/activity\/wares-bargaining\/\d+/, 'post' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'amount': 1670,
    'avatar': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
    'wechat_name': '莫雨77'
  }
})

// 发起砍价活动（转发成功后的请求）  post
// 接口地址    /api/v1/activity/initiate-wares-bargain/{int:activity_id}
Mock.mock(/activity\/initiate-wares-bargain\/\d+/, 'post' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': null
})

// 查看优惠券详情   get
//  接口地址 /api/v1/activity/wares-bargain-coupon/{int:bargain_id}
Mock.mock(/activity\/wares-bargain-coupon\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'status': 1, // 优惠券状态,1：已兑换，2：已使用，3：已过期
    'face_value': 260, // 面值
    'coupon_code': '223322456', // 券码
    'expires_at': '2017-6-12 17:14:00', // 优惠券过期时间
    'note': '只能星期一用', // 使用规则
    'activity_name': '厄尔个如果个人'
  }
})
