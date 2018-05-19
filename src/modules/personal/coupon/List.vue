<template>
  <article>
    <section class="voucher-sec" v-if="coupons.length">
      <coupon-item v-for="coupon in coupons" :key="coupon.id" :item="coupon"></coupon-item>
    </section>
    <section class="data-messages-null" v-else>
      <i class="icon-no-coupon"></i> 尚未获得优惠券
    </section>
  </article>
</template>
<script>
import CouponItem from './CouponItem'

export default {
  components: {
    CouponItem
  },
  data() {
    return {
      coupons: []
    }
  },
  created() {
    this.$rest.personal.coupon.getMyCoupons(null, 'my-coupons').then(res => {
      if (res.code === 0) {
        this.coupons = res.data.coupons
      } else {
        this.showToast(res.message)
      }
    })
  }
}
</script>
<style scoped lang="less">
  @import "../../../stylesheets/modules/personal/coupon/list";
</style>
