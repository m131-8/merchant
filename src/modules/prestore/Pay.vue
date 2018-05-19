<template>
  <article class="commit-inquiry">
    <section class="tip-result">
      <i class="result-ico icon-tipico-monney"></i>
      <p class="result-hd">预存金额</p>
      <p class="result-price"><b class="fs24">￥</b>{{data.amount | formatePrice}}</p>
    </section>
    <section>
      <h2 class="title-bar">联系人</h2>
      <group gutter="0px">
        <x-input class='in-text' title="姓名" placeholder="请输入您的姓名" v-model="data.user_name"></x-input>
        <x-input class='in-text' title="手机号" :max="11" placeholder="请输入您的手机号" v-model="data.mobile"></x-input>
        <x-input class='in-text' title="车牌号" placeholder="请输入您的车牌号" v-model="data.plate_number"></x-input>
      </group>
    </section>
    <x-button class="bottom-btn" @click.native="submit">确认支付</x-button>
    <div class="tip-login" v-if="isShow">
      <div class="bg-filter"></div>
      <div class="tip-filter-box">
        <h3 class="title">{{title}}</h3>
        <div class="btn-confirm">
          <a class="btn btn-cancel" @click.stop="cancel">取消</a><a class="btn" :href="'tel:' + mobile_number">立即联系</a>
        </div>
      </div>
    </div>
    <!--   <confirm v-model="isShow" title="confirm deleting the item" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
    <p style="text-align:center">Are you sure?</p>
  </confirm> -->
  </article>
</template>
<script>
import {
  Group,
  XInput,
  // Confirm,
  XButton
} from 'cvux/src/components'
import util from '../../common/util'
// import wxHelp from '../../common/wxhelp'

export default {
  components: {
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      data: {
        mobile: '',
        amount: '',
        plate_number: '',
        user_name: ''
      },
      isShow: false,
      title: '',
      mobile_number: ''
    }
  },
  created() {
    this.data.amount = this.$route.query.amount
    this.data.mobile = this.$route.query.mobile
    // if (!wxHelp.wxFlag) {
    //   wxHelp.wechatConfig().then(res => {
    //     wxHelp.wxFlag = true
    //   })
    // }
  },
  filters: {
    formatePrice(price) {
      return (price / 100).toFixed(2)
    }
  },
  methods: {
    submit() {
      let isClicked = ''
      if (!util.regexpMap.regexp_name_cn.test(this.data.user_name) && !util.regexpMap.regexp_name_en.test(this.data.user_name)) {
        this.showToast('请输入您的姓名')
        return false
      } else if (!util.regexpMap.regexp_name_en.test(this.data.user_name) && this.data.user_name.length > 30) {
        this.showToast('联系人英文姓名需小于30个字符')
        return false
      }
      if (!util.regexpMap.regexp_mobile.test(this.data.mobile)) {
        this.showToast('请输入正确的手机号码')
        return false
      }
      if (!util.regexpMap.car_plate_number.test(this.data.plate_number)) {
        this.showToast('请输入您的车牌号,如粤A12345')
        return false
      }
      if (isClicked) {
        return false
      }
      isClicked = true
      this.$rest.prestore.preCommit(this.data, `create-prepay-order-by-user`).then(res => {
        if (res.code === 0) {
          let params = res.data
          this.$wechat.promise.then(wx => {
            wx.payByWx(params.appId, params.timeStamp, params.nonceStr, params.package, params.signType, params.paySign, (res) => {
              isClicked = false
              this.$router.push(`/prestore/success/${this.data.amount}`)
            }, (res) => {
              isClicked = false
            }, (res) => {
              this.showToast(res)
              isClicked = false
            })
          }, wx => {
            console.log('微信JSSDK校验错误:', wx.res)
          })
        } else if (res.code === 444) {
          isClicked = false
          this.title = res.message
          this.mobile_number = res.data.mobile_number
          this.isShow = true
        } else {
          isClicked = false
          this.showToast(res.message)
        }
      })
    },
    cancel() {
      this.isShow = false
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/prestore/pay";
</style>
