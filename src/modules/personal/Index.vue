<template>
  <!-- 个人中心首页 -->
  <article class='personal'>
    <div class="personal-center-h">
      <div class="personal-center-pic">
        <cell class='personal-cell' link="/personal/Data">
          <div slot="icon" class="personal-avatar-pic">
            <img :src="data.avatar" class="avatar-pic" alt="">
          </div>
          <div class="after-title-info" slot='after-title'>
            <p>{{data.mobile_number}}</p>
            <p>{{data.city+data.district+data.address}}</p>
          </div>
        </cell>
      </div>
    </div>
    <group class='personal-center-select'>
      <cell title="预约记录" link="/personal/reservations">
        <i slot="icon" class="icon-yxjl"></i>
      </cell>
      <cell title="预存保费单" link="/personal/order">
        <i slot="icon" class="icon-yxyy"></i>
      </cell>
      <cell title="续保单" link="/personal/quo/quolist">
        <i slot="icon" class="icon-cx"></i>
      </cell>
    </group>
    <group class='personal-center-select'>
      <cell title="优惠券" link="/personal/coupon/list">
        <i slot="icon" class="icon-yhq"></i>
      </cell>
      <cell title="我的顾问" link="/personal/advisor">
        <i slot="icon" class="icon-wdgw"></i>
      </cell>
    </group>
    <x-button class="exit-button" @click="onShow">退出登录</x-button>
    <z-confirm
      :show.sync="showConfirm"
      @sure="logout"
    >
      确定退出您的账号？
    </z-confirm>
  </article>
</template>
<script>
import {
  Cell,
  Group,
  XButton,
  Confirm
} from 'cvux/src/components'

import ZConfirm from '../../components/ZConfirm.vue'
export default {
  components: {
    Cell,
    Group,
    XButton,
    Confirm,
    ZConfirm
  },
  data() {
    return {
      data: {},
      showConfirm: false
    }
  },
  created() {
    this.$rest.personal.getMyInfo().then(res => {
      if (res.code === 0) {
        if (!res.data.city) {
          res.data.city = ''
        }
        if (!res.data.district) {
          res.data.district = ''
        }
        if (!res.data.address) {
          res.data.address = ''
        }
        this.data = res.data
      }
    })
  },
  methods: {
    onShow() {
      this.showConfirm = true
    },
    logout() {
      this.$rest.login.out().then((res) => {
        if (res.code === 0) {
          this.is_login = false
          this.tipLoginHide = false
          this.$router.push('/login?backUrl=/personal/index')
        } else {
          this.showToast(res.message)
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/personal/index";
.personal-cell .with_arrow:after {
  border-color: #fff;
}
.personal-cell:active {
  background: none;
}
</style>
