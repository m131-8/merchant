<template>
  <article>
    <div class="product-detail" v-html="description">
    </div>
  </article>
</template>
<script>
  export default {
    data () {
      return {
        description: ''
      }
    },
    created () {
      this.description = this.$route.query.description
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../stylesheets/modules/active/waresbargain/detail";
</style>
