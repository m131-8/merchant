/**
 * 路由
 */
export default {
  routes: [{
    path: '/',
    redirect: '/store/index'
  }, { // 导航页
    path: '/navigation',
    component: resolve => import('../modules/navigation/Index').then(resolve),
    meta: {
      title: '导航'
    }
  }, { // 4s店首页
    path: '/store/index',
    // component: StoreIndex,
    component: resolve => import('../modules/store/Index').then(resolve),
    meta: {
      title: '首页',
      needLoading: true
    }
  }, { // 登录页
    path: '/login',
    // component: Login,
    component: resolve => import('../modules/login/Login').then(resolve),
    meta: {
      title: '登录'
    }
  }, { // 个人中心页
    path: '/personal/index',
    // component: PersonalIndex,
    component: resolve => import('../modules/personal/Index').then(resolve),
    meta: {
      title: '个人中心',
      needLogin: 2 // 0:不需要登录 1:需要微信登录 2:需要手机登录
    }
  }, { // 个人中心养修预约订单列表
    path: '/personal/reservations',
    // component: PersonalReservations,
    component: resolve => import('../modules/personal/Reservations').then(resolve),
    meta: {
      title: '预约记录'
    }
  }, { // 个人中心养修预约订单详情
    path: '/personal/reservations_detail',
    // component: PersonalReservationsDetail,
    component: resolve => import('../modules/personal/ReservationsDetail').then(resolve),
    meta: {
      title: '预约详情'
    }
  }, { // 修改个人中心
    path: '/personal/Data',
    // component: PersonalData,
    component: resolve => import('../modules/personal/Data').then(resolve),
    meta: {
      title: '修改个人资料'
    }
  }, { // 我的顾问
    path: '/personal/advisor',
    // component: PersonalAdvisor,
    component: resolve => import('../modules/personal/Advisor').then(resolve),
    meta: {
      title: '我的顾问'
    }
  }, { // 预存保费单
    path: '/personal/order',
    // component: PersonalOrder,
    component: resolve => import('../modules/personal/Order').then(resolve),
    meta: {
      title: '预存保费单'
    }
  }, {
    path: '/personal/coupon/list',
    // component: PersonalCouponList,
    component: resolve => import('../modules/personal/coupon/List').then(resolve),
    meta: {
      title: '我的优惠券'
    }
  }, {
    path: '/personal/coupon/detail/:id/:code',
    // component: PersonalCouponDetail,
    component: resolve => import('../modules/personal/coupon/Detail').then(resolve),
    meta: {
      title: '优惠券详情'
    }
  }, { // 紧急救援
    path: '/discover/rescue',
    // component: DiscoverRescue,
    component: resolve => import('../modules/discover/Rescue').then(resolve),
    meta: {
      title: '紧急救援',
      needLoading: true
    }
  }, { // 预存保费
    path: '/prestore/index',
    // component: PrestoreIndex,
    component: resolve => import('../modules/prestore/Index').then(resolve),
    meta: {
      title: '预存保费',
      needLogin: 2
    }
  }, { // 预交保费
    path: '/prestore/pay',
    // component: PrestorePay,
    component: resolve => import('../modules/prestore/Pay').then(resolve),
    meta: {
      title: '预交保费'
    }
  }, { // 预交保费成功
    path: '/prestore/success/:amount',
    // component: PrestoreSuc,
    component: resolve => import('../modules/prestore/Success').then(resolve),
    meta: {
      title: '预交完成'
    }
  }, { // 养修预约表单
    path: '/appointment/index',
    // component: AppointmentIndex,
    component: resolve => import('../modules/appointment/Index').then(resolve),
    meta: {
      title: '养修预约'
    }
  }, { // 养修预约成功
    path: '/appointment/success',
    // component: AppointmentSuccess,
    component: resolve => import('../modules/appointment/Success').then(resolve),
    meta: {
      title: '预约成功'
    }
  }, {
    path: '/personal/quo/quolist',
    // component: PersonalQuoList,
    component: resolve => import('../modules/personal/quo/QuoList').then(resolve),
    meta: {
      title: '报价单'
    }
  }, {
    path: '/personal/quo/noquo',
    // component: PersonalQuoNoQuo,
    component: resolve => import('../modules/personal/quo/Noquo').then(resolve),
    meta: {
      title: '续保报价'
    }
  }, {
    path: '/personal/quo/pay',
    // component: PersonalQuoPay,
    component: resolve => import('../modules/personal/quo/Pay').then(resolve),
    meta: {
      title: '续保方案',
      needLoading: true
    }
  }, {
    path: '/personal/quo/paysuc',
    // component: PersonalQuoPaySuc,
    component: resolve => import('../modules/personal/quo/PaySuc').then(resolve),
    meta: {
      title: '续保支付成功'
    }
  }, {
    path: '/personal/quo/intudeuce',
    // component: PersonalIntudeuce,
    component: resolve => import('../modules/personal/quo/Intudeuce').then(resolve),
    meta: {
      title: '车窗付费增值保修条款'
    }
  }, {
    path: '/discover/violations',
    // component: DiscoverViolations,
    component: resolve => import('../modules/discover/Violations').then(resolve),
    meta: {
      title: '违章查询',
      needLoading: true
    }
  }, {
    path: '/discover/violationsdetail',
    // component: DiscoverViols,
    component: resolve => import('../modules/discover/ViolationsDetail').then(resolve),
    meta: {
      title: '违章查询结果'
    }
  }, {
    path: '/active/setsignup/index',
    // component: SetSignUpIndex,
    component: resolve => import('../modules/active/setsignup/Index').then(resolve),
    meta: {
      title: '集客报名'
    }
  }, {
    path: '/active/setsignup/dealer',
    // component: Dealer,
    component: resolve => import('../modules/active/setsignup/Dealer').then(resolve),
    meta: {
      title: '集客报名'
    }
  }, {
    path: '/active/owner_welfare',
    // component: OwnerWelfare,
    component: resolve => import('../modules/active/ownersWelfare/Welfare').then(resolve),
    meta: {
      title: '车主福利'
    }
  }, { // 深圳宝昌宝马4S店关于车主福利页
    path: '/active/bmw_owner_welfare',
    // component: OwnerWelfare,
    component: resolve => import('../modules/active/ownersWelfare/BMWelfare').then(resolve),
    meta: {
      title: '领取福利'
    }
  }, {
    path: '/active/carbargain/index',
    // component: CarBargainIndex,
    component: resolve => import('../modules/active/carBargain/Index').then(resolve),
    meta: {
      title: '购车砍价首页'
    }
  }, {
    path: '/active/carbargain/result',
    // component: CarBargainResult,
    component: resolve => import('../modules/active/carBargain/Result').then(resolve),
    meta: {
      'title': '购车砍价'
    }
  }, {
    path: '/active/carbargain/focus',
    // component: CarBargainFocus,
    component: resolve => import('../modules/active/carBargain/Focus').then(resolve),
    meta: {
      'title': '购车砍价二维码页'
    }
  }, {
    path: '/active/bargain/coupon',
    // component: BargainCoupon,
    component: resolve => import('../modules/active/carBargain/Coupon').then(resolve),
    meta: {
      'title': '砍价优惠券'
    }
  }, {
    path: '/active/waresbargain/index',
    // component: WaresBargainIndex,
    component: resolve => import('../modules/active/waresBargain/Index').then(resolve),
    meta: {
      title: '商品砍价首页'
    }
  }, {
    path: '/active/waresbargain/detail',
    // component: WaresBargainDetail,
    component: resolve => import('../modules/active/waresBargain/Detail').then(resolve),
    meta: {
      title: '商品砍价详情'
    }
  }, {
    path: '/active/waresBargain/result',
    // component: WaresBargainResult,
    component: resolve => import('../modules/active/waresBargain/Result').then(resolve),
    meta: {
      title: '商品砍价'
    }
  }, {
    path: '/active/waresBargain/focus',
    // component: WaresBargainFous,
    component: resolve => import('../modules/active/waresBargain/Focus').then(resolve),
    meta: {
      title: '商品砍价二维码'
    }
  }, {
    path: '/active/shakegame/index',
    // component: ShakeGameIndex,
    component: resolve => import('../modules/active/shakeGame/Index').then(resolve),
    meta: {
      title: '摇一摇登录'
    }
  }, {
    path: '/active/shakegame/explain',
    // component: ShakeGameExplain,
    component: resolve => import('../modules/active/shakeGame/Explain').then(resolve),
    meta: {
      title: '摇一摇说明'
    }
  }, {
    path: '/active/shakegame/ready',
    // component: ShakeGameReady,
    component: resolve => import('../modules/active/shakeGame/Ready').then(resolve),
    meta: {
      title: '摇一摇开始'
    }
  }, {
    path: '/active/shakegame/shake',
    // component: ShakeGameShake,
    component: resolve => import('../modules/active/shakeGame/Shake').then(resolve),
    meta: {
      title: '摇一摇进行'
    }
  }, {
    path: '/active/shakegame/list',
    // component: ShakeGameList,
    component: resolve => import('../modules/active/shakeGame/List').then(resolve),
    meta: {
      title: '摇一摇获奖'
    }
  }, { // 车险特惠-首页
    path: '/inquiries/index',
    // component: InquiriesIndex,
    component: resolve => import('../modules/inquiries/Index').then(resolve),
    meta: {
      title: '车险特惠'
    }
  }, { // 续保报价
    path: '/inquiries/inq',
    // component: InsuranceRenew,
    component: resolve => import('../modules/inquiries/Inq').then(resolve),
    meta: {
      title: '续保报价',
      needLogin: 2
    }
  }, { // 续保报价成功
    path: '/inquiries/success',
    // component: InsuranceSucc,
    component: resolve => import('../modules/inquiries/Succ').then(resolve),
    meta: {
      title: '车险询价'
    }
  }, {
    path: '/usedcar/index',
    // component: UsedcarIndex,
    component: resolve => import('../modules/usedcar/Index').then(resolve),
    meta: {
      title: '我要卖车'
    }
  }, {
    path: '/usedcar/submit',
    // component: UsedcarSubmit,
    component: resolve => import('../modules/usedcar/Submit').then(resolve),
    meta: {
      title: '二手车'
    }
  }, {
    path: '/usedcar/success',
    // component: UsedcarSuccess,
    component: resolve => import('../modules/usedcar/Success').then(resolve),
    meta: {
      title: '已提交'
    }
  }, {
    path: '/car/color',
    // component: CarColor,
    component: resolve => import('../modules/car/Color').then(resolve),
    meta: {
      title: '车颜色'
    }
  }, {
    path: '/car/brand',
    // component: CarBrand,
    component: resolve => import('../modules/car/Brand').then(resolve),
    meta: {
      title: '选择品牌'
    }
  }, {
    path: '/car/series/:brandId',
    // component: CarSeries,
    component: resolve => import('../modules/car/Series').then(resolve),
    meta: {
      title: '选择车型'
    }
  }, {
    path: '/car/model/:seriesId',
    // component: CarModel,
    component: resolve => import('../modules/car/Model').then(resolve),
    meta: {
      title: '排量/年款'
    }
  }, { // 预存支付
    path: '/local/pay',
    // component: LocalPay,
    component: resolve => import('../modules/local/Pay').then(resolve),
    meta: {
      title: '预存支付'
    }
  }]
}

