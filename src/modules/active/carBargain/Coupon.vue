<template>
  <article @click.stop="toMyCoupon">
    <group class="active-bargain-coupon">
      <cell :title="data.activity_name" class='bargain-coupon-title'>
        <div slot="value" class="money">面值<i class="money">{{data.face_value | formatePrice}}</i><i class="unit">元</i></div>
      </cell>
      <cell :title="`兑换码：${data.coupon_code}`" class="bargain-coupon-value">
        <div slot='value'><span style="color: #fb3f3f;">{{expiresAt}}</span>{{couponStatus}}</div>
      </cell>
      <cell class="bargain-coupon-note">
        <div slot="after-title" class="coupon-note">
          <p>使用说明：{{data.note}}</p>
        </div>
      </cell>
    </group>
  </article>
</template>
<script>
import {
  Group,
  Cell
} from 'cvux/src/components'
// import util from '../../../common/util'

export default {
  components: {
    Cell,
    Group
  },
  data() {
    return {
      data: {},
      expiresAt: ''
    }
  },
  created() {
    let bargainId = this.$route.query.bargain_id
    let isCarOrWares = this.$route.query.isCarOrWares
    if (bargainId && isCarOrWares) {
      if (isCarOrWares === '1') {
        this.getCarCouponInfo(bargainId)
      } else {
        this.getWaresCouponInfo(bargainId)
      }
    } else {
      this.showToast('bargain_id不存在')
    }
  },
  filters: {
    formatePrice(price) {
      return (price / 100).toFixed(1)
    }
  },
  computed: {
    couponStatus() {
      let status = this.data.status
      let applyStatus = ''
      switch (status) {
        case 1:
          applyStatus = '天后过期'
          break
        case 2:
          applyStatus = '已经使用'
          break
        case 3:
          applyStatus = '已过期'
          break
      }
      return applyStatus
    }
  },
  methods: {
    toMyCoupon() {
      this.$router.push('/personal/coupon/list')
    },
    getCarCouponInfo(bargainId) {
      this.$rest.active.carBargain.getCouponInfo(null, bargainId).then(res => {
        if (res.code === 0) {
          this.data = res.data
          let nowtime = new Date().getTime()
          let endtime = new Date(res.data.expires_at.replace(/-/g, '/')).getTime()
          if (nowtime < endtime) {
            this.expiresAt = ((endtime - nowtime) / 1000 / 3600 / 24).toFixed(0)
          }
        } else if (res.code === 402) {
          // 跳转关注服务号页面
          this.$router.push({
            path: '/active/carBargain/focus'
          })
        }
      })
    },
    getWaresCouponInfo(bargainId) {
      this.$rest.active.waresBargain.getCouponInfo(null, bargainId).then(res => {
        if (res.code === 0) {
          this.data = res.data
          let nowtime = new Date().getTime()
          let endtime = new Date(res.data.expires_at.replace(/-/g, '/')).getTime()
          if (nowtime < endtime) {
            this.expiresAt = ((endtime - nowtime) / 1000 / 3600 / 24).toFixed(0)
          }
        } else if (res.code === 402) {
          // 跳转关注服务号页面
          this.$router.push({
            path: '/active/waresBargain/focus'
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "../../../stylesheets/modules/active/carbargain/coupon";
</style>
