<template>
<article>
  <section class="data-messages-null" v-if="prepays.length === 0">
    <i class="icon-no-order"></i>
    没有预存单
  </section>
  <section v-else>
    <group v-for="item in prepays" :key="item.id" gutter="0.13333333rem">
      <cell title="预存保费单" class="l-line"></cell>
      <cell>
        <div slot="after-title" class="mtb5">
          <p class="info-cont">车牌号：{{item.plate_number}}</p>
          <p class="info-cont">联系人：{{item.contact_name}}</p>
          <p class="info-cont">手机号：{{item.mobile}}</p>
          <p class="info-cont">预存金额：¥{{item.amount | formatePrice}}</p>
          <p class="info-cont">预存时间：{{item.time}}</p>
        </div>
      </cell>
    </group>
  </section>
</article>
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
  data () {
    return {
      prepays: []
    }
  },
  created () {
    this.$rest.personal.getOrderList(null, 'my-prepays').then((res) => {
      if (res.code === 0) {
        this.prepays = res.data.prepays
      } else {
        this.showToast(res.message)
      }
    })
  },
  filters: {
    formatePrice (price) {
      return (price / 100).toFixed(2)
    }
  }
}
</script>
<style scoped lang="less">
@import "../../stylesheets/modules/personal/order";
</style>
