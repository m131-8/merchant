<template>
  <article>
    <header class="title-bar">
      <h2>选择品牌</h2>
    </header>
    <section class="word-list">
      <checker default-item-class="name-item" selected-item-class="name-item-selected">
        <checker-item @click.native="selBrand('HOT')" value="HOT" ref="isHot" class="is-hot" :class="{isAll: isTrue}" style="background-position: 0 -60/@w2;"><span>A</span></checker-item><checker-item v-for="item in list" :key="item" @click.native="selBrand(item)" :value="item">{{item}}</checker-item>
      </checker>
    </section>
    <ul class="car-list">
      <li v-for=" brand in brandByID" :key="brand.id" @click.stop="selSeries(brand.id)">
        <!-- <cell :title="brand.name" style="background-color: #fff">
          <img slot="icon" class="brand-img" :src="brand.image_url">
        </cell> -->
        <a href="javascript:;">
          <img :src="brand.image_url" alt="" width="35" height="35" class="">
          <span>{{brand.name}}</span>
        </a>
      </li>
    </ul>
  </article>
</template>
<script>
import {
  Checker,
  CheckerItem
} from 'cvux/src/components'
export default {
  components: {
    Checker,
    CheckerItem
  },
  data() {
    return {
      isTrue: true,
      list: ['A', 'B', 'C', 'D', 'F', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
      brands: {},
      brandByID: []
    }
  },
  created() {
    let brands = this.$store.state.submit.brands
    if (brands.HOT) {
      this.brands = brands
      this.brandByID = this.brands.HOT
    } else {
      this.$rest.carInfo.getCarBrandList().then((res) => {
        if (res.code === 0) {
          brands = res.brands
          this.brands = brands
          this.brandByID = this.brands.HOT
          this.$store.commit('updateBrands', brands)
        } else {
          this.showToast(res.message)
        }
      })
    }
  },
  methods: {
    selBrand(v) {
      if (v === 'HOT') {
        this.isTrue = true
      } else {
        this.isTrue = false
      }
      this.brandByID = this.brands[v]
    },
    selSeries(brandId) {
      this.$router.push(`/car/series/${brandId}`)
    }
  }
}
</script>
<style scoped lang="less">
@import "../../stylesheets/modules/car/carInfo";
</style>
