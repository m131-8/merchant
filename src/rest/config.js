/**
 * rest 请求配置
 */
import ajax from '../common/ajax'
export default {
  // 4s店
  store: {
    getStoreInfo: ajax.query('/kamostore111', {noNeedMobileLogin: true})
  },
  login: {
    // 获取验证码
    getCaptchaCode: ajax.create(''),
    // 登录
    getLogin: ajax.create(''),
    // 登出
    out: ajax.create('/logout'),
    // 是否登录
    is_login: ajax.query(''),
    // 是否openid登录
    is_openid_login: ajax.query('', {customUrl: 'replacing_auth'}),
    getCustomized: ajax.query('/store_config')
  },
  active: {
    carBargain: {
      // 1.获取砍价活动
      getActivityInfo: ajax.query('/activity/car-bargain-activity', {noAuthInFilte: true}),
      // 2.获取砍价信息
      getBargainInfo: ajax.query('/activity/car-bargain', {noAuthInFilte: true}),
      // 3.兑换优惠卷登记
      signup: ajax.create('/activity/convert-car-bargain-coupon', {noAuthInFilte: true}),
      // 4.砍价请求
      bargaining: ajax.create('/activity/car-bargaining', {noAuthInFilte: true}),
      // 5.发起砍价
      initiateBargain: ajax.create('/activity/initiate-car-bargain', {noAuthInFilte: true}),
      // 6.查看优惠卷详情
      getCouponInfo: ajax.query('/activity/car-bargain-coupon', {noAuthInFilte: true}),
      // 7.选择车系
      getCarSeries: ajax.query('/activity/car-bargain-car-series', {noAuthInFilte: true}),
      // 8.选项车型
      getCarModels: ajax.query('/activity/car-bargain-car-models', {noAuthInFilte: true})
    },
    waresBargain: {
      // 1.获取砍价活动
      getActivityInfo: ajax.query('/activity/wares-bargain-activity', {noAuthInFilte: true}),
      // 2.获取砍价信息
      getBargainInfo: ajax.query('/activity/wares-bargain', {noAuthInFilte: true}),
      // 3.兑换优惠卷登记
      signup: ajax.create('/activity/convert-wares-bargain-coupon', {noAuthInFilte: true}),
      // 4.砍价请求
      bargaining: ajax.create('/activity/wares-bargaining', {noAuthInFilte: true}),
      // 5.发起砍价
      initiateBargain: ajax.create('/activity/initiate-wares-bargain', {noAuthInFilte: true}),
      // 6.查看优惠卷详情
      getCouponInfo: ajax.query('/activity/wares-bargain-coupon', {noAuthInFilte: true})
    },
    setSignup: {
      // 获取活动信息
      getActivityInfo: ajax.query('/activity/attraction', {noNeedMobileLogin: true}),
      // 活动报名
      signup: ajax.create('/activity/attraction', {noNeedMobileLogin: true}),
      // 已报名未支付
      pay: ajax.create('/activity/attraction', {noNeedMobileLogin: true})
    },
    // 获取门店信息
    getStoreInfo: ajax.query('/activity/store_info', {noNeedMobileLogin: true}),
    // 摇一摇活动
    shakegame: {
      // 1.活动详情
      getActivity: ajax.query('/activity/shake_game'),
      // 2.登录
      login: ajax.create('/activity/shake_game'),
      // 3.发送shake次数
      sendShakeRecord: ajax.create('/activity/shake_game')
    }
  },
  personal: {
    // 获取用户个人信息
    getMyInfo: ajax.query('/my/profile'),
    // 获取预约列表、预约详情
    getReservations: ajax.query('/my/service_bookings'),
    // 预存保费单
    getOrderList: ajax.query(''),
    modifyInfo: ajax.patch('/my/profile'),
    // 5.修改预约时间
    modifyReservationTime: ajax.patch('/my/service_bookings'),
    // 6.取消预约
    deleteReservation: ajax.delete('/my/service_bookings'),
    coupon: {
      // 获取优惠券
      getMyCoupons: ajax.query(''),
      // 获取优惠券详情
      getCouponDetail: ajax.query('')
    },
    quo: {
      // 1.获取报价单列表
      getMyQuoList: ajax.query(''),
      // 2.详情-待报价
      getNoQuoInfo: ajax.query('/ins-inquiry'),
      // 3.详情-待支付
      getNoPaidInfo: ajax.query('/ins-offer')
    },
    createInquiryOrder: ajax.create('')
  },
  prestore: {
    // 1.预存保费赠券规则
    getPrestoreRuler: ajax.query(''),
    // 2.预交保费
    preCommit: ajax.create('')
  },
  // 续保报价
  inq: {
    // 1.获取所有险种和保险公司信息
    getInsuresList: ajax.query('/insures'),
    // 2.提交询价
    commitInq: ajax.create(''),
    // 3.获取banner图片
    getBannerPic: ajax.query('/store')
  },
  // 养修预约
  appointment: {
    // 获取服务
    getServices: ajax.query('/store/services', {noNeedMobileLogin: true}),
    // 获取服务顾问列表
    getServiceAdvisors: ajax.query('/store/service_consultants', {noNeedMobileLogin: true}),
    // 预定
    bookingService: ajax.create('/store/service_booking', {noNeedMobileLogin: true}),
    // 获取上次预定信息
    getLastBooking: ajax.query('/my/service_bookings/last_booking', {noNeedMobileLogin: true})
  },
  // 微信配置相关
  wx: {
    getWeChatConfigResource: ajax.query('')
  },
  // 发现-紧急救援
  discover: {
    // 紧急救援号码
    getRescueNumber: ajax.query('/discover', {noNeedMobileLogin: true}),
    // 提交查询违章信息
    getViolations: ajax.query('/discover/violations', {noNeedMobileLogin: true}),
    // 获取违章查询的城市列表
    getCities: ajax.query('/discover/violations/cities', {noNeedMobileLogin: true})
      // 功能等同于[getCities]接口，区别为[getCityList]支持Vue组件自带Address组件支持的数据格式
      // getCityList: ajax.query('/cityList'),
      // 功能等同于[getViolations]，区别为[getMyViols]是新的响应数据格式
      // getMyViols: ajax.query('/myViols')
  },
  carInfo: {
    // 通过vin获取精真估车型列表
    getModelsByVin: ajax.query(''),
    // 获取汽车品牌和车系列表
    getCarBrandList: ajax.query('/jzg_car_models/brands', {noNeedMobileLogin: true}),
    // 获取车系下的所有车型
    getCarModelList: ajax.query('/jzg_car_models/series', {noNeedMobileLogin: true})
  },
  usedCar: {
    // 根据型号,获取车型信息
    getCarDetailByModelId: ajax.query('/jzg-model-detail', {noNeedMobileLogin: true}),
    // 发布二手车信息
    publishUsedCar: ajax.create('/publish-used-car', {noNeedMobileLogin: true})
  },
  // 预存支付
  local: {
    getEmployerOrder: ajax.query('/prepay-order-by-staff'),
    createOrderByEmployer: ajax.create('')
  }
}

