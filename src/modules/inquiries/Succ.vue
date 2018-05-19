<template>
  <!-- 询价成功 -->
  <article class="commit-inquiry">
    <section class="tip-result">
      <i class="result-ico icon-tipico-ok"></i>
      <p class="result-hd">已提交询价</p>
      <p class="result-info opacity4">报价单将在30分钟内推送给你，请留意。</p>
    </section>
    <footer class="footer" v-if="!isDOS">
      <em class="icon-logo-zs"></em>中升集团
    </footer>
  </article>
</template>
<script>
  export default {
    computed: {
      isDOS() {
        return this.$store.state.isDOS
      }
    }
  }
</script>
<style scopped lang="less">
@w2: 75rem;
.commit-inquiry {
  background: #fff;
  height: 100%;
  .tip-result {
    background: #fff;
    padding: 42/@w2;
    text-align: center;
    .result-ico {
      display: block;
      margin: 56/@w2 auto 44/@w2;
      width: 150/@w2;
      height: 150/@w2;
    }
    .result-hd {
      color: #000;
      font-size: 30/@w2;
    }
    .result-info {
      line-height: 40/@w2;
      margin-top: 56/@w2;
      color: #969696;
      font-size: 26/@w2;
    }
  }
  // .result-info {
  //   margin-top: 28/@w2;
  // }
}

footer.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20/@w2;
  text-align: center;
  color: #b8b8b8;
  font-size: 22/@w2;
}
</style>
