<template>
  <article class="inq-franchise-article">
    <group title="确认险种" class="g-top">
      <cell title="与去年一致">
        <span slot="value" v-if="data.same_with_last_year" class="icon-blue-hook"></span>
      </cell>
    </group>
    <group>
      <cell title="重新勾选险种">
        <span slot="value" v-if="data.same_with_last_year" class="icon-triangle-up"></span>
        <span slot="value" v-else class="icon-triangle-down"></span>
      </cell>
    </group>
    <div v-if="!data.same_with_last_year">
      <div class="bg-white inq-franchise">
        <cell :title="item | getString" v-for="item in data.insures" :key="item.code">
          <span slot="icon" class="icon-blue-hook"></span>
          <span  slot="value" v-if="item.properties && item.properties.select_ndi && item.properties.select_ndi===true" class="inq-franchise inq-isfranchise">不计免赔</span>
        </cell>
      </div>
      <group>
      <cell title="保险公司" :value="data.company_name" is-link></cell>
      </group>
    </div>
    <group title="联系人" class="g-top">
      <x-input title="姓名" v-model='data.user_name' readonly="readonly"></x-input>
      <x-input title="手机号" class="input-size" v-model="data.mobile" readonly="readonly"></x-input>
      <x-input title="车牌号" class="input-size" v-model="data.plate_number" readonly="readonly"></x-input>
    </group>
    <section class="btn-bottom">
      <div class="btn-fix">
        <a class="btn" :href="`tel:${data.sales_mobile}`">咨询顾问</a>
      </div>
    </section>
  </article>
</template>
<script>
  import {
    Cell,
    Group,
    XInput
  } from 'cvux/src/components'

  export default {
    components: {
      Cell,
      Group,
      XInput
    },
    data() {
      return {
        data: {}
      }
    },
    created() {
      let id = this.$route.query.id
      if (id) {
        this.$rest.personal.quo.getNoQuoInfo(null, id).then(res => {
          if (res.code === 0) {
            this.data = res.data
          } else {
            this.showToast(res.message)
          }
        })
      }
    },
    filters: {
      getString(obj) {
        if (!obj) return ''
        let str = ''
        let name = obj.name
        let code = obj.code
        let pop = obj.properties
        if (!pop) return name
        str = name + ' '
        if (code === 'mb0005') {
          str += '(' + pop.count + pop.unit + '*'
          if (pop.coverage_unit) {
            str += pop.coverage + pop.coverage_unit
          } else {
            str += pop.coverage + '元'
          }
          str += ')'
        } else if (code === 'ma0006' || code === 'zz0019') {
          str += '(' + pop.glass_type + ')'
        } else {
          if (pop.coverage_unit) {
            str += '(' + pop.coverage + pop.coverage_unit + ')'
          } else if (pop.coverage) {
            str += '(' + pop.coverage + '元)'
          }
        }
        return str
      }
    }
  }
</script>
<style lang="less">
   @import "../../../stylesheets/modules/personal/quo/noquo.less";

</style>
