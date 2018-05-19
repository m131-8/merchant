/**
 * 获取个人信息
 * mock 数据 详情(http://mockjs.com/)
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

Mock.mock(/insures/, 'get' + mockSwitch, {
  code: 0,
  message: '',
  data: {
    mobile: '15914039386',
    companys: [ {
      id: 1,
      name: '中国人民保险集团1'
    }, {
      id: 2,
      name: '中国平安保险集团2'
    }, {
      id: 3,
      name: '中国太平洋保险集团3'
    }, {
      id: 4,
      name: '阳光保险集团4'
    }, {
      id: 5,
      name: '中国平安保险集团5'
    }, {
      id: 6,
      name: '中国太平洋保险集团6'
    }, {
      id: 7,
      name: '阳光保险集团7'
    }, {
      id: 8,
      name: '中国平安保险集团8'
    }, {
      id: 9,
      name: '中国太平洋保险集团9'
    }, {
      id: 10,
      name: '阳光保险集团10'
    } ],
    insures: [ {
      category: '商业险',
      code: 'mb0001',
      id: 10001,
      is_force: false,
      name: '1机动车损失保险',
      properties: null,
      selected_by_default: true
    }, {
      category: '商业险',
      id: 10002,
      is_force: true,
      name: '机动车第三者责任保险',
      properties: {
        coverage_unit: '万',
        coverages: [ '1', '10', '15', '20', '30', '50', '100', '150', '200' ],
        default_coverage: '1',
        select_ndi: true
      },
      selected_by_default: true
    }, {
      category: '商业险',
      code: 'mb0003',
      id: 10003,
      is_force: false,
      name: '机动车全车盗抢保险',
      properties: null,
      selected_by_default: true
    }, {
      category: '商业险',
      code: 'mb0004',
      id: 10004,
      is_force: false,
      name: '车上人员责任保险（驾驶员）',
      properties: {
        coverages: [ '2', '5000', '10000', '20000', '30000', '40000', '50000', '100000', '200000', '500000' ],
        default_coverage: '2',
        select_ndi: true
      },
      selected_by_default: true
    }, {
      category: '商业险',
      code: 'mb0005',
      id: 10005,
      is_force: true,
      name: '车上人员责任保险（乘客）',
      properties: {
        counts: [ 0, 1, 2, 3, 4 ],
        coverages: [ '4', '10000', '20000', '30000', '40000', '50000', '100000', '200000', '500000' ],
        default_coverage: '4',
        unit: '座',
        select_ndi: false
      },
      selected_by_default: true
    }, {
      category: '商业险',
      code: 'ma0006',
      id: 10006,
      is_force: true,
      name: '玻璃单独破碎险',
      properties: {
        default_glass_type: '进口',
        glass_type: [ '国产', '进口' ],
        select_ndi: false
      },
      selected_by_default: false
    }, {
      category: '商业险',
      code: 'ma0007',
      id: 10007,
      is_force: false,
      name: '车身划痕损失险',
      properties: {
        coverages: [ '5000', '10000', '20000' ],
        default_coverage: '10000',
        select_ndi: true
      },
      selected_by_default: false
    }, {
      category: '商业险',
      code: 'ma0008',
      id: 10008,
      is_force: false,
      name: '自然损失险',
      properties: null,
      selected_by_default: false
    }, {
      category: '商业险',
      code: 'ma0009',
      id: 10009,
      is_force: false,
      name: '发动机涉水损失险',
      properties: null,
      selected_by_default: false
    }, {
      category: '商业险',
      code: 'ma0010',
      id: 10010,
      is_force: false,
      name: '机动车损失保险无法找到第三方特约险',
      properties: null,
      selected_by_default: false
    }, {
      category: '商业险',
      code: 'ma0011',
      id: 10011,
      is_force: false,
      name: '指定修理厂险',
      properties: null,
      selected_by_default: false
    }, {
      category: '商业险',
      code: 'ma0012',
      id: 10012,
      is_force: false,
      name: '新增加设备损失险',
      properties: null,
      selected_by_default: false
    }, {
      category: '商业险',
      code: 'ma0013',
      id: 10013,
      is_force: false,
      name: '车上货物责任险',
      properties: null,
      selected_by_default: false
    }, {
      category: '商业险',
      code: 'ma0014',
      id: 10014,
      is_force: false,
      name: '精神损害抚慰金责任险',
      properties: null,
      selected_by_default: false
    }, {
      category: '商业险',
      code: 'ma0015',
      id: 10015,
      is_force: false,
      name: '修理期间费用补偿险',
      properties: null,
      selected_by_default: false
    }, {
      category: '商业险',
      code: 'mc0016',
      id: 10016,
      is_force: false,
      name: '不计免赔险',
      properties: null,
      selected_by_default: false
    }, {
      category: '交强险',
      code: 'cc0017',
      id: 10017,
      is_force: true,
      name: '交强险',
      properties: null,
      selected_by_default: false
    }, {
      category: '车船税',
      code: 'tt0018',
      id: 10018,
      is_force: true,
      name: '车船税',
      properties: null,
      selected_by_default: false
    } ]
  }
})

