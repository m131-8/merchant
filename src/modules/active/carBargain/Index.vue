<template>
  <article>
    <div class="car-kanjia kj-bg1">
      <div class="car-kanjia-ban">
        <img src="../../../stylesheets/images/car-bargain/car-kanjia-ban.png" />
      </div>
      <div class="carkj-main">
        <p class="mt45">
          <button class="carkj-btn-s" @click="getCarSeries">
            <em class="carkj-car"></em>
            <span class="shrink-title">{{chooseCarInfo.name ? chooseCarInfo.name : '选择车型'}}</span>
            <i></i>
          </button>
        </p>
        <p class="mt120">
          <button class="carkj-btn-s carkj-btn-b" @click="share">
            <span>喊兄弟来砍价</span>
            <i></i>
          </button>
        </p>
      </div>
      <div class="carkj-info">
        <h4>活动规则:</h4>
        <p>1、仅限本次活动有效</p>
        <p>2、邀请的朋友越多砍到的价格越多</p>
        <p>3、砍价金额可以兑换成购车优惠券</p>
      </div>
    </div>
    <div class="share-box">
      <x-dialog v-model="isShow" :hideOnBlur="true">
        <img src="../../../stylesheets/images/share-box.png" />
      </x-dialog>
    </div>
    <popup v-model="showCarSeries" height="100%">
      <group :title="carseries.brand">
        <cell is-link :title="value" @click.native="getCarModels(key)" v-for="(value, key) in carseries.car_series" :key="key">
        </cell>
      </group>
    </popup>
    <popup v-model="showCarModels" height="100%">
      <group :title="carmodels.car_series_name">
        <cell class="select-carmodels" @click.native="getCarInfo(item)" v-for="item in carmodels.car_models" :key="item.name">
          <img :src="item.image_url" alt="" slot="icon" style="display: block;" />
          <div slot="after-title">
            <p>{{item.name}}</p>
          </div>
        </cell>
      </group>
    </popup>
  </article>
</template>
<script>
import {
  XDialog,
  Group,
  Cell,
  Radio,
  Popup
} from 'cvux/src/components'
import util from '../../../common/util'
// import wxHelp from '../../../common/wxhelp'

export default {
  components: {
    XDialog,
    Group,
    Cell,
    Radio,
    Popup
  },
  data() {
    return {
      activityInfo: {},
      isShow: false,
      openid: '',
      activityId: '',
      carModelsId: '',
      carseries: {},
      carmodels: {},
      chooseCarInfo: {},
      showCarModels: false,
      showCarSeries: false
    }
  },
  mounted() {
    this.activityId = this.$route.query.carBargain_activity_id
    if (this.activityId) {
      this.$rest.active.carBargain.getActivityInfo(null, this.activityId).then(res => {
        if (res.code === 0) {
          this.openid = res.data.openid
            // 发起过活动
          if (res.data.already_initiate) {
            this.$router.push({
              path: '/active/carbargain/result',
              query: {
                openid: this.openid,
                carBargain_activity_id: this.activityId
              }
            })
          } else {
            // 未发起过活动
            this.activityInfo = res.data
            this.judgmentState(res.data.status)
          }
        } else if (res.code === 401) {
          let next = encodeURIComponent('?_=1' + window.location.hash)
            // 未登录微信  auth/weixin/<int:store_id>?next=<str:target_url>&need_mobile_bind='false'
          window.location.href = 'auth/weixin/login?next=' + next + '&need_mobile_bind=false'
        }
      })
    } else {
      this.showToast('activityId不存在')
    }
  },
  methods: {
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
    getCarModels(carSeriesId) { // 获取车型
      if (this.activityId && carSeriesId) {
        this.$rest.active.carBargain.getCarModels(null, `${this.activityId}/${carSeriesId}`).then(res => {
          if (res.code === 0) {
            this.carmodels = res.data
            this.showCarSeries = false
            this.showCarModels = true
          } else if (res.code === 402) {
            // 跳转关注服务号页面
            this.$router.push({
              path: '/active/carBargain/focus'
            })
          } else {
            this.showToast(res.message)
          }
        })
      } else {
        this.showToast('carSeriesId不存在')
      }
    },
    getCarSeries() { // 选择车系
      // status=5：活动已关闭状态，禁止选择车型
      if (this.activityInfo.status === 5) {
        this.judgmentState(this.activityInfo.status)
      } else {
        if (this.activityId) {
          this.$rest.active.carBargain.getCarSeries(null, this.activityId).then(res => {
            if (res.code === 0) {
              this.carseries = res.data
              this.showCarSeries = true
            } else if (res.code === 402) {
              // 跳转关注服务号页面
              this.$router.push({
                path: '/active/carBargain/focus'
              })
            } else {
              this.showToast(res.message)
            }
          })
        } else {
          this.showToast('activityId不存在')
        }
      }
    },
    getCarInfo(carInfo) { // 选择车型
      this.chooseCarInfo = carInfo
      this.send()
      this.showCarModels = false
    },
    share() { // 喊兄弟来砍价
      // status=5：活动已关闭状态，禁止分享活动功能
      if (this.activityInfo.status === 5) {
        this.isShow = false
        this.judgmentState(this.activityInfo.status)
      } else {
        if (this.chooseCarInfo.id) {
          this.isShow = !this.isShow
        } else {
          this.showToast('请选择车型')
        }
      }
    },
    initiate() {
      // 发起游戏
      this.$rest.active.carBargain.initiateBargain(null, `${this.activityId}/${this.chooseCarInfo.id}`).then(res => {
        if (res.code === 0) {
          this.$router.push({
            path: '/active/carbargain/result',
            query: {
              openid: this.openid,
              carBargain_activity_id: this.activityId
            }
          })
        } else if (res.code === 402) {
          this.$router.push({
            path: '/active/carbargain/focus'
          })
        } else {
          this.showToast(res.message)
        }
      })
    },
    send() {
      let self = this
      let imgUrl = this.chooseCarInfo.image_url
      let friendUrl = window.location.href.replace('index', 'result') + `&openid=${this.openid}`
      let desc = `Hi, 朋友， 我是${this.activityInfo.wechat_name}，现在我正好看中了下面这款商品，赶快撸起你的袖子帮我砍！！砍！！砍！`
      let httpUrl = `/api/v1/activity/initiate-car-bargain/${this.activityId}/${this.chooseCarInfo.id}`
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
                path: '/active/carbargain/focus'
              })
            })
          },
          cancel: () => {}
        })
        wx.shareAppMessage({
          title: '好友商品砍价',
          imgUrl: imgUrl,
          link: friendUrl,
          desc: desc,
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
@import "../../../stylesheets/modules/active/carbargain/index";
@w2: 75rem;
.carkj-btn-s {
  .weui_cells {
    background-color: transparent;
    font-size: 14/@w2;
    &:before {
      border-top: none;
    }
    &:after {
      border-bottom: none;
    }
    .weui_cell {
      padding: 22.5/@w2 45/@w2 22.5/@w2 112.5/@w2;
    }
  }
}
</style>
