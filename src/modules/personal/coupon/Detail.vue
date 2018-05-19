<template>
  <article class="coupon-info">
    <section class="coupon-sec1">
      <img :src="data.logo_url" alt="" class="logo-img">
      <flexbox orient="vertical" class="coupon-pos">
        <flexbox-item class="cd-tit">{{data.title}}</flexbox-item>
        <flexbox-item class="cd-mony" v-if="data.type_code === 2">免费</flexbox-item>
        <flexbox-item class="cd-mony" v-if="data.type_code !== 2 && data.value">价值<span class="fc-fb3f3f">{{data.value | formatePrice}}</span>元</flexbox-item>
        <flexbox-item class="p3">{{effectiveTime}}</flexbox-item>
        <flexbox-item class="attention-info">
          <img :src="data.qrcode_url" alt="" class="attention-weixin-er">
          <em class="ico-discount"></em>
        </flexbox-item>
        <flexbox-item><p>{{data.code}}</p></flexbox-item>
        <flexbox-item><p class="p3">{{data.plate_number}}</p></flexbox-item>
      </flexbox>
      <!-- <div class="coupon-con2"> -->
      <div class="ch">
        <cell class="coupon-detail">
          <img :src="data.shop_image_url" slot="icon" class="coupon-detail-img">
          <div class="coupon-detail-title" slot="after-title">
            <p>{{data.shop_name}}</p>
            <p>{{data.shop_address}}</p>
          </div>
        </cell>
      </div>
      <div class="ch">
        <p class="dec-tit">使用说明</p>
        <div class="dec-det" v-html='data.description'></div>
      </div>
      <!-- </div> -->
    </section>
  </article>
</template>
<script>
import {
  Cell,
  Card,
  Flexbox,
  FlexboxItem
} from 'cvux/src/components'

export default {
  components: {
    Cell,
    Card,
    Flexbox,
    FlexboxItem
  },
  methods: {
  },
  data() {
    return {
      data: {}
    }
  },
  created() {
    let id = this.$route.params.id
    let code = this.$route.params.code
    if (id && code) {
      this.$rest.personal.coupon.getCouponDetail(null, 'coupon-detail/' + code + '/' + id).then(res => {
        if (res.code === 0) {
          this.data = res.data
        } else {
          this.showToast(res.message)
        }
      })
    }
  },
  filters: {
    formatePrice(price) {
      return (price / 100).toFixed(2)
    }
  },
  computed: {
    effectiveTime() {
      let validFrom = this.data.valid_from && this.data.valid_from.replace(/-/g, '.')
      let validTo = this.data.valid_to && this.data.valid_to.replace(/-/g, '.')
      return `有效期：${validFrom} - ${validTo}`
    }
  }
}
</script>
<style scoped lang="less">
  @import "../../../stylesheets/modules/personal/coupon/detail";
</style>
