<template>
  <article class="active-box" :class="{'dos-bg': isDOS}">
    <img src="../../stylesheets/images/dos-active.jpg" alt="" class="imgauto" :class="{'dos-imgauto': isDOS}" v-if="isDOS">
    <img src="../../stylesheets/images/active1.png" alt="" class="imgauto" v-else>
    <a class="btn-fde100-shadow" :class="{'dos-btn': isDOS}" @click.stop="prestore">立即预存</a>
    <div class="prestore-rule">
      <div class="prestore-img">
        <div class="prestore-con">
          <ul>
            <li>•预存{{data.amount | formatePrice}}元，即可随机获得其中{{data.offer_number}}张优惠券</li>
            <li>•预存金在下次续保时抵扣</li>
          </ul>
          <div class="vouchers" v-for="coupon in data.coupons">
            <cell class="coupon">
              <div slot="after-title">{{coupon.title}}</div>
              <div v-if="coupon.type_code === 1 && coupon.value" slot="child" class="value">价值{{coupon.value | formatePrice}}元</div>
              <div v-if="coupon.type_code !== 1" slot="child" class="value">免费</div>
            </cell>
          </div>
        </div>
      </div>
    </div>
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
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.$rest.prestore.getPrestoreRuler(null, `prestore_coupon_rule`).then((res) => {
      if (res.code === 0) {
        this.data = res.data
      } else {
        this.showToast(res.message)
      }
    })
  },
  filters: {
    formatePrice(price) {
      return (price / 100).toFixed(0)
    }
  },
  computed: {
    isDOS() {
      return this.$store.state.isDOS
    }
  },
  methods: {
    prestore() {
      this.$router.push({
        path: '/prestore/pay',
        query: {
          amount: this.data.amount,
          mobile: this.data.mobile
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
@import "../../stylesheets/modules/prestore/index";
</style>
