<template>
  <article class="commit-inquiry">
    <section class="tip-result">
      <i class="result-ico icon-tipico-ok"></i>
      <p class="result-hd">已预约</p>
      <p class="result-info">服务顾问{{info.name}}将为您做好接车准备<br/>欢迎届时光临</p>
    </section>
    <section class="btn-bottom">
      <div class="activity-title-b db">
        <a :href="`tel:${info.mobile_number}`"><i class="icon-phone"></i>电话咨询</a>
        <a href="javascript:void(0);" @click.stop="goWx"><i class="icon-wx"></i>微信咨询</a>
      </div>
    </section>
  </article>
</template>
<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  created() {
    this.info = {
      name: this.$route.query.name,
      mobile_number: this.$route.query.mobile_number
    }
    console.log(this.info)
  },
  methods: {
    goWx() {
      this.$wechat.promise.then(wx => {
        window.WeixinJSBridge.call('closeWindow')
      }, wx => {
        console.log('微信JSSDK校验错误:', wx.res)
      })
    }
  }
}
</script>
<style scoped lang="less">
@import "../../stylesheets/modules/usedcar/success";
</style>
