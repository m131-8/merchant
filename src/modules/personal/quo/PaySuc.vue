<template>
  <!-- 询价成功 -->
  <article class="commit-inquiry">
    <section class="tip-result">
      <i class="result-ico icon-tipico-ok"></i>
      <p class="result-hd">已支付保费</p>
      <p class="result-info opacity4">保单已出，正在为你寄送。</p>
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
  .result-info {
    margin-top: 28/@w2;
  }
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
