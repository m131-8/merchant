import Mock from 'mockjs'
import cache from '../../common/cache'

// mock开关
let mock = cache.getSessionData('mock')
let mockSwitch = mock === 1 ? '' : '_'

// 网站定制接口
Mock.mock(/store_config/, 'get' + mockSwitch, {
  'code': 0,
  'data': {
    'env': 'test',
    'group_config': {
      'group_id': 999,
      'group_name': '中升集团',
      'identifier': 'zhongsheng',
      'is_zs_group': true,
      'msg_signature': '中升集团',
      'short_name': ''
    },
    'store_config': {
      'access_from_subdomain': true,
      'is_dos_domain_enabled': true,
      'is_from_dos_domain': true,
      'is_from_zs_domain': false,
      'is_zs_domain_enabled': false,
      'is_zs_store': true,
      'open_enabled': true,
      'store_id': 199,
      'store_name': '中升测试环境店',
      'subdomain': 'wx87a4a4dceeb4cd12'
    }
  },
  'message': 'OK'
})
