<template>
  <article>
    <header class="title-bar zz-title-bar">
      <h2>选择车型</h2>
    </header>
    <div v-for="series in seriesList">
      <span class="title_lab"><label>{{series[0].manufacturer}}</label></span>
      <ul class="car-list">
        <li v-for="item in series" @click.stop="selModel(item.id)"><a href="javascript:void(0);">{{item.name}}</a></li>
      </ul>
    </div>
  </article>
</template>
<script>
export default {
  data() {
    return {
      seriesList: []
    }
  },
  created() {
    let dataList = {}
    let brandId = this.$route.params.brandId
    if (brandId) {
      this.$rest.carInfo.getCarBrandList(null, `${brandId}/series`).then((res) => {
        if (res.code === 0) {
          res.series.forEach((v) => {
            if (!dataList[v.manufacturer]) {
              dataList[v.manufacturer] = []
              dataList[v.manufacturer].push({
                name: v.name,
                id: v.id,
                manufacturer: v.manufacturer
              })
            } else {
              dataList[v.manufacturer].push({
                name: v.name,
                id: v.id,
                manufacturer: v.manufacturer
              })
            }
          })
          this.seriesList = dataList
        } else {
          this.showToast(res.message)
        }
      })
    } else {
      this.showToast('brandId不存在')
    }
  },
  methods: {
    selModel(seriesId) {
      this.$router.push(`/car/model/${seriesId}`)
    }
  }
}
</script>
<style scoped lang="less">
  @import "../../stylesheets/modules/car/carInfo";
</style>
