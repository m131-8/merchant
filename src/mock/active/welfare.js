// 车主福利接口
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
// mock 开关
let mockSwitch = mock ? '' : '_'

Mock.mock(/activity\/store_info\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': 'ok',
  'data': {
    'logo': 'https://assets-cdn.cheanjia.com/zswx/1.0.2/images/guanlan_zs_lexus_logo.jpeg',
    'qrcode': 'https://testzsadmin.cheanjia.com/static/images/qrcode_for_ddycy.jpg',
    'store_name': '深圳南山大冲测试雷克萨斯',
    'wechat_number': '123456'
  }
})
