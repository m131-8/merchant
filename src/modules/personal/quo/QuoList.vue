<template>
  <article>
    <section v-if="display">
      <quo-item v-for="query in querys" :key="query.id" :item="query" :getTitle="query.plate_number" dataType="query"></quo-item>
      <quo-item v-for="offer in offers" :key="offer.id" :item="offer" :getTitle="offer.car_description" dataType="offer"></quo-item>
    </section>
    <section class="data-messages-null" v-else>
      <i class="icon-no-order"></i>
      没有报价单
    </section>
  </article>
</template>
<script>
import quoItem from './QuoItem'

export default {
  components: {
    quoItem
  },
  data() {
    return {
      display: false,
      querys: [],
      offers: []
    }
  },
  created() {
    this.$rest.personal.quo.getMyQuoList(null, 'my-ins-query-offer').then(res => {
      if (res.code === 0) {
        this.querys = res.data.querys
        this.offers = res.data.offers
        this.display = this.querys.length || this.offers.length
      } else {
        this.showToast(res.message)
      }
    })
  }
}
</script>
<style scoped lang="less">
  @import "../../../stylesheets/modules/personal/quo/quoItem";
</style>
