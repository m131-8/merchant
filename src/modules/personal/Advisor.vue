<template>
<article  >
    <group title="售后服务顾问" class="advisor" v-if="serviceConsultant">
      <cell :title="serviceConsultant.name" :inline-desc="serviceConsultant.mobile_number">
        <img slot="icon" class="change-adviser-img" :src="serviceConsultant.avatar">
      </cell>
      <div class="contact-adviser">
        <flexbox>
          <flexbox-item class="ml"><a :href="`tel:${serviceConsultant.mobile_number}`" class="flex call-phone"><i></i>打电话</a></flexbox-item>
          <flexbox-item class="ml"><a class="flex send-wx" @click.stop="sendWx"><i></i>发微信</a></flexbox-item>
        </flexbox>
      </div>
    </group>
    <group title="车险顾问" class="advisor" v-if="insuranceConsultant">
      <cell :title="insuranceConsultant.name" :inline-desc="insuranceConsultant.mobile_number">
        <img slot="icon" class="change-adviser-img" :src="insuranceConsultant.avatar">
      </cell>
      <div class="contact-adviser">
        <flexbox>
          <flexbox-item class="ml"><a :href="`tel:${insuranceConsultant.mobile_number}`" class="flex call-phone"><i></i>打电话</a></flexbox-item>
          <flexbox-item class="ml"><a class="flex send-wx" @click.stop="sendWx"><i></i>发微信</a></flexbox-item>
        </flexbox>
      </div>
    </group>
</article>
</template>
<script>
import {
  Group,
  Cell,
  Flexbox,
  FlexboxItem
} from 'cvux/src/components'

export default {
  components: {
    Group,
    Cell,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      serviceConsultant: {},
      insuranceConsultant: {}
    }
  },
  created() {
    // 获取保单列表
    this.$rest.personal.getMyInfo().then(res => {
      if (res.code === 0) {
        this.serviceConsultant = res.data.service_consultant
        this.insuranceConsultant = res.data.insurance_consultant
      } else {
        this.showToast(res.message)
      }
    })
  },
  methods: {
    sendWx () {
      this.$wechat.promise.then(wx => {
        window.WeixinJSBridge.call('closeWindow')
      }, wx => {
        console.log('微信JSSDK校验错误:', wx.res)
      })
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/personal/advisor";
@w2: 75rem;
.advisor .weui_cells_title {
  margin-top: 20/@w2;
}
.advisor .weui_cells{
  line-height: 1.2666667;
}
.contact-adviser .ml{
  margin-left: 26/@w2 !important;
}
</style>
