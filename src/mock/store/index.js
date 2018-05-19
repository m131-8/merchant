/**
 * 中升服务号4s店首页
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
// mock 开关
let mockSwitch = mock ? '' : '_'

// 中升2.0首页--4s店信息
// images的object中的sequence表示图片顺序
Mock.mock(/kamostore111/, 'get' + mockSwitch, {
  'code': 0,
  'data': {
    'address': '高新园',
    'city': '深圳市',
    'city_code': '440300',
    'contact_number': '13855556666',
    'description': '2018测试店',
    'district': '南山区',
    'district_code': '440305',
    'id': 199,
    'images': [{
      'sequence': 1,
      'url': 'https://test-images-cdn.cheanjia.com/zhongsheng/image/v1/rnayhllukofekebffmevblzesjib.png'
    },
    {
      'sequence': 2,
      'url': 'https://test-images-cdn.cheanjia.com/zhongsheng/image/v1/fdnydcinidhsalxungbqkvlskzua.jpg'
    },
    {
      'sequence': 3,
      'url': 'https://test-images-cdn.cheanjia.com/zhongsheng/image/v1/vagzjnrsndixctjvuyayhprnhwia.jpg'
    }
    ],
    'latitude': 22.540243,
    'logo': 'https://test-images-cdn.cheanjia.com/zhongsheng/image/v1/hfodjrdlmthtmtokzdylbnrlumya.jpg',
    'longitude': 113.953955,
    'marketing_banners': [],
    'name': '中升测试环境店',
    'province': '广东省',
    'province_code': '440000'
  },
  'message': 'ok'
})
