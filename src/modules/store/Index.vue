<template>
  <article>
    <div class="icon-dm"><img :src="store.logo"></div>
    <swiper :list="store.images" :show-desc-mask="false" dots-class="dots-color" dots-position='center' v-model="swiperStart" :aspect-ratio="247/375" auto></swiper>
    <div class="store-info">
      <cell class="store-name">
        <div slot="after-title">
          <p class="info">
            {{store.address}}
          </p>
          <p class="info">
            {{store.contact_number}}
          </p>
        </div>
        <div class="store-find" slot="child">
          <a :href="'tel:'+store.contact_number" class="phone-a"></a>
          <em></em>
          <a href="javascript:void(0);" title="" class="address-a" @click="locate"></a>
        </div>
      </cell>
      <tabbar class="tabbar">
        <tabbar-item link="/appointment/index">
          <span class="icon" slot="icon">
              <i class="icon-yxyy"></i>
          </span>
          <span slot="label" class="label">养修预约</span>
        </tabbar-item>
        <tabbar-item link="/inquiries/index">
          <span class="icon" slot="icon">
              <i class="icon-cxxj"></i>
          </span>
          <span slot="label" class="label">车险特惠</span>
        </tabbar-item>
        <tabbar-item link="/personal/index">
          <span class="icon" slot="icon">
              <i class="icon-grzx"></i>
          </span>
          <span slot="label" class="label">个人中心</span>
        </tabbar-item>
      </tabbar>
    </div>
    <div class="featured-activities">
      <h4>
        <img src="../../stylesheets/images/featured-activities.png">
        <span>精选活动</span>
      </h4>
      <div class="featured-activities-list">
        <ul>
          <li v-for="item in store.marketing_banners">
            <a :href="item.target_url"><img :src="item.image_url"></a>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
<script>
// import util from '../../common/util'
// import cache from '../../common/cache'
// import wxHelp from '../../common/wxhelp'
import {
  Swiper,
  Cell,
  InlineDesc,
  Tabbar,
  TabbarItem
} from 'cvux/src/components'

export default {
  components: {
    Swiper,
    Cell,
    Tabbar,
    TabbarItem,
    InlineDesc
  },
  data() {
    return {
      store: {
        images: []
      },
      swiperStart: 0
    }
  },
  created() {
    this.$rest.store.getStoreInfo().then((res) => {
      if (res.code === 0) {
        let data = res.data
        data.images.forEach((item) => {
          item.img = item.url
          item.url = item.url
        })
        this.store = data
      }
    })
  },
  methods: {
    locate() {
      let address = {
        latitude: this.store.latitude,
        longitude: this.store.longitude
      }
      this.$wechat.promise.then(wx => {
        if (Object.keys(address).length) {
          wx.openLocationByWx(address.latitude || '', address.longitude || '', address.name || '', address.address || '', address.scale || 12, address.infoUrl || '')
        }
      }, wx => {
        console.log('微信JSSDK校验错误:', wx.res)
      })
      // if (!wxHelp.wxFlag) { // 调用微信接口需要先线上校验接口
      //   wxHelp.wechatConfig().then(res => {
      //     if (Object.keys(address).length) {
      //       wxHelp.openLocationByWx(address.latitude || '', address.longitude || '', address.name || '', address.address || '', address.scale || 12, address.infoUrl || '')
      //     }
      //   })
      // } else {
      //   if (Object.keys(address).length) {
      //     wxHelp.openLocationByWx(address.latitude || '', address.longitude || '', address.name || '', address.address || '', address.scale || 12, address.infoUrl || '')
      //   }
      // }
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/store/index";
.vux-slider .dots-color a .vux-icon-dot.active {
  background-color: #3b5999;
}
</style>
