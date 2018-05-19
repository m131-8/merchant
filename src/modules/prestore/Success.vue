<template>
  <article class="commit-inquiry">
    <section class="tip-result">
      <i class="result-ico icon-tipico-ok"></i>
      <p class="result-hd">已预存保费</p>
      <p class="result-price"><b class="fs24">￥</b>{{amount}}</p>
      <p class="result-info1 ">优惠券将在24小时内发放到你的账户，可在“车险->我的->优惠券”查看。</p>
    </section>
    <footer class="footer" v-if="!isDOS">
      <em class="icon-logo-zs"></em>中升集团
    </footer>
  </article>
</template>
<script>
export default {
  data() {
    return {
      amount: ''
    }
  },
  created() {
    this.amount = this.$route.params.amount
  },
  computed: {
    isDOS() {
      return this.$store.state.isDOS
    }
  }
}
</script>
<style scoped lang="less">
@import "../../stylesheets/modules/prestore/success";
</style>
