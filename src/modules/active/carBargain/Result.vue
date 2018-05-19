<template>
  <article class="exchange-car">
    <div class="car-kanjia kj-bg3">
      <div class="forward-time" v-show="activityInfo.bargain.status !== 3">
        活动倒计时:
        <clocker :time="activityInfo.bargain.expires_at" slot="value">
          <span class="day">%D</span>天
          <span class="day">%H</span>时
          <span class="day">%M</span>分
          <span class="day">%S</span>秒
        </clocker>
      </div>
      <div class="forward-user">
        <img :src="activityInfo.initiator.avatar" class="forward-user-pic" />
        <span>Hi，朋友，我是{{ activityInfo.initiator.wechat_name }}，现在我正好看中了一款{{ activityInfo.bargain.car_name }}，赶快撸起你的袖子帮我砍！！砍！！砍！</span>
      </div>
      <img src="../../../stylesheets/images/car-bargain/villain.png" class="villain-pic" />
      <div class="forward-main">
        <div class="forward-car">
          <img :src="activityInfo.bargain.car_image_url" />
        </div>
        <div class="forward-btn">
          <p>
            <img src="../../../stylesheets/images/car-bargain/car-kan.png" />
            <span>已砍 <em>{{ activityInfo.current_user_bargain_amount | formatePrice }}</em> 元</span>
          </p>
          <p class="dis-p gentleKnife" v-if="isInitiator">
            <button class="carkj-btn-s" v-if="status === 3" @click="checkNow"><span>查看优惠券</span></button>
            <!-- 未兑换 -->
            <button class="carkj-btn-s" :class="{'fn-hide': expired}" v-if="status === 2" @click="isShowOrNot"><span>继续分享</span></button>
            <button class="carkj-btn-s carkj-btn-blue" v-if="status === 2" @click="overActivity"><span>兑换购车券</span></button>
            <button class="carkj-btn-s carkj-btn-b" v-if="status === 1" @click="gentleKnifeForInitiator"><span>温柔一刀</span></button>
          </p>
          <p class="dis-p gentleKnife" v-else>
            <button class="carkj-btn-s carkj-btn-b" v-if="status === 3" @click="initiateGame"><span>我也要玩</span></button>
            <button class="carkj-btn-s" v-if="status === 2" @click="initiateGame"><span>我也要玩</span></button>
            <button class="carkj-btn-s" v-if="status === 2" @click="isShowOrNot"><span>找朋友帮忙</span></button>
            <button class="carkj-btn-s carkj-btn-b" v-if="status === 1" @click="gentleKnifeForFriend"><span>温柔一刀</span></button>
          </p>
        </div>
        <div class="car-kj-info">
          <p class="tips activity-end" v-if="isInitiator">您已收到了 <em>{{ activityInfo.bargain.amount | formatePrice}}</em>元，人多力量大快快去转发</p>
          <p class="tips activity-end" v-else>你已经砍了<em>{{activityInfo.current_user_bargain_amount | formatePrice}}</em>元，人多力量大快快去转发</p>
        </div>
      </div>
      <div class="forward-bottom">
        <div class="forward-rules">
          <h4>- 砍价排行 -</h4>
          <div class="bargain-mes-list forward-list">
            <ul v-if="activityInfo.bargain_details.length">
              <li v-for="item in activityInfo.bargain_details">
                <div class="bargain-mes-fr fl">
                  <span>
                    <img :src="item.avatar" />
                  </span>
                  <span>
                    <em>{{ item.wechat_name }} 砍了 {{ item.amount | formatePrice}} 元</em>
                  </span>
                </div>
                <div class="bargain-mes-cash fr">
                  <em><i>{{ item.amount | formatePrice}}</i>元</em>
                </div>
              </li>
            </ul>
            <h4 class="no-friend" v-else>穷到没朋友。。T_T呜呜。。。 </h4>
          </div>
        </div>
      </div>
    </div>
    <!-- 分享弹窗 -->
    <div class="share-box">
      <x-dialog v-model="isShare" :hideOnBlur="true">
        <img src="../../../stylesheets/images/share-box.png" />
      </x-dialog>
    </div>
    <!-- 显示自己砍价的金额 -->
    <popup v-model="isBargain" is-transparent>
      <div class="car-kanjia-popup">
        <div class="kanjia-popup-info">
          <p>已砍到</p>
          <p><b class="bargain">{{activityInfo.current_user_bargain_amount | formatePrice}}</b><span>元</span> </p>
          <p>力气已耗完，还差一点！快找伙伴来帮忙！</p>
          <p>
            <button class="carkj-btn-ss" @click="share">找朋友帮忙</button>
          </p>
        </div>
        <a href="javascript:;" class="kanjia-popup-close" @click.stop="isBargain = !isBargain"></a>
      </div>
    </popup>
    <!--兑换优惠券-->
    <popup v-model="isExchange" is-transparent>
      <div class="exchange-info">
        <h4>赶快输入您的联系方式兑换购车券吧~!</h4>
        <x-input title="姓名" required placeholder="姓名" v-model="signUpInfo.contact_name"></x-input>
        <x-input title="电话" :max="11" is-type="china-mobile" required placeholder="手机号码" v-model="signUpInfo.contact_number"></x-input>
      </div>
      <div class="exchange-btn">
        <x-button type="primary" @click="sendUserInfo">立即兑换</x-button>
      </div>
    </popup>
  </article>
</template>
<script>
import util from '../../../common/util'
// import wxHelp from '../../../common/wxhelp'
import {
  Clocker,
  Popup,
  XInput,
  XButton,
  XDialog
} from 'cvux/src/components'
export default {
  components: {
    Clocker,
    Popup,
    XInput,
    XButton,
    XDialog
  },
  data() {
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
  mounted() {
    let activityId = this.$route.query.carBargain_activity_id
    let openid = this.$route.query.openid
    if (openid && activityId) {
      this.idObj = {
        activity_id: activityId,
        openid: openid
      }
      this.$rest.active.carBargain.getBargainInfo(null, `${openid}/${activityId}`).then(res => {
        if (res.code === 0) {
          this.activityInfo = res.data
          this.idObj.bargain_id = res.data.bargain.id
            // 判断是发起者还是好友
          if (openid !== res.data.openid) {
            this.isInitiator = false
          }
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
    status() {
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
    checkNow() {
      if (this.activityInfo.bargain.status === 3) {
        this.isClose()
      } else {
        this.$router.push({
          path: '/active/bargain/coupon',
          query: {
            bargain_id: this.idObj.bargain_id,
            isCarOrWares: '1'
          }
        })
      }
    },
    // 点击兑换优惠券
    overActivity() {
      if (this.activityInfo.bargain.status === 3) {
        this.isClose()
      } else {
        let activityId = this.idObj.activity_id
        let openid = this.idObj.openid
        if (openid && activityId) {
          this.$rest.active.carBargain.getBargainInfo(null, `${openid}/${activityId}`).then(res => {
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
    gentleKnifeForInitiator() {
      // 发送砍刀请求后
      this.$rest.active.carBargain.bargaining(null, this.idObj.bargain_id).then(res => {
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
          window.location.href = 'auth/weixin/login?next=' + next + '&need_mobile_bind=false'
        } else if (res.code === 402) {
          // 跳转关注服务号页面
          this.$router.push({
            path: '/active/carbargain/focus'
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
      this.$rest.active.carBargain.getBargainInfo(null, `${openid}/${activityId}`).then(res => {
        if (res.code === 0 && res.data.bargain.have_convert_coupon === 0) {
          // 发送砍刀请求成功后
          this.$rest.active.carBargain.bargaining(null, this.idObj.bargain_id).then(res => {
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
              window.location.href = 'auth/weixin/login?next=' + next + '&need_mobile_bind=false'
            } else if (res.code === 402) {
              this.$router.push({
                path: '/active/carbargain/focus'
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
          path: '/active/carbargain/index',
          query: {
            carBargain_activity_id: this.idObj.activity_id
          }
        })
      }
    },
    // 发送 手机号和姓名
    sendUserInfo() {
      if (this.validateData()) {
        this.$rest.active.carBargain.signup(this.signUpInfo, this.idObj.bargain_id).then(res => {
          if (res.code === 0) {
            this.isExchange = false
            this.activityInfo.bargain.have_convert_coupon = 1
          } else if (res.code === 402) {
            // 跳转关注服务号页面
            this.$router.push({
              path: '/active/carbargain/focus'
            })
          } else {
            this.showToast(res.message)
          }
        })
      } else {
        this.showToast('请输入完整的个人信息')
      }
    },
    validateData() {
      let validateForm = true
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
    send() {
      let friendUrl = window.location.href
      let imgUrl = this.activityInfo.bargain.car_image_url
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
@import "../../../stylesheets/modules/active/carbargain/result";
</style>
