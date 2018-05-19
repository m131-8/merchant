// 集客报名接口

import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
// mock 开关
let mockSwitch = mock ? '' : '_'

Mock.mock(/activity\/attraction\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': 'ok',
  'data': {
    'enrollment': null,
    'activity': {
      'address': '深圳市南山区大冲商务中心c座1803',
      'contact_number': '13602875783',
      'cover_image_url': 'http://img1.imgtn.bdimg.com/it/u=4075700132,2708783571&fm=21&gp=0.jpg',
      'deposit_amount': 1,
      'deposit_note': '品质保证',
      'description': '<p>中升集团专注于经营豪华和中高档品牌组合，包括梅赛德斯─奔驰、雷克萨斯及奥迪等豪华汽车品牌，以及丰田、日产及本田等中高档汽车品牌。中升集团是中国首家获得丰田经销权的经销商，以及中国最早获雷克萨斯及奥迪经销代理权的公司之一。</p><p><img title="image/AbnyArE5Er7nYtkW5nBsJ9.jpg" alt="55e736d12f2eb938805f29a3d7628535e5dd6fb4.jpg" src="https://test-images-cdn.cheanjia.com/image/AbnyArE5Er7nYtkW5nBsJ9.jpg"/></p>',
      'enroll_deadline': '2017-06-18 14:57:20',
      'id': 15,
      'latitude': 22.54075,
      'longitude': 113.95254,
      'need_deposit': true,
      'num_enrolled': 2,
      'start_time': '2017-03-31 19:03:03',
      'status': 'enrolling',
      'store': {
        'id': 9,
        'logo': 'https://assets-cdn.cheanjia.com/zswx/1.0.2/images/guanlan_zs_lexus_logo.jpeg',
        'name': '深圳南山大冲测试雷克萨斯'
      },
      'title': 'saidzhu-test3'
    }
  }
})

Mock.mock(/\d+\/config\/weixin/, 'get' + mockSwitch, {
  'code': 0,
  'message': 'ok',
  'data': {
    'appId': 'wx87a4a4dceeb4cd12',
    'jsApiList': [],
    'nonceStr': 'zlZGamuzeQuTQddmwuHkFVQzQDwKDloE',
    'signature': '51469c009e0ea25816b05e2910e9078419b17102',
    'timestamp': '1489489343'
  }
})

// 报名支付接口
Mock.mock(/activity\/attraction\/\d+/, 'post' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'id': 1,
    'status': 'status_code',
    'payment_param': {
      'appId': 'APP_ID',
      'timestamp': 'timestamp',
      'nonceStr': 'nonceStr',
      'package': 'prepay_id=prepay_id',
      'signType': 'MD5',
      'paySign': 'paySign'
    }
  }
})
