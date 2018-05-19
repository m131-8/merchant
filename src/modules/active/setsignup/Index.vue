<template>
  <article>
    <div class="set-reg">
      <div class="set-reg-pic" @scroll="handleScroll" v-if="!isScroll">
        <img :src="activity.cover_image_url" alt="" v-if='activity.cover_image_url !== "None"' />
        <img src="../../../stylesheets/images/dos-set-reg.jpg" alt="" v-if='activity.cover_image_url === "None" && isDOS' />
        <img src="../../../stylesheets/images/set-reg.jpg" alt="" v-if='activity.cover_image_url === "None" && !isDOS' />
      </div>
      <div class="page-next" v-if="!isScroll"></div>
      <div class="set-reg-mes" v-if="isScroll">
        <div class="sign-up">
          <em>{{ activity.num_enrolled }} 人报名</em>
        </div>
        <div class="reg-activity">
          <div class="activity-title">
            <div class="activity-title-t">
              <img :src="activity.store.logo" />
              <span class="activity-t">{{ activity.title }}</span>
            </div>
            <div class="activity-title-c">
              <p>时间: {{ activity.start_time | getDay}}</p>
              <p>经销商: {{ activity.store.name }}</p>
              <p>地址: {{ activity.address }}</p>
            </div>
            <div class="activity-title-b db">
              <router-link :to="{ path: '/active/setsignup/dealer' }">
                <i class="icon-yjxl">
                </i> 经销商信息
              </router-link>
              <span @click="locate">
                <i class="address-a"></i>
                地址导航
              </span>
              <a :href="`tel:${activity.contact_number}`">
                <i class="icon-phone"></i> 拨打电话
              </a>
            </div>
          </div>
          <div class="activity-introduce">
            <divider>活动介绍</divider>
            <card>
              <div slot="content" class="activity-introduce-text" v-html="activity.description">
              </div>
            </card>
          </div>
          <div class="activity-sign-up">
            <!--已报名-->
            <div class="already-registered" v-if="enrollment.is_enrolled">
              <em class="icon-ok"></em>您已报名!
            </div>
            <!--未报名-->
            <div class="unalready-registered" v-else>
              <span>剩余时间: <clocker :time="activity.enroll_deadline" slot="value"></clocker></span>
              <x-button type="primary" :class="{active: isExpired}" class="need-registered" :disabled="isExpired" @click="isShow=!isShow">我要报名</x-button>
            </div>
          </div>
          <popup v-model="isShow" is-transparent>
            <div class="activity-sign-msg">
              <x-input title="姓名" required placeholder="请输入您的姓名" v-model="enrollment.contact_name"></x-input>
              <x-input title="手机号码" :max="11" is-type="china-mobile" required placeholder="请输入您的手机号码" v-model="enrollment.contact_number"></x-input>
              <x-input title="意向车型" required placeholder="请输入您的意向车型" v-model="enrollment.interested_car"></x-input>
              <x-input v-if="activity.need_deposit" class="buy-disabled" title="购买优惠" :value="activity.deposit_amount | formatePrice" disabled>
                <span slot="right">元</span>
              </x-input>
              <div class="ensure" v-if="activity.need_deposit">{{ activity.deposit_note }}</div>
              <div class="activity-sign-pay">
                <span v-if="activity.need_deposit">¥{{ activity.deposit_amount | formatePrice}}</span>
                <x-button :class="{btnclass: !activity.need_deposit}" class="btn-pay" @click="enrollPay">{{ btnSubmitText }}</x-button>
              </div>
            </div>
          </popup>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
import {
  Divider,
  Card,
  XButton,
  Popup,
  XInput,
  Group,
  Clocker
} from 'cvux/src/components'
// import wxHelp from '../../../common/wxhelp'
import util from '../../../common/util'

export default {
  components: {
    Divider,
    Card,
    XButton,
    Popup,
    XInput,
    Group,
    Clocker
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      window.addEventListener('scroll', vm.handleScroll, false)
    })
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('scroll', this.handleScroll, false)
    next()
  },
  data() {
    return {
      activity: {
        store: {}
      },
      enrollment: {},
      activityId: '',
      btnSubmitText: '报名',
      expired: false,
      isShow: false,
      isScroll: false,
      isClicked: false,
      form: {}
    }
  },
  mounted() {
    window.addEventListener('touchmove', this.handleScroll)
  },
  created() {
    this.activityId = this.$route.query.activityId
    this.$rest.active.setSignup.getActivityInfo(null, this.activityId).then((res) => {
      if (res.code === 0) {
        this.activity = res.data.activity
        this.enrollment = res.data.enrollment || {}
        this.btnSubmitText = this.activity.need_deposit ? '报名并支付' : '报名'
        if (this.enrollment && this.enrollment.status === 'pending_payment') {
          this.enrollment.is_enrolled = false
        }
        this.$wechat.promise.then(wx => {
          this.send()
        }, wx => {
          console.log('微信JSSDK校验错误:', wx.res)
        })
      } else if (res.code === 401) { // 本页面需要登录
        let next = encodeURIComponent('?_=1' + window.location.hash)
        window.location.href = this.$store.state.authPrefix + '/login/openid?next=' + next
      } else {
        this.showToast(res.message)
      }
    })
  },
  filters: {
    getDay(day) {
      // return util.formatTime(day, 'yyyy-MM-dd')
      let myDay = ''
      if (day) {
        myDay = util.formatTime(day, 'yyyy-MM-dd')
      }
      return myDay
    },
    formatePrice(price) {
      return (price / 100).toFixed(2)
    }
  },
  computed: {
    isDOS() {
      return this.$store.state.isDOS
    },
    isEnroll() {
      return this.activity.status === 'enrolling'
    },
    isExpired() {
      let nowtime = new Date().getTime()
      // 若enroll_deadline不存在默认为0
      let endtime = ''
      if (this.activity.enroll_deadline) {
        endtime = new Date(this.activity.enroll_deadline.replace(/-/g, '/')).getTime()
      } else {
        endtime = 0
      }
      if (nowtime > endtime) {
        this.expired = true
      }
      if (!this.enrollment || !this.enrollment.is_enrolled) {
        let time = setInterval(() => {
          let nowtime = new Date().getTime()
          if (nowtime > endtime) {
            this.expired = true
            clearInterval(time)
          }
        }, 1000)
      }
      return this.expired
    }
  },
  methods: {
    setFormData() {
      let validForm = true
      let contactNumber = this.form.contact_number = this.enrollment.contact_number
      let contactName = this.form.contact_name = this.enrollment.contact_name
      let interestedCar = this.form.interested_car = this.enrollment.interested_car
      this.form.activity_id = this.activityId
      if (!contactName || contactName && !util.regexpMap.regexp_name_cn.test(contactName) && !util.regexpMap.regexp_name_en.test(contactName)) {
        validForm = false
        this.showToast('请输入有效名字')
      } else if (!contactNumber || !util.regexpMap.regexp_mobile.test(contactNumber)) {
        validForm = false
        this.showToast('请输入有效的电话号码')
      } else if (!interestedCar) {
        validForm = false
        this.showToast('请输入意向车型')
      }
      return validForm
    },
    // 调用微信支付接口
    pay(params) {
      this.enrollment.status = 'pending_payment'
      this.$wechat.promise.then(wx => {
        wx.payByWx(params.appId, params.timeStamp, params.nonceStr, params.package, params.signType, params.paySign, (res) => {
          // 支付成功
          this.activity.num_enrolled += 1
          this.enrollment.is_enrolled = true
          this.isShow = false
          this.isClicked = false
        }, (res) => {
          this.showToast(res)
          this.isClicked = false
        }, (res) => {
          this.showToast(res)
          this.isClicked = false
        })
      }, wx => {
        this.isClicked = false
        console.log('微信JSSDK校验错误:', wx.res)
      })
    },
    // 点击报名并支付按钮的逻辑
    enrollPay() {
      let isClicked = false
      let validForm = this.setFormData()
      if (!validForm) {
        return false
      }
      // 防重复点击
      if (isClicked) {
        return false
      }
      isClicked = true
      if (!this.enrollment || (!this.enrollment.is_enrolled && this.enrollment.status !== 'pending_payment')) { // 未报名
        this.$rest.active.setSignup.signup(this.form, this.activityId).then((res) => {
          if (res.code === 0) {
            this.enrollment.is_enrolled = true
            this.enrollment.status = 'enrolled'
            let params = res.data.payment_param
            if (params) {
              this.enrollment.status = 'pending_payment'
              // this.pay(params)
              this.enrollment.status = 'pending_payment'
              this.$wechat.promise.then(wx => {
                wx.payByWx(params.appId, params.timeStamp, params.nonceStr, params.package, params.signType, params.paySign, (res) => {
                  // 支付成功
                  this.activity.num_enrolled += 1
                  this.enrollment.is_enrolled = true
                  this.isShow = false
                  isClicked = false
                }, (res) => {
                  this.showToast(res)
                  isClicked = false
                }, (res) => {
                  this.showToast(res)
                  isClicked = false
                })
              }, wx => {
                isClicked = false
                console.log('微信JSSDK校验错误:', wx.res)
              })
            } else {
              this.activity.num_enrolled += 1
              this.enrollment.is_enrolled = true
              this.isShow = false
              isClicked = false
            }
          } else {
            this.showToast(res.message)
            isClicked = false
          }
        })
      } else if (this.enrollment && this.activity.need_deposit && this.enrollment.status === 'pending_payment') {
        // 报名未支付
        this.$rest.active.setSignup.pay({
          activity_id: this.activityId
        }, this.activityId + '/pay').then((res) => {
          if (res.code === 0) {
            let params = res.data.payment_param
            if (params) {
              // this.pay(params)
              this.enrollment.status = 'pending_payment'
              this.$wechat.promise.then(wx => {
                wx.payByWx(params.appId, params.timeStamp, params.nonceStr, params.package, params.signType, params.paySign, (res) => {
                  // 支付成功
                  this.activity.num_enrolled += 1
                  this.enrollment.is_enrolled = true
                  this.isShow = false
                  isClicked = false
                }, (res) => {
                  this.showToast(res)
                  isClicked = false
                }, (res) => {
                  this.showToast(res)
                  isClicked = false
                })
              }, wx => {
                isClicked = false
                console.log('微信JSSDK校验错误:', wx.res)
              })
            } else {
              isClicked = false
            }
          } else {
            isClicked = false
            this.showToast(res.message)
          }
        })
      }
    },
    handleScroll() {
      let totalheight = parseFloat(window.innerHeight) + parseFloat(window.scrollY)
      if (document.body.clientHeight <= totalheight + 200) {
        this.isScroll = true
      }
    },
    locate() {
      // 判断是否为空对象
      let address = this.activity
      this.$wechat.promise.then(wx => {
        if (Object.keys(address).length) {
          wx.openLocationByWx(address.latitude || '', address.longitude || '', address.name || '', address.address || '', address.scale || 12, address.infoUrl || '')
        }
      }, wx => {
        console.log('微信JSSDK校验错误:', wx.res)
      })
      // if (!wxHelp.wxFlag) { // 调用微信接口需要先线上校验接口
      //   wxHelp.wechatConfig().then(res => {
      //     if (Object.keys(address).length) {
      //       wxHelp.openLocationByWx(address.latitude || '', address.longitude || '', address.name || '', address.address || '', address.scale || 12, address.infoUrl || '')
      //     }
      //   })
      // } else {
      //   if (Object.keys(address).length) {
      //     wxHelp.openLocationByWx(address.latitude || '', address.longitude || '', address.name || '', address.address || '', address.scale || 12, address.infoUrl || '')
      //   }
      // }
    },
    send() { // 分享
      let friendUrl = window.location.href
      let imgUrl = this.activity.thumb_image_url
      let desc = this.activity.abstract
      let title = this.activity.title
      this.$wechat.promise.then(wx => {
        wx.shareTimeline({
          title: title,
          link: friendUrl,
          imgUrl: imgUrl
        })
        wx.shareAppMessage({
          title: title,
          desc: desc,
          link: friendUrl,
          imgUrl: imgUrl
        })
      }, wx => {
        console.log('微信JSSDK校验错误:', wx.res)
      })
    }
  }
}
</script>
<style lang="less">
@import "../../../stylesheets/modules/active/setsignup";
</style>
