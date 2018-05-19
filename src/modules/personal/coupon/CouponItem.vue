<template>
  <group class="voucher-art" :class="className">
    <cell class="hd">
      <div slot="after-title">{{item.type_name}}</div>
      <div slot="value">{{item.shop_name}}</div>
    </cell>
    <div class="bg">
      <em class="icon-prestore"></em>
      <cell class="voucher-info" :link="`/personal/coupon/detail/${item.id}/${item.type_code}`">
        <p slot="after-title" class="voucher-style">{{item.title}}</p>
        <p slot="after-title" class="voucher-style">{{priceTxt}}</p>
      </cell>
      <cell class="voucher-time" :title="effectiveTime">
        <em slot="value">{{item.plate_number}}</em>
      </cell>
    </div>
  </group>
</template>
<script>
import {
  Group,
  Cell
} from 'cvux/src/components'

export default {
  components: {
    Group,
    Cell
  },
  props: {
    item: Object
  },
  computed: {
    // couponType() {
    //   let typeCode = this.item.type_code
    //   let couponType = ''
    //   switch (typeCode) {
    //     case 1:
    //       couponType = '抵用券'
    //       break
    //     case 2:
    //       couponType = '免费券'
    //       break
    //     case 3:
    //       couponType = '购车砍价券'
    //       break
    //     case 4:
    //       couponType = '商品砍价券'
    //       break
    //     default:
    //       couponType = ''
    //       break
    //   }
    //   return couponType
    // },
    effectiveTime() {
      let validFrom = this.item.valid_from.replace(/-/g, '.')
      let validTo = this.item.valid_to.replace(/-/g, '.')
      return `有效期：${validFrom} - ${validTo}`
    },
    priceTxt() {
      let typeCode = this.item.type_code
      let value = this.item.value
      let priceTxt = ''
      if (typeCode === 2) {
        priceTxt = '免费'
      } else {
        if (value) {
          priceTxt = '价值' + (value / 100).toFixed(2) + '元'
        }
      }
      return priceTxt
    },
    // 判断样式是常态还是已过期或已使用
    className() {
      let code = this.item.status_code
      let className = {
        'voucher-used': false,
        'voucher-expire': false,
        'voucher-base': true
      }
      switch (code) {
        case 2:
          className['voucher-used'] = true
          break
        case 3:
          className['voucher-expire'] = true
          break
        default:
          className['voucher-base'] = true
          break
      }
      return className
    }
  }
}
</script>
<style lang="less">
@import "../../../stylesheets/modules/personal/coupon/list";
.voucher-expire .vux-label-desc ,
.voucher-used .vux-label-desc {
  color: #ccc!important;
}
</style>
