<template>
  <article class="commit-inquiry">
    <section class="tip-result">
      <i class="result-ico icon-tipico-ok"></i>
      <p class="result-hd">已提交</p>
      <p class="result-info">4S店二手车评估师将在1小时内联系您</p>
    </section>
    <x-button class="bottom-btn" @click.native="onSubmit">我要卖车</x-button>
  </article>
</template>
<script>
import {
  XButton
} from 'cvux/src/components'

export default {
  components: {
    XButton
  },
  data() {
    return {}
  },
  created() {
    let usedCarInfo = {
      car_model_id: 0,
      license_issued_on: '',
      mileage: '',
      color: '黑色',
      mortgage: '0',
      owner_name: '',
      owner_mobile: '',
      verify_code: '',
      vehicle_province: '广东省',
      vehicle_province_code: '440000',
      vehicle_city: '深圳市',
      vehicle_city_code: '440300'
    }
    this.$store.commit('updateUsedcar', usedCarInfo)
  },
  methods: {
    onSubmit() {
      this.$router.push('/usedcar/submit')
    }
  }
}
</script>
<style scoped lang="less">
@import "../../stylesheets/modules/usedcar/success";
</style>
