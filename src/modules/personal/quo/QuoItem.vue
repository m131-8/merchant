<template>
  <div class="order-sec">
    <!-- <flexbox :gutter="0" class="list-flex-noline">
      <flexbox-item :span="1/3" class="detail-name">{{item.created_time}}
      </flexbox-item>
      <flexbox-item :span="2/3" class="top-right" v-if="dataType === 'query'">{{quoType}}</flexbox-item>
      <flexbox-item :span="2/3" class="top-right" v-else>{{payType}}</flexbox-item>
    </flexbox> -->
    <cell :title="item.created_time" class="list-title">
      <div slot="value" v-if="dataType === 'query'">{{quoType}}</div>
      <div slot="value" v-else>{{payType}}</div>
    </cell>
    <cell :link="dataType==='query'?`/personal/quo/noquo?id=${item.id}`:`/personal/quo/pay?id=${item.id}`" class="select-detail">
      <p slot="after-title" class="select-title">{{getTitle}}</p>
      <span slot="after-title" class="col-lb" v-if="dataType === 'query'">{{'车险顾问正在报价...'}}</span>
      <span slot="after-title" class="col-lb" v-else>{{priceIcon}}</span>
      <div slot="icon" v-if="dataType === 'query'">
        <img :src="item.logo_url" alt="" class="imgauto" v-if="item.logo_url">
        <img src="../../../stylesheets/images/default_company.png" alt="" class="imgauto" v-else>
      </div>
      <div slot="icon" v-else>
        <img src="../../../stylesheets/images/hide_company.png" alt="" class="imgauto" v-if="item.is_hide_insurance_company">
        <img :src="item.logo_url" alt="" class="imgauto" v-else>
      </div>
    </cell>
  </div>
</template>
<script>
import {
  Cell,
  Flexbox,
  FlexboxItem
} from 'cvux/src/components'

export default {
  components: {
    Cell,
    Flexbox,
    FlexboxItem
  },
  props: {
    item: Object,
    getTitle: String,
    dataType: String
  },
  computed: {
    quoType() {
      let statusCode = this.item.status_code
      let quoType = ''
      switch (statusCode) {
        case 0:
          quoType = '未知'
          break
        case 1:
          quoType = '待报价'
          break
        case 2:
          quoType = '已报价'
          break
        case 3:
          quoType = '无效询价'
          break
        default:
          quoType = ''
          break
      }
      return quoType
    },
    payType() {
      let statusCode = this.item.status_code
      let paid = this.item.paid
      let payType = ''
      if (statusCode === 0) {
        payType = '未知'
      } else if (statusCode === 3) {
        payType = '已完成'
      } else if (statusCode === 4) {
        payType = '已失效'
      } else {
        if (paid === 1) {
          payType = '已支付'
        } else {
          payType = '待支付'
        }
      }
      return payType
    },
    priceIcon() {
      let priceIcon = '￥' + (this.item.total_price / 100).toFixed(2)
      return priceIcon
    }
  }
}
</script>
<style lang="less">
@import "../../../stylesheets/modules/personal/quo/quoItem";
</style>
