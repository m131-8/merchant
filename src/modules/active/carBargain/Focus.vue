<template>
  <article class="kj-bg2">
    <div class="car-kanjia-ban">
      <img src="../../../stylesheets/images/car-bargain/car-kanjia-ban.png" />
    </div>
    <div class="carkj-activity">
      <div class="carkj-rules">
        <h4>活动规则: </h4>
        <p><em></em>邀请到的朋友越多砍到的价格越多: </p>
        <p><em></em>砍价金额可以兑换成购车优惠券: </p>
        <p><em></em>仅限已关注微信公众号用户才可发起砍价活动: </p>
      </div>
      <div class="carkj-rules">
        <div class="carkj-rules-l fl">
          <h4>长按二维码快速关注我们</h4>
          <p>{{data.store_name}}</p>
          <p>微信号: {{data.wechat_number}}</p>
        </div>
        <div class="carkj-rules-r fr">
          <p><img :src="data.qrcode"></p>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.$rest.active.getStoreInfo().then(res => {
      if (res.code === 0) {
        this.data = res.data
      } else {
        this.showToast(res.message)
      }
    }, (res) => {
      if (res.status === 401) {
        let next = encodeURIComponent('?_=1' + window.location.hash)
          // res = JSON.parse(res.response)
        res = res.json()
        if (res.code === 401) {
          // 未登录微信  auth/weixin/<int:store_id>?next=<str:target_url>&need_mobile_bind='false'
          window.location.href = 'auth/weixin/login?next=' + next + '&need_mobile_bind=false'
        }
      }
    })
  }
}
</script>
<style lang="less" scoped>
@import "../../../stylesheets/modules/active/carbargain/focus";
</style>
