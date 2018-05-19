<template>
  <article>
    <div class="bargain-call-f">
      <div class="countdown" v-show="activityInfo.bargain.status !== 3">
        活动倒计时:
        <clocker :time="activityInfo.bargain.expires_at" slot="value">
          <span class="day">%D</span>天
          <span class="day">%H</span>时
          <span class="day">%M</span>分
          <span class="day">%S</span>秒
        </clocker>
      </div>
      <div class="bargain-call-info">
        <p v-if="isInitiator">我在{{activityInfo.store_name}}准备买下面这款商品了！刀刀都是爱啊！ %>_
          <% 再给一刀吧！喝粥吃肉靠你啦！</p>
        <p v-else>Hi，朋友，我是{{activityInfo.initiator.wechat_name}}，现在我正好看中了下面这款商品，赶快撸起你的袖子帮我砍！！砍！！砍！</p>
      </div>
      <div class="bargain-info">
        <img src="../../../stylesheets/images/wares-bargain/bargain-call-f-banner.png" />
      </div>
      <div class="bargain-user">
        <img :src="activityInfo.initiator.avatar" class="bargain-user-pic" />
        <span>{{activityInfo.initiator.wechat_name}}</span>
      </div>
      <div class="bargain-banner">
        <img :src="activityInfo.bargain.wares_image_url" alt="" />
      </div>
      <div class="goods-info">
        <span>商品价值<br /><em>¥{{ activityInfo.bargain.value}}</em></span>
        <i></i><router-link :to="{ path: '/active/waresbargain/detail', query: { description: this.activityInfo.bargain.description}}">商品详情></router-link>
      </div>
      <div class="bargain-btn" v-if="isInitiator">
        <button class="red-btn pad75-btn" v-if="status === 3" @click="checkNow">查看优惠券</button>
        <p class="activity-end" v-if="status === 3">您已成功兑换优惠券， 请前往个人中心查看</p>
        <!-- 未兑换 -->
        <button class="blue-btn" :class="{'pad75-btn': expired}" v-if="status === 2" @click="overActivity">兑换优惠券</button>
        <button class="red-btn" :class="{'fn-hide': expired}" v-if="status === 2" @click="isShowOrNot">喊好友来砍价</button>
        <button class="red-btn pad75-btn" v-if="status === 1" @click="gentleKnifeForInitiator">温柔一刀</button>
      </div>
      <div class="bargain-btn" v-else>
        <button class="blue-btn pad75-btn" v-if="status === 3" @click="initiateGame">我也要玩</button>
        <button class="blue-btn" v-if="status === 2" @click="initiateGame">我也要玩</button>
        <button class="red-btn" v-if="status === 2" @click="isShowOrNot">喊好友来砍价</button>
        <button v-if="status === 1" class="red-btn pad75-btn" @click="gentleKnifeForFriend">温柔一刀</button>
      </div>
      <div class="bargain-mes-fz">
        <p class="tips" v-if="isInitiator">
          您已经收到了
          <em>{{ activityInfo.bargain.amount | formatePrice}}</em>
          元，人多力量大快快去转发
        </p>
        <p class="tips" v-else>
          你已经砍了
          <em>{{activityInfo.current_user_bargain_amount | formatePrice}}</em>
          元，人多力量大快快去转发
        </p>
      </div>
      <div class="bargain-mes">
        <div class="bargain-mes-t"></div>
        <div class="bargain-mes-list">
          <ul v-if="activityInfo.bargain_details.length">
            <li v-for="item in activityInfo.bargain_details">
              <div class="bargain-mes-fr fl">
                <span><img :src="item.avatar" /></span>
                <span>
                  <em>{{item.wechat_name}}.砍了{{item.amount | formatePrice}}元</em>
                </span>
              </div>
              <div class="bargain-mes-cash fr">
                <em>{{item.amount | formatePrice}}元</em>
              </div>
            </li>
          </ul>
          <h4 v-else class="no-friend">穷到没朋友。。T_T呜呜。。。</h4>
        </div>
        <span class="rotate-span">砍价排行榜</span>
      </div>
    </div>
    <!-- 兑换优惠券登记 -->
    <popup v-model="isExchange" is-transparent>
      <div class="exchange-info">
        <h4>赶快输入您的联系方式兑换购车券吧~!</h4>
        <x-input title="姓名" required placeholder="姓名" v-model="signUpInfo.contact_name"></x-input>
        <x-input :max="11" title="电话" is-type="china-mobile" required placeholder="手机号码" v-model="signUpInfo.contact_number"></x-input>
      </div>
      <div class="exchange-btn">
        <x-button type="primary" @click="sendUserInfo">立即兑换</x-button>
      </div>
    </popup>
    <!-- 显示自己砍价的金额 -->
    <popup v-model="isBargain" is-transparent>
    <div class="coupon-popup">
      <div class="coupon-popup-t">
        <img src="../../../stylesheets/images/wares-bargain/coupon-popup-fz.png" class="coupon-popup-fz" />
        <span>恭喜您</span>
        <a href="javascript:;" @click.stop="isBargain = !isBargain" class="coupon-popup-close"></a>
      </div>
      <div class="coupon-popup-c">
          <p>已砍刀 <span><i>{{activityInfo.current_user_bargain_amount | formatePrice}}</i>元</span> </p>
          <p>力气已耗完，还差一点！快找伙伴来帮忙！</p>
      </div>
      <div class="coupon-popup-b">
          <button @click="share">找朋友帮忙</button>
      </div>
    </div>
    </popup>
    <div class="share-box">
      <x-dialog v-model="isShare" :hideOnBlur="true">
        <img src="../../../stylesheets/images/share-box.png" />
      </x-dialog>
    </div>
  </article>
</template>
<script>
import util from '../../../common/util'
// import wxHelp from '../../../common/wxhelp'
import {
  Clocker,
  Group,
  Cell,
  Popup,
  XInput,
  XButton,
  XDialog
} from 'cvux/src/components'

export default {
  components: {
    Clocker,
    Group,
    Cell,
    Popup,
    XInput,
    XButton,
    XDialog
  },
  data () {
    return {
      activityInfo: {
        bargain: {
          expires_at: '2016-01-01 18:00:00'
        },
        initiator: {},
        bargain_details: []
      },
      isShare: false,
      isBargain: false,
      isExchange: false,
      isInitiator: true,
      expired: false,
      signUpInfo: {},
      idObj: {}
    }
  },
  mounted () {
    let activityId = this.$route.query.waresBargain_activity_id
    let openid = this.$route.query.openid
    if (openid && activityId) {
      this.idObj = {
        activity_id: activityId,
        openid: openid
      }
      this.$rest.active.waresBargain.getBargainInfo(null, `${openid}/${activityId}`).then(res => {
        if (res.code === 0) {
          this.activityInfo = res.data
          this.idObj.bargain_id = res.data.bargain.id
          // 判断是发起者还是好友
          if (openid !== res.data.openid) {
            this.isInitiator = false
          }
          // 商品价格改格式
          let money = this.activityInfo.bargain.value / 100 + ''
          this.activityInfo.bargain.value = money.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          this.isExpired()
        } else if (res.code === 401) {
          let next = encodeURIComponent('?_=1' + window.location.hash)
          // 未登录微信  auth/weixin/<int:store_id>?next=<str:target_url>&need_mobile_bind='false'
          window.location.href = 'auth/weixin/login?next=' + next + '&need_mobile_bind=false'
        } else if (res.code === 404) {
          this.isClose()
        } else {
          this.showToast(res.message)
        }
      })
    } else {
      this.showToast('id不存在')
    }
  },
  computed: {
    status () {
      let num = 1
      let currentAmount = this.activityInfo.current_user_bargain_amount
      let couvert = this.activityInfo.bargain.have_convert_coupon
      let nowtime = new Date()
      let endtime = new Date(this.activityInfo.bargain.expires_at.replace(/-/g, '/'))
      if (nowtime.getTime() > endtime.getTime()) {
        if (couvert) {
          num = 3
        } else {
          num = 2
        }
      } else {
        if (couvert) {
          num = 3
        } else {
          if (currentAmount) {
            num = 2
          }
        }
      }
      return num
    }
  },
  filters: {
    formatePrice(price) {
      return price ? (price / 100).toFixed(1) : 0
    }
  },
  methods: {
    // 是否展示分享
    isShowOrNot() {
      if (this.activityInfo.bargain.status === 3) {
        this.isShare = false
        this.isClose()
      } else {
        this.isShare = true
      }
    },
    // 活动已关闭
    isClose() {
      this.showToast('活动已关闭')
      setTimeout(() => {
        this.$wechat.promise.then(wx => {
          window.WeixinJSBridge.call('closeWindow')
          this.$wechat.hideOptionMenu()
        }, wx => {
          console.log('微信JSSDK校验错误:', wx.res)
        })
      }, 1000)
    },
    // 判断活动是否结束
    isExpired() {
      let nowtime = new Date().getTime()
      let endtime = new Date(this.activityInfo.bargain.expires_at.replace(/-/g, '/')).getTime()
      if (nowtime > endtime) {
        if (this.isInitiator) {
          this.expired = true
        } else {
          this.showToast('活动已结束！')
          setTimeout(() => {
            this.$wechat.promise.then(wx => {
              window.WeixinJSBridge.call('closeWindow')
            }, wx => {
              console.log('微信JSSDK校验错误:', wx.res)
            })
          }, 1000)
        }
      } else {
        this.send()
        let time = setInterval(() => {
          let nowtime = new Date().getTime()
          if (nowtime > endtime) {
            if (this.isInitiator) {
              this.expired = true
            } else {
              this.showToast('活动已结束！')
              setTimeout(() => {
                this.$wechat.promise.then(wx => {
                  window.WeixinJSBridge.call('closeWindow')
                }, wx => {
                  console.log('微信JSSDK校验错误:', wx.res)
                })
              }, 1000)
            }
            clearInterval(time)
          }
        }, 1000)
      }
    },
    // 查看优惠券
    checkNow () {
      if (this.activityInfo.bargain.status === 3) {
        this.isClose()
      } else {
        this.$router.push({
          path: '/active/bargain/coupon',
          query: {
            bargain_id: this.idObj.bargain_id,
            isCarOrWares: '2'
          }
        })
      }
    },
    // 点击兑换优惠券
    overActivity () {
      if (this.activityInfo.bargain.status === 3) {
        this.isClose()
      } else {
        let activityId = this.idObj.activity_id
        let openid = this.idObj.openid
        if (openid && activityId) {
          this.$rest.active.waresBargain.getBargainInfo(null, `${openid}/${activityId}`).then(res => {
            if (res.data.bargain.amount) {
              this.isExchange = true
            } else {
              this.showToast('您当前金额为0, 无法兑换')
            }
          })
        }
      }
    },
    // 温柔一刀
    gentleKnifeForInitiator () {
      // 发送砍刀请求后
      this.$rest.active.waresBargain.bargaining(null, this.idObj.bargain_id).then(res => {
        if (res.code === 0) {
          let amount = res.data.amount
          // 更新砍价总额
          this.activityInfo.bargain.amount += amount
          // 显示兑换优惠券按钮
          this.activityInfo.current_user_bargain_amount = amount
          // 更新排行榜
          this.activityInfo.bargain_details.unshift({
            avatar: res.data.avatar,
            amount: amount,
            wechat_name: res.data.wechat_name
          })
          this.isBargain = true
        } else if (res.code === 401) {
          let next = encodeURIComponent('?_=1' + window.location.hash)
          // 未登录微信  auth/weixin/<int:store_id>?next=<str:target_url>&need_mobile_bind='false'
          window.location.href = 'auth/weixin/' + this.idObj.store_id + '?next=' + next + '&need_mobile_bind=false'
        } else if (res.code === 402) {
          // 跳转关注服务号页面
          this.$router.push({
            path: '/active/waresbargain/focus'
          })
        } else {
          // 若活动已关闭则弹出关闭提示并退出页面
          if (this.activityInfo.bargain.status === 3) {
            this.isClose()
          } else {
            this.showToast(res.message)
          }
        }
      })
    },
    gentleKnifeForFriend() {
      let activityId = this.idObj.activity_id
      let openid = this.idObj.openid
      // 确认活动状态
      this.$rest.active.waresBargain.getBargainInfo(null, `${openid}/${activityId}`).then(res => {
        if (res.code === 0 && res.data.bargain.have_convert_coupon === 0) {
          // 发送砍刀请求成功后
          this.$rest.active.waresBargain.bargaining(null, this.idObj.bargain_id).then(res => {
            if (res.code === 0) {
              this.activityInfo.current_user_bargain_amount = res.data.amount
              this.activityInfo.bargain_details.unshift({
                avatar: res.data.avatar,
                amount: res.data.amount,
                wechat_name: res.data.wechat_name
              })
              this.isBargain = true
            } else if (res.code === 401) {
              let next = encodeURIComponent('?_=1' + window.location.hash)
              window.location.href = 'auth/weixin/' + this.idObj.store_id + '?next=' + next + '&need_mobile_bind=false'
            } else if (res.code === 402) {
              this.$router.push({
                path: '/active/waresbargain/focus'
              })
            } else {
              // 若活动已关闭则弹出关闭提示并退出页面
              if (this.activityInfo.bargain.status === 3) {
                this.isClose()
              } else {
                this.showToast(res.message)
              }
            }
          })
        } else if (res.code === 0 && res.data.bargain.have_convert_coupon === 1) {
          this.activityInfo.bargain.have_convert_coupon = 1
          this.showToast('您好友已成功领取优惠券！')
        }
      })
    },
    share() {
      this.isShare = !this.isShare
      this.isBargain = !this.isBargain
    },
    // 发起游戏
    initiateGame() {
      if (this.activityInfo.bargain.status === 3) {
        this.isClose()
      } else {
        this.$router.push({
          path: '/active/waresbargain/index',
          query: {
            store_id: this.idObj.store_id,
            waresBargain_activity_id: this.idObj.activity_id
          }
        })
      }
    },
    // 发送 手机号和姓名
    sendUserInfo() {
      if (this.validateData()) {
        this.$rest.active.waresBargain.signup(this.signUpInfo, this.idObj.bargain_id).then(res => {
          if (res.code === 0) {
            this.isExchange = false
            this.activityInfo.bargain.have_convert_coupon = 1
          } else if (res.code === 402) {
            // 跳转关注服务号页面
            this.$router.push({
              path: '/active/waresbargain/focus'
            })
          } else {
            this.showToast(res.message)
          }
        })
      } else {
        this.showToast('请输入完整的个人信息')
      }
    },
    validateData () {
      let validateForm = true
      // let contactName = this.signUpInfo.contact_name
      let contactNumber = this.signUpInfo.contact_number
      // if (!contactName || !util.regexpMap.regexp_name_cn.test(contactName)) {
      //   validateForm = false
      //   this.showToast('请输入有效名字')
      // }
      if (!contactNumber || !util.regexpMap.regexp_mobile.test(contactNumber)) {
        validateForm = false
        this.showToast('请输入有效的电话号码')
      }
      return validateForm
    },
    // 分享
    send () {
      let friendUrl = window.location.href
      let imgUrl = this.activityInfo.bargain.wares_image_url
      let desc = `Hi, 朋友， 我是${this.activityInfo.initiator.wechat_name}，现在我正好看中了下面这款商品，赶快撸起你的袖子帮我砍！！砍！！砍！`
      this.$wechat.promise.then(wx => {
        wx.shareTimeline({
          title: '好友商品砍价',
          link: friendUrl,
          imgUrl: imgUrl
        })
        wx.shareAppMessage({
          title: '好友商品砍价',
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
  @import "../../../stylesheets/modules/active/waresbargain/result";
</style>
