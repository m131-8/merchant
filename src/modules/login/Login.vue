<template>
  <article class="login-page">
    <i class="icon-iphone"></i>
    <i class="icon-message"></i>
    <x-input class="mobile-code" :max="11" placeholder="请输入您的手机号" is-type="china-mobile" keyboard="number" v-model="data.mobile_number" />
    </x-input>
    <x-input class="message-code" :show-clear="false" placeholder="请输入短信验证码" v-model="data.verify_code" />
    </x-input>
    <verify-code v-model="options" @on-getCode="getCode"></verify-code>
    <x-button class="login-btn" @click="loginBtn">登录</x-button>
  </article>
</template>
<script>
import util from '../../common/util'
import {
  Cell,
  XButton,
  XInput,
  Group,
  VerifyCode
} from 'cvux/src/components'
export default {
  components: {
    Cell,
    XButton,
    XInput,
    Group,
    VerifyCode
  },
  data() {
    return {
      backUrl: '',
      data: {},
      options: {
        show: false,
        time: 60,
        start: false,
        codeText: '获取验证码'
      }
    }
  },
  created() {
    // let hashParams = url.parseHash(window.location.hash).params
    // this.backUrl = hashParams && hashParams.backUrl ? hashParams.backUrl : '/store/index'
    this.backUrl = this.$route.query.backUrl ? this.$route.query.backUrl : '/store/index'
      // 将backUrl中的serach部分拼接到hash之后
    let matchs = this.backUrl.match(/^\?([^#]*)([^?]*)(.*)/)
    if (matchs) {
      this.backUrl = matchs[2] + (matchs[3] ? (matchs[3] + '&' + matchs[1]) : ('?' + matchs[1]))
    }
  },
  methods: {
    loginBtn() {
      let loginData = {
        mobile: this.data.mobile_number,
        verify_code: this.data.verify_code
      }
      if (!util.regexpMap.regexp_mobile.test(loginData.mobile)) {
        this.showToast('请输入正确的手机号')
        return false
      }
      if (!util.regexpMap.regexp_captcha.test(loginData.verify_code)) {
        this.showToast('请输入短信验证码')
        return false
      }
      this.$rest.login.getLogin(loginData, `mobile-login`).then((res) => {
        if (res.code === 0) {
          window.location.href = window.location.href.split('#')[0] + this.backUrl
        }
      })
    },
    getCode() {
      let mobile = this.data.mobile_number
      if (!util.regexpMap.regexp_mobile.test(mobile)) {
        this.showToast('请输入正确的手机号')
        return false
      }
      if (mobile) {
        this.options.show = true
        this.$rest.login.getCaptchaCode(null, `verify_code/${mobile}`).then((res) => {
          if (res.code === 0) {
            this.options.show = false
            this.options.start = true
          } else {
            this.showToast(res.message)
          }
        })
      }
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/login/index";
</style>
