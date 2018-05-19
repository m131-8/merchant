<template>
  <div class="owners-welfare">
    <p>
      <img src="../../../stylesheets/images/owners-welfare/owners-welfare01.jpg" ref="titleImg" />
    </p>
    <p class="fn-pr">
      <img src="../../../stylesheets/images/owners-welfare/owners-welfare02.jpg" />
      <img :src="data.logo" class="owners-welfare-logo" />
    </p>
    <p>
      <img src="../../../stylesheets/images/owners-welfare/owners-welfare03.jpg" />
    </p>
    <p class="fn-pr padB-p">
      <img src="../../../stylesheets/images/owners-welfare/owners-welfare04.jpg" />
      <img :src="data.qrcode" class="owner-welfare-ewm" />
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
// import wxHelp from '../../../common/wxhelp'

export default {
  components: {
    XDialog
  },
  data() {
    return {
      data: {},
      isShow: false
    }
  },
  created() {
    this.$rest.active.getStoreInfo().then(res => {
      if (res.code === 0) {
        this.data = res.data
      } else {
        this.showToast(res.message)
      }
    })
  },
  mounted() {
    this.$wechat.promise.then(wx => {
      wx.shareAppMessage({
        title: '车主福利',
        desc: '关注公众号，免费领取礼品一份>>',
        link: window.location.href,
        imgUrl: this.$refs.titleImg ? this.$refs.titleImg : ''
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
