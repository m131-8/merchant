/**
 * 二手车列表
 * http://mockjs.com/
url： https://testzsqy.cheanjia.com/?mock=1#/sms/4
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
// mock 开关
let mockSwitch = mock ? '' : '_'

// 通过vin获取精真估车型列表
// 接口地址  /api/v1/{vin}/car_models
Mock.mock(/WDBGP57B6PB127811\/car_models/, 'get' + mockSwitch, {
  'code': 0,
  'message': 'ok',
  'data': {
    'models': [ // # 可能为一个 [] 空
      {
        'id|+2': 1, // # jzg车型id
        'model_name': '\u5317\u6c7d\u65b0\u80fd\u6e90\u963f\u65af\u987f\u00b7\u9a6c\u4e01',
        'brand_name': '品牌名称',
        'series_name': '车系名称'
      }
    ]
  }
})
Mock.mock(/WDBGP57B6PB127810\/car_models/, 'get' + mockSwitch, {
  'code': 0,
  'message': 'ok',
  'data': {
    'models|25': [ // # 可能为一个 [] 空
      {
        'id|+2': 1, // # jzg车型id
        'model_name': '\u963f\u65af\u987f\u00b7\u9a6c\u4e01\u5317\u6c7d\u65b0\u80fd\u6e90\u963f\u65af\u987f\u00b7\u963f\u65af\u987f\u00b7\u9a6c\u4e01\u5317\u6c7d\u65b0\u80fd\u6e90\u963f\u65af\u987f\u00b7',
        'brand_name': '品牌名称',
        'series_name': '车系名称'
      }
    ]
  }
})

// 根据型号,获取车型信息  get
// 接口地址  /api/v1//api/v1/model-detail/118530/118530
Mock.mock(/model-detail\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'data': {
    'brand_logo_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100007.jpg',
    'brand_name': '\u5b9d\u9a6c',
    'model_name': '\u5b9d\u9a6c3\u7cfb(\u8fdb\u53e3) 2015\u6b3e ActiveHybrid 3',
    'series_name': '\u5b9d\u9a6c3\u7cfb(\u8fdb\u53e3)'
  },
  'message': 'ok'
})

// 接口地址  /api/v1/zs-used-car/submit-used-car
Mock.mock(/zs-used-car\/submit-used-car/, 'post' + mockSwitch, {
  'code': 0,
  'data': {},
  'message': 'ok'
})

// 接口地址  /api/v1/{store_id}/verify_code/{moblie}
Mock.mock(/\d+\/verify_code\/\d+/, 'post' + mockSwitch, {
  'code': 0,
  'data': {},
  'message': 'ok'
})

