<template>
  <div class="vouchers">
    <span class="name">{{item.title}}</span>
    <div class="ps-r" v-if="item.type_code === 1 && item.value">
      <b class="fs10">价值</b>
      <span class="fs28">{{priceTxt}}</span>
      <b class="fs11">元</b>
    </div>
    <div class="ps-r-b" v-if="item.type_code !== 1">
      <p class="fs10">免费</p>
    </div>
    <em class="icon-prestore"></em>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  computed: {
    priceTxt() {
      let value = this.item.value
      return (value / 100)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../stylesheets/modules/personal/quo/couponCard";
</style>
