/**
 * all mock data
 */
import Mock from 'mockjs'
import cache from '../common/cache'
import url from '../common/url'
// mock 开关
let mock = url.getSearch().mock
if (mock === '1') {
  cache.setSessionData('mock', true)
} else if (mock === '2') {
  cache.setSessionData('mock', false)
}
Mock.setup({
  timeout: 400
})
// 中升公众号2.0首页
import './customized/index'
import './store/index'

// 个人中心
import './personal/index' // 首页
import './personal/reservations' // 养修预约列表
import './personal/reservationDetail' // 预约详情
import './personal/order' // 保费单列表
import './prestore/index' // 预存保单
import './personal/coupon/list' // 优惠券
import './discover/rescue' // 紧急救援
import './inquiries/inq' // 续保报价
import './appointment/index' // 养修预约
import './discover/violations' // 车信息
import './inquiries/index' // 车险特惠
import './personal/quo' // 续保单
import './login/index' // 登录页
import './local/pay' // 预存支付
// 活动页
import './active/setsignup' // 集客报名
// 中升集团简介
import './active/welfare' // 福利活动页
import './active/carbargain' // 购车砍价活动页
import './usedcar/submit' // 二手车
import './car/carInfo' // 车信息
import './active/shakegame' // 摇一摇
import './active/waresBargain' // 商品砍价活动
