<template>
  <article :class="{'hide': needHide}">
    <p class="pay-bg-dfe4f0" v-if="data.paid === 0">最终价格以出单为准</p>
    <section class="tagPay">
      <cell :title="data.plate_number" :inline-desc="data.vin" class="pay-car-info">
        <img slot="icon" :src="data.brand_logo_url" class="select-img">
      </cell>
    </section>
    <section class="bg-white">
      <div class="tit-top">
        <cell :title="`投保险种`" v-if="data.is_hide_insurance_company"></cell>
        <cell :title="`投保公司：${data.company_name}`" v-else></cell>
      </div>
      <div v-for="insure in data.insures" :key="insure.name" class="cell-height">
        <cell :title="insure.name">
          <!-- <span slot="after-title" class="col-grey">{{`(${data.insurance_effected_on}--${data.insurance_expires_on})`}}</span> -->
          <span slot="after-title" class="col-grey">{{insure.category_code, flag, time | isShowTime}}</span>
          <span slot="icon" class="hd"></span>
          <div slot="value" class="cl-black">{{insure.price | priceTxt}}</div>
        </cell>
        <div v-if="insure.items" v-for="item in insure.items" :key="item.code" class="insurance-content">
          <p v-if="item.code === 'zz0019'" class="detail-hd special-ins">{{item | getString}}
            <a class="color" @click.stop="clickFn">{{'(服务说明)'}}</a>
          </p>
          <p v-else class="detail-hd">{{item | getString}}</p>
        </div>
      </div>
      <div class="list-total">
        <p><span>合计</span><i class="fc-fb3f3f">{{data.total_price | priceTxt}}</i></p>
        <div v-if="data.prepay">
          <p><span>预存金</span><i class="fc-fb3f3f">{{'-￥' + (data.prepay / 100).toFixed(2)}}</i></p>
          <p class="fs15"><span>{{getStatusCode}}</span><i class="fc-fb3f3f">{{getMinus}}</i></p>
        </div>
        <div v-else>
          <p class="fs15"><span>{{getStatusCode}}</span><i class="fc-fb3f3f">{{data.total_price |
            priceTxt}}</i></p>
        </div>
      </div>
    </section>
    <section v-if="data.paid === 0 && data.coupons.length !== 0">
      <h2 class="title-bar">支付后即可获得</h2>
      <div class="list-total-con">
        <coupon-card v-for="coupon in data.coupons" :key="coupon.title" :item="coupon"></coupon-card>
      </div>
    </section>
    <section v-if="data.custom_message">
      <h2 class="title-bar">备注</h2>
      <div class="continue-mes newline" v-html="data.custom_message"></div>
    </section>
    <section class="btn-bottom mb5">
      <div v-if="data.status_code === 4" class="pay-bottom db">
        <a :href="`tel:${data.offerer_mobile}`"><i class="icon-phone-green"></i>咨询顾问</a>
        <a href="javascript:void(0);" class="pay-btn btn-a0a0a0">报价已失效</a>
      </div>
      <div v-else class="pay-bottom db">
        <a :href="`tel:${data.offerer_mobile}`" v-if='data.paid === 0'><i class="icon-phone-green"></i>咨询顾问</a>
        <a href="javascript:void(0);" class="pay-btn" v-if='data.paid === 0' @click.stop="toPay">去支付</a>
        <a :href="`tel:${data.offerer_mobile}`" style="color: #fff;" v-else class="btn"><i class="icon-phone-white"></i>咨询顾问</a>
      </div>
    </section>
  </article>
</template>
<script>
import CouponCard from './CouponCard'
// import wxHelp from '../../../common/wxhelp'
import {
  Cell,
  Group
} from 'cvux/src/components'

export default {
  components: {
    Cell,
    Group,
    CouponCard
  },
  data() {
    return {
      flag: false,
      time: '',
      data: {},
      isInited: false,
      id: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    // if (!wxHelp.wxFlag) { // 调用微信接口需要先线上校验接口
    //   wxHelp.wechatConfig().then(res => {
    //     wxHelp.wxFlag = true
    //   })
    // }
    if (this.id) {
      this.getNoPaidInfo()
    } else {
      this.showToast('id不存在')
    }
    // let promise = wxHelp.wechatConfig()
    // if (this.id) {
    //   if (wxHelp.wxFlag) {
    //     this.getNoPaidInfo()
    //   } else {
    //     promise.then((res) => this.getNoPaidInfo())
    //   }
    // }
  },
  methods: {
    getNoPaidInfo() {
      this.$rest.personal.quo.getNoPaidInfo(null, this.id).then(res => {
        let _this = this
        if (res.code === 0) {
          this.data = res.data
          this.isInited = true
          this.time = `(${this.data.insurance_effected_on}--${this.data.insurance_expires_on})`
          this.data.insures.forEach((v) => {
            if (v.category_code === 'commercial') {
              _this.flag = true
            }
          })
        } else {
          this.showToast(res.message)
        }
      })
    },
    clickFn() {
      this.$router.push('/personal/quo/intudeuce')
    },
    toPay() {
      let isClicked = ''
      if (isClicked) {
        return false
      }
      isClicked = true
      if (this.id) {
        this.$rest.personal.createInquiryOrder(null, `create-ins-order/${this.id}`).then(res => {
          if (res.code === 0) {
            let params = res.data
            this.$wechat.promise.then(wx => {
              wx.payByWx(params.appId, params.timeStamp, params.nonceStr, params.package, params.signType, params.paySign, () => {
                isClicked = false
                this.$router.push('/personal/quo/paysuc')
              }, () => {
                isClicked = false
              }, () => {
                isClicked = false
              })
            }, wx => {
              console.log('微信JSSDK校验错误:', wx.res)
            })
          } else {
            isClicked = false
            this.showToast(res.message)
          }
        })
      } else {
        isClicked = false
      }
    }
  },
  computed: {
    needHide() {
      return !this.isInited
    },
    getStatusCode() {
      let Code = this.data.status_code
      let Status = ''
      switch (Code) {
        case 2:
          Status = '已付金额'
          break
        case 3:
          Status = '已付金额'
          break
        default:
          Status = '应付金额'
          break
      }
      return Status
    },
    getMinus() {
      let m1 = this.data.total_price
      let m2 = this.data.prepay
      return '￥' + ((m1 - m2) / 100).toFixed(2)
    }
  },
  filters: {
    isShowTime(val, flag, time) {
      let isTime = ''
      if (val === 'commercial') {
        isTime = time
      } else if (!flag && (val === 'tax' || val === 'compulsory')) {
        isTime = time
      }
      return isTime
    },
    priceTxt(price) {
      let priceGet = ''
      if (price) {
        priceGet = '￥' + (price / 100).toFixed(2)
      } else {
        priceGet = '￥' + 0.00
      }
      return priceGet
    },
    getString(obj) {
      if (!obj) return ''
      let str = ''
      let name = obj.name
      let code = obj.code
      let pop = obj.properties
      if (!pop) return name
      str = name + ' '
      if (pop.select_ndi) {
        str += '- 不计免赔 '
      }
      if (code === 'mb0005') {
        str += '(' + pop.count + pop.unit + '*'
        if (pop.coverage_unit) {
          str += pop.coverage + pop.coverage_unit
        } else {
          str += pop.coverage + '元'
        }
        str += ')'
      } else if (code === 'ma0006' || code === 'zz0019') {
        str += '(' + pop.glass_type + ')'
      } else {
        if (pop.coverage_unit) {
          str += '(' + pop.coverage + pop.coverage_unit + ')'
        } else if (pop.coverage) {
          str += '(' + pop.coverage + '元)'
        }
      }
      return str
    }
  }
}
</script>
<style lang="less">
@import "../../../stylesheets/modules/personal/quo/pay";
</style>
