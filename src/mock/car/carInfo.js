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

// 获取车品牌  get
// 接口地址  /api/v1/car_models/brands/{car_id}/series?brand_id=100007
Mock.mock(/car_models\/brands/, 'get' + mockSwitch, {
  'brands': {
    'A': [{
      'id': 100000, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100000.jpg', 'name': 'AC Schnitzer'
    },
    {
      'id': 100001, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100001.jpg', 'name': '\u963f\u5c14\u6cd5\u7f57\u5bc6\u6b27'
    },
    {
      'id': 100002, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100002.jpg', 'name': '\u963f\u65af\u987f\u00b7\u9a6c\u4e01'
    },
    {
      'id': 100003, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100003.jpg', 'name': '\u5b89\u51ef\u5ba2\u8f66'
    },
    {
      'id': 100004, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100004.jpg', 'name': '\u5965\u8fea'
    }],
    'HOT': [{
      'id': 100005, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100005.jpg', 'name': '\u5df4\u535a\u65af'
    },
    {
      'id': 100006, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100006.jpg', 'name': '\u5b9d\u9a8f'
    },
    {
      'id': 100007, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100007.jpg', 'name': '\u5b9d\u9a6c'
    },
    {
      'id': 100008, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100008.jpg', 'name': '\u5b9d\u6c83'
    },
    {
      'id': 100009, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100009.jpg', 'name': '\u4fdd\u65f6\u6377'
    },
    {
      'id': 100010, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100010.jpg', 'name': '\u5317\u4eac'
    },
    {
      'id': 100011, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100011.jpg', 'name': '\u5317\u6c7d\u5e7b\u901f'
    },
    {
      'id': 100012, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100012.jpg', 'name': '\u5317\u6c7d\u7ec5\u5b9d'
    },
    {
      'id': 100013, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100013.jpg', 'name': '\u5317\u6c7d\u5a01\u65fa'
    },
    {
      'id': 100014, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100014.jpg', 'name': '\u5317\u6c7d\u65b0\u80fd\u6e90'
    },
    {
      'id': 100015, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100015.jpg', 'name': '\u5317\u6c7d\u5236\u9020'
    },
    {
      'id': 100016, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100016.jpg', 'name': '\u5954\u9a70'
    },
    {
      'id': 100017, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100017.jpg', 'name': '\u5954\u817e'
    },
    {
      'id': 100018, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100018.jpg', 'name': '\u672c\u7530'
    },
    {
      'id': 100019, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100019.jpg', 'name': '\u6bd4\u4e9a\u8fea'
    },
    {
      'id': 100020, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100020.jpg', 'name': '\u6807\u81f4'
    },
    {
      'id': 100021, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100021.jpg', 'name': '\u522b\u514b'
    },
    {
      'id': 100022, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100022.jpg', 'name': '\u5bbe\u5229'
    },
    {
      'id': 100023, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100023.jpg', 'name': '\u5e03\u52a0\u8fea'
    }]
  },
  'code': 0,
  'message': 'ok'
})

// 获取车系  get
// 接口地址  /api/v1/used-car/car_models/brands
Mock.mock(/car_models\/brands\/\d+\/series/, 'get' + mockSwitch, {
  'code': 0,
  'message': '11ok',
  'series': [
    {
      'id': 101273, 'manufacturer': '\u5e7f\u6c7d\u4e2d\u5174', 'name': '\u4e2d\u5174C3'
    },
    {
      'id': 101274, 'manufacturer': '\u5e7f\u6c7d\u4e2d\u5174', 'name': '\u4e2d\u5174GX3'
    },
    {
      'id': 101275, 'manufacturer': '\u4e2d\u5174\u6c7d\u8f66', 'name': '\u5a01\u864eG3'
    },
    {
      'id': 101276, 'manufacturer': '\u4e2d\u5174\u6c7d\u8f66', 'name': '\u5a01\u864eTUV'
    },
    {
      'id': 101277, 'manufacturer': '\u4e2d\u5174\u6c7d\u8f66', 'name': '\u5c0f\u8001\u864e'
    },
    {
      'id': 101278, 'manufacturer': '\u4e2d\u5174\u6c7d\u8f66', 'name': '\u660c\u94c3'
    },
    {
      'id': 101279, 'manufacturer': '\u4e2d\u5174\u6c7d\u8f66', 'name': '\u65d7\u8230A9'
    },
    {
      'id': 101280, 'manufacturer': '\u4e2d\u5174\u6c7d\u8f66', 'name': '\u65e0\u9650V3'
    },
    {
      'id': 101281, 'manufacturer': '\u4e2d\u5174\u6c7d\u8f66', 'name': '\u65e0\u9650V5'
    },
    {
      'id': 101282, 'manufacturer': '\u4e2d\u5174\u6c7d\u8f66', 'name': '\u65e0\u9650V7'
    }]
})

// 获取车款 get
// 接口地址  /api/v1/car_models/series/100055/models
Mock.mock(/^\/api\/v1\/car_models\/series\/\d+\/models$/, 'get' + mockSwitch, {
  'code': 0,
  'message': 'ok',
  'models': [
    {
      'brand': '\u5b9d\u9a6c', 'displacement': '1.5T', 'id': 101092, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100007.jpg', 'manufacturer': '\u5b9d\u9a6c(\u8fdb\u53e3)', 'name': '\u5b9d\u9a6c2\u7cfb 2015\u6b3e 218i', 'series': '\u5b9d\u9a6c2\u7cfb', 'year': 2015
    },
    {
      'brand': '\u5b9d\u9a6c', 'displacement': '2.0T', 'id': 101093, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100007.jpg', 'manufacturer': '\u5b9d\u9a6c(\u8fdb\u53e3)', 'name': '\u5b9d\u9a6c2\u7cfb 2014\u6b3e 220i \u9886\u5148\u578b', 'series': '\u5b9d\u9a6c2\u7cfb', 'year': 2014
    },
    {
      'brand': '\u5b9d\u9a6c', 'displacement': '2.0T', 'id': 101094, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100007.jpg', 'manufacturer': '\u5b9d\u9a6c(\u8fdb\u53e3)', 'name': '\u5b9d\u9a6c2\u7cfb 2014\u6b3e 220i \u8fd0\u52a8\u8bbe\u8ba1\u5957\u88c5', 'series': '\u5b9d\u9a6c2\u7cfb', 'year': 2014
    },
    {
      'brand': '\u5b9d\u9a6c', 'displacement': '3.0T', 'id': 101095, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100007.jpg', 'manufacturer': '\u5b9d\u9a6c(\u8fdb\u53e3)', 'name': '\u5b9d\u9a6c2\u7cfb 2014\u6b3e M235i', 'series': '\u5b9d\u9a6c2\u7cfb', 'year': 2014
    },
    {
      'brand': '\u5b9d\u9a6c', 'displacement': '1.5T', 'id': 101096, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100007.jpg', 'manufacturer': '\u5b9d\u9a6c(\u8fdb\u53e3)', 'name': '\u5b9d\u9a6c2\u7cfb 2015\u6b3e 218i \u655e\u7bf7\u8f7f\u8dd1\u8f66', 'series': '\u5b9d\u9a6c2\u7cfb', 'year': 2015
    },
    {
      'brand': '\u5b9d\u9a6c', 'displacement': '2.0T', 'id': 101097, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100007.jpg', 'manufacturer': '\u5b9d\u9a6c(\u8fdb\u53e3)', 'name': '\u5b9d\u9a6c2\u7cfb 2015\u6b3e 220i \u655e\u7bf7\u8f7f\u8dd1\u8f66 \u9886\u5148\u578b', 'series': '\u5b9d\u9a6c2\u7cfb', 'year': 2015
    },
    {
      'brand': '\u5b9d\u9a6c', 'displacement': '2.0T', 'id': 101098, 'image_url': 'https://assets-cdn.cheanjia.com/public/auto-logos/1.0.0/logo_100007.jpg', 'manufacturer': '\u5b9d\u9a6c(\u8fdb\u53e3)', 'name': '\u5b9d\u9a6c2\u7cfb 2015\u6b3e 220i \u655e\u7bf7\u8f7f\u8dd1\u8f66 M\u8fd0\u52a8\u578b', 'series': '\u5b9d\u9a6c2\u7cfb', 'year': 2015
    }]
})

