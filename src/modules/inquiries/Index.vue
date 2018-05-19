<template>
  <article class='index-box'>
    <swiper v-if="bannerList.length" :list='bannerList' auto :show-desc-mask="false" dots-class="dots-color" dots-position='center' class="inquiries-swiper"></swiper>
    <!--车险特惠导航-->
    <flexbox :gutter="0" class="flexbox-nav bg-white">
      <flexbox-item>
        <router-link :to="{ path: '/inquiries/inq'}">
          <a class="flex-center" href="javascript:void(0);">
            <flexbox orient="vertical" :gutter="0">
              <flexbox-item><span class="icon icon1"></span></flexbox-item>
              <flexbox-item>续保询价</flexbox-item>
            </flexbox>
          </a>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link :to="{ path: '/prestore/index'}">
          <a class="flex-center" href="javascript:void(0);">
            <flexbox orient="vertical" :gutter="0">
              <flexbox-item><span class="icon icon2"></span></flexbox-item>
              <flexbox-item>预存保费</flexbox-item>
            </flexbox>
          </a>
        </router-link>
      </flexbox-item>
    </flexbox>
    <!--续保优势标题-->
    <flexbox class="flex-pre-mt10">
      <flexbox-item class="flex-preference-title">
        <em class="flex-preference-icon">4s店续保有优势</em>
      </flexbox-item>
    </flexbox>
    <!--续保优势内容-->
    <flexbox :gutter="0" class="flex-preference">
      <flexbox-item :span="1/3">
        <div class="flex-demo-img"><img src="../../stylesheets/images/renewal5.png" alt="" class="imgauto"></div>
      </flexbox-item>
      <flexbox-item :span="2/3" class="flex-demo-txt">
        <h4>更多优惠</h4>
        <p>续保折上折,更有多种不同组合的超值服务赠送</p>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="flex-preference">
      <flexbox-item :span="1/3">
        <div class="flex-demo-img"><img src="../../stylesheets/images/renewal2.png" alt="" class="imgauto"></div>
      </flexbox-item>
      <flexbox-item :span="2/3" class="flex-demo-txt">
        <h4>专业服务</h4>
        <p>定损、报价、维修、理赔一条龙服务，让您省时、省事、省心</p>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="flex-preference">
      <flexbox-item :span="1/3">
        <div class="flex-demo-img"><img src="../../stylesheets/images/renewal3.png" alt="" class="imgauto"></div>
      </flexbox-item>
      <flexbox-item :span="2/3" class="flex-demo-txt">
        <h4>精品配件</h4>
        <p>纯正精品配件、原厂油漆、质量保证，您的爱车才不会贬值</p>
      </flexbox-item>
    </flexbox>
    <flexbox :gutter="0" class="flex-preference">
      <flexbox-item :span="1/3">
        <div class="flex-demo-img"><img src="../../stylesheets/images/renewal4.png" alt="" class="imgauto"></div>
      </flexbox-item>
      <flexbox-item :span="2/3" class="flex-demo-txt">
        <h4>专属车险顾问</h4>
        <p>一对一贴心服务，出险时第一时间为您指引，最快一天可赔付，无需垫款，全程提供咨询</p>
      </flexbox-item>
    </flexbox>
  </article>
</template>
<script>
// import oSp from './oSp' // 本地数据
import {
  Swiper,
  SwiperItem,
  Flexbox,
  FlexboxItem
} from 'cvux/src/components'

import ZConfirm from '../../components/ZConfirm.vue'

export default {
  components: {
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    ZConfirm
  },
  data() {
    return {
      bannerList: []
    }
  },
  created() {
    this.$rest.inq.getBannerPic(null, `insurance/banners`).then(res => {
      if (res.code === 0) {
        let banners = res.data.marketing_banners
        if (banners && banners.length) {
          let imgList = []
          banners.forEach(v => {
            imgList.push({
              img: v.image_url,
              url: v.target_url
            })
          })
          this.bannerList = imgList
        }
      } else {
        this.showToast(res.message)
      }
    })
  }
}
</script>
<style lang='less'>
@import "../../stylesheets/modules/inquiries/index";
.vux-slider .dots-color a .vux-icon-dot.active {
  background-color: #3b5999;
}
</style>
