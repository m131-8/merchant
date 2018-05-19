<template>
  <div class="owners-welfare">
    <p class="fn-pr padB-p">
      <img src="../../../stylesheets/images/BMW-owners-welfare/bmw-welfare.jpg" ref="titleImg"/>
    </p>
    <p class="fn-pf">
      <img src="../../../stylesheets/images/owners-welfare/owners-welfare05.png" />
      <button class="owners-welfare-btn" @click="isShow = !isShow">{{ isShow }}</button>
    </p>
    <div class="share-box">
      <x-dialog v-model="isShow" :hideOnBlur="true" class="share-dialog">
        <img src="../../../stylesheets/images/owners-welfare/owners-welfare-popup.png" class="owners-welfare-popup" />
      </x-dialog>
    </div>
  </div>
</template>
<script>
import {
  XDialog
} from 'cvux/src/components'

export default {
  components: {
    XDialog
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    this.$wechat.promise.then(wx => {
      wx.shareAppMessage({
        title: '领取福利',
        desc: '快来关注深圳宝昌官方微信号领取福利吧！',
        link: window.location.href,
        imgUrl: this.$refs.titleImg.src ? this.$refs.titleImg.src : ''
      })
    }, wx => {
      console.log('微信JSSDK校验错误:', wx.res)
    })
  }
}
</script>
<style lang="less">
@import "../../../stylesheets/modules/active/welfare";
</style>
