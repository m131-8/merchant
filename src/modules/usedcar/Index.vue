<template>
  <article>
    <div class="submit-information-main">
      <p>
        <img src="../../stylesheets/images/used-car/submit-information01.png" />
        <!-- <a href="javascript:void(0);" class="sell-car-btn">我要卖车</a> -->
        <x-button type="primary" plain="" cssClasses="sell-car-btn" @click="sellcar">我要卖车</x-button>
      </p>
      <p>
        <img src="../../stylesheets/images/used-car/submit-information02.png" />
      </p>
      <p>
        <img src="../../stylesheets/images/used-car/submit-information03.png" />
      </p>
    </div>
    <div class="submit-information-list">
      <p>
        <img src="../../stylesheets/images/used-car/submit-information04.png" />
      </p>
      <swiper :list="images" auto :aspect-ratio="340/350" :show-desc-mask="false" dots-class="custom-bottom" dots-position="center"></swiper>
    </div>
    <section class="btn-bottom submit-btn-bottom">
      <div class="btn-fix">
        <img src="../../stylesheets/images/used-car/submit-information05.png" class="submit-information05" />
        <x-button type="primary" plain="" class="free-btn" @click="sellcar">免费估价</x-button>
      </div>
    </section>
  </article>
</template>
<script>
import {
  Swiper,
  XButton
} from 'cvux/src/components'
import bannerImages from './bannerImages'
export default {
  components: {
    Swiper,
    XButton
  },
  data() {
    return {
      swiperStart: 0,
      images: [{
        img: bannerImages.banner1,
        url: ''
      }, {
        img: bannerImages.banner2,
        url: ''
      }, {
        img: bannerImages.banner3,
        url: ''
      }]
    }
  },
  created() {},
  methods: {
    sellcar() {
      this.$router.push({
        path: '/usedcar/submit'
      })
    }
  }
}
</script>
<style lang="less">
@import "../../stylesheets/modules/usedcar/index";
</style>
