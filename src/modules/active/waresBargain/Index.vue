<template>
  <article>
    <div class="bargain-wrap">
      <div class="countdown" v-show="activityInfo.status !== 5">
        活动倒计时:
        <clocker :time="activityInfo.expires_at" slot="value">
          <span class="day">%D</span>天
          <span class="day">%H</span>时
          <span class="day">%M</span>分
          <span class="day">%S</span>秒
        </clocker>
      </div>
      <div class="bargain-info">
        <img src="../../../stylesheets/images/wares-bargain/bargain-info.png" />
      </div>
      <div class="bargain-user">
        <img :src="activityInfo.avatar" class="bargain-user-pic" />
        <span>{{ activityInfo.wechat_name }}</span>
      </div>
      <div class="bargain-banner">
        <img :src="activityInfo.wares_image_url" />
      </div>
      <div class="bargain-btn">
        <router-link :to="{ path: '/active/waresbargain/detail', query: { description: this.activityInfo.description}}" v-show="activityInfo.status !== 5"><span class="blue-btn">商品详情</span></router-link>
        <span class="red-btn" @click.stop="isShowOrNot">喊兄弟来砍价</span>
      </div>
      <div class="bargain-mes mt120">
        <div class="bargain-mes-t"></div>
        <div class="bargain-mes-list">
          <p>
            <em></em> 将活动分享至朋友圈后通知朋友参加活动砍价；
          </p>
          <p>
            <em></em> 时间结束后朋友砍价的金额将会成为您兑换优惠券的金额;
          </p>
          <p>
            <em></em> 砍的人越多优惠越多;
          </p>
        </div>
        <span class="rotate-span">砍价排行榜</span>
      </div>
    </div>
    <div class="share-box">
      <x-dialog v-model="isShow" :hideOnBlur="true">
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
  XDialog
} from 'cvux/src/components'
export default {
  components: {
    Clocker,
    XDialog
  },
  data() {
    return {
      activityInfo: {},
      openid: '',
      isShow: false,
      activityId: '',
      isBargain: false,
      isFocus: false,
      data: {}
    }
  },
  mounted() {
    this.activityId = this.$route.query.waresBargain_activity_id
    if (this.activityId) {
      this.$rest.active.waresBargain.getActivityInfo(null, this.activityId).then((res) => {
        if (res.code === 0) {
          this.openid = res.data.openid
          if (res.data.already_initiate) {
            // 发起过活动
            this.$router.push({
              path: '/active/waresbargain/result',
              query: {
                openid: this.openid,
                waresBargain_activity_id: this.activityId
              }
            })
          } else {
            // 未发起过活动
            this.activityInfo = res.data
            this.judgmentState(res.data.status)
          }
        } else if (res.code === 402) {
          // 跳转关注服务号页面
          this.$rest.active.getStoreInfo().then(res => {
            if (res.code === 0) {
              this.data = res.data
              this.isFocus = true
            } else if (res.code === 401) {
              let next = encodeURIComponent('?_=1' + window.location.hash)
                // 未登录微信  auth/weixin/<int:store_id>?next=<str:target_url>&need_mobile_bind='false'
              window.location.href = 'auth/weixin/login?next=' + next + '&need_mobile_bind=false'
            } else {
              this.showToast(res.message)
            }
          })
        } else if (res.code === 401) {
          let next = encodeURIComponent('?_=1' + window.location.hash)
            // 未登录微信  auth/weixin/<int:store_id>?next=<str:target_url>&need_mobile_bind='false'
          window.location.href = 'auth/weixin/login?next=' + next + '&need_mobile_bind=false'
        }
      })
    } else {
      this.showToast('id不存在')
    }
  },
  methods: {
    // 是否展示分享
    isShowOrNot() {
      if (this.activityInfo.status === 5) {
        this.isShow = false
        this.judgmentState(this.activityInfo.status)
      } else {
        this.isShow = true
      }
    },
    judgmentState(status) {
      switch (status) {
        case 1:
          this.showToast('活动未开始')
          setTimeout(() => {
            this.$wechat.promise.then(wx => {
              window.WeixinJSBridge.call('closeWindow')
            }, wx => {
              console.log('微信JSSDK校验错误:', wx.res)
            })
          }, 1000)
          break
        case 2:
          this.send()
          break
        case 3:
          this.showToast('活动已结束')
          setTimeout(() => {
            this.$wechat.promise.then(wx => {
              window.WeixinJSBridge.call('closeWindow')
            }, wx => {
              console.log('微信JSSDK校验错误:', wx.res)
            })
          }, 1000)
          break
        case 4:
          this.showToast('活动已删除')
          setTimeout(() => {
            this.$wechat.promise.then(wx => {
              window.WeixinJSBridge.call('closeWindow')
            }, wx => {
              console.log('微信JSSDK校验错误:', wx.res)
            })
          }, 1000)
          break
        case 5:
          this.showToast('活动已关闭')
          setTimeout(() => {
            this.$wechat.promise.then(wx => {
              window.WeixinJSBridge.call('closeWindow')
              this.$wechat.hideOptionMenu()
            }, wx => {
              console.log('微信JSSDK校验错误:', wx.res)
            })
          }, 1000)
          break
      }
    },
    initiate() {
      // 发起游戏
      this.$rest.active.waresBargain.initiateBargain(null, this.activityId).then(res => {
        if (res.code === 0) {
          this.$router.push({
            path: '/active/waresbargain/result',
            query: {
              openid: this.openid,
              waresBargain_activity_id: this.activityId
            }
          })
        } else if (res.code === 402) {
          this.$router.push({
            path: '/active/waresbargain/focus'
          })
        } else {
          this.showToast(res.message)
        }
      })
    },
    send() {
      let self = this
      let imgUrl = this.activityInfo.wares_image_url
      let friendUrl = window.location.href.replace('index', 'result') + `&openid=${this.openid}`
      let desc = `Hi, 朋友， 我是${this.activityInfo.wechat_name}，现在我正好看中了下面这款商品，赶快撸起你的袖子帮我砍！！砍！！砍！`
      let httpUrl = `/api/v1/activity/initiate-wares-bargain/${this.activityId}`
      this.$wechat.promise.then(wx => {
        wx.shareTimeline({
          title: '好友商品砍价',
          imgUrl: imgUrl,
          link: friendUrl,
          success: () => {
            util.sendAjax('POST', httpUrl, null, function() {
              window.location.href = friendUrl
            }, function() {
              self.$router.push({
                path: '/active/waresbargain/focus'
              })
            })
          },
          cancel: () => {}
        })
        wx.shareAppMessage({
          title: '好友商品砍价',
          imgUrl: imgUrl,
          desc: desc,
          link: friendUrl,
          success: () => {
            this.initiate()
          },
          cancel: () => {}
        })
      }, wx => {
        console.log('微信JSSDK校验错误:', wx.res)
      })
    }
  }
}
</script>
<style lang="less">
@import "../../../stylesheets/modules/active/waresbargain/index";
</style>
