<template>
  <article>
    <group class="local-prepay">
      <cell title="预存金额">
        <div slot="value">{{priceTxt}}</div>
      </cell>
    </group>
    <section>
      <h2 class="title-bar">支付后即可获得</h2>
      <div class="list-total-con">
        <coupon-card v-for="coupon in data.coupons" :key="coupon.title" :item="coupon"></coupon-card>
      </div>
    </section>
    <x-button v-if="data.status_code !== 4 && data.status_code !== 5" class="bottom-btn" @click.native="toPay">立即支付</x-button>
  </article>
</template>
<script>
import CouponCard from '../personal/quo/CouponCard'
// import wxHelp from '../../common/wxhelp'
import {
  XButton,
  Cell,
  Group
} from 'cvux/src/components'
export default {
  components: {
    XButton,
    Cell,
    Group,
    CouponCard
  },
  data() {
    return {
      prepayId: '',
      data: {},
      isClicked: false
    }
  },
  created() {
    this.prepayId = this.$route.query.prepay_id
    // if (!wxHelp.wxFlag) { // 调用微信接口需要先线上校验接口
    //   wxHelp.wechatConfig().then(res => {
    //     wxHelp.wxFlag = true
    //   })
    // }
    if (this.prepayId) {
      this.getNoPaidInfo()
    } else {
      this.showToast('id不存在')
    }
  },
  methods: {
    getNoPaidInfo() {
      this.$rest.local.getEmployerOrder(null, this.prepayId).then(res => {
        if (res.code === 0) {
          this.data = res.data
        } else {
          this.showToast(res.message)
        }
      })
    },
    toPay() {
      if (this.isClicked) {
        return false
      }
      this.isClicked = true
      if (this.prepayId) {
        this.$rest.local.createOrderByEmployer(null, `prepay-order-by-staff-WXpayment/${this.prepayId}`).then(res => {
          if (res.code === 0) {
            let params = res.data
            this.$wechat.promise.then(wx => {
              wx.payByWx(params.appId, params.timeStamp, params.nonceStr, params.package, params.signType, params.paySign, () => {
                this.isClicked = false
                this.$router.push({
                  path: `/pre_succ/${this.data.amount}`
                })
              }, () => {
                this.isClicked = false
              }, () => {
                this.isClicked = false
              })
            }, wx => {
              console.log('微信JSSDK校验错误:', wx.res)
            })
          } else {
            this.isClicked = false
            this.showToast(res.message)
          }
        })
      } else {
        this.isClicked = false
        console.error(`do not exist prepayId ${this.prepayId}`)
      }
    }
  },
  computed: {
    priceTxt() {
      let price = this.data.amount
      let priceGet = ''
      if (price) {
        priceGet = '￥' + (price / 100).toFixed(2)
      } else {
        priceGet = '￥' + 0.00
      }
      return priceGet
    }
  }
}
</script>
<style lang="less">
@w2: 75rem;
.local-prepay .vux-no-group-title {
  margin-top: 20/@w2;
}

.list-total-con .vouchers .ps-r {
  top: 45/@w2;
}

.list-total-con .icon-prestore {
  height: 150/@w2;
}

.title-bar{
  font-size: 26/@w2;
  line-height: 60/@w2;
  padding-top: 30/@w2;
  color: #000;
  opacity: 0.7;
  text-indent: 30/@w2;
}
</style>
