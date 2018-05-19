<template>
  <article class="bargain-ewm">
    <div class="bargain-info">
      <img src="../../../stylesheets/images/wares-bargain/bargain-info.png" />
    </div>
    <div class="bargain-mes mt290">
      <div class="bargain-mes-t"></div>
      <div class="bargain-mes-list">
        <p>
          <em></em>将活动分享至朋友圈后通知朋友参与活动砍价;
        </p>
        <p><em></em>时间结束后朋友砍价的金额将会成为您兑换优惠券的金额;</p>
        <p><em></em>砍的人越多优惠越多。</p>
        <p><em></em>仅限已关注微信公众号用户才可发起砍价活动。</p>
        <div class="bargain-rules">
          <div class="carkj-rules-l fl">
            <h4>长按二维码快速关注我们</h4>
            <p>{{data.store_name}}</p>
            <p>微信号：{{data.wechat_number}}</p>
          </div>
          <div class="carkj-rules-r fr">
            <p><img :src="data.qrcode"></p>
          </div>
        </div>
      </div>
      <span class="rotate-span">砍价排行榜</span>
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
      } else if (res.code === 401) {
        let next = encodeURIComponent('?_=1' + window.location.hash)
          // 未登录微信  auth/weixin/<int:store_id>?next=<str:target_url>&need_mobile_bind='false'
        window.location.href = 'auth/weixin/login?next=' + next + '&need_mobile_bind=false'
      } else {
        this.showToast(res.message)
      }
    })
  }
}
</script>
<style lang="less" scoped>
@import "../../../stylesheets/modules/active/waresbargain/focus";
</style>
