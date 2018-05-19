import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

// 违章查询 --登录验证
Mock.mock(/\d*\/is-openid-login/, 'get' + mockSwitch, {
  'code': 0,
  'message': 'ok',
  'data': {
    'is_login': true
  }
})

// 违章查询 -- 数据查询
Mock.mock(/discover\/violations/, 'get' + mockSwitch, {
  'code': 0,
  'message': 'pk',
  'data': {
    'violations|4': [{
      'violated_at': Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      'address': '316省道53KM+200M',
      'description': '16362 : 驾驶中型以上载客载货汽车、校车、危险物品运输车辆以外的其他机动车在高速公路以外的道路上行驶超过',
      'code': 'code',
      'point': 6,
      'fine': 100,
      'is_handled': 0
    }]
  }
})

// 违章查询 -- 城市查询
Mock.mock(/discover\/violations\/cities/, 'get' + mockSwitch, {
  'cities': {
    '上海': [{
      'city_code': 'SH',
      'city_name': '上海',
      'engine_number': 0
    }],
    '云南': [{
      'city_code': 'YN_KUNMING',
      'city_name': '昆明',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_YUXI',
      'city_name': '玉溪',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_BAOSHAN',
      'city_name': '保山',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_QUJING',
      'city_name': '曲靖',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_HONGHE',
      'city_name': '红河',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_LIJIANG',
      'city_name': '丽江',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_ZHAOTONG',
      'city_name': '昭通',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_PUER',
      'city_name': '普洱',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_LINCANG',
      'city_name': '临沧',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_DALI',
      'city_name': '大理',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_DIQING',
      'city_name': '迪庆',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_CHUXIONG',
      'city_name': '楚雄',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_XISHUANGBANNA',
      'city_name': '西双版纳',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_WENSHAN',
      'city_name': '文山',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_DEHONG',
      'city_name': '德宏',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'YN_NUJIANG',
      'city_name': '怒江',
      'engine_number': 6,
      'vin': 6
    }],
    '北京': [{
      'city_code': 'BJ',
      'city_name': '北京',
      'engine_number': 0
    }],
    '吉林': [{
      'city_code': 'JL',
      'city_name': '吉林',
      'vin': 4
    }, {
      'city_code': 'JL_CHANGCHUN',
      'city_name': '长春',
      'vin': 4
    }, {
      'city_code': 'JL_SIPING',
      'city_name': '四平',
      'vin': 4
    }, {
      'city_code': 'JL_TONGHUA',
      'city_name': '通化',
      'vin': 4
    }, {
      'city_code': 'JL_BAISHAN',
      'city_name': '白山',
      'vin': 4
    }, {
      'city_code': 'JL_LIAOYUAN',
      'city_name': '辽源',
      'vin': 4
    }, {
      'city_code': 'JL_SONGYUAN',
      'city_name': '松原',
      'vin': 4
    }, {
      'city_code': 'JL_BAICHENG',
      'city_name': '白城',
      'vin': 4
    }, {
      'city_code': 'JL_YANBIAN',
      'city_name': '延边',
      'vin': 4
    }],
    '宁夏': [{
      'city_code': 'NX_YINCHUAN',
      'city_name': '银川',
      'engine_number': 4,
      'vin': 6
    }, {
      'city_code': 'NX_WUZHONG',
      'city_name': '吴忠',
      'engine_number': 4,
      'vin': 6
    }, {
      'city_code': 'NX_SHIZUISHAN',
      'city_name': '石嘴山',
      'engine_number': 4,
      'vin': 6
    }, {
      'city_code': 'NX_GUYUAN',
      'city_name': '固原',
      'engine_number': 4,
      'vin': 6
    }, {
      'city_code': 'NX_ZHONGWEI',
      'city_name': '中卫',
      'engine_number': 4,
      'vin': 6
    }],
    '山东': [{
      'city_code': 'SD_ZB',
      'city_name': '淄博',
      'vin': 6
    }, {
      'city_code': 'SD_QD',
      'city_name': '青岛',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'SD_WH',
      'city_name': '威海',
      'vin': 6
    }, {
      'city_code': 'SD_ZZ',
      'city_name': '枣庄',
      'vin': 6
    }, {
      'city_code': 'SD_RZ',
      'city_name': '日照',
      'vin': 6
    }, {
      'city_code': 'SD_LY',
      'city_name': '临沂',
      'vin': 6
    }, {
      'city_code': 'SD_LW',
      'city_name': '莱芜',
      'vin': 6
    }, {
      'city_code': 'SD_HZ',
      'city_name': '菏泽',
      'vin': 6
    }, {
      'city_code': 'SD_WF',
      'city_name': '潍坊',
      'vin': 0
    }, {
      'city_code': 'SD_LC',
      'city_name': '聊城',
      'vin': 6
    }, {
      'city_code': 'SD_JN',
      'city_name': '济宁',
      'vin': 6
    }, {
      'city_code': 'SD_BZ',
      'city_name': '滨州',
      'vin': 6
    }, {
      'city_code': 'SD_DZ',
      'city_name': '德州',
      'vin': 6
    }, {
      'city_code': 'SD_DY',
      'city_name': '东营',
      'vin': 6
    }, {
      'city_code': 'SD_TA',
      'city_name': '泰安',
      'vin': 6
    }, {
      'city_code': 'SD_YT',
      'city_name': '烟台',
      'vin': 6
    }, {
      'city_code': 'SD_JINAN',
      'city_name': '济南',
      'vin': 0
    }, {
      'city_code': 'SD_TENGZHOU',
      'city_name': '滕州',
      'vin': 6
    }, {
      'city_code': 'SD_RONGCHENG',
      'city_name': '荣成',
      'vin': 4
    }, {
      'city_code': 'SD_LAIZHOU',
      'city_name': '莱州',
      'vin': 6
    }, {
      'city_code': 'SD_ZHUCHENG',
      'city_name': '诸城',
      'vin': 0
    }, {
      'city_code': 'SD_PENGLAI',
      'city_name': '蓬莱',
      'vin': 6
    }, {
      'city_code': 'SD_LONGKOU',
      'city_name': '龙口',
      'vin': 6
    }, {
      'city_code': 'SD_SHOUGUANG',
      'city_name': '寿光',
      'vin': 0
    }, {
      'city_code': 'SD_JIAOZHOU',
      'city_name': '胶州',
      'engine_number': 4,
      'vin': 4
    }, {
      'city_code': 'SD_PINGDU',
      'city_name': '平度',
      'engine_number': 4,
      'vin': 4
    }, {
      'city_code': 'SD_ZHAOYUAN',
      'city_name': '招远',
      'vin': 6
    }, {
      'city_code': 'SD_WENDENG',
      'city_name': '文登',
      'vin': 4
    }, {
      'city_code': 'SD_ZOUCHENG',
      'city_name': '邹城',
      'vin': 6
    }, {
      'city_code': 'SD_YANZHOU',
      'city_name': '兖州',
      'vin': 6
    }, {
      'city_code': 'SD_RUSHAN',
      'city_name': '乳山',
      'vin': 4
    }, {
      'city_code': 'SD_ZOUPINGXIAN',
      'city_name': '邹平县',
      'vin': 6
    }, {
      'city_code': 'SD_XINTAI',
      'city_name': '新泰',
      'vin': 6
    }, {
      'city_code': 'SD_FEICHENG',
      'city_name': '肥城',
      'vin': 6
    }, {
      'city_code': 'SD_JIAONAN',
      'city_name': '胶南',
      'engine_number': 4,
      'vin': 4
    }],
    '广东': [{
      'city_code': 'GD_SZ',
      'city_name': '深圳',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_GZ',
      'city_name': '广州',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_DG',
      'city_name': '东莞',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_FS',
      'city_name': '佛山',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_ZS',
      'city_name': '中山',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_ST',
      'city_name': '汕头',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_ZH',
      'city_name': '珠海',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_JM',
      'city_name': '江门',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_JY',
      'city_name': '揭阳',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_HZ',
      'city_name': '惠州',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_CZ',
      'city_name': '潮州',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_ZQ',
      'city_name': '肇庆',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_YJ',
      'city_name': '阳江',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_ZHANJIANG',
      'city_name': '湛江',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_SHAOGUAN',
      'city_name': '韶关',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_MAOMING',
      'city_name': '茂名',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_QINGYUAN',
      'city_name': '清远',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_MEIZHOU',
      'city_name': '梅州',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_HEYUAN',
      'city_name': '河源',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_ZENGCHENG',
      'city_name': '增城',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_YUNFU',
      'city_name': '云浮',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'GD_SHANWEI',
      'city_name': '汕尾',
      'engine_number': 6,
      'vin': 6
    }],
    '广西': [{
      'city_code': 'GX_NANNING',
      'city_name': '南宁',
      'vin': 6
    }],
    '江苏': [{
      'city_code': 'JS_NJ',
      'city_name': '南京',
      'engine_number': 6
    }, {
      'city_code': 'JS_XZ',
      'city_name': '徐州',
      'engine_number': 6
    }, {
      'city_code': 'JS_CZ',
      'city_name': '常州',
      'engine_number': 6
    }, {
      'city_code': 'JS_SZ',
      'city_name': '苏州',
      'engine_number': 6,
      'vin': 7
    }, {
      'city_code': 'JS_NT',
      'city_name': '南通',
      'engine_number': 6
    }, {
      'city_code': 'JS_LYG',
      'city_name': '连云港',
      'engine_number': 6
    }, {
      'city_code': 'JS_ZJ',
      'city_name': '镇江',
      'engine_number': 6,
      'vin': 4
    }, {
      'city_code': 'JS_YZ',
      'city_name': '扬州',
      'vin': 6
    }, {
      'city_code': 'JS_WUXI',
      'city_name': '无锡',
      'engine_number': 6
    }, {
      'city_code': 'JS_ZHANGJIAGANG',
      'city_name': '张家港',
      'engine_number': 6,
      'vin': 7
    }, {
      'city_code': 'JS_JIANGYIN',
      'city_name': '江阴',
      'engine_number': 6
    }, {
      'city_code': 'JS_YIXING',
      'city_name': '宜兴',
      'engine_number': 6
    }, {
      'city_code': 'JS_KUNSHAN',
      'city_name': '昆山',
      'engine_number': 6,
      'vin': 7
    }, {
      'city_code': 'JS_CHANGSHU',
      'city_name': '常熟',
      'engine_number': 6,
      'vin': 7
    }, {
      'city_code': 'JS_JIANGDOU',
      'city_name': '江都',
      'vin': 6
    }, {
      'city_code': 'JS_DANYANG',
      'city_name': '丹阳',
      'engine_number': 6,
      'vin': 4
    }, {
      'city_code': 'JS_TAICANG',
      'city_name': '太仓',
      'engine_number': 6,
      'vin': 7
    }, {
      'city_code': 'JS_LIYANG',
      'city_name': '溧阳',
      'engine_number': 6
    }, {
      'city_code': 'JS_HAIMEN',
      'city_name': '海门',
      'engine_number': 6
    }, {
      'city_code': 'JS_QIDONG',
      'city_name': '启东',
      'engine_number': 6
    }, {
      'city_code': 'JS_TONGZHOU',
      'city_name': '通州',
      'engine_number': 6
    }],
    '河南': [{
      'city_code': 'HN_ZZ',
      'city_name': '郑州',
      'vin': 0
    }, {
      'city_code': 'HN_LY',
      'city_name': '洛阳',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_XC',
      'city_name': '许昌',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_PDS',
      'city_name': '平顶山',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_ZMD',
      'city_name': '驻马店',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_HB',
      'city_name': '鹤壁',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_JZ',
      'city_name': '焦作',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_SMX',
      'city_name': '三门峡',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_SQ',
      'city_name': '商丘',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_JY',
      'city_name': '济源',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_XINXIANG',
      'city_name': '新乡',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_GONGYI',
      'city_name': '巩义',
      'vin': 0
    }, {
      'city_code': 'HN_ANYANG',
      'city_name': '安阳',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_NANYANG',
      'city_name': '南阳',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_KAIFENG',
      'city_name': '开封',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_PUYANG',
      'city_name': '濮阳',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_ZHOUKOU',
      'city_name': '周口',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_XINYANG',
      'city_name': '信阳',
      'engine_number': 0,
      'vin': 0
    }, {
      'city_code': 'HN_LEIHE',
      'city_name': '漯河',
      'engine_number': 0,
      'vin': 0
    }],
    '浙江': [{
      'city_code': 'ZJ_HZ',
      'city_name': '杭州',
      'vin': 6
    }, {
      'city_code': 'ZJ_NB',
      'city_name': '宁波',
      'vin': 6
    }, {
      'city_code': 'ZJ_YW',
      'city_name': '义乌',
      'vin': 6
    }, {
      'city_code': 'ZJ_TZ',
      'city_name': '台州',
      'vin': 6
    }, {
      'city_code': 'ZJ_CX',
      'city_name': '慈溪',
      'vin': 6
    }, {
      'city_code': 'ZJ_YY',
      'city_name': '余姚',
      'vin': 6
    }, {
      'city_code': 'ZJ_YK',
      'city_name': '永康',
      'vin': 6
    }, {
      'city_code': 'ZJ_SXX',
      'city_name': '绍兴县',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'ZJ_JH',
      'city_name': '金华',
      'vin': 6
    }, {
      'city_code': 'ZJ_SX',
      'city_name': '绍兴',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'ZJ_WL',
      'city_name': '温岭',
      'vin': 6
    }, {
      'city_code': 'ZJ_ZJ',
      'city_name': '诸暨',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'ZJ_YHX',
      'city_name': '玉环县',
      'vin': 6
    }, {
      'city_code': 'ZJ_SY',
      'city_name': '上虞',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'ZJ_HUZ',
      'city_name': '湖州',
      'vin': 6
    }, {
      'city_code': 'ZJ_LS',
      'city_name': '丽水',
      'vin': 6
    }, {
      'city_code': 'ZJ_QZ',
      'city_name': '衢州',
      'vin': 6
    }, {
      'city_code': 'ZJ_ZS',
      'city_name': '舟山',
      'vin': 6
    }, {
      'city_code': 'ZJ_LH',
      'city_name': '临海',
      'vin': 6
    }, {
      'city_code': 'ZJ_CXX',
      'city_name': '长兴县',
      'vin': 6
    }],
    '海南': [{
      'city_code': 'HAN_HAIKOU',
      'city_name': '海口',
      'vin': 4
    }, {
      'city_code': 'HAN_SANYA',
      'city_name': '三亚',
      'vin': 4
    }, {
      'city_code': 'HAN_LINGSHUI',
      'city_name': '陵水',
      'vin': 4
    }, {
      'city_code': 'HAN_BAISHA',
      'city_name': '白沙',
      'vin': 4
    }, {
      'city_code': 'HAN_QIONGHAI',
      'city_name': '琼海',
      'vin': 4
    }, {
      'city_code': 'HAN_QIONGZHONG',
      'city_name': '琼中',
      'vin': 4
    }, {
      'city_code': 'HAN_CHENGMAIXIAN',
      'city_name': '澄迈县',
      'vin': 4
    }, {
      'city_code': 'HAN_CHANGJIANG',
      'city_name': '昌江',
      'vin': 4
    }, {
      'city_code': 'HAN_WENCHANG',
      'city_name': '文昌',
      'vin': 4
    }, {
      'city_code': 'HAN_TUNCHANGXIAN',
      'city_name': '屯昌县',
      'vin': 4
    }, {
      'city_code': 'HAN_DINGANXIAN',
      'city_name': '定安县',
      'vin': 4
    }, {
      'city_code': 'HAN_DANZHOU',
      'city_name': '儋州',
      'vin': 4
    }, {
      'city_code': 'HAN_BAOTING',
      'city_name': '保亭',
      'vin': 4
    }, {
      'city_code': 'HAN_WUZHISHAN',
      'city_name': '五指山',
      'vin': 4
    }, {
      'city_code': 'HAN_LEDONG',
      'city_name': '乐东',
      'vin': 4
    }, {
      'city_code': 'HAN_LINGAOXIAN',
      'city_name': '临高县',
      'vin': 4
    }, {
      'city_code': 'HAN_DONGFANG',
      'city_name': '东方',
      'vin': 4
    }, {
      'city_code': 'HAN_WANNING',
      'city_name': '万宁',
      'vin': 4
    }],
    '湖北': [{
      'city_code': 'FB_WH',
      'city_name': '武汉',
      'vin': 6
    }, {
      'city_code': 'FB_YICHANG',
      'city_name': '宜昌',
      'vin': 6
    }, {
      'city_code': 'FB_JINGZHOU',
      'city_name': '荆州',
      'vin': 6
    }, {
      'city_code': 'FB_HUANGGANG',
      'city_name': '黄冈',
      'vin': 6
    }, {
      'city_code': 'FB_SHIYAN',
      'city_name': '十堰',
      'vin': 6
    }, {
      'city_code': 'FB_HUANGSHI',
      'city_name': '黄石',
      'vin': 6
    }, {
      'city_code': 'FB_SUIZHOU',
      'city_name': '随州',
      'vin': 6
    }, {
      'city_code': 'FB_JINGMEN',
      'city_name': '荆门',
      'vin': 6
    }, {
      'city_code': 'FB_XIAOGAN',
      'city_name': '孝感',
      'vin': 6
    }, {
      'city_code': 'FB_EZHOU',
      'city_name': '鄂州',
      'vin': 6
    }, {
      'city_code': 'FB_XIANNING',
      'city_name': '咸宁',
      'vin': 6
    }, {
      'city_code': 'FB_ENSHI',
      'city_name': '恩施',
      'vin': 6
    }, {
      'city_code': 'FB_SHENNONGJIA',
      'city_name': '神农架',
      'vin': 6
    }, {
      'city_code': 'FB_QIANJIANG',
      'city_name': '潜江',
      'vin': 6
    }, {
      'city_code': 'FB_TIANMEN',
      'city_name': '天门',
      'vin': 6
    }, {
      'city_code': 'FB_XIANTAO',
      'city_name': '仙桃',
      'vin': 6
    }, {
      'city_code': 'FB_XIANGYANG',
      'city_name': '襄阳',
      'vin': 6
    }],
    '福建': [{
      'city_code': 'FJ_XM',
      'city_name': '厦门',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'FJ_FU1ZHOU',
      'city_name': '福州',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'FJ_QUANZHOU',
      'city_name': '泉州',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'FJ_FUTIAN',
      'city_name': '莆田',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'FJ_ZHANGZHOU',
      'city_name': '漳州',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'FJ_SANMING',
      'city_name': '三明',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'FJ_LONGYAN',
      'city_name': '龙岩',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'FJ_NANPING',
      'city_name': '南平',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'FJ_NINGDE',
      'city_name': '宁德',
      'engine_number': 6,
      'vin': 6
    }],
    '辽宁': [{
      'city_code': 'LN_SY',
      'city_name': '沈阳',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'LN_JZ',
      'city_name': '锦州',
      'vin': 6
    }, {
      'city_code': 'LN_YK',
      'city_name': '营口',
      'vin': 0
    }, {
      'city_code': 'LN_DL',
      'city_name': '大连',
      'vin': 6
    }, {
      'city_code': 'LN_AS',
      'city_name': '鞍山',
      'vin': 4
    }, {
      'city_code': 'LN_FS',
      'city_name': '抚顺',
      'vin': 4
    }, {
      'city_code': 'LN_DD',
      'city_name': '丹东',
      'engine_number': 3,
      'vin': 4
    }, {
      'city_code': 'LN_FX',
      'city_name': '阜新',
      'engine_number': 0
    }, {
      'city_code': 'LN_LY',
      'city_name': '辽阳',
      'vin': 4
    }, {
      'city_code': 'LN_TL',
      'city_name': '铁岭'
    }, {
      'city_code': 'LN_CY',
      'city_name': '朝阳'
    }, {
      'city_code': 'LN_PANJIN',
      'city_name': '盘锦',
      'vin': 4
    }, {
      'city_code': 'LN_WAFANGDIAN',
      'city_name': '瓦房店',
      'vin': 6
    }, {
      'city_code': 'LN_BENXI',
      'city_name': '本溪',
      'vin': 4
    }, {
      'city_code': 'LN_HAICHENG',
      'city_name': '海城',
      'vin': 4
    }],
    '重庆': [{
      'city_code': 'CQ',
      'city_name': '重庆',
      'vin': 6
    }],
    '陕西': [{
      'city_code': 'SX_XA',
      'city_name': '西安',
      'engine_number': 0,
      'vin': 6
    }, {
      'city_code': 'SX_XY',
      'city_name': '咸阳',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'SX_WN',
      'city_name': '渭南',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'SX_AK',
      'city_name': '安康',
      'engine_number': 0,
      'vin': 6
    }, {
      'city_code': 'SX_YA',
      'city_name': '延安',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'SX_BAOJI',
      'city_name': '宝鸡',
      'engine_number': 6,
      'vin': 4
    }, {
      'city_code': 'SX_HANZHONG',
      'city_name': '汉中',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'SX_YU2LIN',
      'city_name': '榆林',
      'engine_number': 0,
      'vin': 6
    }, {
      'city_code': 'SX_TONGCHUAN',
      'city_name': '铜川',
      'engine_number': 6,
      'vin': 6
    }, {
      'city_code': 'SX_SHANGLUO',
      'city_name': '商洛',
      'engine_number': 6,
      'vin': 6
    }],
    '青海': [{
      'city_code': 'QH_XN',
      'city_name': '西宁',
      'vin': 0
    }, {
      'city_code': 'QH_HAIDONG',
      'city_name': '海东',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'QH_HAIXI',
      'city_name': '海西',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'QH_HAINAN',
      'city_name': '海南',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'QH_YUSHU',
      'city_name': '玉树',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'QH_HUANGNAN',
      'city_name': '黄南',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'QH_HAIBEI',
      'city_name': '海北',
      'engine_number': 6,
      'vin': 0
    }, {
      'city_code': 'QH_GUOLUO',
      'city_name': '果洛',
      'engine_number': 6,
      'vin': 0
    }],
    '黑龙江': [{
      'city_code': 'HLJ_HAERBIN',
      'city_name': '哈尔滨',
      'vin': 0
    }, {
      'city_code': 'HLJ_DAQING',
      'city_name': '大庆',
      'vin': 0
    }, {
      'city_code': 'HLJ_JIAMUSI',
      'city_name': '佳木斯',
      'vin': 0
    }, {
      'city_code': 'HLJ_MUDANJIANG',
      'city_name': '牡丹江',
      'vin': 0
    }, {
      'city_code': 'HLJ_QIQIHAER',
      'city_name': '齐齐哈尔',
      'vin': 0
    }, {
      'city_code': 'HLJ_JIXI',
      'city_name': '鸡西',
      'vin': 0
    }, {
      'city_code': 'HLJ_YICHUN_H',
      'city_name': '伊春',
      'vin': 0
    }, {
      'city_code': 'HLJ_HEIHE',
      'city_name': '黑河',
      'vin': 0
    }, {
      'city_code': 'HLJ_HEGANG',
      'city_name': '鹤岗',
      'vin': 0
    }, {
      'city_code': 'HLJ_SUIHUA',
      'city_name': '绥化',
      'vin': 0
    }, {
      'city_code': 'HLJ_SHUANGYASHAN',
      'city_name': '双鸭山',
      'vin': 0
    }, {
      'city_code': 'HLJ_QITAIHE',
      'city_name': '七台河',
      'vin': 0
    }, {
      'city_code': 'HLJ_DAXINGANLING',
      'city_name': '大兴安岭',
      'vin': 0
    }]
  },
  'hint': {
    'province': '广东',
    'city': '深圳'
  },
  'code': 0,
  'message': 'ok'
})

