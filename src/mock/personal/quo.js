/**
 * 续保单
 * mock 数据 详情(http://mockjs.com/)
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

// 个人中心-续保单
Mock.mock(/\d+\/my-ins-query-offer/, 'get' + mockSwitch, {
  code: 0,
  data: {
    querys: [{
      id: '111',
      created_time: '2017-03-08',
      status_code: 1,
      plate_number: '车牌号111',
      car_description: '车牌描述11111',
      total_price: 12
    }, {
      id: '112',
      created_time: '2017-03-09',
      status_code: 2,
      plate_number: '车牌号112',
      car_description: '车牌描述111222',
      total_price: 22
    }],
    offers: [{
      id: '222',
      created_time: '2015-03-02',
      status_code: 2,
      plate_number: '车牌号222',
      car_description: '车牌描述22222',
      total_price: 23
    }]
  },
  message: 'ok'
})
// 续保单-续保报价
Mock.mock(/ins-inquiry\/\d+/, 'get' + mockSwitch, {
  code: 0,
  data: {
    same_with_last_year: true,
    company_name: '公司名1',
    sales_mobile: '15818843599',
    user_name: '莫雨',
    mobile: '1555555555',
    plate_number: '粤BJ3Y23',
    insures: [{
      id: '111',
      code: 'mb0005',
      name: '车上人员责任保险（乘客）',
      price: null,
      properties: {
        count: 1,
        coverage: '5000',
        unit: '座'
      }
    }, {
      id: '222',
      code: 'zz0019',
      name: '玻璃增值服务',
      price: null,
      properties: {
        glass_type: '国产'
      }
    }, {
      id: '333',
      code: 'mb0002',
      name: '机动车第三者责任保险',
      price: null,
      properties: {
        coverage: '5',
        coverage_unit: '万'
      }
    }]
  },
  message: 'ok'
})
// 续保方案-支付
Mock.mock(/ins-offer\/\d+/, 'get' + mockSwitch, {
  code: 0,
  data: {
    brand_logo_url: 'https://assets-cdn.cheanjia.com/public/images/zs/default_car.png',
    company_name: '中华联合财产保险',
    coupons: [{
      description: '<p>fdsa<br/></p>',
      num: 1,
      title: '全车打蜡',
      type_code: 1,
      value: 155555
    }, {
      description: '<p>fds</p>',
      num: 1,
      title: '镀晶',
      type_code: 2,
      value: 130000
    }],
    paid: 0,
    insurance_effected_on: '2016.11.28',
    insurance_expires_on: '2017.05.31',
    insures: [{
      category_code: 'commercial',
      items: [{
        category: '商业险',
        category_code: 'commercial',
        code: 'mb0001',
        name: '机动车损失保险',
        price: null,
        properties: {
          coverage: '32'
        }
      }, {
        category: '商业险',
        category_code: 'commercial',
        code: 'mb0002',
        name: '机动车第三者责任保险',
        price: null,
        properties: {
          coverage: '5',
          coverage_unit: '万'
        }
      }, {
        category: '商业险',
        category_code: 'commercial',
        code: 'mb0003',
        name: '机动车全车盗抢保险',
        price: null,
        properties: {
          coverage: '543'
        }
      }, {
        category: '商业险',
        category_code: 'commercial',
        code: 'mb0005',
        name: '车上人员责任保险（乘客）',
        price: null,
        properties: {
          count: 1,
          coverage: '5000',
          unit: '座'
        }
      }, {
        category: '自营',
        category_code: 'proprietary_trading',
        code: 'zz0019',
        name: '玻璃增值服务',
        price: null,
        properties: {
          glass_type: '国产'
        }
      }],
      name: '商业险',
      price: 654500
    }, {
      category: '车船税',
      category_code: 'tax',
      code: 'tt0018',
      name: '车船税',
      price: 20000,
      properties: null
    }, {
      category: '交强险',
      category_code: 'compulsory',
      code: 'cc0017',
      name: '交强险',
      price: 10000,
      properties: null
    }],
    model_desc: 'LS460',
    offerer_mobile: '15818758029',
    plate_number: '粤BJ3Y23',
    custom_message: '<p>afdasdf我是谁123444</p><p>afdasdf我是谁123444</p><p>afdasdf我是谁123444</p><p>afdasdf我是谁123444</p><p>afdasdf我是谁123444</p><p>afdasdf我是谁123444</p><p>我是谁dddddddddddddddddddddddddddddddddddddddddddddd</p>',
    prepay: 200,
    status_code: 4,
    total_price: 684500,
    vin: '车架号: JTHGM46F585030923'
  },
  'message': 'ok'
})
